import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Layers, AlertCircle } from "lucide-react";

export default function ProjectStatusChart({ projects = [] }) {
  const totalProjects = projects.length;

  const data = [
    {
      name: "Completed",
      value: projects.filter((p) => p.status === "Completed").length,
    },
    {
      name: "In Progress",
      value: projects.filter((p) => p.status === "In Progress").length,
    },
    {
      name: "Overdue",
      value: projects.filter((p) => p.status === "Overdue").length,
    },
    {
      name: "Active",
      value: projects.filter((p) => p.status === "Active").length,
    },
  ].filter((item) => item.value > 0); // Clean out zero-value segments

  // Linear / Vercel high-contrast SaaS palette
  const colorsMap = {
    Completed: "#10b981",   // Emerald
    "In Progress": "#3b82f6", // Blue
    Overdue: "#f43f5e",     // Rose
    Active: "#8b5cf6",      // Purple
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      const percentage = totalProjects > 0 ? ((value / totalProjects) * 100).toFixed(0) : 0;
      return (
        <div className="rounded-xl border border-white/10 bg-zinc-950/95 px-3.5 py-2.5 shadow-2xl backdrop-blur-md">
          <p className="text-xs font-semibold text-zinc-300">{name}</p>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="font-mono text-sm font-bold text-white">{value}</span>
            <span className="text-[10px] font-mono text-indigo-400">({percentage}%)</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-zinc-950/60 p-6 shadow-xl backdrop-blur-xl before:absolute before:inset-0 before:rounded-2xl before:border-t before:border-white/15 before:pointer-events-none">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight">
            Velocity & Build Status
          </h2>
          <p className="text-xs text-zinc-400">
            Real-time distribution across all development stages
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-mono text-zinc-300 shrink-0">
          <span>Total:</span>
          <span className="font-bold text-white">{totalProjects}</span>
        </div>
      </div>

      {/* Chart Canvas or Empty State */}
      <div className="relative my-auto h-64 w-full flex items-center justify-center">
        {totalProjects === 0 || data.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-6 border border-dashed border-white/10 rounded-xl bg-white/[0.01] w-full h-full">
            <AlertCircle className="h-8 w-8 text-zinc-600 mb-2 animate-pulse" />
            <p className="text-xs font-semibold text-zinc-400">No project metrics available</p>
            <p className="text-[11px] text-zinc-600 mt-0.5">Initialize a sprint to generate velocity charts.</p>
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  innerRadius={68}
                  outerRadius={88}
                  paddingAngle={4}
                  stroke="transparent"
                >
                  {data.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={colorsMap[entry.name] || "#6366f1"}
                      className="transition-all duration-300 hover:opacity-80 stroke-zinc-950 stroke-2 cursor-pointer"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Inner Donut Center Metric Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
              <Layers className="h-5 w-5 text-indigo-400 mb-0.5 opacity-80" />
              <span className="font-mono text-2xl font-black text-white tracking-tight">
                {totalProjects}
              </span>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">
                Sprints
              </span>
            </div>
          </>
        )}
      </div>

      {/* Screen Reader Accessibility Table (WCAG Compliance) */}
      <table className="sr-only">
        <caption>Project Status Distribution</caption>
        <thead>
          <tr>
            <th scope="col">Status</th>
            <th scope="col">Count</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Interactive Legend */}
      <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/10 mt-2 sm:grid-cols-4">
        {Object.keys(colorsMap).map((statusName) => {
          const match = data.find((d) => d.name === statusName);
          const count = match ? match.value : 0;
          return (
            <div key={statusName} className="flex items-center gap-2 rounded-lg bg-white/[0.02] p-2 border border-white/5">
              <span
                className="h-2.5 w-2.5 rounded-full shrink-0 shadow-sm"
                style={{ backgroundColor: colorsMap[statusName] }}
              />
              <div className="min-w-0">
                <p className="truncate text-[11px] font-medium text-zinc-300">{statusName}</p>
                <p className="text-xs font-mono font-bold text-zinc-500">{count}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}