import { useRef } from "react";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import DeliverableForm from "../components/DeliverableForm";

export default function Deliverable() {
  const { projectList, clientList, deliverableList, setDeliverableList } =
    useOutletContext();
  const { id } = useParams();
  const deliverableForm = useRef();
  const navigate = useNavigate();
  const deliverable = deliverableList.find(
    (deliverable) => deliverable.id === parseInt(id, 10),
  );
  const project =
    deliverable &&
    projectList.find((project) => project.id === deliverable.projectId);
  const deleteButt =
    "px-4 py-2 cursor-pointer  text-base rounded-lg text-red-600 border border-transparent hover:text-red-900 hover:bg-red-50 hover:border-red-200 transition-colors";
  const editButt =
    "px-4 py-2 cursor-pointer text-base rounded-lg text-blue-600 border border-transparent hover:text-blue-900 hover:bg-blue-50 hover:border-blue-200 transition-colors";

  const client =
    project && clientList.find((client) => client.id === project.clientId);

  function handleDeleteDeliverable(id, name) {
    const confirmed = confirm(`Are you sure you want to delete ${name}?`);

    if (confirmed) {
      setDeliverableList((prevList) =>
        prevList.filter((list) => list.id !== id),
      );
      navigate("/deliverables");
    }
  }

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Deliverable</h1>

      <DeliverableForm
        ref={deliverableForm}
        setDeliverableList={setDeliverableList}
        deliverableList={deliverableList}
        projectList={projectList}
      />

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
            <button
              className={editButt}
              onClick={() =>
                deliverableForm.current.open({ deliverableId: deliverable.id })
              }
            >
              Edit
            </button>
            <button
              className={deleteButt}
              onClick={() =>
                handleDeleteDeliverable(deliverable.id, deliverable.name)
              }
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <p>No Deliverables found.</p>
      )}
    </>
  );
}
