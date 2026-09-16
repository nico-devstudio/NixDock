// import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Clients from "../pages/Clients";

export default function RootLayout() {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="bg-white p-8 ml-16 md:ml-60 mt-20">
        <Clients />
      </main>
    </>
  );
}
