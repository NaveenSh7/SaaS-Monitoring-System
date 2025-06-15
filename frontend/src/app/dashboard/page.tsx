

"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Activity, AlertCircle, CheckCircle2, Clock, Edit, LineChart, Server, Settings, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/Navbar"
import ApiStatusChart from '../uptime/page';

interface ApiData {
  id: string
  name: string
  url: string
  api_type: string
  plan: string
  status?: string // We'll assign this randomly for demo
}

type ApiEvent = {
  id: number;
  api_id: number;
  status: 'up' | 'down';
  latency: number | null;
  started_at: string;
  ended_at: string | null;
};




export default function Dashboard() {
  const router = useRouter()
  const { data: session } = useSession()
  const [apis, setApis] = useState<ApiData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAPI, setSelectedAPI] = useState<string | null>(null)
  const [uptimes, setUptimes] = useState<ApiEvent[]>([]); 


  // Fetch APIs for the logged-in user


    // fetch uptime of a perticular api

useEffect(() => {
  const fetchApis = async () => {
    if (!session?.user?.email) return;

    try {
      const userEmail = session.user.email;
      const userRes = await fetch(`http://localhost:5000/api/users?email=${userEmail}`);
      if (!userRes.ok) throw new Error("Failed to fetch user");

      const userData = await userRes.json();
      const userId = userData.id;

      const response = await fetch(`http://localhost:5000/api/apis?user_id=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setApis(data);

        // ✅ Set selected API separately and let another useEffect handle fetchUptimes
        if (data.length > 0) {
          setSelectedAPI(data[0].id);
        }
      } else {
        console.error("Failed to fetch APIs");
      }
    } catch (error) {
      console.error("Error fetching APIs:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchApis();
}, [session]);

useEffect(() => {
  const fetchUptimes = async () => {
    if (!selectedAPI) return;

    try {
      const response = await fetch(`http://localhost:5000/api/uptime?api_id=${selectedAPI}`);
      const data = await response.json();
      setUptimes(data);
      console.log("Fetched uptimes for API", uptimes);
    } catch (error) {
      console.error("Error fetching uptimes:", error);
    }
  };

  fetchUptimes();
}, [selectedAPI]);




  const selectedAPIData = apis.find((api) => api.id === selectedAPI);

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
    <div className="min-h-screen bg-black text-white px-4">
      <Navbar />
      {/* Header */}
      <header className="border-b border-zinc-800 bg-black/95 backdrop-blur">
        <div className="container px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Hello, {session?.user?.name || "User"} 👋</h1>
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
            <Button className="bg-emerald-600 hover:bg-emerald-700 w-fit" onClick={() => router.push("/add-api")}>
              <Server className="h-4 w-4 mr-2" />
              Add New API
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          ) : apis.length === 0 ? (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-8 text-center">
                <Server className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No APIs Found</h3>
                <p className="text-zinc-400 mb-6">You haven't added any APIs to monitor yet.</p>
                <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => router.push("/add-api")}>
                  Add Your First API
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                  <CardContent className="p-4 text-white">
                    <div className="flex items-start justify-between mb-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor("healthy")}`} />
                      {getStatusBadge("healthy")}
                    </div>
                    <h3 className="font-semibold mb-1 text-sm md:text-base">{api.name}</h3>
                    <p className="text-zinc-400 text-xs md:text-sm">{api.url}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Selected API Details */}
        {selectedAPIData && (
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${getStatusColor("healthy")}`} />
                <h3 className="text-xl md:text-2xl font-bold">{selectedAPIData.name}</h3>
                {getStatusBadge("healthy")}
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

        {/* Monitoring Dashboard - Only show if an API is selected */}
        {selectedAPIData && (
          <div className="grid gap-6">
            {/* Key Metrics Row */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
                  <p className="text-xs text-zinc-400">-12ms from yesterday</p>
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

<div className="grid gap-6 lg:grid-cols-2 w-full">
  <Card className="bg-zinc-900 border border-zinc-800 shadow-md rounded-2xl">
    <CardHeader className="pb-2">
      <CardTitle className="flex items-center gap-2 text-white text-lg font-semibold">
        <LineChart className="h-5 w-5 text-emerald-500" />
        Response Time Trends
      </CardTitle>
    </CardHeader>
    <CardContent className="h-[350px] p-4 pt-0">
      {/* Conditional rendering with fallback text */}
      {uptimes.length > 0 ? (
        <ApiStatusChart data={uptimes} />
      ) : (
        <div className="text-sm text-zinc-400 italic mt-10 text-center">
          No uptime data available.
        </div>
      )}
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
        )}
      </div>
    </div>
  )
}
