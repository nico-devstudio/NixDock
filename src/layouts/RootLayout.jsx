// import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { clients } from "../data/clients";
import { useEffect, useState } from "react";
import { projects } from "../data/projects";
import { tasks } from "../data/tasks";

export default function RootLayout() {
  const savedClients = JSON.parse(localStorage.getItem("clients"));
  const savedProjects = JSON.parse(localStorage.getItem("projects"));
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  const [clientList, setClientList] = useState(savedClients || clients);
  const [projectList, setProjectList] = useState(savedProjects || projects);
  const [taskList, setTaskList] = useState(savedTasks || tasks);

  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clientList));
    localStorage.setItem("projects", JSON.stringify(projectList));
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [clientList, projectList, taskList]);

  return (
    <>
      <Header />
      <Sidebar />
      <main className="bg-white p-8 ml-16 md:ml-60 mt-20">
        <Outlet
          context={{
            clientList,
            setClientList,
            projectList,
            setProjectList,
            taskList,
            setTaskList,
          }}
        />
      </main>
    </>
  );
}
