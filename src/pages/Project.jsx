import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";
import { clients } from "../data/clients";
import { tasks } from "../data/tasks";

export default function Project() {
  const { id } = useParams();
  const project = projects.find((project) => project.id === parseInt(id, 10));
  const client = clients.find(
    (client) => project && client.id === project.clientId,
  );
  const projStatus = "text-xs font-medium px-2.5 py-1 rounded-full self-start";
  const projDetails = "flex justify-between";
  const projDetailLabel = "text-gray-500";
  const projTasks = project
    ? tasks.filter((task) => task.projectId === project.id)
    : [];

  return (
    <>
      {project ? (
        <div className="flex flex-col gap-2 max-w-5xl">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            {project.name}
          </h1>
          <Link
            to={`/clients/${project.clientId}`}
            className="text-sm text-gray-700"
          >
            Client: {client ? client.name : "No client found"}
          </Link>
          <div className="flex gap-8">
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
          </div>

          <section className="mt-10">
            <h2 className="text-lg font-semibold text-gray-900">
              Project Details
            </h2>
            <div className="flex flex-col border border-gray-200 rounded-xl p-6 mt-5 gap-5">
              <div className={projDetails}>
                <p className={projDetailLabel}>Status</p>
                <p className="text-gray-900">{project.status}</p>
              </div>
              <div className={projDetails}>
                <p className={projDetailLabel}>Client</p>
                <p className="text-gray-900">
                  {client ? client.name : "No client found"}
                </p>
              </div>
              <div className={projDetails}>
                <p className={projDetailLabel}>Deadline</p>
                <p className="text-gray-900">
                  {new Date(project.deadline).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 my-5">Tasks</h2>
            <ul className="flex flex-col gap-2">
              {projTasks.map((task) => (
                <li key={task.id}>
                  <Link
                    to={`/tasks/${task.id}`}
                    className="justify-between flex border border-gray-200 rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition"
                  >
                    <div className="flex flex-col gap-2">
                      <p className="text-gray-800 font-medium text-base">
                        {task.name}
                      </p>
                      <p
                        className={
                          task.status === "Completed"
                            ? `bg-green-100 text-green-700 ${projStatus}`
                            : task.status === "In Progress"
                              ? `bg-blue-100 text-blue-700 ${projStatus}`
                              : `bg-gray-100 text-gray-600 ${projStatus}`
                        }
                      >
                        {task.status}
                      </p>
                    </div>
                    <p className="self-center text-sm text-gray-500">
                      {new Date(task.deadline).toLocaleDateString("en-US", {
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
        </div>
      ) : (
        <p>Project not found</p>
      )}
    </>
  );
}
