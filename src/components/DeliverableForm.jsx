import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const DeliverableForm = forwardRef(function DeliverableForm(
  { setDeliverableList, deliverableList, projectList },
  ref,
) {
  const dialog = useRef();
  const [selectedDeliverable, setSelectedDeliverable] = useState();
  const [formData, setFormData] = useState({
    name: "",
    projectId: "",
    date: "",
  });
  const selectedProject = projectList.find(
    (project) => project.id === formData.projectId,
  );

  useEffect(() => {
    const selectedProjectDeadline = selectedProject?.deadline;
    if (selectedProjectDeadline && formData.date > selectedProjectDeadline) {
      setFormData((prev) => ({
        ...prev,
        date: "",
      }));
    }
  }, [formData.date, selectedProject?.deadline]);

  useImperativeHandle(ref, () => ({
    open({ deliverableId, projectId }) {
      const deliverable = deliverableList.find(
        (deliverable) => deliverable.id === deliverableId,
      );

      setSelectedDeliverable(deliverable);

      if (deliverable) {
        setFormData({
          name: deliverable.name,
          projectId: deliverable.projectId,
          date: deliverable.date,
        });
      } else {
        setSelectedDeliverable(undefined);

        setFormData({
          name: "",
          projectId: projectId || "",
          date: "",
        });
      }

      dialog.current.showModal();
    },
  }));

  function handleSubmit(event) {
    event.preventDefault();

    selectedDeliverable
      ? setDeliverableList((prevList) =>
          prevList.map((deliverable) =>
            deliverable.id === selectedDeliverable.id
              ? {
                  ...formData,
                  id: selectedDeliverable.id,
                  projectId: Number(formData.projectId),
                }
              : deliverable,
          ),
        )
      : setDeliverableList((prevList) => [
          ...prevList,
          {
            ...formData,
            id: Date.now(),
            projectId: Number(formData.projectId),
          },
        ]);

    dialog.current.close();
  }

  return (
    <>
      <dialog
        ref={dialog}
        className="rounded-xl border border-gray-200 p-6 shadow-lg w-full max-w-md m-auto"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label
            htmlFor="deliverable-name"
            className="text-sm font-medium text-gray-700"
          >
            Deliverable name
          </label>
          <input
            required
            type="text"
            id="deliverable-name"
            name="name"
            value={formData.name}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                name: event.target.value,
              }))
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-500"
          />
          <label
            htmlFor="project"
            className="text-sm font-medium text-gray-700"
          >
            Project
          </label>
          <select
            name="projectId"
            id="project"
            required
            value={formData.projectId}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                projectId: Number(event.target.value),
              }))
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-500"
          >
            <option value="">Select a project</option>
            {projectList.map((project) => (
              <option value={project.id} key={project.id}>
                {project.name}
              </option>
            ))}
          </select>
          <label htmlFor="date" className="text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            required
            type="date"
            id="date"
            name="date"
            max={selectedProject?.deadline}
            value={formData.date}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                date: event.target.value,
              }))
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-500"
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => dialog.current.close()}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              {selectedDeliverable ? "Edit deliverable" : "Add deliverable"}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
});

export default DeliverableForm;
