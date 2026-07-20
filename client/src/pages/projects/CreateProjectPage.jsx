import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createProject } from "@/services/projectService";
import { toast } from "sonner";
import { ArrowLeft, Rocket, Sparkles } from "lucide-react";
import PageContainer from "@/components/ui/PageContainer";
import PageHeader from "@/components/ui/PageHeader";
import { PROJECT_STATUSES } from "@/utils/projectHelpers";

export default function CreateProjectPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Planning",
    owner: "",
    progress: 0,
    technologies: "",
    due_date: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await createProject({
        ...form,
        progress: Number(form.progress),
        technologies: form.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
        due_date: form.due_date || null,
      });

      toast.success("Project created successfully!", {
        description: "Your new engineering sprint is now live in the dashboard.",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Project creation failed:", error);
      toast.error("Failed to create project.", {
        description:
          error.response?.data?.message ||
          "Please verify your input parameters and try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  const previewTechs = form.technologies
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto space-y-6 pb-12">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Projects Directory</span>
        </Link>

        <PageHeader
          title="Initialize New Project"
          subtitle="Configure a new engineering workspace, assign ownership, and define tech stacks."
        />

        <form
          onSubmit={handleSubmit}
          className="relative rounded-2xl border border-white/10 bg-zinc-950/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6 before:absolute before:inset-0 before:rounded-2xl before:border-t before:border-white/15 before:pointer-events-none"
        >
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

          <div className="space-y-1.5">
            <label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
              Project Title <span className="text-rose-400">*</span>
            </label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              disabled={loading}
              placeholder="e.g. DevSphere Cloud Dashboard"
              className="w-full rounded-xl border border-white/10 bg-zinc-950/80 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:bg-black focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner disabled:opacity-50"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="description" className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
              Description <span className="text-rose-400">*</span>
            </label>
            <textarea
              id="description"
              rows={4}
              name="description"
              value={form.description}
              onChange={handleChange}
              disabled={loading}
              placeholder="Outline project goals, key deliverables, and target architecture..."
              className="w-full rounded-xl border border-white/10 bg-zinc-950/80 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:bg-black focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner disabled:opacity-50 resize-y"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="owner" className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
                Lead / Owner <span className="text-rose-400">*</span>
              </label>
              <input
                id="owner"
                name="owner"
                value={form.owner}
                onChange={handleChange}
                disabled={loading}
                placeholder="e.g. Lead Engineer"
                className="w-full rounded-xl border border-white/10 bg-zinc-950/80 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:bg-black focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner disabled:opacity-50"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="status" className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
                Initial Status
              </label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-xl border border-white/10 bg-zinc-950 px-3.5 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all disabled:opacity-50 cursor-pointer"
              >
                {PROJECT_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-white/5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="progress" className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Initial Sprint Velocity (Progress)
                </label>
                <span className="rounded-md bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-xs font-mono font-bold text-indigo-400">
                  {form.progress}%
                </span>
              </div>
              <input
                id="progress"
                type="range"
                name="progress"
                min="0"
                max="100"
                value={form.progress}
                onChange={handleChange}
                disabled={loading}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="due_date" className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
                Due Date
              </label>
              <input
                id="due_date"
                type="date"
                name="due_date"
                value={form.due_date}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-xl border border-white/10 bg-zinc-950/80 px-3.5 py-2.5 text-sm text-white focus:border-indigo-500 focus:bg-black focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner disabled:opacity-50 [color-scheme:dark]"
              />
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-white/5">
            <label htmlFor="technologies" className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
              Tech Stack & Dependencies
            </label>
            <input
              id="technologies"
              name="technologies"
              value={form.technologies}
              onChange={handleChange}
              disabled={loading}
              placeholder="React, Node.js, Tailwind CSS, PostgreSQL"
              className="w-full rounded-xl border border-white/10 bg-zinc-950/80 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:bg-black focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner disabled:opacity-50"
            />
            <p className="text-[11px] text-zinc-500">
              Separate each technology using commas to generate stack badges.
            </p>

            {previewTechs.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2" aria-label="Tech stack preview">
                {previewTechs.map((tech, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-mono text-zinc-200 shadow-sm"
                  >
                    <Sparkles className="h-2.5 w-2.5 text-indigo-400" />
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:from-indigo-600 hover:to-purple-700 hover:shadow-indigo-500/30 active:scale-95 disabled:opacity-50 border border-white/10"
            >
              <Rocket className="h-4 w-4" />
              <span>{loading ? "Deploying Workspace..." : "Create Project"}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/projects")}
              disabled={loading}
              className="w-full sm:w-auto rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-xs font-semibold text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}