import { Link, useParams } from "react-router-dom";
import { clients } from "../data/clients";
import { projects } from "../data/projects";

export default function Client() {
  const { id } = useParams();
  const client = clients.find((client) => client.id === parseInt(id, 10));
  const clientProjects = projects.filter(
    (project) => project.clientId === parseInt(id, 10),
  );
  const cardsStyle =
    "border mt-5 border-gray-200 rounded-xl p-6 text-sm text-gray-500 hover:border-gray-300 hover:shadow-sm transition flex-1";
  const projectCardStyle =
    "border border-gray-200 rounded-xl p-4 text-sm text-gray-800 hover:border-gray-300 hover:shadow-sm transition";
  const projStatus = "text-xs font-medium px-2.5 py-1 rounded-full self-start";

  return (
    <div className="max-w-5xl">
      {client ? (
        <>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            {client.name}
          </h1>
          <p className="text-sm text-gray-700">
            Client details and project overview.
          </p>
          <div className={cardsStyle}>
            <div className="flex max-md:flex-col gap-10">
              <div>
                <p className="text-xs">Email</p>
                <p className="text-gray-900 font-semibold">{client.email}</p>
              </div>
              <div>
                <p className="text-xs">Projects</p>
                <p className="text-gray-900 font-semibold">{client.projects}</p>
              </div>
            </div>
          </div>
          <section className="mt-10">
            <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
            <ul className="flex flex-col gap-3 mt-5">
              {clientProjects.map((project) => (
                <li key={project.id}>
                  <Link
                    className={`${projectCardStyle} flex flex-col gap-2`}
                    to={`/projects/${project.id}`}
                  >
                    <p className="font-medium">{project.name}</p>
                    <p
                      className={
                        project.status === "Completed"
                          ? `bg-green-100 text-green-700 ${projStatus}`
                          : project.status === "In Progress"
                            ? `bg-blue-100 text-blue-700 ${projStatus}`
                            : `bg-gray-100 text-gray-600 ${projStatus}`
                      }
                    >
                      {project.status}
                    </p>
                    <p className="text-xs text-gray-500">
                      Deadline:{" "}
                      {new Date(project.deadline).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </>
      ) : (
        <p>Client not found</p>
      )}
    </div>
  );
}
