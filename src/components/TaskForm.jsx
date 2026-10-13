import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { apiRequest } from "../api";

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
  const today = new Date();
  const minDate = today.toISOString().slice(0, 10);

  useEffect(() => {
    const selectedProjectDeadline = selectedProject?.deadline;
    if (
      selectedProjectDeadline &&
      formData.deadline > selectedProjectDeadline
    ) {
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
          deadline: task.deadline.slice(0, 10),
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

  async function handleSubmit(event) {
    event.preventDefault();

    const taskData = {
      ...formData,
      projectId: Number(formData.projectId),
    };

    try {
      if (selectedTask) {
        const updatedTask = await apiRequest(`/tasks/${selectedTask.id}`, {
          method: "PUT",
          body: JSON.stringify(taskData),
        });

        setTaskList((prevList) =>
          prevList.map((task) =>
            task.id === selectedTask.id ? updatedTask : task,
          ),
        );
      } else {
        const newTask = await apiRequest("/tasks", {
          method: "POST",
          body: JSON.stringify(taskData),
        });

        setTaskList((prevList) => [...prevList, newTask]);
      }

      dialog.current.close();
    } catch (error) {
      console.error("Failed to save task:", error);
      alert(error.message);
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
            min={minDate}
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
