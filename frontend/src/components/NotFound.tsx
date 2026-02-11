"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="text-center">
        <h1 className="text-7xl sm:text-8xl font-bold text-emerald-500">404</h1>
        <h2 className="mt-6 text-3xl sm:text-4xl font-semibold text-white">
          Page Not Found
        </h2>
        <p className="mt-4 text-lg text-gray-400 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-black hover:bg-emerald-400 transition duration-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Go to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
