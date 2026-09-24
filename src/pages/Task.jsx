import { useRef } from "react";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import TaskForm from "../components/TaskForm";
import NotFound from "../components/NotFound";

export default function Task() {
  const { id } = useParams();
  const taskForm = useRef();
  const navigate = useNavigate();
  const { taskList, projectList, clientList, setTaskList } = useOutletContext();
  const task = taskList.find((task) => task.id === parseInt(id, 10));
  const project =
    task && projectList.find((project) => project.id === task.projectId);
  const client =
    project && clientList.find((client) => project.clientId === client.id);
  const statusStyle = "text-xs font-medium px-2.5 py-1 rounded-full self-start";
  const deleteButt =
    "px-4 py-2 cursor-pointer  text-base rounded-lg text-red-600 border border-transparent hover:text-red-900 hover:bg-red-50 hover:border-red-200 transition-colors";
  const editButt =
    "px-4 py-2 cursor-pointer text-base rounded-lg text-blue-600 border border-transparent hover:text-blue-900 hover:bg-blue-50 hover:border-blue-200 transition-colors";

  function handleDeleteTask(id, name) {
    const confirmed = confirm(`Are you sure you want to delete ${name}?`);

    if (confirmed) {
      setTaskList((prevList) => prevList.filter((list) => list.id !== id));
      navigate("/tasks");
    }
  }

  return task ? (
    <>
      <div className="flex flex-col gap-2 mb-10 ">
        <h1 className="text-2xl font-semibold text-gray-900">{task.name}</h1>
        {project ? (
          <Link
            to={`/projects/${task.projectId}`}
            className="text-sm text-gray-700 hover:text-gray-900"
          >
            Project: {project.name}
          </Link>
        ) : (
          <p className="text-gray-500">No project found.</p>
        )}
        <p
          className={
            task.status === "Completed"
              ? `bg-green-100 text-green-700 ${statusStyle}`
              : task.status === "In Progress"
                ? `bg-blue-100 text-blue-700 ${statusStyle}`
                : `bg-gray-100 text-gray-600 ${statusStyle}`
          }
        >
          {task.status}
        </p>
      </div>

      <TaskForm
        ref={taskForm}
        taskList={taskList}
        setTaskList={setTaskList}
        projectList={projectList}
      />

      <section className="max-w-5xl">
        <h2 className="text-lg font-semibold text-gray-900">Task Details</h2>
        <div className="border border-gray-200 rounded-xl p-6 mt-4 flex flex-col gap-6">
          <div className="flex justify-between">
            <p className="text-gray-500">Status</p>
            <p>{task.status}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500">Project</p>
            {project ? (
              <Link
                to={`/projects/${task.projectId}`}
                className="hover:text-gray-600"
              >
                {project.name}
              </Link>
            ) : (
              <p className="text-gray-500">No project found.</p>
            )}
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500">Client</p>
            {client ? (
              <Link
                to={`/clients/${client.id}`}
                className="hover:text-gray-600"
              >
                {client.name}
              </Link>
            ) : (
              <p className="text-gray-500">No client found.</p>
            )}
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500">Deadline</p>
            <p>
              {new Date(task.deadline).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex flex-col justify-center">
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
        </div>
      </section>
    </>
  ) : (
    <NotFound resource="Task" />
  );
}
