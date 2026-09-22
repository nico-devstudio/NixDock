import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const ProjectForm = forwardRef(function ProjectForm(
  { clientList, setProjectList, projectList },
  ref,
) {
  const dialog = useRef();
  const [selectedProject, setSelectedProject] = useState();
  const [formData, setFormData] = useState({
    name: "",
    clientId: "",
    status: "",
    deadline: "",
    progress: 0,
  });

  useImperativeHandle(ref, () => ({
    open(id) {
      const project = projectList.find((project) => project.id === id);
      setSelectedProject(project);

      if (project) {
        setFormData({
          name: project.name,
          clientId: project.clientId,
          status: project.status,
          deadline: project.deadline,
          progress: Number(project.progress),
        });
      } else {
        setSelectedProject(undefined);

        setFormData({
          name: "",
          clientId: "",
          status: "",
          deadline: "",
          progress: 0,
        });
      }

      dialog.current.showModal();
    },
  }));

  function handleSubmit(event) {
    event.preventDefault();

    selectedProject
      ? setProjectList((prevList) =>
          prevList.map((project) =>
            project.id === selectedProject.id
              ? {
                  ...formData,
                  id: selectedProject.id,
                  clientId: Number(formData.clientId),
                }
              : project,
          ),
        )
      : setProjectList((prevList) => [
          ...prevList,
          {
            ...formData,
            id: Date.now(),
            clientId: Number(formData.clientId),
          },
        ]);
    dialog.current.close();
    event.target.reset();
  }

  return (
    <>
      <dialog ref={dialog}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="project-name">Project name</label>
          <input
            required
            type="text"
            id="project-name"
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
            name="clientId"
            id="client"
            required
            value={formData.clientId}
            onChange={(event) => {
              setFormData((prev) => ({
                ...prev,
                clientId: Number(event.target.value),
              }));
            }}
          >
            <option value="">Select a client</option>
            {clientList.map((client) => (
              <option value={client.id} key={client.id}>
                {client.name}
              </option>
            ))}
          </select>
          <select
            name="status"
            id="status"
            value={formData.status}
            onChange={(event) => {
              setFormData((prev) => ({
                ...prev,
                status: event.target.value,
              }));
            }}
          >
            <option value="">Select a status</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Not Started">Not Started</option>
          </select>
          <label htmlFor="deadline">Deadline</label>
          <input
            required
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                deadline: event.target.value,
              }))
            }
          />
          <button type="button" onClick={() => dialog.current.close()}>
            Cancel
          </button>
          <button type="submit">
            {selectedProject ? "Edit Project" : "Add Project"}
          </button>
        </form>
      </dialog>
    </>
  );
});

export default ProjectForm;
