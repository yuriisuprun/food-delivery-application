import React from "react";
import { Sparkles } from "lucide-react";
import { Spinner } from "./spinner";

interface LoadingScreenProps {
  message?: string;
  submessage?: string;
}

export function LoadingScreen({ 
  message = "Loading...", 
  submessage = "Please wait while we prepare your experience" 
}: LoadingScreenProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center animate-fade-in">
      <div className="text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-3xl bg-gradient-to-br from-[color:var(--accent)]/20 to-[color:var(--accent2)]/20 flex items-center justify-center animate-bounce-subtle">
          <Sparkles className="h-8 w-8 text-[color:var(--accent)]" />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-3">
            <Spinner size="sm" />
            <h2 className="brand text-xl sm:text-2xl">{message}</h2>
          </div>
          <p className="text-sm text-[color:var(--fg1)] max-w-md">
            {submessage}
          </p>
        </div>
      </div>
    </div>
  );
}