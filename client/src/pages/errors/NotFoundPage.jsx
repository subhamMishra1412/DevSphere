import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Terminal, ArrowLeft, LayoutDashboard, AlertCircle, Sparkles } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-zinc-950 p-6 text-zinc-100 selection:bg-indigo-500/30 selection:text-indigo-200 select-none relative overflow-hidden">
      {/* Ambient Radial Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-indigo-500/[0.07] blur-[140px] pointer-events-none" />

      {/* Main Glass Error Container */}
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-zinc-950/60 p-8 sm:p-10 text-center shadow-2xl backdrop-blur-xl before:absolute before:inset-0 before:rounded-2xl before:border-t before:border-white/15 before:pointer-events-none z-10 space-y-6">
        
        {/* Top Simulated Terminal Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3.5 py-1.5 text-xs font-mono font-bold text-rose-400">
          <AlertCircle className="h-3.5 w-3.5" />
          <span>ERROR 404 // ROUTE_NOT_FOUND</span>
        </div>

        {/* Headline & Explanation */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
            Deployment Not Found
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
            The workspace route or sprint parameter you are attempting to access does not exist on the DevSphere edge servers.
          </p>
        </div>

        {/* Simulated Terminal Log Output */}
        <div className="rounded-xl border border-white/5 bg-black/60 p-3.5 text-left font-mono text-[11px] text-zinc-500 space-y-1 shadow-inner">
          <div className="flex items-center gap-2 text-zinc-400 font-bold">
            <Terminal className="h-3.5 w-3.5 text-indigo-400" />
            <span>ROUTING_DIAGNOSTICS</span>
          </div>
          <p className="truncate">&gt; TARGET_PATH: {window.location.pathname}</p>
          <p>&gt; STATUS: 404_NOT_FOUND (RESOURCE_UNAVAILABLE)</p>
          <p className="text-emerald-400">&gt; SUGGESTION: REDIRECT_TO_ACTIVE_WORKSPACE</p>
        </div>

        {/* Action Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:from-indigo-600 hover:to-purple-700 hover:shadow-indigo-500/30 active:scale-95 border border-white/10"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Return to Dashboard</span>
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-2.5 text-xs font-semibold text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Bottom System Brand */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-center gap-1.5 text-[10px] font-mono text-zinc-600">
          <Sparkles className="h-3 w-3 text-indigo-500" />
          <span>DevSphere Pro Routing Engine</span>
        </div>
      </div>
    </div>
  );
}