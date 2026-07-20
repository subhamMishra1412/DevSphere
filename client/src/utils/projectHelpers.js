export function isOverdue(project) {
  if (!project?.due_date || project.status === "Completed") {
    return false;
  }

  const match = project.due_date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return false;
  }

  const [, year, month, day] = match;
  const dueDate = new Date(Number(year), Number(month) - 1, Number(day));
  const isValidDate =
    dueDate.getFullYear() === Number(year) &&
    dueDate.getMonth() === Number(month) - 1 &&
    dueDate.getDate() === Number(day);

  if (!isValidDate) {
    return false;
  }

  const today = new Date();
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  return dueDate < todayDate;
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