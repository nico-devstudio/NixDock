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
    console.log("date:", formData.date);
    console.log("selected project:", selectedProject);
    console.log("project deadline:", selectedProject?.deadline);
    if (selectedProject && formData.date > selectedProject.deadline) {
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
      <dialog ref={dialog}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="deliverable-name">Deliverable name</label>
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
          />
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
          >
            <option value="">Select a project</option>
            {projectList.map((project) => (
              <option value={project.id} key={project.id}>
                {project.name}
              </option>
            ))}
          </select>
          <label htmlFor="date">Date</label>
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
          />
          <button type="button" onClick={() => dialog.current.close()}>
            Cancel
          </button>
          <button type="submit">
            {selectedDeliverable ? "Edit deliverable" : "Add deliverable"}
          </button>
        </form>
      </dialog>
    </>
  );
});

export default DeliverableForm;
