import { projects } from "../data/projects";
import { clients } from "../data/clients";
import { Link } from "react-router-dom";

export default function Projects() {
  const projStatus = "text-xs font-medium px-2.5 py-1 rounded-full";

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900 mb-5">Projects</h1>
      <ul className="flex flex-col gap-3 max-w-5xl">
        {projects.map((project) => {
          const client = clients.find(
            (client) => client.id === project.clientId,
          );
          return (
            <li
              key={project.id}
              className="border border-gray-200 rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition"
            >
              <Link
                to={`/projects/${project.id}`}
                className="flex flex-col gap-2"
              >
                <p className="text-gray-900 font-medium text-base">
                  {project.name}
                </p>
                <p className="text-sm text-gray-500">
                  {client ? client.name : "No client found"}
                </p>

                <div className="flex justify-between items-center">
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
                    {new Date(project.deadline).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
