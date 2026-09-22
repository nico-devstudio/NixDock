import { Link, useOutletContext } from "react-router-dom";
import { ListChecks, Plus } from "lucide-react";
import TaskForm from "../components/TaskForm";
import { useRef } from "react";

export default function Tasks() {
  const status = "text-xs font-medium px-2.5 py-1 rounded-full";
  const primaryButt =
    "flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-blue-600 transition-colors hover:bg-blue-700";
  const deleteButt =
    "px-4 py-2 cursor-pointer self-center text-base rounded-lg text-red-600 border border-transparent hover:text-red-900 hover:bg-red-50 hover:border-red-200 transition-colors";
  const editButt =
    "px-4 py-2 cursor-pointer text-base rounded-lg text-blue-600 border border-transparent hover:text-blue-900 hover:bg-blue-50 hover:border-blue-200 transition-colors";
  const { taskList, setTaskList, clientList, projectList } = useOutletContext();
  const taskForm = useRef();

  function handleAddTask() {
    taskForm.current.open({});
  }

  function handleDeleteTask(id, name) {
    const confirmed = confirm(`Are you sure you want to delete ${name}?`);

    confirmed &&
      setTaskList((prevList) => prevList.filter((list) => list.id !== id));
  }

  return (
    <>
      <div className="flex max-md:flex-col justify-between mb-10 max-w-5xl">
        <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
        {taskList.length > 0 ? (
          <button className={primaryButt} onClick={handleAddTask}>
            <Plus className="size-4" /> Add Task
          </button>
        ) : (
          ""
        )}
      </div>

      <TaskForm
        ref={taskForm}
        taskList={taskList}
        setTaskList={setTaskList}
        projectList={projectList}
      />

      <ul className="flex flex-col gap-3 max-w-5xl">
        {taskList.length > 0 ? (
          taskList.map((task) => {
            const project = projectList.find(
              (project) => project.id === task.projectId,
            );
            const client = clientList.find(
              (client) => project && project.clientId === client.id,
            );

            return (
              <li key={task.id} className="relative">
                <Link
                  to={`/tasks/${task.id}`}
                  className="border border-gray-200 rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition flex flex-col gap-2"
                >
                  <p className="text-gray-900 font-medium text-base">
                    {task.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {project ? project.name : "No project found."}
                  </p>
                  <p className="text-xs text-gray-400">
                    {client ? client.name : "No client found."}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <p
                      className={
                        task.status === "Completed"
                          ? `bg-green-100 text-green-700 ${status}`
                          : task.status === "In Progress"
                            ? `bg-blue-100 text-blue-700 ${status}`
                            : `bg-gray-100 text-gray-600 ${status}`
                      }
                    >
                      {task.status}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(task.deadline).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </Link>
                <div className="absolute top-3 right-2 z-10">
                  <button
                    className={editButt}
                    onClick={() => taskForm.current.open({ taskId: task.id })}
                  >
                    Edit
                  </button>
                  <button
                    className={deleteButt}
                    onClick={() => handleDeleteTask(task.id, task.name)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })
        ) : (
          <div className="border border-gray-200 rounded-xl p-12 flex flex-col items-center gap-4 text-center max-w-5xl mt-5">
            <ListChecks className="size-10 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900">
              No tasks yet
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Create your first task to get started.
            </p>
            <button className={primaryButt} onClick={handleAddTask}>
              <Plus className="size-4" /> Add Task
            </button>
          </div>
        )}
      </ul>
    </>
  );
}
