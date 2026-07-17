import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProject } from "@/services/projectService";
import { toast } from "sonner";

function CreateProjectPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Active",
    owner: "",
    progress: 0,
    technologies: "",
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
      });

      toast.success("Project created successfully!");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create project.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl">

      {/* Header */}

      <div className="mb-8 rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-8 text-white shadow-lg">

        <h1 className="text-4xl font-bold">
          🚀 Create New Project
        </h1>

        <p className="mt-3 text-white/80">
          Add a new project to your workspace and start tracking its progress.
        </p>

      </div>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="space-y-8 rounded-3xl border bg-white p-8 shadow-sm"
      >

        {/* Title */}

        <div>

          <label className="mb-2 block font-semibold">
            Project Title
          </label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="DevSphere Dashboard"
            className="w-full rounded-xl border p-3 outline-none transition focus:border-violet-500"
            required
          />

        </div>

        {/* Description */}

        <div>

          <label className="mb-2 block font-semibold">
            Description
          </label>

          <textarea
            rows={5}
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe your project..."
            className="w-full rounded-xl border p-3 outline-none transition focus:border-violet-500"
            required
          />

        </div>

        {/* Owner + Status */}

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-semibold">
              Owner
            </label>

            <input
              name="owner"
              value={form.owner}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full rounded-xl border p-3 outline-none transition focus:border-violet-500"
              required
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl border p-3 outline-none transition focus:border-violet-500"
            >
              <option>Active</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Overdue</option>
            </select>

          </div>

        </div>

        {/* Progress */}

        <div>

          <div className="mb-3 flex items-center justify-between">

            <label className="font-semibold">
              Progress
            </label>

            <span className="rounded-full bg-violet-100 px-4 py-1 font-semibold text-violet-700">
              {form.progress}%
            </span>

          </div>

          <input
            type="range"
            name="progress"
            min="0"
            max="100"
            value={form.progress}
            onChange={handleChange}
            className="w-full accent-violet-600"
          />

        </div>

        {/* Technologies */}

        <div>

          <label className="mb-2 block font-semibold">
            Technologies
          </label>

          <input
            name="technologies"
            value={form.technologies}
            onChange={handleChange}
            placeholder="React, Node.js, Express, PostgreSQL"
            className="w-full rounded-xl border p-3 outline-none transition focus:border-violet-500"
          />

          <p className="mt-2 text-sm text-slate-500">
            Separate each technology using commas.
          </p>

        </div>

        {/* Buttons */}

        <div className="flex gap-4">

          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-xl bg-violet-600 py-3 text-lg font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating..." : "🚀 Create Project"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="rounded-xl border px-8 py-3 font-semibold transition hover:bg-slate-100"
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
}

export default CreateProjectPage;