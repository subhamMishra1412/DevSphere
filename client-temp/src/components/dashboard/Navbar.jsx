import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-5">

      <div>

        <h1 className="text-2xl font-bold">
          DevSphere
        </h1>

        <p className="text-sm text-slate-500">
          Project Management Workspace
        </p>

      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-2 text-white transition hover:bg-red-600"
      >
        <LogOut size={18} />
        Logout
      </button>

    </header>
  );
}

export default Navbar;