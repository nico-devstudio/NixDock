import { projects } from "../data/projects";
import { clients } from "../data/clients";
import { Link } from "react-router-dom";
import { FolderKanban, Plus } from "lucide-react";

export default function Projects() {
  const projStatus = "text-xs font-medium px-2.5 py-1 rounded-full";
  const primaryButt =
    "flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-blue-600 transition-colors hover:bg-blue-700";
  const actProjOuterProgStyle = "h-2 bg-slate-200 rounded-full mt-3";
  const actProjInnerProgStyle = "h-2 bg-blue-500 rounded-full";

  return (
    <>
      <div className="flex max-md:flex-col justify-between mb-10 max-w-5xl">
        <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
        {projects.length > 0 ? (
          <button className={primaryButt}>
            <Plus className="size-4" /> Add Project
          </button>
        ) : (
          ""
        )}
      </div>
      <ul className="flex flex-col gap-3 max-w-5xl">
        {projects.length > 0 ? (
          projects.map((project) => {
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
                  <div className="flex gap-2">
                    <div className={`${actProjOuterProgStyle} flex-1`}>
                      <div
                        className={actProjInnerProgStyle}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500">{project.progress}%</p>
                  </div>

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
          })
        ) : (
          <div className="border border-gray-200 rounded-xl p-12 flex flex-col items-center gap-4 text-center max-w-5xl mt-5">
            <FolderKanban className="size-10 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900">
              No projects yet
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Create your first project to get started.
            </p>
            <button className={primaryButt}>
              <Plus className="size-4" /> Add Project
            </button>
          </div>
        )}
      </ul>
    </>
  );
}
