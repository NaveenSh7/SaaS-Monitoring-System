"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { Mail, Server, ShieldCheck, Sparkles, User as UserIcon } from "lucide-react";

import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface ApiData {
  id: string;
  name: string;
  url: string;
  api_type: string;
  plan: string;
  status?: string;
  api_key: string;
}

interface UserData {
  id: number;
  name: string;
  email: string;
  plan: string;
}

export default function Profile() {
  const { data: session, status } = useSession();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [apis, setApis] = useState<ApiData[]>([]);
  const [loading, setLoading] = useState(true);

  // Accessible only to authenticated users -- same guard used on /dashboard.
  useEffect(() => {
    if (status === "unauthenticated") {
      void signIn("google", { callbackUrl: "/profile" });
    }
  }, [status]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!BACKEND_URL) {
        console.error("NEXT_PUBLIC_BACKEND_URL is not set");
        setLoading(false);
        return;
      }
      if (!session?.user?.email) return;

      try {
        const userRes = await fetch(
          `${BACKEND_URL}/api/users?email=${session.user.email}`
        );
        if (!userRes.ok) throw new Error("Failed to fetch user");
        const user = await userRes.json();
        setUserData(user);

        if (user?.id) {
          const apisRes = await fetch(
            `${BACKEND_URL}/api/apis?user_id=${user.id}`
          );
          if (apisRes.ok) {
            const apisData = await apisRes.json();
            setApis(apisData);
          }
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [session?.user?.email]);

  if (status === "loading" || status === "unauthenticated" || loading) {
    return <Loader />;
  }

  const isPro = userData?.plan === "pro";

  return (
    <div className="min-h-screen bg-black text-white px-4">
      <Navbar />

      <div className="mx-auto w-full max-w-screen-lg py-6 md:py-10 space-y-6">
        {/* Profile header: image on left, greeting + email on right */}
        <Card className="bg-zinc-900 border border-zinc-800 shadow-md rounded-2xl">
          <CardContent className="p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {session?.user?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={session.user.image}
                alt={session.user.name || "Profile picture"}
                className="h-20 w-20 rounded-full border-2 border-emerald-600 object-cover"
              />
            ) : (
              <div className="h-20 w-20 rounded-full border-2 border-emerald-600 bg-zinc-800 flex items-center justify-center">
                <UserIcon className="h-10 w-10 text-emerald-500" />
              </div>
            )}

            <div className="text-center sm:text-left">
              <h1 className="text-2xl md:text-3xl font-bold">
                Hello, {session?.user?.name || "User"}
              </h1>
              <p className="flex items-center justify-center sm:justify-start gap-2 text-zinc-400 mt-2">
                <Mail className="h-4 w-4 text-emerald-500" />
                {session?.user?.email}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Subscription plan */}
        <Card className="bg-zinc-900 border border-zinc-800 shadow-md rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-white text-lg font-semibold">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              Subscription
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-zinc-400 text-sm">Current plan:</span>
              {isPro ? (
                <Badge className="bg-emerald-900/30 text-emerald-400 border-emerald-600">
                  Pro
                </Badge>
              ) : (
                <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700">
                  Free
                </Badge>
              )}
            </div>
            {!isPro && (
              <Link href="/payment">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Upgrade to Pro
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>

        {/* Registered services */}
        <Card className="bg-zinc-900 border border-zinc-800 shadow-md rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-white text-lg font-semibold">
              <Server className="h-5 w-5 text-emerald-500" />
              Your Services ({apis.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {apis.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-zinc-400 mb-4">
                  You haven&apos;t registered any services yet.
                </p>
                <Link href="/add-api">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Add Your First API
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {apis.map((api) => (
                  <div
                    key={api.id}
                    className="rounded-lg border border-zinc-800 bg-zinc-800/50 p-4"
                  >
                    <div className="flex items-center justify-between mb-1 gap-2">
                      <h3 className="font-semibold text-sm md:text-base break-words">
                        {api.name}
                      </h3>
                      <Badge
                        className={
                          api.plan === "pro"
                            ? "bg-emerald-900/30 text-emerald-400 border-emerald-600 shrink-0"
                            : "bg-zinc-800 text-zinc-300 border-zinc-700 shrink-0"
                        }
                      >
                        {api.plan === "pro" ? "Pro" : "Free"}
                      </Badge>
                    </div>
                    <p className="text-zinc-400 text-xs md:text-sm break-words">
                      {api.url}
                    </p>
                    <p className="text-zinc-500 text-xs mt-1 uppercase tracking-wide">
                      {api.api_type}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}