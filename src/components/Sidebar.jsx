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
    "px-3 py-2.5 min-h-10 rounded-md flex items-center gap-1 hover:bg-slate-200 hover:text-slate-900 transition-colors duration-150";
  const sideBarActiveStyle =
    "px-3 py-2.5 min-h-10 rounded-md flex items-center gap-1 bg-slate-300 text-slate-900 font-medium";

  return (
    <aside className="flex flex-col gap-1 w-60 h-screen px-4 pt-20 bg-slate-50 border-r border-slate-200 fixed top-0 left-0">
      <NavLink
        className={({ isActive }) =>
          isActive ? sideBarActiveStyle : sideBarPagesStyle
        }
        to="/"
      >
        <LayoutDashboard /> Dashboard
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? sideBarActiveStyle : sideBarPagesStyle
        }
        to="/clients"
      >
        <Users /> Clients
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? sideBarActiveStyle : sideBarPagesStyle
        }
        to="/projects"
      >
        <FolderKanban /> Projects
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? sideBarActiveStyle : sideBarPagesStyle
        }
        to="/tasks"
      >
        <Check />
        Tasks
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? sideBarActiveStyle : sideBarPagesStyle
        }
        to="/settings"
      >
        <Settings /> Settings
      </NavLink>
    </aside>
  );
}
