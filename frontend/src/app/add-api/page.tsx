"use client"

import type React from "react"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { ArrowLeft, Server, Zap, Check, Download, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Loader from "@/components/Loader"
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function AddAPI() {
  const router = useRouter()
  const { data: session } = useSession()

  const [apiName, setApiName] = useState("")
  const [apiUrl, setApiUrl] = useState("")
  const [apiType, setApiType] = useState<"server" | "serverless" | null>(null)
  const [plan, setPlan] = useState<"free" | "pro" | null>(null)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)
  const [apiNameError, setApiNameError] = useState("")
  const [apiUrlError, setApiUrlError] = useState("")
  const [apiTypeError, setApiTypeError] = useState("")
  const [planError, setPlanError] = useState("")
  // Pre-written SDK integration code
  const sdkIntegrationCode = `// SaaS Monitoring for Node
app.set('trust proxy', true);
const Logger = require('saas-monitering-sdk');

Logger.init({
  api_key: 'your_api_key',
});

app.use(Logger.middleware());`

  const validateApiName = (value: string) => {
    if (!value.trim()) {
      setApiNameError("API name is required")
      return false
    }
    if (/\s/.test(value)) {
      setApiNameError("API name cannot contain spaces")
      return false
    }
    if (value.length > 12) {
      setApiNameError("API name must be 12 characters or less")
      return false
    }
    setApiNameError("")
    return true
  }

  const validateApiUrl = (value: string) => {
    if (!value.trim()) {
      setApiUrlError("API URL is required")
      return false
    }
    try {
      const url = new URL(value)
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        setApiUrlError("URL must use http or https protocol")
        return false
      }
      setApiUrlError("")
      return true
    } catch {
      setApiUrlError("Please enter a valid URL")
      return false
    }
  }

  const handleApiNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setApiName(value)
    validateApiName(value)
  }

  const handleApiUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setApiUrl(value)
    validateApiUrl(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const isNameValid = validateApiName(apiName)
    const isUrlValid = validateApiUrl(apiUrl)
    if (!apiType) setApiTypeError("Please select an API type")
    else setApiTypeError("")
    if (!plan) setPlanError("Please select a plan")
    else setPlanError("")

    if (!isNameValid || !isUrlValid || !apiType || !plan) {
      return
    }

    try {
      const userEmail = session?.user?.email
      const userRes = await axios.get(`${BACKEND_URL}/api/users?email=${userEmail}`)
      let userId = userRes.data?.id
      if (!userId) {
        const created = await axios.post(`${BACKEND_URL}/api/users`, {
          name: session?.user?.name || "Dev User",
          email: userEmail,
          services: [],
        })
        userId = created.data?.id
      }

      console.log(userId)
  setLoading(true)
      const response = await axios.post(`${BACKEND_URL}/api/apis`, {
        user_id: userId,
        name: apiName,
        url: apiUrl,
        api_type: apiType,
        plan: plan,
        // No sdk_code sent to backend
      })
  setLoading(false)
      if (response.status === 201 || response.status === 200) {
        router.push("/dashboard")
      } else {
        console.error("Failed to create API:", response.statusText)
      }
    } catch (error) {
      console.error("Error creating API:", error)
        setLoading(false)
    }
  }

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(sdkIntegrationCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  const handleDownloadSDK = () => {
    // Create a blob with the SDK code
    const blob = new Blob([sdkIntegrationCode], { type: "text/javascript" })
    const url = URL.createObjectURL(blob)

    // Create download link
    const link = document.createElement("a")
    link.href = url
    link.download = `${apiName || "api"}-monitor-sdk.js`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Updated form validation - no longer requires SDK code input
  const isFormValid = apiName && !apiNameError && apiUrl && !apiUrlError && apiType && plan
if(loading)
    {
      return(
       <div >
        <Loader/>
        </div> )
    }
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-black/95 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between w-full space-y-4 md:space-y-0">
            {/* Back button at far left */}
            <div>
              <button
                type="button"
                className="flex items-center text-zinc-400 hover:text-zinc-100 transition"
                onClick={() => router.push("/dashboard")}
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Dashboard
              </button>
            </div>
            {/* Title + Subtitle */}
            <div className="w-full md:w-auto text-center md:text-left flex flex-col items-center md:items-center flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-white">Add New API</h1>
              <p className="text-zinc-400 text-sm md:text-base mt-1">Configure a new API for monitoring</p>
            </div>
            {/* Optional right-side placeholder for symmetry */}
            <div className="hidden md:block" style={{ width: "160px" }}></div>
          </div>
        </div>
      </header>

      <div className="container px-4 py-8 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-xl text-white">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="api-name" className="text-sm font-medium text-white">
                    API Name
                  </Label>
                  <Input
                    id="api-name"
                    placeholder="e.g., Payment API"
                    value={apiName}
                    onChange={handleApiNameChange}
                    className={`bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-emerald-500 ${
                      apiNameError ? "border-red-500 focus:border-red-500" : ""
                    }`}
                  />
                  {apiNameError && <p className="text-red-500 text-sm">{apiNameError}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-url" className="text-sm font-medium text-white">
                    API URL
                  </Label>
                  <Input
                    id="api-url"
                    placeholder="https://api.example.com"
                    value={apiUrl}
                    onChange={handleApiUrlChange}
                    className={`bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-emerald-500 ${
                      apiUrlError ? "border-red-500 focus:border-red-500" : ""
                    }`}
                  />
                  {apiUrlError && <p className="text-red-500 text-sm">{apiUrlError}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Type Selection */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-xl text-white">API Type</CardTitle>
              <p className="text-zinc-400 text-sm">Choose your API deployment type</p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Card
                  className={`cursor-pointer transition-all border-2 ${
                    apiType === "server"
                      ? "border-emerald-600 bg-emerald-900/20"
                      : "border-zinc-700 bg-zinc-800 hover:border-zinc-600"
                  }`}
                  onClick={() => setApiType("server")}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Server className="h-8 w-8 text-blue-500" />
                      {apiType === "server" && (
                        <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Server</h3>
                    <p className="text-zinc-400 text-sm">
                      Traditional server-based API deployment with dedicated infrastructure
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-all border-2 ${
                    apiType === "serverless"
                      ? "border-emerald-600 bg-emerald-900/20"
                      : "border-zinc-700 bg-zinc-800 hover:border-zinc-600"
                  }`}
                  onClick={() => setApiType("serverless")}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Zap className="h-8 w-8 text-yellow-500" />
                      {apiType === "serverless" && (
                        <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-white">Serverless</h3>
                    <p className="text-zinc-400 text-sm">
                      Function-based deployment with automatic scaling and pay-per-use
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Plan Selection */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-xl text-white">Choose Plan</CardTitle>
              <p className="text-zinc-400 text-sm">Select your monitoring plan</p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Card
                  className={`cursor-pointer transition-all border-2 ${
                    plan === "free"
                      ? "border-emerald-600 bg-emerald-900/20"
                      : "border-zinc-700 bg-zinc-800 hover:border-zinc-600"
                  }`}
                  onClick={() => setPlan("free")}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-emerald-500">Free</div>
                      {plan === "free" && (
                        <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <ul className="space-y-2 text-sm text-zinc-400">
                      <li>• Uptime monitoring</li>
                      <li>• Basic latency tracking</li>
                      <li>• Simple health checks</li>
                      <li>• Email alerts</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-all border-2 ${
                    plan === "pro"
                      ? "border-emerald-600 bg-emerald-900/20"
                      : "border-zinc-700 bg-zinc-800 hover:border-zinc-600"
                  }`}
                  onClick={() => setPlan("pro")}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-purple-500">Pro</div>
                      {plan === "pro" && (
                        <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <ul className="space-y-2 text-sm text-zinc-400">
                      <li>• Everything in Free</li>
                      <li>• Advanced traffic monitoring</li>
                      <li>• Detailed health & logging</li>
                      <li>• Custom SDK integration</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* SDK Integration (Pro Plan Only) - Now Display Only */}
          {plan === "pro" && (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center justify-between">
                  SDK Integration Package
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="border-zinc-700 text-black hover:bg-zinc-800 hover:text-white"
                      onClick={handleCopyCode}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {copied ? "Copied!" : "Copy Code"}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700"
                      onClick={handleDownloadSDK}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download SDK
                    </Button>
                  </div>
                </CardTitle>
                <p className="text-zinc-400 text-sm">Ready-to-use SDK integration code for your API monitoring</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-zinc-300 font-mono whitespace-pre-wrap">
                      <code>{sdkIntegrationCode}</code>
                    </pre>
                  </div>

                  <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-white mb-2">Installation Instructions:</h4>
                    <ol className="text-xs text-zinc-400 space-y-1 list-decimal list-inside">
                      <li>Download the SDK file using the button above</li>
                      <li>
                        Install the SaaS Monitor package:{" "}
                        <code className="bg-zinc-700 px-1 rounded">npm install @saas-monitor/sdk</code>
                      </li>
                      <li>Replace 'your-api-key-here' with your actual API key</li>
                      <li>Run the integration code in your Node.js application</li>
                      <li>Monitor your API status in the dashboard</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              className="border-zinc-700 text-black hover:bg-zinc-800 hover:text-white"
              onClick={() => router.push("/dashboard")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-zinc-700 disabled:text-zinc-500 " 
            >
              Add API
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
