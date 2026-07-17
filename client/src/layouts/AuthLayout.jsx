import React from "react";
import { Outlet } from "react-router-dom";
import BrandPanel from "@/components/auth/BrandPanel";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-zinc-950 text-zinc-100 selection:bg-indigo-500/30 selection:text-indigo-200 overflow-hidden">
      {/* Left Column: Brand & Visuals (Hidden on mobile/tablet, takes 50% on desktop) */}
      <BrandPanel />

      {/* Right Column: Interactive Forms Canvas */}
      <main className="flex w-full flex-col justify-center items-center px-6 py-12 lg:w-1/2 lg:px-16 relative overflow-hidden">
        {/* Subtle Background Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: `24px 24px`
          }}
        />

        {/* Right-Side Ambient Radial Glows */}
        <div className="absolute top-1/4 -right-20 h-[350px] w-[350px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-20 left-1/4 h-[250px] w-[250px] rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />
        
        {/* Form Container */}
        <div className="w-full max-w-sm z-10 animate-in fade-in zoom-in-95 duration-500">
          <Outlet />
        </div>
      </main>
    </div>
  );
}