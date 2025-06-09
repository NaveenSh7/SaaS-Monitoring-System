import Link from "next/link"

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

export default function Footer (){
return(
<>
      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Activity className="h-6 w-6 text-emerald-500" />
                <span className="text-xl font-bold">APIMonitor</span>
              </div>
              <p className="text-zinc-400 text-sm">Comprehensive API and service monitoring for modern applications.</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white text-sm">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white text-sm">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white text-sm">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white text-sm">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white text-sm">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white text-sm">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white text-sm">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white text-sm">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white text-sm">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white text-sm">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white text-sm">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-zinc-400 text-sm">© {new Date().getFullYear()} APIMonitor. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="text-zinc-400 hover:text-white">
                <Shield className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white">
                <Code className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white">
                <Activity className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
</>
)
}