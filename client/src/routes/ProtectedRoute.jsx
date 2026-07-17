import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Layers, Loader2 } from "lucide-react";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading, isInitializing } = useAuth();

  // Render a high-contrast Obsidian loading screen while verifying JWT session tokens
  if (isLoading || isInitializing) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-zinc-950 text-zinc-100 select-none">
        {/* Subtle Ambient Glow */}
        <div className="absolute h-64 w-64 rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 shadow-xl shadow-indigo-500/20 border border-white/20 animate-pulse">
            <Layers className="h-6 w-6 text-white" />
          </div>
          
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-zinc-400">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-indigo-400" />
            <span>Verifying workspace session...</span>
          </div>
        </div>
      </div>
    );
  }

  // Redirect to authentication portal if session is invalid or missing
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}