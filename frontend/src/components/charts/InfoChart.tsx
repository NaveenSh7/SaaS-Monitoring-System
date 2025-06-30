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
  LatencyData : string | number;
  TrafficData : string | number;
}

type HoursData1 = {
  status : string;
  total_hours : number | string;
}



export default function InfoChart  ( { StatusData, HoursData,LatencyData ,TrafficData}: InfoProps ){

  console.log(StatusData)
  console.log(HoursData)
  console.log(LatencyData)
  
 if (HoursData.length < 2) {
  HoursData = [
    { status: "up", total_hours: 'loading' },
    { status: "down", total_hours: 'loading' }
  ];
}
  

    return(

        <div>
   {/* Key Metrics Row */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Uptime Hours</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-emerald-500">
            
                    {HoursData[0].status ==='up' ? HoursData[0].total_hours : HoursData[1].total_hours}
                    </div>
                  <p className="text-xs text-zinc-400">since registerd on our system.</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Latency</CardTitle>
                  <Clock className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-500">{LatencyData}ms</div>
                   <p className="text-xs text-zinc-400">Avg Response Time</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Total Requests</CardTitle>
                  <TrendingUp className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-500">{TrafficData}</div>
                  <p className="text-xs text-zinc-400">since registerd on our system.</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Downtime Hours</CardTitle>
                  <AlertCircle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-500">
                   {HoursData[0].status==='down' ? HoursData[0].total_hours :HoursData[1].total_hours }
                    </div>
                  <p className="text-xs text-zinc-400">since registerd on our system.</p>
                </CardContent>
              </Card>
            </div>

        </div>
    );


}