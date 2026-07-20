export function isOverdue(project) {
  return (
    project.due_date &&
    project.status !== "Completed" &&
    new Date(project.due_date) < new Date()
  );
}

export const PROJECT_STATUSES = ["Planning", "Active", "Completed"];

export const STATUS_STYLES = {
  Completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Active: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Planning: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export function getStatusStyle(status) {
  return STATUS_STYLES[status] || STATUS_STYLES.Planning;
}