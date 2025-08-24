"use client";

import Link from "next/link"
import Image from "next/image"
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
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";
import Facebook from "next-auth/providers/facebook";
import Features from "@/components/Features";
import { useState , useEffect} from "react";
import Loader from "@/components/Loader";
import { useSession } from "next-auth/react"


export default function Home() {

const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Example: Set loading to true while session is loading
    if (status === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4">
     <Navbar/>

      {/* Hero Section */}
      <section className="container py-20 md:py-32">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="inline-block rounded-full bg-emerald-900/30 px-3 py-1 text-sm text-emerald-400">
              Launching Beta Access
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Monitor APIs with <span className="text-emerald-500">confidence</span>
            </h1>
            <p className="max-w-[600px] text-zinc-400 md:text-xl">
              Track API uptime, monitor frontend performance, and get alerted when things go wrong. All in one powerful
              dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                Start Monitoring
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white"
              >
                View Documentation
              </Button>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-lg blur-3xl" />
            <div className="relative rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl">
              <Image
                src="/placeholder.svg?height=600&width=800"
                width={800}
                height={600}
                alt="Dashboard Preview"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
    <Features/>

      {/* Integration Section */}
      <section className="container py-20 border-t border-zinc-800 ">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Simple Integration</h2>
            <p className="text-zinc-400 mb-6">
              Add our SDK to your application in minutes. Start monitoring with just a few lines of code.
            </p>
            <div className="space-y-4 text-white">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span>Works with any framework or language</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span>Zero performance impact</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span>Automatic error tracking</span>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-hidden">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="text-sm text-zinc-400 ml-2">app.js</span>
            </div>
            <pre className="text-sm overflow-x-auto">
              <code className="language-javascript text-zinc-100">
                {`import { monitor } from '@apimonitor/sdk';

// Initialize the monitor
monitor.init({
  apiKey: 'your-api-key',
  service: 'payment-service',
});

// Monitor API endpoints
app.get('/api/users', async (req, res) => {
  const span = monitor.startSpan('fetch-users');
  
  try {
    const users = await db.getUsers();
    res.json(users);
    span.end();
  } catch (error) {
    span.recordError(error);
    res.status(500).send('Error fetching users');
  }
});`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="container py-20 border-t border-zinc-800">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Powerful Dashboard</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Get a complete overview of your system's health in one place
          </p>
        </div>

        <div className="relative rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl">
          <Image
            src="/placeholder.svg?height=800&width=1600"
            width={1600}
            height={800}
            alt="Dashboard Preview"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              See It In Action
            </Button>
          </div>
        </div>
      </section>

     <Pricing/>

      {/* CTA Section */}
      <section className="container py-20 border-t border-zinc-800">
        <div className="rounded-2xl bg-gradient-to-r from-emerald-900/20 to-blue-900/20 p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start monitoring?</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-8">
            Join thousands of developers who trust APIMonitor to keep their services running smoothly.
          </p>
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
            Start Your Free Trial
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

<Footer/>
    </div>
  )
}
