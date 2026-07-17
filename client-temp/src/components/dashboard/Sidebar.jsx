import {
  LayoutDashboard,
  FolderKanban,
  PlusSquare,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {
  const links = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: FolderKanban,
      label: "Projects",
      path: "/projects",
    },
    {
      icon: PlusSquare,
      label: "New Project",
      path: "/projects/new",
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/settings",
    },
  ];

  return (
    <aside className="flex w-72 flex-col border-r bg-white">

      {/* Logo */}

      <div className="border-b p-8">

        <h1 className="text-3xl font-bold text-violet-600">
          DevSphere
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Project Management
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 p-4">

        {links.map(({ icon: Icon, label, path }) => (

          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-2xl px-5 py-4 transition ${
                isActive
                  ? "bg-violet-600 text-white shadow-lg"
                  : "text-slate-600 hover:bg-violet-50 hover:text-violet-600"
              }`
            }
          >
            <Icon size={22} />
            <span className="font-medium">
              {label}
            </span>
          </NavLink>

        ))}

      </nav>

      {/* User Card */}

      <div className="border-t p-6">

        <div className="flex items-center gap-4 rounded-2xl bg-slate-100 p-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-lg font-bold text-white">
            S
          </div>

          <div>

            <h3 className="font-semibold">
              Welcome
            </h3>

            <p className="text-sm text-slate-500">
              DevSphere User
            </p>

          </div>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;