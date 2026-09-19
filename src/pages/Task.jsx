import { Link, useParams } from "react-router-dom";
import { tasks } from "../data/tasks";
import { projects } from "../data/projects";
import { clients } from "../data/clients";

export default function Task() {
  const { id } = useParams();
  const task = tasks.find((task) => task.id === parseInt(id, 10));
  const project =
    task && projects.find((project) => project.id === task.projectId);
  const client =
    project && clients.find((client) => project.clientId === client.id);
  const statusStyle = "text-xs font-medium px-2.5 py-1 rounded-full self-start";

  return task ? (
    <>
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-2xl font-semibold text-gray-900">{task.name}</h1>
        <Link to={`/projects/${task.projectId}`}>
          <p className="text-sm text-gray-700 hover:text-gray-900">
            Project: {project.name}
          </p>
        </Link>
        <p
          className={
            task.status === "Completed"
              ? `bg-green-100 text-green-700 ${statusStyle}`
              : task.status === "In Progress"
                ? `bg-blue-100 text-blue-700 ${statusStyle}`
                : `bg-gray-100 text-gray-600 ${statusStyle}`
          }
        >
          {task.status}
        </p>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-gray-900">Task Details</h2>
        <div className="border border-gray-200 rounded-xl p-6 mt-4 flex flex-col gap-6">
          <div className="flex justify-between">
            <p className="text-gray-500">Status</p>
            <p>{task.status}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500">Project</p>
            <Link to={`/projects/${task.projectId}`}>
              <p className="hover:text-gray-600">{project.name}</p>
            </Link>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500">Client</p>
            <Link to={`/clients/${client.id}`} className="hover:text-gray-600">
              <p>{client.name}</p>
            </Link>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500">Deadline</p>
            <p>
              {new Date(task.deadline).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </section>
    </>
  ) : (
    "Task not found."
  );
}
