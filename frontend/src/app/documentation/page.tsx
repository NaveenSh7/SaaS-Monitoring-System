'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { SiNodedotjs, SiFastapi,SiSpringboot,SiDjango,SiFlask } from 'react-icons/si'
import Navbar from '@/components/Navbar'

type Service = 'node-express' | 'springboot' | 'django' | 'fastapi' | 'flask'

const services = {
  'node-express': {
    name: 'Node.js & Express',
    icon: (
      <span className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
        <SiNodedotjs className="text-emerald-400 text-lg" />
      </span>
    ),
    status: 'ready',
    steps: [
      {
        title: 'Step 1: Install the SDK',
        description: '',
        code: 'npm i saas-monitoring-sdk',
      },
      {
        title: 'Step 2: Get your API key',
        description:
          'Retrieve the api_key for your corresponding service from your SaaS Monitoring Dashboard.',
        code: '',
      },
      {
        title: "Step 3: Add this code to your entry server's point",
        description: 'Initialize the logger with your API key',
        code: `// SaaS Monitoring for Node
app.set('trust proxy', true);
const Logger = require('saas-monitoring-sdk');

Logger.init({
  api_key: 'your_api_key',
});

app.use(Logger.middleware());`,
      },
    ],
  },
  springboot: {
    name: 'Spring Boot',
    icon: (
      <span className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
        <SiSpringboot className="text-emerald-400 text-lg" />
      </span>
    ),
    status: 'coming-soon',
    comingSoonTitle: 'Spring Boot Support Coming Soon',
    comingSoonDescription:
      "We're actively building Spring Boot integration. It will be available very soon with full middleware and performance tracking support.",
    steps: [],
  },

  django: {
    name: 'Django',
    icon: (
      <span className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
        <SiDjango className="text-emerald-400 text-lg" />
      </span>
    ),
    status: 'coming-soon',
    comingSoonTitle: 'Django Support Coming Soon',
    comingSoonDescription:
      "We're actively building Django integration. It will be available very soon with full middleware and performance tracking support.",
    steps: [],
  },

  fastapi: {
    name: 'FastAPI',
    icon: (
      <span className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
        <SiFastapi className="text-emerald-400 text-lg" />
      </span>
    ),
    status: 'coming-soon',
    comingSoonTitle: 'FastAPI Support Coming Soon',
    comingSoonDescription:
      "We're actively building FastAPI integration. It will be available very soon with full middleware and performance tracking support.",
    steps: [],
  },

  flask: {
    name: 'Flask',
    icon: (
      <span className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
        <SiFlask className="text-emerald-400 text-lg" />
      </span>
    ),
    status: 'coming-soon',
    comingSoonTitle: 'Flask Support Coming Soon',
    comingSoonDescription:
      "We're actively building Flask integration. It will be available very soon with full middleware and performance tracking support.",
    steps: [],
  },
}



export default function DocsPage() {
  const [selectedService, setSelectedService] =
    useState<Service>('node-express')
  const [copiedCode, setCopiedCode] = useState<number | null>(null)

  const copyToClipboard = (code: string, stepIndex: number) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(stepIndex)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const currentService = services[selectedService]

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-20">
        {/* Page Title */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
            Documentation
          </h1>
          <p className="text-zinc-400 text-lg">
            Get started by integrating our SDK into your application.
          </p>
        </div>

        {/* Service Selector */}
        <div className="mb-14 flex gap-4 flex-wrap">
          {(Object.entries(services) as [
            Service,
            typeof services[Service]
          ][]).map(([key, service]) => (
            <button
              key={key}
              onClick={() => setSelectedService(key)}
              className={`px-6 py-3 rounded-xl font-semibold transition flex items-center gap-3 border ${
                selectedService === key
                  ? 'bg-emerald-700 text-white border-emerald-600 shadow-lg shadow-emerald-600/20'
                  : 'bg-zinc-900/40 border-emerald-600/20 text-emerald-400 hover:border-emerald-600/50'
              }`}
            >
              {service.icon}
              {service.name}
            </button>
          ))}
        </div>

      {/* Content */}
{currentService.status === 'ready' ? (
  <div className="space-y-10">
    {currentService.steps.map((step, index) => (
      <div
        key={index}
        className="bg-zinc-900/60 border border-emerald-500/20 rounded-2xl p-8 backdrop-blur-md shadow-lg"
      >
        <h2 className="text-2xl font-bold text-emerald-500 mb-3">
          {step.title}
        </h2>

        {step.description && (
          <p className="text-zinc-300 mb-6">{step.description}</p>
        )}

        {step.code && (
          <div className="relative">
            <div className="bg-zinc-950 border border-emerald-600/20 rounded-xl pt-12 px-4 pb-4 font-mono text-sm overflow-x-auto whitespace-pre">
              <code className="text-white">{step.code}</code>
            </div>

            <button
              onClick={() => copyToClipboard(step.code, index)}
              className="absolute top-3 right-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-3 py-1.5 rounded-md transition flex items-center gap-2 text-xs"
            >
              {copiedCode === index ? (
                <>
                  <Check className="w-3 h-3" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </button>
          </div>
        )}
      </div>
    ))}
  </div>
) : (
  <div className="bg-zinc-900/60 border border-emerald-500/20 rounded-2xl p-16 backdrop-blur-md shadow-lg text-center">
    <div className="text-6xl mb-6">🚀</div>
    <h2 className="text-3xl font-bold text-white mb-4">
      {('comingSoonTitle' in currentService) && currentService.comingSoonTitle}
    </h2>
    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
      {('comingSoonDescription' in currentService) && currentService.comingSoonDescription}
    </p>
  </div>
)}

      </main>
    </div>
  )
}
