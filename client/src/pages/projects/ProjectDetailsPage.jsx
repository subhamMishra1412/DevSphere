import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProjectById, deleteProject } from "@/services/projectService";
import { toast } from "sonner";
import { ArrowLeft, Edit3, Trash2, User, Activity, Layers, Sparkles, AlertTriangle, XCircle } from "lucide-react";
import PageContainer from "@/components/ui/PageContainer";
import ProgressBar from "@/components/ui/ProgressBar";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    loadProject();
  }, [id]);

  async function loadProject() {
    setLoading(true);
    try {
      const data = await getProjectById(id);
      setProject(data);
    } catch (error) {
      console.error("Failed to fetch project details:", error);
      toast.error("Failed to load project details.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteProject(id);
      toast.success("Project permanently deleted.");
      navigate("/projects");
    } catch (error) {
      console.error("Deletion failed:", error);
      toast.error("Failed to delete project.");
      setDeleting(false);
      setShowConfirmDelete(false);
    }
  }

  if (loading) {
    return (
      <PageContainer>
        <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-pulse" aria-busy="true" aria-label="Loading project details">
          <div className="h-4 w-44 bg-white/10 rounded" />
          <div className="flex justify-between items-start border-b border-white/10 pb-6">
            <div className="space-y-2">
              <div className="h-8 w-64 bg-white/10 rounded" />
              <div className="h-4 w-96 bg-white/5 rounded" />
            </div>
            <div className="flex gap-2">
              <div className="h-9 w-20 bg-white/10 rounded-xl" />
              <div className="h-9 w-20 bg-white/10 rounded-xl" />
            </div>
          </div>
          <div className="h-80 rounded-2xl border border-white/5 bg-zinc-950/40 p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="h-20 bg-white/5 rounded-xl" />
              <div className="h-20 bg-white/5 rounded-xl" />
            </div>
            <div className="h-16 bg-white/5 rounded-xl" />
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!project) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-zinc-950/60 p-16 text-center backdrop-blur-xl max-w-lg mx-auto my-12 shadow-2xl">
          <AlertTriangle className="h-10 w-10 text-amber-500 mb-3" aria-hidden="true" />
          <h2 className="text-base font-bold text-white">Project Not Found</h2>
          <p className="mt-1 text-xs text-zinc-400 max-w-sm leading-relaxed">
            The workspace project you are attempting to access does not exist or has already been deleted from the database.
          </p>
          <Link
            to="/projects"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 text-xs font-bold text-white hover:from-indigo-600 hover:to-purple-700 transition shadow-lg shadow-indigo-500/20"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Directory</span>
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto space-y-6 pb-16">
        {/* Back Navigation */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Projects Directory</span>
        </Link>

        {/* Top Header Section */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between border-b border-white/10 pb-6">
          <div className="space-y-2 min-w-0 flex-1 pr-4">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white truncate">
                {project.title}
              </h1>
              <span
                className={`shrink-0 rounded-md px-2.5 py-1 text-xs font-bold font-mono border ${
                  project.status === "Completed"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : project.status === "In Progress"
                    ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                    : project.status === "Overdue"
                    ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                    : "bg-purple-500/10 text-purple-400 border-purple-500/20"
                }`}
              >
                {project.status}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {project.description || "No description provided for this engineering sprint."}
            </p>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
            <Link
              to={`/projects/${project.id}/edit`}
              className="flex items-center gap-1.5 rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-xs font-bold text-indigo-300 transition hover:border-indigo-500/40 hover:bg-indigo-500/20 hover:text-indigo-200"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Edit</span>
            </Link>

            <button
              onClick={() => setShowConfirmDelete(true)}
              disabled={showConfirmDelete}
              className="flex items-center gap-1.5 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-xs font-bold text-rose-300 transition hover:border-rose-500/40 hover:bg-rose-500/20 hover:text-rose-200 disabled:opacity-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Delete</span>
            </button>
          </div>
        </header>

        {/* Custom Inline Deletion Guard ("Danger Zone") */}
        {showConfirmDelete && (
          <div
            role="alert"
            className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-5 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0" />
                  Confirm Permanent Deletion
                </h3>
                <p className="text-xs text-zinc-300 max-w-md leading-relaxed">
                  This action cannot be undone. This will permanently remove <span className="font-bold text-white">"{project.title}"</span> and all associated sprint history from the database.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowConfirmDelete(false)}
                  disabled={deleting}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-300 hover:bg-white/10 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 transition shadow-lg shadow-rose-600/20 disabled:opacity-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>{deleting ? "Deleting..." : "Yes, Delete Project"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Details Glass Card */}
        <article className="relative rounded-2xl border border-white/10 bg-zinc-950/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-8 before:absolute before:inset-0 before:rounded-2xl before:border-t before:border-white/15 before:pointer-events-none">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-10 right-10 h-40 w-40 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

          {/* Key Metrics Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex items-start gap-3.5 rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="rounded-lg bg-indigo-500/10 p-2.5 text-indigo-400 border border-indigo-500/20">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Project Lead / Owner
                </h3>
                <p className="mt-1 text-base font-bold text-white">
                  {project.owner}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="rounded-lg bg-purple-500/10 p-2.5 text-purple-400 border border-purple-500/20">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Current Sprint Velocity
                </h3>
                <p className="mt-1 text-base font-bold font-mono text-white">
                  {project.progress}% Complete
                </p>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400 font-semibold">Execution Pipeline</span>
              <span className="font-bold text-indigo-400">{project.progress}%</span>
            </div>
            <div className="pt-1">
              <ProgressBar value={project.progress} />
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="space-y-3 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-zinc-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                Technologies & Architecture
              </h3>
            </div>

            {project.technologies && project.technologies.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono text-zinc-200 shadow-inner"
                  >
                    <Sparkles className="h-3 w-3 text-indigo-400" />
                    {tech}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-500 italic">No technologies listed for this project.</p>
            )}
          </div>
        </article>
      </div>
    </PageContainer>
  );
}