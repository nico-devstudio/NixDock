import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const TaskForm = forwardRef(function TaskForm(
  { setTaskList, taskList, projectList },
  ref,
) {
  const dialog = useRef();
  const [selectedTask, setSelectedTask] = useState();
  const [formData, setFormData] = useState({
    name: "",
    projectId: "",
    status: "",
    deadline: "",
  });
  const selectedProject = projectList.find(
    (project) => project.id === formData.projectId,
  );
  useEffect(() => {
    if (selectedProject && formData.deadline > selectedProject.deadline) {
      setFormData((prev) => ({
        ...prev,
        deadline: "",
      }));
    }
  }, [formData.deadline, selectedProject?.deadline]);

  useImperativeHandle(ref, () => ({
    open({ taskId, projectId }) {
      const task = taskList.find((task) => task.id === taskId);

      setSelectedTask(task);

      if (task) {
        setFormData({
          name: task.name,
          projectId: task.projectId,
          status: task.status,
          deadline: task.deadline,
        });
      } else {
        setSelectedTask(undefined);

        setFormData({
          name: "",
          projectId: projectId || "",
          status: "",
          deadline: "",
        });
      }

      dialog.current.showModal();
    },
  }));

  function handleSubmit(event) {
    event.preventDefault();

    selectedTask
      ? setTaskList((prevList) =>
          prevList.map((task) =>
            task.id === selectedTask.id
              ? {
                  ...formData,
                  id: selectedTask.id,
                  projectId: Number(formData.projectId),
                }
              : task,
          ),
        )
      : setTaskList((prevList) => [
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
            htmlFor="task-name"
            className="text-sm font-medium text-gray-700"
          >
            Task name
          </label>
          <input
            required
            type="text"
            id="task-name"
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
          <label htmlFor="status" className="text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            id="status"
            required
            value={formData.status}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                status: event.target.value,
              }))
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-500"
          >
            <option value="">Select a status</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="To Do">To Do</option>
          </select>
          <label
            htmlFor="deadline"
            className="text-sm font-medium text-gray-700"
          >
            Deadline
          </label>
          <input
            required
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            max={selectedProject?.deadline}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                deadline: event.target.value,
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
              {selectedTask ? "Edit Task" : "Add Task"}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
});

export default TaskForm;
