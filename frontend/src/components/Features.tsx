import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Activity,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Code,
  Database,
  LineChart,
  Loader2,
  Shield,
  Wifi
} from "lucide-react"

export default function Features (){
return(
<>
        {/* Features Section */}
      <section id="features" className="container py-20 border-t border-zinc-800">
        <div className="text-center mb-16 ">
          <h2 className="text-3xl font-bold mb-4">Comprehensive Monitoring Features</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Everything you need to ensure your APIs and services are running smoothly
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 ">

            <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="pt-6">
              <div className="mb-4 rounded-full bg-amber-900/20 p-2 w-10 h-10 flex items-center justify-center">
                <LineChart className="h-5 w-5 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Traffic Monitering</h3>
              <p className="text-zinc-400">
                Detailed metrics and visualizations. Track trends and identify patterns over time.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="pt-6">
              <div className="mb-4 rounded-full bg-emerald-900/20 p-2 w-10 h-10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Uptime Monitoring</h3>
              <p className="text-zinc-400">
                Track your API endpoints with 99.9% accuracy. Get notified immediately when services go down.
              </p>
            </CardContent>
          </Card>
            
             <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="pt-6">
              <div className="mb-4 rounded-full bg-red-900/20 p-2 w-10 h-10 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Alert System </h3>
              <p className="text-zinc-400">
                Customizable alerts via email, SMS, Slack, and more. Set thresholds and escalation policies.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="pt-6">
              <div className="mb-4 rounded-full bg-blue-900/20 p-2 w-10 h-10 flex items-center justify-center">
                <Activity className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Health Checks</h3>
              <p className="text-zinc-400">
                Detailed health checks with custom parameters. Monitor response codes, headers, and body content.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="pt-6">
              <div className="mb-4 rounded-full bg-purple-900/20 p-2 w-10 h-10 flex items-center justify-center">
                <Wifi className="h-5 w-5 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Latency Tracking</h3>
              <p className="text-zinc-400">
                Monitor response times across different regions. Identify performance bottlenecks before users do.
              </p>
            </CardContent>
          </Card>
        

          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="pt-6">
              <div className="mb-4 rounded-full bg-cyan-900/20 p-2 w-10 h-10 flex items-center justify-center">
                <Database className="h-5 w-5 text-cyan-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Geo Analytics</h3>
              <p className="text-zinc-400">
                Centralized log collection and analysis. Search and filter logs to troubleshoot issues quickly.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
</>
)
}