import { forwardRef, useImperativeHandle, useRef, useState } from "react";

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
      console.log("formData before opening:", {
        name: task?.name,
        projectId: task?.projectId,
        status: task?.status,
        deadline: task?.deadline,
      });
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
      <dialog ref={dialog}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="task-name">Task name</label>
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
          >
            <option value="">Select a status</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="To Do">To Do</option>
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
            {selectedTask ? "Edit Task" : "Add Task"}
          </button>
        </form>
      </dialog>
    </>
  );
});

export default TaskForm;
