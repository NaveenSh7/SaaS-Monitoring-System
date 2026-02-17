"use client";

import Image from "next/image"
import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";
import Features from "@/components/Features";
import { useState , useEffect} from "react";
import Loader from "@/components/Loader";
import { useSession } from "next-auth/react"
import Link from "next/link";

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
      <section id="hero" className="container py-20 md:py-32 mx-auto">
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
              <Link href="/dashboard">
                    <Button
                    size="lg"
                    className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                       >
                 Start Monitoring
            <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            </Link >

              <Link href="/documentation">
                <Button
                    size="lg"
                    variant="outline"
                    className="border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white cursor-pointer"
                       >    View Documentation</Button>
     
              </Link>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-lg blur-3xl" />
            <div className="relative rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl">
              <Image
                src="/hero.png"
                width={1000}
                height={1000}
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
<section
  className="container py-24 border-t border-zinc-800 mx-auto text-center"
  id="documentation"
>
  <div className="max-w-3xl mx-auto">
    {/* Heading */}
    <h2 className="text-4xl font-bold mb-6">
      Simple Integration
    </h2>

    {/* Subtext */}
    <p className="text-zinc-400 text-lg mb-10">
      Add our SDK to your application in minutes. 
      Start monitoring with just a few lines of code.
    </p>

    {/* Points */}
    <div className="flex flex-col items-center gap-5 mb-12 text-white">
      <div className="flex items-center gap-3">
        <CheckCircle2 className="h-6 w-6 text-emerald-500" />
        <span className="text-lg">Works with React.js and Next.js</span>
      </div>

      <div className="flex items-center gap-3">
        <CheckCircle2 className="h-6 w-6 text-emerald-500" />
        <span className="text-lg">Zero performance impact</span>
      </div>

      <div className="flex items-center gap-3">
        <CheckCircle2 className="h-6 w-6 text-emerald-500" />
        <span className="text-lg">Automatic error tracking</span>
      </div>
    </div>

    {/* CTA Button */}
    <a
      href="/documentation"
      className="inline-flex items-center justify-center px-12 py-5 text-lg font-semibold rounded-2xl
                 bg-emerald-600 hover:bg-emerald-500 
                 transition-all duration-300 
                 text-black shadow-xl hover:shadow-emerald-500/40
                 hover:-translate-y-1"
    >
      View Documentation →
    </a>
  </div>
</section>


      {/* Dashboard Preview */}
      <section className="container py-20 border-t border-zinc-800 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Powerful Dashboard</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Get a complete overview of your system's health in one place
          </p>
        </div>

        <div className="relative rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl">
          <Image
            src="/overview.png"
            width={1600}
            height={800}
            alt="Dashboard Preview"
            className="w-full h-auto"
          />
        </div>
      </section>

     <Pricing/>

      {/* CTA Section */}
      <section className="container py-20 border-t border-zinc-800 mx-auto">
        <div className="rounded-2xl bg-gradient-to-r from-emerald-900/20 to-blue-900/20 p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start monitoring?</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-8">
            Join thousands of developers who trust APIMonitor to keep their services running smoothly.
          </p>
         <Link href="/dashboard">
           <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
           Start Your Free Trial
          <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          </Link>
        </div>
      </section>

<Footer/>
    </div>
  )
}
