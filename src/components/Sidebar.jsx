import { NavLink } from "react-router-dom";
import {
  Settings,
  LayoutDashboard,
  Users,
  Check,
  FolderKanban,
} from "lucide-react";

export default function Sidebar() {
  const sideBarPagesStyle =
    "md:px-3 md:py-2.5 min-h-10 rounded-md flex items-center gap-1 hover:bg-slate-200 hover:text-slate-900 transition-colors duration-150";
  const sideBarActiveStyle =
    "md:px-3 md:py-2.5 min-h-10 rounded-md flex items-center gap-1 bg-slate-300 text-slate-900 font-medium";

  return (
    <aside className="flex flex-col gap-1 w-16 md:w-60 h-screen px-4 pt-20 bg-slate-50 border-r border-slate-200 fixed top-0 left-0">
      <NavLink
        className={({ isActive }) =>
          isActive ? sideBarActiveStyle : sideBarPagesStyle
        }
        to="/"
      >
        <LayoutDashboard className="max-md:mx-auto" />{" "}
        <span className="hidden md:inline">Dashboard</span>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? sideBarActiveStyle : sideBarPagesStyle
        }
        to="/clients"
      >
        <Users className="max-md:mx-auto" />{" "}
        <span className="hidden md:inline">Clients</span>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? sideBarActiveStyle : sideBarPagesStyle
        }
        to="/projects"
      >
        <FolderKanban className="max-md:mx-auto" />{" "}
        <span className="hidden md:inline">Projects</span>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? sideBarActiveStyle : sideBarPagesStyle
        }
        to="/tasks"
      >
        <Check className="max-md:mx-auto" />
        <span className="hidden md:inline">Tasks</span>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? sideBarActiveStyle : sideBarPagesStyle
        }
        to="/settings"
      >
        <Settings className="max-md:mx-auto" />{" "}
        <span className="hidden md:inline">Settings</span>
      </NavLink>
    </aside>
  );
}
