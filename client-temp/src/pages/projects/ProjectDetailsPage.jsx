import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getProjectById,
  deleteProject,
} from "@/services/projectService";

function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProject();
  }, []);

  async function loadProject() {
    try {
      const data = await getProjectById(id);
      setProject(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProject(id);
      navigate("/projects");
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return (
      <h2 className="text-2xl font-semibold">
        Loading...
      </h2>
    );
  }

  if (!project) {
    return (
      <h2 className="text-2xl font-semibold">
        Project not found.
      </h2>
    );
  }

  return (
    <div className="max-w-5xl space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            {project.title}
          </h1>

          <p className="mt-2 text-slate-500">
            {project.description}
          </p>

        </div>

        <span className="rounded-full bg-violet-100 px-4 py-2 text-violet-700 font-medium">
          {project.status}
        </span>

      </div>

      <div className="rounded-2xl border bg-white p-8 shadow-sm space-y-6">

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <h3 className="text-sm text-slate-500">
              Owner
            </h3>

            <p className="mt-1 text-lg font-semibold">
              {project.owner}
            </p>

          </div>

          <div>

            <h3 className="text-sm text-slate-500">
              Progress
            </h3>

            <p className="mt-1 text-lg font-semibold">
              {project.progress}%
            </p>

          </div>

        </div>

        <div>

          <h3 className="mb-3 text-sm text-slate-500">
            Progress
          </h3>

          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">

            <div
              className="h-full bg-violet-600"
              style={{
                width: `${project.progress}%`,
              }}
            />

          </div>

        </div>

        <div>

          <h3 className="mb-3 text-sm text-slate-500">
            Technologies
          </h3>

          <div className="flex flex-wrap gap-3">

            {project.technologies.map((tech) => (

              <span
                key={tech}
                className="rounded-full bg-slate-100 px-4 py-2"
              >
                {tech}
              </span>

            ))}

          </div>

        </div>

        <div className="flex gap-4 pt-6">

          <Link
            to={`/projects/${project.id}/edit`}
            className="rounded-xl bg-violet-600 px-6 py-3 text-white hover:bg-violet-700"
          >
            Edit Project
          </Link>

          <button
            onClick={handleDelete}
            className="rounded-xl bg-red-600 px-6 py-3 text-white hover:bg-red-700"
          >
            Delete Project
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProjectDetailsPage;