'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import Navbar from '@/components/Navbar'
type Service = 'node-express' | 'fastapi'

const services = {
  'node-express': {
    name: 'Node.js & Express',
    icon: '',
    steps: [
      {
        title: 'Step 1: Install the SDK',
        description: '',
        code: 'npm i saas-monitoring-sdk',
      },
      {
        title: 'Step 2: Get your API key',
        description: 'Retrieve the api_key for your corresponding service from your SaaS Monitoring Dashboard.',
        code: '',
      },
      {
        title: 'Step 3: Add this code to your entry server\'s point',
        description: 'Initialize the logger with your API key',
        code: `// SaaS Monitoring for Node
app.set('trust proxy', true);
const Logger = require('saas-monitering-sdk');

Logger.init({
  api_key: 'your_api_key',
});

app.use(Logger.middleware());`,
      },
    ],
  },
  'fastapi': {
    name: 'FastAPI',
    icon: '',
    steps: [
      {
        title: 'Coming Soon',
        description: 'FastAPI integration is currently under development. We\'ll have support ready for you very soon!',
        code: '',
      },
    ],
  },
}

export default function DocsPage() {
  const [selectedService, setSelectedService] = useState<Service>('node-express')
  const [copiedCode, setCopiedCode] = useState<number | null>(null)

  const copyToClipboard = (code: string, stepIndex: number) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(stepIndex)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const currentService = services[selectedService]

  return (
    <div className="min-h-screen bg-black">
      {/* Main Content */}
        <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Documentation</h1>
          <p className="text-emerald-200/60">Get started with SaaS Monitoring by integrating our SDK into your application.</p>
        </div>

        {/* Service Selector */}
        <div className="mb-12 flex gap-4 flex-wrap">
          {(Object.entries(services) as [Service, typeof services[Service]][]).map(([key, service]) => (
            <button
              key={key}
              onClick={() => setSelectedService(key)}
              className={`px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 ${
                selectedService === key
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-950/20 border border-emerald-600/30 text-emerald-400 hover:border-emerald-600/50'
              }`}
            >
              <span>{service.icon}</span>
              {service.name}
            </button>
          ))}
        </div>

        {/* Content */}
        {selectedService === 'node-express' && (
          <div className="space-y-8">
            {currentService.steps.map((step, index) => (
              <div key={index} className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-8 backdrop-blur">
                <h2 className="text-2xl font-bold text-emerald-600 mb-2">{step.title}</h2>
                <p className="text-white mb-6">{step.description}</p>

                {step.code && (
                  <div className="relative">
                    <div className="bg-black border border-emerald-600/20 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                     <code className="text-white whitespace-pre-wrap">
  {step.code}
</code>

                    </div>
                    <button
  onClick={() => copyToClipboard(step.code, index)}
  className="absolute top-1 right-1 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-600/30 text-white px-3 py-1.5 rounded-md transition flex items-center gap-2 backdrop-blur-sm"
>

                      {copiedCode === index ? (
                        <>
                          <Check className="w-3 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {selectedService === 'fastapi' && (
          <div className="bg-emerald-950/20 border border-emerald-600/30 rounded-xl p-12 backdrop-blur text-center">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-3xl font-bold text-white mb-4">Coming Soon</h2>
            <p className="text-white text-lg max-w-2xl mx-auto">
              We're working hard to bring FastAPI support to SaaS Monitoring. Check back soon for updates! In the meantime, explore our Node.js & Express integration.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
