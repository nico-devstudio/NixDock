import { useParams } from "react-router-dom";
import { deliverables } from "../data/deliverables";
import { projects } from "../data/projects";

export default function Deliverable() {
  const { id } = useParams();
  const deliverable = deliverables.find(
    (deliverable) => deliverable.id === parseInt(id, 10),
  );
  const project =
    deliverable &&
    projects.find((project) => project.id === deliverable.projectId);

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
                {project ? project.name : "Project not found"}
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
