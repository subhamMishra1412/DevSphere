import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getProjectById, updateProject } from "@/services/projectService";
import { toast } from "sonner";
import { ArrowLeft, Save, Sparkles } from "lucide-react";
import PageContainer from "@/components/ui/PageContainer";
import PageHeader from "@/components/ui/PageHeader";
import { PROJECT_STATUSES } from "@/utils/projectHelpers";

export default function EditProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    owner: "",
    status: "Active",
    progress: 0,
    technologies: "",
    due_date: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProject();
  }, [id]);

  async function loadProject() {
    setLoading(true);
    try {
      const project = await getProjectById(id);
      if (project) {
        setForm({
          title: project.title || "",
          description: project.description || "",
          owner: project.owner || "",
          status: project.status || "Active",
          progress: project.progress || 0,
          technologies: project.technologies ? project.technologies.join(", ") : "",
          due_date: project.due_date ? project.due_date.slice(0, 10) : "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch project:", error);
      toast.error("Failed to load project details.");
      navigate("/projects");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    try {
      await updateProject(id, {
        ...form,
        progress: Number(form.progress),
        technologies: form.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
        due_date: form.due_date || null,
      });

      toast.success("Project updated successfully!");
      navigate(`/projects/${id}`);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(
        error.response?.data?.message || "Failed to update project."
      );
    } finally {
      setSaving(false);
    }
  }

  const previewTechs = form.technologies
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  if (loading) {
    return (
      <PageContainer>
        <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-pulse" aria-busy="true" aria-label="Loading project data">
          <div className="h-4 w-36 bg-white/10 rounded" />
          <div className="space-y-2">
            <div className="h-8 w-64 bg-white/10 rounded" />
            <div className="h-4 w-96 bg-white/5 rounded" />
          </div>
          <div className="h-[480px] rounded-2xl border border-white/5 bg-zinc-950/40 p-8 space-y-6">
            <div className="h-10 w-full bg-white/5 rounded-xl" />
            <div className="h-24 w-full bg-white/5 rounded-xl" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-10 bg-white/5 rounded-xl" />
              <div className="h-10 bg-white/5 rounded-xl" />
            </div>
            <div className="h-10 w-full bg-white/5 rounded-xl" />
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto space-y-6 pb-12">
        <Link
          to={`/projects/${id}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Project Details</span>
        </Link>

        <PageHeader
          title="Edit Workspace Project"
          subtitle={`Modifying configurations and sprint metrics for "${form.title || "Project"}".`}
        />

        <form
          onSubmit={handleSubmit}
          className="relative rounded-2xl border border-white/10 bg-zinc-950/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6 before:absolute before:inset-0 before:rounded-2xl before:border-t before:border-white/15 before:pointer-events-none"
        >
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

          <div className="space-y-1.5">
            <label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
              Project Title
            </label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              disabled={saving}
              className="w-full rounded-xl border border-white/10 bg-zinc-950/80 px-3.5 py-2.5 text-sm text-white focus:border-indigo-500 focus:bg-black focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner disabled:opacity-50"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="description" className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              name="description"
              value={form.description}
              onChange={handleChange}
              disabled={saving}
              className="w-full rounded-xl border border-white/10 bg-zinc-950/80 px-3.5 py-2.5 text-sm text-white focus:border-indigo-500 focus:bg-black focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner disabled:opacity-50 resize-y"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="owner" className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
                Lead / Owner
              </label>
              <input
                id="owner"
                name="owner"
                value={form.owner}
                onChange={handleChange}
                disabled={saving}
                className="w-full rounded-xl border border-white/10 bg-zinc-950/80 px-3.5 py-2.5 text-sm text-white focus:border-indigo-500 focus:bg-black focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner disabled:opacity-50"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="status" className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                disabled={saving}
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
                  Sprint Velocity (Progress)
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
                disabled={saving}
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
                disabled={saving}
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
              disabled={saving}
              placeholder="React, Node.js, Tailwind CSS, PostgreSQL"
              className="w-full rounded-xl border border-white/10 bg-zinc-950/80 px-3.5 py-2.5 text-sm text-white focus:border-indigo-500 focus:bg-black focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner disabled:opacity-50"
            />
            <p className="text-[11px] text-zinc-500">
              Separate each technology using commas.
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
              disabled={saving}
              className="w-full sm:flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:from-indigo-600 hover:to-purple-700 hover:shadow-indigo-500/30 active:scale-95 disabled:opacity-50 border border-white/10"
            >
              <Save className="h-4 w-4" />
              <span>{saving ? "Saving Changes..." : "Save Changes"}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate(`/projects/${id}`)}
              disabled={saving}
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