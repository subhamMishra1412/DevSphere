import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, FolderKanban, Edit3, Eye, Sparkles, XCircle } from "lucide-react";
import { getProjects } from "@/services/projectService";
import { isOverdue, getStatusStyle, PROJECT_STATUSES } from "@/utils/projectHelpers";
import PageContainer from "@/components/ui/PageContainer";
import PageHeader from "@/components/ui/PageHeader";
import ProgressBar from "@/components/ui/ProgressBar";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);
    try {
      const data = await getProjects();
      setProjects(data || []);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.owner.toLowerCase().includes(search.toLowerCase()) ||
        project.status.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Overdue" ? isOverdue(project) : project.status === statusFilter);

      return matchesSearch && matchesStatus;
    });
  }, [projects, search, statusFilter]);

  return (
    <PageContainer>
      <PageHeader
        title="Projects Directory"
        subtitle="Manage active engineering sprints, monitor deployment pipelines, and track team velocity."
      >
        <Link
          to="/projects/new"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:from-indigo-600 hover:to-purple-700 hover:shadow-indigo-500/30 active:scale-95 border border-white/10 shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>New Project</span>
        </Link>
      </PageHeader>

      <nav aria-label="Project filters" className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-2">
        <div className="relative w-full sm:max-w-xs">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
            size={16}
            aria-hidden="true"
          />
          <input
            type="text"
            aria-label="Search projects by title, owner, or status"
            placeholder="Search projects, owners, or status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-zinc-950/80 py-2 pl-10 pr-9 text-xs text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:bg-black focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
              aria-label="Clear search"
            >
              <XCircle size={14} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0" role="group" aria-label="Filter by project status">
          {["All", ...PROJECT_STATUSES, "Overdue"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              aria-pressed={statusFilter === status}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                statusFilter === status
                  ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/10 text-white border border-indigo-500/30 shadow-sm shadow-indigo-500/10"
                  : "border border-white/5 bg-white/[0.02] text-zinc-400 hover:border-white/10 hover:bg-white/[0.05] hover:text-zinc-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </nav>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-2" aria-busy="true" aria-label="Loading projects">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-52 rounded-2xl border border-white/5 bg-zinc-950/40 p-5 animate-pulse flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="h-5 w-36 bg-white/10 rounded" />
                  <div className="h-5 w-16 bg-white/10 rounded" />
                </div>
                <div className="h-3 w-24 bg-white/5 rounded" />
                <div className="h-8 w-full bg-white/5 rounded mt-2" />
              </div>
              <div className="space-y-3 pt-4 border-t border-white/5">
                <div className="h-2 w-full bg-white/10 rounded" />
                <div className="flex gap-2">
                  <div className="h-8 flex-1 bg-white/5 rounded-xl" />
                  <div className="h-8 flex-1 bg-white/5 rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-zinc-950/60 p-16 text-center backdrop-blur-xl shadow-xl mt-6">
          <FolderKanban className="h-10 w-10 text-zinc-600 mb-3" aria-hidden="true" />
          <h3 className="text-sm font-bold text-white">No matching projects found</h3>
          <p className="mt-1 text-xs text-zinc-400 max-w-sm leading-relaxed">
            We couldn't find anything matching your search "{search}" or selected filters. Try adjusting your query or initializing a new workspace project.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setStatusFilter("All");
            }}
            className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-xs font-semibold text-zinc-200 hover:bg-white/10 hover:text-white transition"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>Reset all filters</span>
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-2">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-950/60 p-5 backdrop-blur-xl shadow-lg transition-all duration-300 hover:border-white/20 hover:bg-zinc-900/40 hover:shadow-xl hover:-translate-y-0.5 before:absolute before:inset-0 before:rounded-2xl before:border-t before:border-white/15 before:pointer-events-none"
            >
              <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-indigo-500/5 blur-2xl group-hover:bg-indigo-500/10 transition-all duration-500 pointer-events-none" />

              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-base font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-[11px] font-mono text-zinc-500 mt-0.5">
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

                <p className="line-clamp-2 text-xs text-zinc-400 leading-relaxed min-h-[2.25rem]">
                  {project.description || "No description provided for this engineering sprint."}
                </p>
              </div>

              <div className="mt-6 space-y-4 pt-4 border-t border-white/5">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-zinc-500">Sprint Velocity</span>
                    <span className="font-bold text-zinc-300">{project.progress}%</span>
                  </div>
                  <ProgressBar value={project.progress} />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Link
                    to={`/projects/${project.id}`}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                  >
                    <Eye className="h-3.5 w-3.5 text-zinc-400" />
                    <span>View</span>
                  </Link>

                  <Link
                    to={`/projects/${project.id}/edit`}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-3 py-2 text-xs font-semibold text-indigo-300 transition hover:border-indigo-500/40 hover:bg-indigo-500/20 hover:text-indigo-200"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    <span>Edit</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </PageContainer>
  );
}