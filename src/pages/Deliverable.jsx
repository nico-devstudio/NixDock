import { Link, useParams } from "react-router-dom";
import { deliverables } from "../data/deliverables";
import { projects } from "../data/projects";
import { clients } from "../data/clients";

export default function Deliverable() {
  const { id } = useParams();
  const deliverable = deliverables.find(
    (deliverable) => deliverable.id === parseInt(id, 10),
  );
  const project =
    deliverable &&
    projects.find((project) => project.id === deliverable.projectId);

  const client =
    project && clients.find((client) => client.id === project.clientId);

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Deliverable</h1>

      {deliverable ? (
        <div className="border border-gray-200 rounded-xl p-6 max-w-5xl">
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-gray-900 font-medium mt-1">
                {deliverable.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="text-gray-900 font-medium mt-1">
                {new Date(deliverable.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Project</p>
              <p className="text-gray-900 font-medium mt-1">
                {project ? (
                  <Link
                    className="hover:text-gray-600"
                    to={`/projects/${project.id}`}
                  >
                    {project.name}
                  </Link>
                ) : (
                  "Project not found"
                )}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Client</p>
              <p className="text-gray-900 font-medium mt-1">
                {client ? (
                  <Link
                    to={`/clients/${client.id}`}
                    className="hover:text-gray-600"
                  >
                    {client.name}
                  </Link>
                ) : (
                  "Client not found"
                )}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p>No Deliverables found.</p>
      )}
    </>
  );
}
