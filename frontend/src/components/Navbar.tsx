
import { Button } from "@/components/ui/button"
import { signIn, signOut, useSession} from "next-auth/react";
import { useState } from "react";
import Link from "next/link"
import Loader from "@/components/Loader"
 

import {
  Activity,
} from "lucide-react"

export default function Navbar (){
    const { data: session } = useSession();
 const [loading, setLoading] = useState(false)

  if(loading)
    {
      return(
       <div >
        <Loader/>
        </div> )
    }
return(
<>
 {/* Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-emerald-500" />
            <Link href="/" className="text-xl font-bold">Saas-Monitor</Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-zinc-400 hover:text-white">
              Features
            </Link>
            <Link href="/" className="text-sm font-medium text-zinc-400 hover:text-white">
              Pricing
            </Link>
            <Link href="/" className="text-sm font-medium text-zinc-400 hover:text-white">
              Documentation
            </Link>

          </nav>
           

          {session ?  (<>
             <div className="flex items-center gap-x-4">
    <Link
      href="/dashboard"
      className="text-sm font-medium px-2 py-1 hover:text-white cursor bg-emerald-600 hover:bg-emerald-700 border-0 rounded-sm"
    >
      Dashboard
    </Link>
    <Button
      onClick={ async () => {
       setLoading(true);
        await signOut();
        setLoading(false);
      }}
      className="hidden sm:block text-sm font-medium text-zinc-400 hover:text-white cursor-pointer "
    >
      Logout
    </Button>
  </div> </>) : (  <div className="flex items-center gap-4">
            <Button 
                onClick={ async ()=>{ 
                  setLoading(true);
                await  signIn("google") 
                setLoading(false);
              } }
                className="hidden sm:block text-sm font-medium text-zinc-400 hover:text-white cursor-pointer">
              Login
            </Button>
            <Button 
               onClick={ async ()=>{ 
                  setLoading(true);
                await  signIn("google") 
                setLoading(false);
              } }
            className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer">Sign Up Free</Button>
          </div>) }
        
        </div>
      </header>
</>
)
}