import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function RootLayout() {
  return (
    <>
      <header className="fixed top-0 right-0 left-0 p-3 font-medium text-xl z-10">
        NixDock
      </header>

      <Sidebar />

      <main className="bg-white p-8 ml-60 mt-20">
        Dummy
        <Outlet />
      </main>
    </>
  );
}
