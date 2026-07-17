import React from "react";
import {
  FolderKanban,
  ShieldCheck,
  Users,
  GitBranch,
  Zap,
  Layers,
} from "lucide-react";

function BrandPanel() {
  return (
    <aside className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-zinc-950 p-12 lg:flex border-r border-white/10 select-none">
      {/* Ambient Radial Lighting */}
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

      {/* Logo / Header */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20 border border-white/10">
          <Layers className="h-5 w-5 text-white" />
        </div>
        <div>
          <span className="text-xl font-bold tracking-tight text-white font-mono block leading-none">
            DevSphere
          </span>
          <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-medium">
            Enterprise Workspace
          </span>
        </div>
      </div>

      {/* Hero Messaging & Floating UI Widget */}
      <div className="relative z-10 my-auto w-full max-w-md space-y-6 py-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300 backdrop-blur-md shadow-inner">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          v2.4 Enterprise Release
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-white leading-[1.15]">
          Manage engineering projects at{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            lightspeed.
          </span>
        </h1>

        <p className="text-sm text-zinc-400 leading-relaxed">
          Purpose-built for modern development teams. Experience real-time
          collaboration, automated workflows, and deep sprint tracking.
        </p>

        {/* Floating Product Mockup / Glass Card */}
        <div className="pt-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl shadow-2xl relative before:absolute before:inset-0 before:rounded-2xl before:border-t before:border-white/15 before:pointer-events-none">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center gap-2.5">
                <GitBranch className="h-4 w-4 text-indigo-400" />
                <span className="text-xs font-mono font-medium text-zinc-300">
                  feat/auth-pipeline
                </span>
              </div>
              <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                Passing
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-amber-400" />
                <span>Build completed in 1.2s</span>
              </div>
              <span className="text-zinc-500 font-mono">Just now</span>
            </div>
          </div>
        </div>

        {/* Mini Feature Highlights */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="rounded-lg bg-white/5 p-2 text-indigo-400 border border-white/5">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-zinc-200">JWT Secured</h4>
              <p className="text-[11px] text-zinc-500">End-to-end encryption</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="rounded-lg bg-white/5 p-2 text-purple-400 border border-white/5">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-zinc-200">Real-time</h4>
              <p className="text-[11px] text-zinc-500">Instant collaboration</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Social Proof */}
      <div className="relative z-10 flex items-center justify-between text-xs text-zinc-500 border-t border-white/10 pt-6">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>All systems operational</span>
        </div>
        <p>© 2026 DevSphere Inc.</p>
      </div>
    </aside>
  );
}

export default BrandPanel;