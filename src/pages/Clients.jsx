import { Plus, UsersRound } from "lucide-react";
import { Link, useOutletContext } from "react-router-dom";
import { useRef } from "react";
import ClientForm from "../components/ClientForm";

export default function Clients() {
  const cardsStyle =
    "flex justify-between border border-gray-200 rounded-xl p-6 text-sm text-gray-800 cursor-pointer hover:border-gray-300 hover:shadow-sm transition";
  const mutedText = "text-gray-400 my-auto";
  const nameStyle = "text-gray-900 font-semibold text-base";
  const primaryButt =
    "flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-blue-600 transition-colors hover:bg-blue-700";
  const deleteButt =
    "px-4 py-2 cursor-pointer self-center text-md rounded-lg text-red-600 border border-transparent hover:text-red-900 hover:bg-red-50 hover:border-red-200 transition-colors";
  const clientForm = useRef();
  const { clientList, setClientList } = useOutletContext();

  function handleAddClient() {
    clientForm.current.open();
  }

  function handleDeleteClient(id, name) {
    const confirmed = confirm(`Are you sure you want to delete ${name}?`);

    confirmed &&
      setClientList((prevList) => prevList.filter((list) => list.id !== id));
  }

  return (
    <div className="max-w-5xl">
      <div className="flex max-md:flex-col justify-between mb-5">
        <h1 className="text-2xl font-semibold text-gray-900 mt-1 mb-2">
          Clients
        </h1>
        {clientList.length > 0 ? (
          <button className={primaryButt} onClick={handleAddClient}>
            <Plus className="size-4" /> Add Client
          </button>
        ) : (
          ""
        )}
      </div>

      <ClientForm ref={clientForm} setList={setClientList} />

      <p className="text-sm text-gray-700 mb-10">
        Manage your clients and their projects.
      </p>

      <section className="flex gap-4 flex-col max-w-5xl">
        {clientList.length > 0 ? (
          clientList.map((client) => (
            <div key={client.id} className={cardsStyle}>
              <Link
                to={`/clients/${client.id}`}
                className="flex flex-col flex-1  gap-2 "
              >
                <p className={nameStyle}>{client.name}</p>
                <p className={`${mutedText} wrap-break-word`}>{client.email}</p>

                <p className={`${mutedText} shrink-0`}>
                  {client.projects}{" "}
                  {client.projects > 1 ? "Projects" : "Project"}
                </p>
              </Link>
              <button
                className={deleteButt}
                onClick={() => handleDeleteClient(client.id, client.name)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <div className="border border-gray-200 rounded-xl p-12 flex flex-col items-center gap-4 text-center max-w-5xl mt-5">
            <UsersRound className="size-10 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900">
              No clients yet
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Add your first client to get started.
            </p>
            <button className={primaryButt} onClick={handleAddClient}>
              <Plus className="size-4" /> Add Client
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
