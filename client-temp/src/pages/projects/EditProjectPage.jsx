import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getProjectById,
  updateProject,
} from "@/services/projectService";

function EditProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    owner: "",
    status: "Active",
    progress: 0,
    technologies: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProject();
  }, []);

  async function loadProject() {
    try {
      const project = await getProjectById(id);

      setForm({
        title: project.title,
        description: project.description,
        owner: project.owner,
        status: project.status,
        progress: project.progress,
        technologies: project.technologies.join(", "),
      });
    } catch (error) {
      console.error(error);
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

    try {
      await updateProject(id, {
        ...form,
        progress: Number(form.progress),
        technologies: form.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
      });

      navigate(`/projects/${id}`);
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="max-w-3xl">

      <h1 className="mb-8 text-3xl font-bold">
        Edit Project
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border bg-white p-8 shadow-sm"
      >

        <div>
          <label className="mb-2 block font-medium">
            Title
          </label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            rows={4}
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Owner
          </label>

          <input
            name="owner"
            value={form.owner}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Status
          </label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          >
            <option>Active</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Overdue</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Progress
          </label>

          <input
            type="number"
            name="progress"
            min="0"
            max="100"
            value={form.progress}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Technologies
          </label>

          <input
            name="technologies"
            value={form.technologies}
            onChange={handleChange}
            placeholder="React, Node.js, PostgreSQL"
            className="w-full rounded-xl border p-3"
          />
        </div>

        <button
          type="submit"
          className="rounded-xl bg-violet-600 px-6 py-3 text-white hover:bg-violet-700"
        >
          Save Changes
        </button>

      </form>

    </div>
  );
}

export default EditProjectPage;