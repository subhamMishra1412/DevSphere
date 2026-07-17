import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

import { getProjects } from "@/services/projectService";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error(error);
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
        project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projects, search, statusFilter]);

  if (loading) {
    return (
      <h2 className="text-2xl font-semibold">
        Loading...
      </h2>
    );
  }

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Projects
          </h1>

          <p className="mt-2 text-slate-500">
            Manage all your projects.
          </p>

        </div>

        <Link
          to="/projects/new"
          className="rounded-xl bg-violet-600 px-5 py-3 text-white hover:bg-violet-700"
        >
          + New Project
        </Link>

      </div>

      {/* Search */}

      <div className="relative">

        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border py-3 pl-12 pr-4"
        />

      </div>

      {/* Status Filter */}

      <div className="flex flex-wrap gap-3">

        {[
          "All",
          "Active",
          "In Progress",
          "Completed",
          "Overdue",
        ].map((status) => (

          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`rounded-full px-5 py-2 transition ${
              statusFilter === status
                ? "bg-violet-600 text-white"
                : "bg-slate-100 hover:bg-slate-200"
            }`}
          >
            {status}
          </button>

        ))}

      </div>

      {filteredProjects.length === 0 ? (

        <div className="rounded-2xl border bg-white p-10 text-center text-slate-500">
          No matching projects found.
        </div>

      ) : (

        <div className="grid gap-5">

          {filteredProjects.map((project) => (

            <div
              key={project.id}
              className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg"
            >

              <div className="flex justify-between">

                <div>

                  <h2 className="text-xl font-semibold">
                    {project.title}
                  </h2>

                  <p className="mt-2 text-slate-500">
                    {project.description}
                  </p>

                </div>

                <span className="rounded-full bg-violet-100 px-4 py-2 text-violet-700">
                  {project.status}
                </span>

              </div>

              <div className="mt-5">

                <div className="mb-2 flex justify-between text-sm">

                  <span>{project.owner}</span>

                  <span>{project.progress}%</span>

                </div>

                <div className="h-2 rounded-full bg-slate-200">

                  <div
                    className="h-2 rounded-full bg-violet-600"
                    style={{
                      width: `${project.progress}%`,
                    }}
                  />

                </div>

              </div>

              <div className="mt-6 flex gap-3">

                <Link
                  to={`/projects/${project.id}`}
                  className="rounded-lg border px-4 py-2 hover:bg-slate-100"
                >
                  View
                </Link>

                <Link
                  to={`/projects/${project.id}/edit`}
                  className="rounded-lg bg-violet-600 px-4 py-2 text-white hover:bg-violet-700"
                >
                  Edit
                </Link>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default ProjectsPage;