import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { clients } from "../data/clients";

export default function Clients() {
  const cardsStyle =
    "flex flex-col  md:flex-row gap-5 justify-between border border-gray-200 rounded-xl p-6 text-sm text-gray-800 cursor-pointer hover:border-gray-300 hover:shadow-sm transition";
  const mutedText = "text-gray-400 my-auto";
  const nameStyle = "text-gray-900 font-semibold text-base";
  const primaryButt =
    "flex items-center gap-2 self-start px-4 py-2 rounded-lg text-white bg-blue-600 transition-colors hover:bg-blue-700";

  return (
    <div className="max-w-5xl">
      <div className="flex max-md:flex-col justify-between mb-10">
        <h1 className="text-2xl font-semibold text-gray-900 mt-1 mb-2">
          Clients
        </h1>
        <button className={primaryButt}>
          <Plus className="size-4" /> Add Client
        </button>
      </div>

      <p className="text-sm text-gray-700 mb-10">
        Manage your clients and their projects.
      </p>

      <section className="flex gap-4 flex-col ">
        {clients.map((client) => (
          <Link to={`/clients/${client.id}`} key={client.id}>
            <div className={cardsStyle}>
              <div className="flex-1 min-w-0">
                <p className={nameStyle}>{client.name}</p>
                <p className={`${mutedText} wrap-break-word`}>{client.email}</p>
              </div>
              <p className={`${mutedText} shrink-0`}>
                {client.projects} {client.projects > 1 ? "Projects" : "Project"}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
