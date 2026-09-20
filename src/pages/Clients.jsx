import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { clients } from "../data/clients";
import { useEffect, useRef, useState } from "react";
import ClientForm from "../components/ClientForm";

export default function Clients() {
  const cardsStyle =
    "flex justify-between border border-gray-200 rounded-xl p-6 text-sm text-gray-800 cursor-pointer hover:border-gray-300 hover:shadow-sm transition";
  const mutedText = "text-gray-400 my-auto";
  const nameStyle = "text-gray-900 font-semibold text-base";
  const primaryButt =
    "flex items-center gap-2 self-start px-4 py-2 rounded-lg text-white bg-blue-600 transition-colors hover:bg-blue-700";
  const deleteButt =
    "px-4 py-2 cursor-pointer self-center text-md rounded-lg text-red-600 border border-transparent hover:text-red-900 hover:bg-red-50 hover:border-red-200 transition-colors";
  const clientForm = useRef();

  const savedClients = JSON.parse(localStorage.getItem("clients"));
  const [clientList, setClientList] = useState(savedClients || clients);

  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clientList));
  }, [clientList]);

  function handleAddClient() {
    clientForm.current.open();
  }

  function handleDeleteClient() {}

  return (
    <div className="max-w-5xl">
      <div className="flex max-md:flex-col justify-between mb-10">
        <h1 className="text-2xl font-semibold text-gray-900 mt-1 mb-2">
          Clients
        </h1>
        <button className={primaryButt} onClick={handleAddClient}>
          <Plus className="size-4" /> Add Client
        </button>
      </div>

      <ClientForm ref={clientForm} setList={setClientList} />

      <p className="text-sm text-gray-700 mb-10">
        Manage your clients and their projects.
      </p>

      <section className="flex gap-4 flex-col max-w-5xl">
        {clientList.map((client) => (
          <div key={client.id} className={cardsStyle}>
            <Link
              to={`/clients/${client.id}`}
              className="flex flex-col flex-1  gap-2 "
            >
              <p className={nameStyle}>{client.name}</p>
              <p className={`${mutedText} wrap-break-word`}>{client.email}</p>

              <p className={`${mutedText} shrink-0`}>
                {client.projects} {client.projects > 1 ? "Projects" : "Project"}
              </p>
            </Link>
            <button className={deleteButt}>Delete</button>
          </div>
        ))}
      </section>
    </div>
  );
}
