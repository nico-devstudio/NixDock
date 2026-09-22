import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const ProjectForm = forwardRef(function ProjectForm(
  { clientList, setProjectList, projectList },
  ref,
) {
  const dialog = useRef();
  const [selectedProject, setSelectedProject] = useState();

  useImperativeHandle(ref, () => ({
    open(id) {
      const project = projectList.find((project) => project.id === id);
      setSelectedProject(project);
      dialog.current.showModal();
    },
  }));

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    selectedProject
      ? setProjectList((prevList) => {
          return prevList.map((list) => {
            if (list.id === selectedProject.id) {
              const updatedProject = {
                ...data,
                id: selectedProject.id,
                progress: selectedProject.progress,
                clientId: parseInt(data.clientId, 10),
              };
              return updatedProject;
            }

            return list;
          });
        })
      : setProjectList((prevList) => {
          const newData = {
            ...data,
            id: Date.now(),
            progress: 0,
            clientId: parseInt(data.clientId, 10),
          };
          const newProject = [...prevList, newData];
          return newProject;
        });

    dialog.current.close();
    event.target.reset();
  }

  return (
    <>
      <dialog ref={dialog}>
        <form onSubmit={handleSubmit} key={selectedProject?.id}>
          <label htmlFor="project-name">Project name</label>
          <input
            required
            type="text"
            id="project-name"
            name="name"
            defaultValue={selectedProject?.name}
          />
          <select
            name="clientId"
            id="client"
            required
            value={selectedProject?.clientId ?? ""}
            onChange={(event) => {
              setSelectedProject((prev) => ({
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
            value={selectedProject?.status ?? ""}
            onChange={(event) => {
              setSelectedProject((prev) => ({
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
            defaultValue={selectedProject?.deadline}
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
