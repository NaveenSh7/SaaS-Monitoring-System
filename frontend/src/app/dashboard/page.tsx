"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  Edit,
  Globe,
  LineChart,
  Server,
  Settings,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/Navbar"

export default function Dashboard() {
  const [selectedAPI, setSelectedAPI] = useState("payment-api")

  const apis = [
    { id: "payment-api", name: "Payment API", status: "healthy", url: "api.payment.com" },
    { id: "user-api", name: "User Management API", status: "warning", url: "api.users.com" },
    { id: "notification-api", name: "Notification API", status: "healthy", url: "api.notify.com" },
    { id: "analytics-api", name: "Analytics API", status: "error", url: "api.analytics.com" },
  ]

  const selectedAPIData = apis.find((api) => api.id === selectedAPI)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-emerald-500"
      case "warning":
        return "bg-yellow-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return <Badge className="bg-emerald-900/30 text-emerald-400 border-emerald-600">Healthy</Badge>
      case "warning":
        return <Badge className="bg-yellow-900/30 text-yellow-400 border-yellow-600">Warning</Badge>
      case "error":
        return <Badge className="bg-red-900/30 text-red-400 border-red-600">Error</Badge>
      default:
        return <Badge className="bg-gray-900/30 text-gray-400 border-gray-600">Unknown</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
        <Navbar/>
      {/* Header */}
      <header className="border-b border-zinc-800 bg-black/95 backdrop-blur">
        <div className="container px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Hello, John Doe 👋</h1>
              <p className="text-zinc-400 text-sm md:text-base">Welcome back to your monitoring dashboard</p>
            </div>
            <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 w-fit">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </header>

      <div className="container px-4 py-6 md:py-8">
        {/* API Selection */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-2">API Monitoring</h2>
              <p className="text-zinc-400 text-sm md:text-base">Select an API to view detailed monitoring data</p>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 w-fit">
              <Server className="h-4 w-4 mr-2" />
              Add New API
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
            {apis.map((api) => (
              <Card
                key={api.id}
                className={`cursor-pointer transition-all border-2 ${
                  selectedAPI === api.id
                    ? "border-emerald-600 bg-emerald-900/10"
                    : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"
                }`}
                onClick={() => setSelectedAPI(api.id)}
              >
                <CardContent className="p-4 text-white ">
                  <div className="flex items-start justify-between mb-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(api.status)}`} />
                    {getStatusBadge(api.status)}
                  </div>
                  <h3 className="font-semibold mb-1 text-sm md:text-base">{api.name}</h3>
                  <p className="text-zinc-400 text-xs md:text-sm">{api.url}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Selected API Details */}
        {selectedAPIData && (
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${getStatusColor(selectedAPIData.status)}`} />
                <h3 className="text-xl md:text-2xl font-bold">{selectedAPIData.name}</h3>
                {getStatusBadge(selectedAPIData.status)}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
                <Button size="sm" variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Alerts
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Monitoring Dashboard */}
        <div className="grid gap-6 ">
          {/* Key Metrics Row */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
                <CardTitle className="text-sm font-medium text-white">Uptime</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-500">99.9%</div>
                <p className="text-xs text-zinc-400">Last 30 days</p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Avg Response Time</CardTitle>
                <Clock className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-500">245ms</div>
                <p className="text-xs text-zinc-400 ">-12ms from yesterday</p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Total Requests</CardTitle>
                <TrendingUp className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-500">1.2M</div>
                <p className="text-xs text-zinc-400">+15% from last week</p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Error Rate</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">0.1%</div>
                <p className="text-xs text-zinc-400">-0.05% from yesterday</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-emerald-500" />
                  Response Time Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    width={500}
                    height={300}
                    alt="Response Time Chart"
                    className="w-full h-auto"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  Request Volume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    width={500}
                    height={300}
                    alt="Request Volume Chart"
                    className="w-full h-auto"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Status and Performance Row */}
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-cyan-500" />
                  Global Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=250&width=400"
                    width={400}
                    height={250}
                    alt="Global Status Map"
                    className="w-full h-auto"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Performance Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=250&width=400"
                    width={400}
                    height={250}
                    alt="Performance Score"
                    className="w-full h-auto"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  Error Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=250&width=400"
                    width={400}
                    height={250}
                    alt="Error Distribution"
                    className="w-full h-auto"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-emerald-500" />
                Recent Activity & Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-zinc-800/50">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">API Response time improved</p>
                    <p className="text-xs text-zinc-400">Average response time decreased by 15ms - 2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg bg-zinc-800/50">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">High traffic detected</p>
                    <p className="text-xs text-zinc-400">Request volume 25% above normal - 15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg bg-zinc-800/50">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">New monitoring location added</p>
                    <p className="text-xs text-zinc-400">Tokyo monitoring node is now active - 1 hour ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
