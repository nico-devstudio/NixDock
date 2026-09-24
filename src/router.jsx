import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Projects from "./pages/Projects";
import Clients from "./pages/Clients";
import Tasks from "./pages/Tasks";
import Client from "./pages/Client";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Project from "./pages/Project";
import Task from "./pages/Task";
import Deliverable from "./pages/Deliverable";
import Deliverables from "./pages/Deliverables";
import NotFound from "./components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "projects/:id",
        element: <Project />,
      },
      {
        path: "clients",
        element: <Clients />,
      },
      {
        path: "clients/:id",
        element: <Client />,
      },
      {
        path: "tasks",
        element: <Tasks />,
      },
      {
        path: "tasks/:id",
        element: <Task />,
      },
      {
        path: "deliverables",
        element: <Deliverables />,
      },
      {
        path: "deliverables/:id",
        element: <Deliverable />,
      },
      {
        path: "*",
        element: <NotFound resource="Page" />,
      },
    ],
  },
]);

export default router;
