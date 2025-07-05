"use client";

import React from "react";
import { useState } from "react";
import axios from "axios";
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

// Add Razorpay type declaration to window
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Payment  (){
 const [amount, setAmount] = useState(499);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePay = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const orderData = await axios.post("http://localhost:5000/api/payment/order", {
      amount,
    });

    const options = {
      key: process.env.NEXT_PUBLIC_Razpy_Key_Id, // Your Razorpay Test Key ID
      amount: orderData.data.amount,
      currency: "INR",
      name: "Saas-Monierting System",
      description: "Test Transaction",
      order_id: orderData.data.id,
      handler: function (response: { razorpay_payment_id: string; }) {
        alert("Payment Successful! ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9876543210",
      },
      theme: {
        color: "#0d9488",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
    return(
    <>
    <div className="flex justify-center items-center bg-black h-screen w-screen">
         <Card className="bg-zinc-900 border-emerald-600  w-1/2  ">
            <div className="absolute top-0 right-0 bg-emerald-600 text-xs font-bold px-3 py-1 rounded-bl-lg">
              POPULAR
            </div>
            <CardContent className="p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Developer</h3>
              <div className="text-3xl font-bold mb-4">
                499 Rs<span className="text-lg text-zinc-400">/month</span>
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
              <Button 
                    onClick={handlePay}
              className="w-full bg-emerald-600 hover:bg-emerald-700 cursor-pointer">Pay Now</Button>
            </CardContent>
          </Card>
    </div>
    
    </>
    )
}