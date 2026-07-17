import React from "react";
import {
  LayoutDashboard,
  FolderKanban,
  PlusSquare,
  Settings,
  Layers,
  Sparkles,
  ChevronRight,
  User,
} from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();

  const links = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: FolderKanban, label: "Projects", path: "/projects" },
    { icon: PlusSquare, label: "New Project", path: "/projects/new" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <aside aria-label="Main Navigation" className="hidden md:flex w-64 flex-col justify-between border-r border-white/10 bg-zinc-950 p-4 select-none">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between px-2 pt-2">
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 shadow-md shadow-indigo-500/20 border border-white/10 transition-transform duration-200 group-hover:scale-105">
              <Layers className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-white font-mono leading-none">
                DevSphere
              </h1>
              <span className="text-[10px] uppercase tracking-wider text-indigo-400 font-bold">
                Pro Plan
              </span>
            </div>
          </Link>
        </div>

        {/* Workspace Sprint Badge */}
        <div className="mx-1 rounded-xl border border-white/10 bg-white/[0.02] p-2.5 backdrop-blur-md shadow-inner" role="region" aria-label="Active sprint status">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 font-semibold">Sprint Cycle 4</span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              <Sparkles className="h-2.5 w-2.5" /> Active
            </span>
          </div>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
          </div>
        </div>

        {/* Main Navigation Menu */}
        <nav aria-label="Main menu" className="space-y-1">
          <div className="px-2 pb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
            Menu
          </div>
          {links.map(({ icon: Icon, label, path }) => (
            <NavLink
              key={label}
              to={path}
              className={({ isActive }) =>
                `group flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500/20 via-indigo-500/10 to-purple-500/10 text-white border border-indigo-500/30 shadow-sm shadow-indigo-500/10"
                    : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200 border border-transparent"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`h-4 w-4 transition-colors ${
                        isActive ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-300"
                      }`}
                      aria-hidden="true"
                    />
                    <span>{label}</span>
                  </div>
                  {isActive && <ChevronRight className="h-3 w-3 text-indigo-400 animate-in fade-in" aria-hidden="true" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* User Profile Navigation Card */}
      <div className="mt-auto pt-4 border-t border-white/10">
        <Link
          to="/settings"
          className="group relative flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-2.5 transition-all duration-200 hover:border-white/15 hover:bg-white/[0.05] hover:shadow-md"
          title="View Profile & Settings"
        >
          <div className="flex items-center gap-3 min-w-0 pr-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 text-xs font-black text-white shadow-inner border border-white/10">
              {user?.email ? user.email.substring(0, 2).toUpperCase() : "SM"}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-xs font-bold text-zinc-200 group-hover:text-white transition-colors">
                {user?.email ? user.email.split("@")[0] : "Lead Engineer"}
              </h3>
              <p className="truncate text-[10px] text-zinc-500 font-mono group-hover:text-indigo-400 transition-colors">
                View Profile →
              </p>
            </div>
          </div>

          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-zinc-500 group-hover:text-zinc-300 transition-colors">
            <User className="h-4 w-4" />
          </div>
        </Link>
      </div>
    </aside>
  );
}