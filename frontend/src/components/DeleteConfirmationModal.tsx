"use client";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DeleteConfirmationModalProps {
  open: boolean;
  serviceName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmationModal({
  open,
  serviceName,
  onCancel,
  onConfirm,
}: DeleteConfirmationModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-900/30">
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-white">Delete Service</h3>
        </div>

        <p className="text-sm text-zinc-400 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-medium text-white">{serviceName}</span>? This
          will permanently remove all of its monitoring data. This action
          cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
