import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import CommandPalette from "@/components/ui/CommandPalette";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen w-full bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-hidden select-none">
      {/* Global Command Palette Modal (Listens for ⌘K / Ctrl+K) */}
      <CommandPalette />

      {/* Left Navigation Shelf */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden relative">
        {/* Top Ambient Radial Lighting for Workspace Depth */}
        <div className="absolute top-0 left-1/4 h-[350px] w-[600px] rounded-full bg-indigo-500/[0.04] blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 h-[250px] w-[250px] rounded-full bg-purple-500/[0.03] blur-[100px] pointer-events-none" />
        
        {/* Sticky Header Nav */}
        <Navbar />

        {/* Dynamic Route Content Canvas */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 z-10">
          <div className="mx-auto max-w-7xl animate-in fade-in zoom-in-[0.99] duration-300">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}