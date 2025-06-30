"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, AlertCircle, CheckCircle2, Clock, Edit, LineChart, Server, Settings, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { uptime } from "process";


//trefg
interface InfoProps {
  StatusData: string;
  HoursData: HoursData1[];
}

type HoursData1 = {
  status : string;
  total_hours : number | string;
}



export default function InfoChart  ( { StatusData, HoursData }: InfoProps ){

  console.log(StatusData)
  console.log(HoursData)
   
    return(

        <div>
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

        </div>
    );


}