import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { tasks } from "../data/tasks";
import { deliverables } from "../data/deliverables";
import { apiRequest } from "../api";

export default function RootLayout() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  const savedDeliverables = JSON.parse(localStorage.getItem("deliverables"));

  const [clientList, setClientList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [taskList, setTaskList] = useState(savedTasks || tasks);
  const [deliverableList, setDeliverableList] = useState(
    savedDeliverables || deliverables,
  );

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await apiRequest("/projects");
        setProjectList(data);
      } catch (error) {
        console.error("Failed to load projects:", error);
      }
    }

    loadProjects();
  }, []);

  useEffect(() => {
    async function loadClients() {
      try {
        const data = await apiRequest("/clients");
        setClientList(data);
      } catch (error) {
        console.error("Failed to load clients:", error);
      }
    }

    loadClients();
  }, []);

  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clientList));
    localStorage.setItem("tasks", JSON.stringify(taskList));
    localStorage.setItem("deliverables", JSON.stringify(deliverableList));
  }, [clientList, projectList, taskList, deliverableList]);

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
            deliverableList,
            setDeliverableList,
          }}
        />
      </main>
    </>
  );
}
