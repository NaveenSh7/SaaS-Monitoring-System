"use client";

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { signIn, signOut, useSession } from "next-auth/react";
import {
  CheckCircle2,
  ShieldCheck,
} from "lucide-react"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Add Razorpay type declaration to window
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Payment  (){
 const [amount, setAmount] = useState(499);
 const [paymentSuccess, setPaymentSuccess] = useState(false);
 const [isProUser, setIsProUser] = useState(false);
 const [checkingPlan, setCheckingPlan] = useState(true);
 const { data: session } = useSession();
 const router = useRouter();

  // Check if user is already on the pro plan
  useEffect(() => {
    const checkUserPlan = async () => {
      if (!session?.user?.email) {
        setCheckingPlan(false);
        return;
      }
      try {
        const res = await axios.get(`${BACKEND_URL}/api/users`, {
          params: { email: session.user.email },
        });
        if (res.data?.plan === "pro") {
          setIsProUser(true);
        }
      } catch (err) {
        console.error("Error checking user plan:", err);
      } finally {
        setCheckingPlan(false);
      }
    };
    checkUserPlan();
  }, [session?.user?.email]);

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

    const orderData = await axios.post(
  `${BACKEND_URL}/api/payment/order`,
  { amount }
);

    const options = {
      key: process.env.NEXT_PUBLIC_Razpy_Key_Id, // Your Razorpay Test Key ID
      amount: orderData.data.amount,
      currency: "INR",
      name: "Saas-Monierting System",
      description: "Test Transaction",
      order_id: orderData.data.id,
      handler: async function  (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string; }) {

            // Call backend to store payment in DB
    try {
     const resp = await axios.post(`${BACKEND_URL}/api/payment/verify`, {
        payment_id: response.razorpay_payment_id,
        order_id: response.razorpay_order_id,
        signature: response.razorpay_signature,
        amount: orderData.data.amount,
        user_email: session?.user?.email, 
      });
      if (resp.data?.success) {
        // Show success state and redirect after a short delay
        setPaymentSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        alert(resp.data?.message || "Payment verification failed. Please contact support.");
      }
    } catch (error) {
      console.error("Error storing payment:", error);
      alert("Payment verification failed. Please try again or contact support.");
    }
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
  
   if (!session?.user?.email) 
  {
    return(
    <>
    <div> Please login</div>
    </>)
  }

  if (checkingPlan) {
    return (
      <div className="flex justify-center items-center bg-black h-screen w-screen">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );
  }

  // User is already on the pro plan
  if (isProUser) {
    return (
      <div className="flex justify-center items-center bg-black h-screen w-screen">
        <Card className="bg-zinc-900 border-emerald-600 w-1/2">
          <CardContent className="p-10 text-white flex flex-col items-center text-center gap-4">
            <ShieldCheck className="h-16 w-16 text-emerald-500" />
            <h2 className="text-2xl font-bold">You already have an active Subscription</h2>
            <p className="text-zinc-400">
              You&apos;re on the <span className="text-emerald-400 font-semibold">Developer (Pro)</span> plan. Enjoy all premium features!
            </p>
            <Button
              onClick={() => router.push("/")}
              className="mt-4 bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
            >
              Go to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Payment was just completed successfully
  if (paymentSuccess) {
    return (
      <div className="flex justify-center items-center bg-black h-screen w-screen">
        <Card className="bg-zinc-900 border-emerald-600 w-1/2">
          <CardContent className="p-10 text-white flex flex-col items-center text-center gap-4">
            <CheckCircle2 className="h-16 w-16 text-emerald-500" />
            <h2 className="text-2xl font-bold">Your Payment is Successful!</h2>
            <p className="text-zinc-400">
              You have been upgraded to the <span className="text-emerald-400 font-semibold">Developer (Pro)</span> plan.
            </p>
            <p className="text-zinc-500 text-sm">Redirecting to homepage...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

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