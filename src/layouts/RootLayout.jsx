// import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Dashboard from "../pages/Dashboard";

export default function RootLayout() {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="bg-white p-8 ml-40 md:ml-60 mt-20">
        <Dashboard />
      </main>
    </>
  );
}
