"use client";

import { X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LimitPopupProps {
  open: boolean;
  message: string;
  onClose: () => void;
  onUpgrade?: () => void;
}

export default function LimitPopup({
  open,
  message,
  onClose,
  onUpgrade,
}: LimitPopupProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-zinc-900 border border-emerald-600 shadow-xl p-6 text-white">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-zinc-400 hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="flex items-center justify-center mb-4">
          <AlertTriangle className="h-12 w-12 text-emerald-500" />
        </div>
        <h2 className="text-xl font-bold text-center mb-3">
          Service Limit Reached
        </h2>
        <p className="text-sm text-zinc-400 text-center mb-6">
          {message}
        </p>

        <div className="flex flex-col gap-3">
          <Button
            onClick={onUpgrade}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            Upgrade Plan
          </Button>

          <Button
            variant="outline"
            onClick={onClose}
            className="w-full border-zinc-700 text-black hover:bg-zinc-800 hover:text-white"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
