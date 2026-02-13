"use client";

import { useState } from "react";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function DocumentationPage() {
  const [activeTab, setActiveTab] = useState<"node" | "fastapi" | "nextjs">(
    "node"
  );

  const tabs = [
    { id: "node" as const, label: "Node/Express" },
    { id: "fastapi" as const, label: "FastAPI" },
    { id: "nextjs" as const, label: "Next.js" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Header */}
      <section className="container py-20">
        <Link href="/">
          <button className="flex items-center gap-2 text-emerald-500 hover:text-emerald-400 mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Integration Guide</h1>
        <p className="text-zinc-400 text-lg max-w-2xl">
          Learn how to integrate SaaS Monitoring SDK with your server framework
        </p>
      </section>

      {/* Tabs */}
      <section className="container py-10">
        <div className="flex gap-4 border-b border-zinc-800 mb-12 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-emerald-500 text-emerald-500"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Node/Express Content */}
        {activeTab === "node" && (
          <div className="space-y-12">
            {/* Introduction */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-emerald-500">
                Node.js & Express Integration
              </h2>
              <p className="text-zinc-400 mb-6">
                Easily integrate SaaS Monitoring SDK into your Express application. Our lightweight middleware tracks API performance, errors, and uptime in real-time.
              </p>

              <div className="space-y-4 text-white">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                  <span>Automatic request/response tracking</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                  <span>Error and exception monitoring</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                  <span>Database query monitoring</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                  <span>Zero performance overhead</span>
                </div>
              </div>
            </div>

            {/* Installation Step */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4 text-emerald-500">
                Step 1: Install the SDK
              </h3>
              <pre className="bg-zinc-950 p-4 rounded-lg overflow-x-auto">
                <code className="text-green-400">{`npm install saas-monitoring-sdk`}</code>
              </pre>
              <p className="text-zinc-400 mt-4">Or using yarn:</p>
              <pre className="bg-zinc-950 p-4 rounded-lg overflow-x-auto mt-2">
                <code className="text-green-400">{`yarn add saas-monitoring-sdk`}</code>
              </pre>
            </div>

            {/* API Key Step */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4 text-emerald-500">
                Step 2: Get Your API Key
              </h3>
              <p className="text-zinc-400 mb-4">
                Retrieve your unique API key from the SaaS Monitoring Dashboard:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-zinc-400">
                <li>Log in to your SaaS Monitoring account</li>
                <li>Navigate to Settings → API Keys</li>
                <li>Copy your API key</li>
              </ol>
            </div>

            {/* Integration Step */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4 text-emerald-500">
                Step 3: Initialize in Your Application
              </h3>
              <p className="text-zinc-400 mb-4">
                Add this code at the entry point of your Express application (usually app.js or server.js):
              </p>
              <pre className="bg-zinc-950 p-4 rounded-lg overflow-x-auto">
                <code className="text-green-400">
{`const express = require('express');
const Logger = require('saas-monitoring-sdk');

const app = express();

// Initialize the SDK
Logger.init({
  api_key: 'your_api_key_here',
  service_name: 'my-express-app',
});

// Add the middleware
app.use(Logger.middleware());

// Your routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`}
                </code>
              </pre>
            </div>

            {/* Configuration Step */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4 text-emerald-500">
                Step 4: Configuration Options
              </h3>
              <pre className="bg-zinc-950 p-4 rounded-lg overflow-x-auto">
                <code className="text-green-400">
{`Logger.init({
  api_key: 'your_api_key',           // Required
  service_name: 'my-app',             // Required
  environment: 'production',          // Optional: dev, staging, production
  enabled: true,                      // Optional: enable/disable monitoring
  sample_rate: 1,                     // Optional: 0-1, sample % of requests
  capture_request_body: false,        // Optional: capture request body
  capture_response_body: false,       // Optional: capture response body
});`}
                </code>
              </pre>
            </div>
          </div>
        )}

        {/* FastAPI Content */}
        {activeTab === "fastapi" && (
          <div className="space-y-12">
            {/* Introduction */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-emerald-500">
                FastAPI Integration
              </h2>
              <p className="text-zinc-400 mb-6">
                Monitor your FastAPI applications with ease. Our SDK integrates seamlessly with FastAPI's middleware system for real-time monitoring and analytics.
              </p>

              <div className="space-y-4 text-white">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                  <span>Async-first monitoring</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                  <span>WebSocket support</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                  <span>Background task tracking</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                  <span>Dependency injection support</span>
                </div>
              </div>
            </div>

            {/* Installation Step */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4 text-emerald-500">
                Step 1: Install the SDK
              </h3>
              <pre className="bg-zinc-950 p-4 rounded-lg overflow-x-auto">
                <code className="text-green-400">{`pip install saas-monitoring-sdk`}</code>
              </pre>
              <p className="text-zinc-400 mt-4">Or using poetry:</p>
              <pre className="bg-zinc-950 p-4 rounded-lg overflow-x-auto mt-2">
                <code className="text-green-400">{`poetry add saas-monitoring-sdk`}</code>
              </pre>
            </div>

            {/* API Key Step */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4 text-emerald-500">
                Step 2: Get Your API Key
              </h3>
              <p className="text-zinc-400 mb-4">
                Retrieve your unique API key from the SaaS Monitoring Dashboard:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-zinc-400">
                <li>Log in to your SaaS Monitoring account</li>
                <li>Navigate to Settings → API Keys</li>
                <li>Copy your API key</li>
              </ol>
            </div>

            {/* Integration Step */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4 text-emerald-500">
                Step 3: Initialize in Your Application
              </h3>
              <p className="text-zinc-400 mb-4">
                Add this code to your FastAPI application main file:
              </p>
              <pre className="bg-zinc-950 p-4 rounded-lg overflow-x-auto">
                <code className="text-green-400">
{`from fastapi import FastAPI
from saas_monitoring_sdk import SaasMonitoringSDK

app = FastAPI()

# Initialize the SDK
sdk = SaasMonitoringSDK(
    api_key='your_api_key_here',
    service_name='my-fastapi-app',
)

# Add middleware
app.add_middleware(sdk.middleware)

@app.get('/')
async def read_root():
    return {'message': 'Hello World'}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)`}
                </code>
              </pre>
            </div>

            {/* Configuration Step */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4 text-emerald-500">
                Step 4: Configuration Options
              </h3>
              <pre className="bg-zinc-950 p-4 rounded-lg overflow-x-auto">
                <code className="text-green-400">
{`sdk = SaasMonitoringSDK(
    api_key='your_api_key',           # Required
    service_name='my-app',             # Required
    environment='production',          # Optional: dev, staging, production
    enabled=True,                      # Optional: enable/disable monitoring
    sample_rate=1,                     # Optional: 0-1, sample % of requests
    capture_request_body=False,        # Optional: capture request body
    capture_response_body=False,       # Optional: capture response body
)`}
                </code>
              </pre>
            </div>
          </div>
        )}

        {/* Next.js Content */}
        {activeTab === "nextjs" && (
          <div className="space-y-12">
            {/* Introduction */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-emerald-500">
                Next.js Integration
              </h2>
              <p className="text-zinc-400 mb-6">
                Monitor your Next.js applications including API routes and server components. Get insights into both frontend and backend performance.
              </p>

              <div className="space-y-4 text-white">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                  <span>API routes monitoring</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                  <span>Server components tracking</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                  <span>Frontend error monitoring</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                  <span>Built-in Next.js middleware support</span>
                </div>
              </div>
            </div>

            {/* Installation Step */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4 text-emerald-500">
                Step 1: Install the SDK
              </h3>
              <pre className="bg-zinc-950 p-4 rounded-lg overflow-x-auto">
                <code className="text-green-400">{`npm install saas-monitoring-sdk`}</code>
              </pre>
              <p className="text-zinc-400 mt-4">Or using yarn:</p>
              <pre className="bg-zinc-950 p-4 rounded-lg overflow-x-auto mt-2">
                <code className="text-green-400">{`yarn add saas-monitoring-sdk`}</code>
              </pre>
            </div>

            {/* API Key Step */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4 text-emerald-500">
                Step 2: Get Your API Key
              </h3>
              <p className="text-zinc-400 mb-4">
                Retrieve your unique API key from the SaaS Monitoring Dashboard:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-zinc-400">
                <li>Log in to your SaaS Monitoring account</li>
                <li>Navigate to Settings → API Keys</li>
                <li>Copy your API key</li>
              </ol>
            </div>

            {/* Middleware Integration Step */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4 text-emerald-500">
                Step 3: Create Middleware
              </h3>
              <p className="text-zinc-400 mb-4">
                Create a middleware file at the root of your Next.js project:
              </p>
              <pre className="bg-zinc-950 p-4 rounded-lg overflow-x-auto">
                <code className="text-green-400">
{`// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { initSaasMonitoring } from 'saas-monitoring-sdk';

export function middleware(request: NextRequest) {
  // Initialize SDK
  initSaasMonitoring({
    api_key: process.env.SAAS_MONITORING_API_KEY,
    service_name: 'my-nextjs-app',
  });

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};`}
                </code>
              </pre>
            </div>

            {/* API Routes Integration */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4 text-emerald-500">
                Step 4: Monitor API Routes
              </h3>
              <p className="text-zinc-400 mb-4">
                Your API routes will be automatically monitored. Optionally add manual tracking:
              </p>
              <pre className="bg-zinc-950 p-4 rounded-lg overflow-x-auto">
                <code className="text-green-400">
{`// app/api/hello/route.ts
import { trackEvent } from 'saas-monitoring-sdk';

export async function GET(request: Request) {
  trackEvent('api_call', { endpoint: '/api/hello' });

  return Response.json({ message: 'Hello World' });
}

export async function POST(request: Request) {
  const data = await request.json();

  trackEvent('api_post', { 
    endpoint: '/api/hello',
    data_size: JSON.stringify(data).length 
  });

  return Response.json({ success: true });
}`}
                </code>
              </pre>
            </div>

            {/* Environment Variables */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4 text-emerald-500">
                Step 5: Add Environment Variables
              </h3>
              <p className="text-zinc-400 mb-4">
                Add your API key to your .env.local file:
              </p>
              <pre className="bg-zinc-950 p-4 rounded-lg overflow-x-auto">
                <code className="text-green-400">
{`SAAS_MONITORING_API_KEY=your_api_key_here`}
                </code>
              </pre>
            </div>
          </div>
        )}
      </section>

      {/* Support Section */}
      <section className="container py-20 border-t border-zinc-800">
        <div className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 rounded-lg p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-zinc-400 mb-6">
            Check our full documentation or contact our support team
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Back to Home
              </Button>
            </Link>
            <Button variant="outline" className="border-zinc-800 text-zinc-400 hover:bg-zinc-900">
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
