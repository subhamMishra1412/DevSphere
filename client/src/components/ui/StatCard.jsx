import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "from-indigo-500/20 to-indigo-500/5 text-indigo-400 border-indigo-500/20",
  trend,
}) {
  // Determine trend direction for intelligent styling
  const isPositive = trend?.startsWith("+") || trend?.toLowerCase().includes("up") || trend?.includes("%");
  const isNegative = trend?.startsWith("-") || trend?.toLowerCase().includes("down") || trend?.toLowerCase().includes("overdue");
  
  return (
    <motion.article
      whileHover={{ y: -3, transition: { duration: 0.2, ease: "easeOut" } }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-xl hover:shadow-indigo-500/5 before:absolute before:inset-0 before:rounded-2xl before:border-t before:border-white/15 before:pointer-events-none select-none"
      aria-label={`${title}: ${value}${trend ? `, trend: ${trend}` : ""}`}
    >
      {/* Subtle ambient radial glow on card hover */}
      <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-indigo-500/5 blur-2xl transition-all duration-500 group-hover:bg-indigo-500/10 pointer-events-none" />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="space-y-1 min-w-0 flex-1">
          <p className="truncate text-xs font-semibold uppercase tracking-wider text-zinc-400">
            {title}
          </p>
          
          <h2 className="font-mono text-3xl font-extrabold tracking-tight text-white">
            {value}
          </h2>

          {trend && (
            <div className="flex items-center gap-1.5 pt-1">
              {isPositive && <TrendingUp className="h-3.5 w-3.5 text-emerald-400 shrink-0" />}
              {isNegative && <TrendingDown className="h-3.5 w-3.5 text-rose-400 shrink-0" />}
              {!isPositive && !isNegative && <Minus className="h-3 w-3 text-zinc-500 shrink-0" />}
              <span
                className={`text-[11px] font-medium tracking-wide ${
                  isPositive
                    ? "text-emerald-400"
                    : isNegative
                    ? "text-rose-400"
                    : "text-zinc-500"
                }`}
              >
                {trend}
              </span>
            </div>
          )}
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br border shadow-inner ${color}`}
        >
          {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
        </div>
      </div>
    </motion.article>
  );
}