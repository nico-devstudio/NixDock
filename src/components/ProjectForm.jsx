import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { apiRequest } from "../api";

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
  });
  const today = new Date();
  const minDate = today.toISOString().slice(0, 10);

  useImperativeHandle(ref, () => ({
    open({ projectId, clientId }) {
      const project = projectList.find((project) => project.id === projectId);
      setSelectedProject(project);

      if (project) {
        setFormData({
          name: project.name,
          clientId: project.clientId,
          status: project.status,
          deadline: project.deadline ? project.deadline.slice(0, 10) : "",
        });
      } else {
        setSelectedProject(undefined);

        setFormData({
          name: "",
          clientId: clientId || "",
          status: "",
          deadline: "",
        });
      }

      dialog.current.showModal();
    },
  }));

  async function handleSubmit(event) {
    event.preventDefault();

    const projectData = {
      name: formData.name.trim(),
      clientId: formData.clientId === "" ? null : Number(formData.clientId),
      status: formData.status,
      deadline: formData.deadline || null,
    };

    try {
      if (selectedProject) {
        const updatedProject = await apiRequest(
          `/projects/${selectedProject.id}`,
          {
            method: "PUT",
            body: JSON.stringify(projectData),
          },
        );

        setProjectList((prevList) =>
          prevList.map((project) =>
            project.id === selectedProject.id
              ? {
                  ...project,
                  ...updatedProject,
                  clientId: updatedProject.client_id ?? updatedProject.clientId,
                  deadline: projectData.deadline,
                }
              : project,
          ),
        );
      } else {
        const newProject = await apiRequest("/projects", {
          method: "POST",
          body: JSON.stringify(projectData),
        });

        setProjectList((prevList) => [
          ...prevList,
          {
            ...newProject,
            clientId: newProject.client_id ?? newProject.clientId,
            deadline: projectData.deadline,
          },
        ]);
      }

      dialog.current.close();
    } catch (error) {
      console.error("Failed to save project:", error);
      alert(error.message || "Failed to save project.");
    }
  }

  return (
    <>
      <dialog
        ref={dialog}
        className="rounded-xl border border-gray-200 p-6 shadow-lg w-full max-w-md m-auto"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label
            htmlFor="project-name"
            className="text-sm font-medium text-gray-700"
          >
            Project name
          </label>
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
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-500"
          />
          <label htmlFor="client" className="text-sm font-medium text-gray-700">
            Client
          </label>
          <select
            name="clientId"
            id="client"
            value={formData.clientId}
            onChange={(event) => {
              setFormData((prev) => ({
                ...prev,
                clientId:
                  event.target.value === "" ? "" : Number(event.target.value),
              }));
            }}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-500"
          >
            <option value="">No client (optional)</option>
            {clientList.map((client) => (
              <option value={client.id} key={client.id}>
                {client.name}
              </option>
            ))}
          </select>
          <label htmlFor="status" className="text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            required
            name="status"
            id="status"
            value={formData.status}
            onChange={(event) => {
              setFormData((prev) => ({
                ...prev,
                status: event.target.value,
              }));
            }}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-500"
          >
            <option value="">Select a status</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Not Started">Not Started</option>
          </select>
          <label
            htmlFor="deadline"
            className="text-sm font-medium text-gray-700"
          >
            Deadline
          </label>
          <input
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-500"
            type="date"
            min={minDate}
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
              {selectedProject ? "Edit Project" : "Add Project"}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
});

export default ProjectForm;
