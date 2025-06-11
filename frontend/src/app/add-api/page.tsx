"use client"

import type React from "react"

import { useState } from "react"
import { useSession } from "next-auth/react" 
import { useRouter } from "next/navigation"
import axios from "axios"
import { ArrowLeft, Server, Zap, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function AddAPI() {
  const router = useRouter()
  const { data: session } = useSession() 

  const [apiName, setApiName] = useState("")
  const [apiUrl, setApiUrl] = useState("")
  const [apiType, setApiType] = useState<"server" | "serverless" | null>(null)
  const [plan, setPlan] = useState<"free" | "pro" | null>(null)
  const [sdkCode, setSdkCode] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const userEmail = session?.user?.email;
    const userRes = await axios.get(`http://localhost:5000/api/users?email=${userEmail}`);
    const userId = userRes.data.id;

    console.log(userId);
    

    const response = await axios.post("http://localhost:5000/api/apis", {
      user_id: userId, // Use actual user ID
      name: apiName,
      url: apiUrl,
      api_type: apiType,
      plan: plan,
      sdk_code: plan === "pro" ? sdkCode : null,
    })

    if (response.status === 201 || response.status === 200) {
      router.push("/dashboard")
    } else {
      console.error("Failed to create API:", response.statusText)
    }
}

  const isFormValid = apiName && apiUrl && apiType && plan && (plan === "free" || sdkCode)

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
              <CardTitle className="text-xl">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="api-name" className="text-sm font-medium">
                    API Name
                  </Label>
                  <Input
                    id="api-name"
                    placeholder="e.g., Payment API"
                    value={apiName}
                    onChange={(e) => setApiName(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-url" className="text-sm font-medium">
                    API URL
                  </Label>
                  <Input
                    id="api-url"
                    placeholder="https://api.example.com"
                    value={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-emerald-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Type Selection */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-xl">API Type</CardTitle>
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
                    <h3 className="text-lg font-semibold mb-2">Server</h3>
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
                    <h3 className="text-lg font-semibold mb-2">Serverless</h3>
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
              <CardTitle className="text-xl">Choose Plan</CardTitle>
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

          {/* SDK Integration (Pro Plan Only) */}
          {plan === "pro" && (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-xl">SDK Integration</CardTitle>
                <p className="text-zinc-400 text-sm">Provide your SDK integration code for advanced monitoring</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="sdk-code" className="text-sm font-medium">
                    Integration Code
                  </Label>
                  <Textarea
                    id="sdk-code"
                    placeholder={`// Example SDK integration
import { Monitor } from '@saas-monitor/sdk';

const monitor = new Monitor({
  apiKey: 'your-api-key',
  endpoint: '${apiUrl || "https://api.example.com"}',
  options: {
    timeout: 5000,
    retries: 3
  }
});

monitor.track('api-call', {
  method: 'GET',
  path: '/users'
});`}
                    value={sdkCode}
                    onChange={(e) => setSdkCode(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-emerald-500 min-h-[200px] font-mono text-sm"
                    rows={10}
                  />
                  <p className="text-xs text-zinc-500">Enter 10-20 lines of your SDK integration code</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              onClick={() => router.push("/dashboard")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-zinc-700 disabled:text-zinc-500"
            >
              Add API
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
