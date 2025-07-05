
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { signIn, signOut, useSession } from "next-auth/react";

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

export default function Pricing (){
    const { data: session } = useSession();

return(
<>

 {/* Pricing Section */}
      <section className="container py-20 border-t border-zinc-800">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">Choose the plan that's right for your business</p>
        </div>

        <div className="grid gap-16 md:grid-cols-2 w-2/3 m-auto ">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <div className="text-3xl font-bold mb-4">
                $0<span className="text-lg text-zinc-400">/month</span>
              </div>
              <p className="text-zinc-400 mb-6">Perfect for personal projects and small applications</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <span>5 monitors</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <span>5-minute check intervals</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <span>Email alerts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <span>24-hour data retention</span>
                </li>
              </ul>
              <Button className="w-full bg-zinc-800 hover:bg-zinc-700">Get Started</Button>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-emerald-600 relative">
            <div className="absolute top-0 right-0 bg-emerald-600 text-xs font-bold px-3 py-1 rounded-bl-lg">
              POPULAR
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Developer</h3>
              <div className="text-3xl font-bold mb-4">
                $29<span className="text-lg text-zinc-400">/month</span>
              </div>
              <p className="text-zinc-400 mb-6">For growing applications and small teams</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <span>25 monitors</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <span>1-minute check intervals</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <span>Email, SMS & Slack alerts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <span>30-day data retention</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <span>API access</span>
                </li>
              </ul>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Start Free Trial</Button>
            </CardContent>
          </Card>

        </div>
      </section>
</>
)
}