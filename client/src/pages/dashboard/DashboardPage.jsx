import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FolderKanban,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  ArrowUpRight,
  Plus,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getProjects } from "@/services/projectService";
import PageContainer from "@/components/ui/PageContainer";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import SectionCard from "@/components/ui/SectionCard";
import ProgressBar from "@/components/ui/ProgressBar";
import ProjectStatusChart from "@/components/dashboard/ProjectStatusChart";
import { isOverdue, getStatusStyle } from "@/utils/projectHelpers";

export default function DashboardPage() {
  const {
    data: projects = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const completed = projects.filter((p) => p.status === "Completed").length;
  const active = projects.filter((p) => p.status === "Active").length;
  const overdue = projects.filter(isOverdue).length;

  const stats = [
    {
      title: "Total Projects",
      value: projects.length,
      icon: FolderKanban,
      color: "from-indigo-500/20 to-indigo-500/5 text-indigo-400 border-indigo-500/20",
      trend: "+2 this month",
    },
    {
      title: "Completed",
      value: completed,
      icon: CheckCircle2,
      color: "from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/20",
      trend: projects.length > 0 ? `${((completed / projects.length) * 100).toFixed(0)}% completion` : "No data",
    },
    {
      title: "Active",
      value: active,
      icon: Clock3,
      color: "from-blue-500/20 to-blue-500/5 text-blue-400 border-blue-500/20",
      trend: "Active sprints",
    },
    {
      title: "Overdue",
      value: overdue,
      icon: AlertTriangle,
      color: "from-rose-500/20 to-rose-500/5 text-rose-400 border-rose-500/20",
      trend: overdue > 0 ? "Requires attention" : "On schedule",
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Engineering Workspace"
        subtitle="Track sprints, monitor build status, and manage team velocity in real time."
        action={
          <Link
            to="/projects/new"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:from-indigo-600 hover:to-purple-700 hover:shadow-indigo-500/30 active:scale-95 border border-white/10 shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>New Project</span>
          </Link>
        }
      />

      {isError && (
        <div className="my-6 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-300">
          Couldn't load your projects. Check your connection and try refreshing.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 my-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-28 rounded-2xl border border-white/5 bg-zinc-950/40 p-5 animate-pulse flex flex-col justify-between"
            >
              <div className="h-3 w-24 bg-white/10 rounded" />
              <div className="h-8 w-16 bg-white/10 rounded" />
            </div>
          ))
        ) : (
          stats.map((item) => (
            <StatCard
              key={item.title}
              title={item.title}
              value={item.value}
              icon={item.icon}
              color={item.color}
              trend={item.trend}
            />
          ))
        )}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          {isLoading ? (
            <div className="h-[420px] rounded-2xl border border-white/5 bg-zinc-950/40 p-6 animate-pulse flex flex-col justify-between">
              <div className="h-5 w-48 bg-white/10 rounded mb-4" />
              <div className="h-64 w-64 rounded-full border-8 border-white/5 mx-auto my-auto" />
              <div className="h-8 w-full bg-white/5 rounded mt-4" />
            </div>
          ) : (
            <ProjectStatusChart projects={projects} />
          )}
        </div>

        <SectionCard
          title="Recent Deployments"
          subtitle="Latest updates across your active sprints"
          isLoading={isLoading}
          action={
            <Link
              to="/projects"
              className="group inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <span>View all</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          }
        >
          <div className="space-y-3 pt-2">
            {!isLoading && projects.length === 0 && (
              <div className="flex flex-col items-center justify-center py-14 text-center border border-dashed border-white/10 rounded-xl bg-white/[0.01]">
                <FolderKanban className="h-8 w-8 text-zinc-600 mb-2" />
                <p className="text-xs font-bold text-zinc-300">No active deployments</p>
                <p className="text-[11px] text-zinc-500 max-w-[200px] mt-0.5 leading-relaxed">
                  Create a project to initialize tracking and view sprint logs.
                </p>
                <Link
                  to="/projects/new"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-[11px] font-semibold text-zinc-300 hover:bg-white/10 hover:text-white transition"
                >
                  <Sparkles className="h-3 w-3 text-indigo-400" />
                  <span>Initialize Sprint</span>
                </Link>
              </div>
            )}

            {!isLoading &&
              projects.slice(0, 5).map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="group block rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-200 hover:border-white/15 hover:bg-white/[0.05] hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="min-w-0 flex-1 pr-2">
                      <h3 className="truncate text-sm font-bold text-zinc-200 group-hover:text-indigo-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="truncate text-[11px] text-zinc-500 font-mono mt-0.5">
                        Lead: <span className="text-zinc-400">{project.owner}</span>
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-1.5">
                      {isOverdue(project) && (
                        <span className="rounded-md px-2 py-0.5 text-[10px] font-bold font-mono border bg-rose-500/10 text-rose-400 border-rose-500/20">
                          Overdue
                        </span>
                      )}
                      <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold font-mono border ${getStatusStyle(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <div className="flex-1">
                      <ProgressBar value={project.progress} />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-zinc-400 min-w-[2.5rem] text-right">
                      {project.progress}%
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </SectionCard>
      </div>
    </PageContainer>
  );
}
