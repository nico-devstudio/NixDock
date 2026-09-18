import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Projects from "./pages/Projects";
import Clients from "./pages/Clients";
import Tasks from "./pages/Tasks";
import Client from "./components/Client";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Project from "./pages/Project";

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
    ],
  },
]);

export default router;
