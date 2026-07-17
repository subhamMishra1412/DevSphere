import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function ProjectStatusChart({ projects }) {
  const data = [
    {
      name: "Completed",
      value: projects.filter(
        (p) => p.status === "Completed"
      ).length,
    },
    {
      name: "In Progress",
      value: projects.filter(
        (p) => p.status === "In Progress"
      ).length,
    },
    {
      name: "Overdue",
      value: projects.filter(
        (p) => p.status === "Overdue"
      ).length,
    },
    {
      name: "Active",
      value: projects.filter(
        (p) => p.status === "Active"
      ).length,
    },
  ];

  const colors = [
    "#22c55e",
    "#3b82f6",
    "#ef4444",
    "#8b5cf6",
  ];

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Project Status
      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              outerRadius={100}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={colors[index]}
                />
              ))}
            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default ProjectStatusChart;