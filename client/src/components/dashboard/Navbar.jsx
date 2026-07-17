import React from "react";
import { Bell, Search, Terminal, HelpCircle, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export default function Navbar() {
  // Dispatches global event intercepted by the CommandPalette modal
  const openCommandPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-zinc-950/80 px-6 lg:px-10 backdrop-blur-md select-none">
      {/* Left: Breadcrumb / Workspace Status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300">
          <Terminal className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
          <span className="font-mono font-medium">workspace / production</span>
        </div>
        <span className="hidden text-xs text-zinc-600 sm:inline" aria-hidden="true">|</span>
        <div className="hidden items-center gap-2 text-xs text-zinc-400 sm:flex" role="status">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium">Live Sync</span>
        </div>
      </div>

      {/* Right: Quick Actions */}
      <nav aria-label="Header quick actions" className="flex items-center gap-2.5">
        {/* Search / Command Palette Trigger */}
        <button 
          onClick={openCommandPalette}
          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-400 transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-zinc-200 hover:shadow-sm"
          title="Open command palette (⌘K)"
        >
          <Search className="h-3.5 w-3.5 shrink-0 text-indigo-400" />
          <span className="hidden sm:inline">Search projects...</span>
          <kbd className="hidden sm:inline-block rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-zinc-300 border border-white/5">
            ⌘K
          </kbd>
        </button>

        <div className="h-4 w-[1px] bg-white/10 mx-1 hidden sm:block" aria-hidden="true" />

        {/* Quick Documentation / Help */}
        <button 
          onClick={() => toast.info("DevSphere API v2.4 Documentation", { description: "Opening external portal..." })}
          className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-zinc-400 transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-zinc-200"
          title="Documentation"
        >
          <HelpCircle className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
          <span className="hidden md:inline">Docs</span>
          <ExternalLink className="h-3 w-3 opacity-60 shrink-0" />
        </button>

        {/* Notifications */}
        <button 
          onClick={() => toast.info("No new alerts", { description: "All sprint pipelines are currently running nominal." })}
          className="relative rounded-xl border border-white/10 bg-white/[0.03] p-2 text-zinc-400 transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-zinc-200"
          title="Notifications"
          aria-label="View notifications"
        >
          <Bell className="h-4 w-4 shrink-0" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 ring-2 ring-zinc-950" />
        </button>
      </nav>
    </header>
  );
}