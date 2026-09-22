import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const TaskForm = forwardRef(function TaskForm(
  { setTaskList, taskList, projectList },
  ref,
) {
  const dialog = useRef();
  const [selectedTask, setSelectedTask] = useState();

  useImperativeHandle(ref, () => ({
    open(id) {
      const task = taskList.find((Task) => Task.id === id);
      setSelectedTask(task);
      dialog.current.showModal();
    },
  }));

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    selectedTask
      ? setTaskList((prevList) => {
          return prevList.map((list) => {
            if (list.id === selectedTask.id) {
              const updatedTask = {
                ...data,
                id: selectedTask.id,
                projectId: parseInt(data.projectId, 10),
              };
              return updatedTask;
            }

            return list;
          });
        })
      : setTaskList((prevList) => {
          const newData = {
            ...data,
            id: Date.now(),
            projectId: parseInt(data.projectId, 10),
          };
          const newTask = [...prevList, newData];
          return newTask;
        });

    dialog.current.close();
    event.target.reset();
  }

  return (
    <>
      <dialog ref={dialog}>
        <form onSubmit={handleSubmit} key={selectedTask?.id}>
          <label htmlFor="task-name">Task name</label>
          <input
            required
            type="text"
            id="task-name"
            name="name"
            defaultValue={selectedTask?.name}
          />
          <select
            name="projectId"
            id="project"
            required
            defaultValue={selectedTask?.projectId}
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
            defaultValue={selectedTask?.status}
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
            defaultValue={selectedTask?.deadline}
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
