import { Link } from "react-router-dom";
import { deliverables } from "../data/deliverables";
import { projects } from "../data/projects";
import { PackageCheck, Plus } from "lucide-react";

export default function Deliverables() {
  const container =
    "flex flex-wrap justify-between border border-gray-200 rounded-md";
  const mutedText = "text-gray-400";
  const primaryButt =
    "flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-blue-600 transition-colors hover:bg-blue-700";

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900">Deliverables</h1>
      <ul className="space-y-2 mt-5 max-w-5xl">
        {deliverables.length > 0 ? (
          deliverables.map((deliverable) => {
            const project = projects.find(
              (project) => project.id === deliverable.projectId,
            );
            return (
              <li key={deliverable.id}>
                <Link
                  to={`/deliverables/${deliverable.id}`}
                  className={`${container} p-3 max-md:flex-col items-center hover:border-gray-300 hover:shadow-sm transition`}
                >
                  <div>
                    <p className="text-gray-900 font-medium text-base">
                      {deliverable.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {project ? project.name : "No project found."}
                    </p>
                  </div>
                  <p className={`${mutedText} shrink-0`}>
                    {new Date(deliverable.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </Link>
              </li>
            );
          })
        ) : (
          <div className="border border-gray-200 rounded-xl p-12 flex flex-col items-center gap-4 text-center max-w-5xl mt-5">
            <PackageCheck className="size-10 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900">
              No deliverables yet
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Add your first deliverable to get started.
            </p>
            <button className={primaryButt}>
              <Plus className="size-4" /> Add Deliverable
            </button>
          </div>
        )}
      </ul>
    </>
  );
}
