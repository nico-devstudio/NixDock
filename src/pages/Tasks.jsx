import { tasks } from "../data/tasks";
import { projects } from "../data/projects";
import { Link } from "react-router-dom";
import { clients } from "../data/clients";

export default function Tasks() {
  const status = "text-xs font-medium px-2.5 py-1 rounded-full";

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900 mb-5">Tasks</h1>
      <ul className="flex flex-col gap-3 max-w-5xl">
        {tasks.map((task) => {
          const project = projects.find(
            (project) => project.id === task.projectId,
          );
          const client = clients.find(
            (client) => project && project.clientId === client.id,
          );

          return (
            <li key={task.id}>
              <Link
                to={`/tasks/${task.id}`}
                className="border border-gray-200 rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition flex flex-col gap-2"
              >
                <p className="text-gray-900 font-medium text-base">
                  {task.name}
                </p>
                <p className="text-sm text-gray-500">
                  {project ? project.name : "No project found."}
                </p>
                <p className="text-xs text-gray-400">
                  {client ? client.name : "No client found."}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <p
                    className={
                      task.status === "Completed"
                        ? `bg-green-100 text-green-700 ${status}`
                        : task.status === "In Progress"
                          ? `bg-blue-100 text-blue-700 ${status}`
                          : `bg-gray-100 text-gray-600 ${status}`
                    }
                  >
                    {task.status}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(task.deadline).toLocaleDateString("en-US", {
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
