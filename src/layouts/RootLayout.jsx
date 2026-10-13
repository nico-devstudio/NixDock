import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiRequest } from "../api";

export default function RootLayout() {
  const [clientList, setClientList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [deliverableList, setDeliverableList] = useState([]);

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
    async function loadTasks() {
      try {
        const data = await apiRequest("/tasks");
        setTaskList(data);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    }

    loadTasks();
  }, []);

  useEffect(() => {
    async function loadDeliverables() {
      try {
        const data = await apiRequest("/deliverables");
        setDeliverableList(data);
      } catch (error) {
        console.error("Failed to load deliverables:", error);
      }
    }

    loadDeliverables();
  }, []);

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
