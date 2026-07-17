import { useEffect, useState } from "react";

import {
  FolderKanban,
  CheckCircle2,
  Clock3,
  AlertTriangle,
} from "lucide-react";

import { getProjects } from "@/services/projectService";

import PageContainer from "@/components/ui/PageContainer";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import SectionCard from "@/components/ui/SectionCard";
import ProgressBar from "@/components/ui/ProgressBar";

import ProjectStatusChart from "@/components/dashboard/ProjectStatusChart";

function DashboardPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error(error);
    }
  }

  const completed = projects.filter(
    (p) => p.status === "Completed"
  ).length;

  const inProgress = projects.filter(
    (p) => p.status === "In Progress"
  ).length;

  const overdue = projects.filter(
    (p) => p.status === "Overdue"
  ).length;

  const stats = [
    {
      title: "Projects",
      value: projects.length,
      icon: FolderKanban,
      color: "bg-violet-100 text-violet-600",
    },
    {
      title: "Completed",
      value: completed,
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "In Progress",
      value: inProgress,
      icon: Clock3,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Overdue",
      value: overdue,
      icon: AlertTriangle,
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <PageContainer>

      <PageHeader
        title="Dashboard"
        subtitle="Track your projects, monitor progress and manage your workspace."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => (

          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            icon={item.icon}
            color={item.color}
          />

        ))}

      </div>

      <div className="grid gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">

          <ProjectStatusChart
            projects={projects}
          />

        </div>

        <SectionCard
          title="Recent Projects"
          subtitle="Your latest development work"
        >

          <div className="space-y-5">

            {projects.length === 0 && (

              <p className="text-slate-500">
                No projects found.
              </p>

            )}

            {projects.slice(0, 5).map((project) => (

              <div
                key={project.id}
                className="rounded-2xl border border-slate-200 p-5"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <h3 className="font-semibold text-slate-900">
                      {project.title}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {project.owner}
                    </p>

                  </div>

                  <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-semibold text-violet-700">
                    {project.status}
                  </span>

                </div>

                <ProgressBar
                  value={project.progress}
                />

              </div>

            ))}

          </div>

        </SectionCard>

      </div>

    </PageContainer>
  );
}

export default DashboardPage;