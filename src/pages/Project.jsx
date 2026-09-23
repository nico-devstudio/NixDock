import { Link, useOutletContext, useParams } from "react-router-dom";
import { ListChecks, PackageCheck, Plus } from "lucide-react";
import { useRef } from "react";
import TaskForm from "../components/TaskForm";
import DeliverableForm from "../components/DeliverableForm";

export default function Project() {
  const { id } = useParams();
  const {
    clientList,
    projectList,
    taskList,
    setTaskList,
    deliverableList,
    setDeliverableList,
  } = useOutletContext();
  const project = projectList.find(
    (project) => project.id === parseInt(id, 10),
  );
  const client = clientList.find(
    (client) => project && client.id === project.clientId,
  );
  const projStatus = "text-xs font-medium px-2.5 py-1 rounded-full self-start";
  const projDetails = "flex justify-between";
  const projDetailLabel = "text-gray-500";
  const actProjOuterProgStyle = "h-2 bg-slate-200 rounded-full mt-3";
  const actProjInnerProgStyle = "h-2 bg-blue-500 rounded-full";
  const primaryButt =
    "flex items-center self-center gap-2 px-2 py-1 rounded-lg text-white bg-blue-600 transition-colors hover:bg-blue-700";
  const projTasks = project
    ? taskList.filter((task) => task.projectId === project.id)
    : [];
  const container =
    "flex flex-wrap justify-between border border-gray-200 rounded-md";
  const projDeliverables = project
    ? deliverableList.filter(
        (deliverable) => deliverable.projectId === project.id,
      )
    : [];
  const taskForm = useRef();
  const deliverableForm = useRef();

  function handleAddTask(id) {
    taskForm.current.open({ projectId: id });
  }

  function handleAddDeliverable() {
    deliverableForm.current.open({ projectId: id });
  }

  return (
    <>
      <TaskForm
        ref={taskForm}
        projectList={projectList}
        setTaskList={setTaskList}
        taskList={taskList}
      />

      <DeliverableForm
        ref={deliverableForm}
        deliverableList={deliverableList}
        projectList={projectList}
        setDeliverableList={setDeliverableList}
      />
      {project ? (
        <div className="flex flex-col gap-2 max-w-5xl">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            {project.name}
          </h1>
          <Link
            to={`/clients/${project.clientId}`}
            className="text-sm text-gray-700"
          >
            Client: {client ? client.name : "No client found"}
          </Link>
          <p className="text-xs text-gray-500">
            Deadline:{" "}
            {new Date(project.deadline).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <div className="flex gap-8">
            <p
              className={
                project.status === "Completed"
                  ? `bg-green-100 text-green-700 ${projStatus}`
                  : project.status === "In Progress"
                    ? `bg-blue-100 text-blue-700 ${projStatus}`
                    : `bg-gray-100 text-gray-600 ${projStatus}`
              }
            >
              {project.status}
            </p>
          </div>

          <section className="mt-10">
            <h2 className="text-lg font-semibold text-gray-900">
              Project Details
            </h2>
            <div className="flex flex-col border border-gray-200 rounded-xl p-6 mt-5 gap-5">
              <div className={projDetails}>
                <p className={projDetailLabel}>Status</p>
                <p className="text-gray-900">{project.status}</p>
              </div>
              <div className={projDetails}>
                <p className={projDetailLabel}>Client</p>
                <p className="text-gray-900">
                  {client ? (
                    <Link
                      to={`/clients/${project.clientId}`}
                      className="hover:text-gray-600"
                    >
                      {client.name}
                    </Link>
                  ) : (
                    "No client found"
                  )}
                </p>
              </div>
              <div className={projDetails}>
                <p className={projDetailLabel}>Deadline</p>
                <p className="text-gray-900">
                  {new Date(project.deadline).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="flex gap-2 relative">
                <p className="text-xs text-gray-500 absolute bottom-3">
                  Progress
                </p>
                <div className={`${actProjOuterProgStyle} flex-1`}>
                  <div
                    className={actProjInnerProgStyle}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500">{project.progress}%</p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold text-gray-900 my-5">
                Tasks
              </h2>
              {projTasks.length > 0 ? (
                <button
                  className={primaryButt}
                  onClick={() => handleAddTask(project.id)}
                >
                  <Plus className="size-4" /> Add Task
                </button>
              ) : null}
            </div>
            {projTasks.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {projTasks.map((task) => (
                  <li key={task.id}>
                    <Link
                      to={`/tasks/${task.id}`}
                      className="justify-between flex border border-gray-200 rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition"
                    >
                      <div className="flex flex-col gap-2">
                        <p className="text-gray-800 font-medium text-base">
                          {task.name}
                        </p>
                        <p
                          className={
                            task.status === "Completed"
                              ? `bg-green-100 text-green-700 ${projStatus}`
                              : task.status === "In Progress"
                                ? `bg-blue-100 text-blue-700 ${projStatus}`
                                : `bg-gray-100 text-gray-600 ${projStatus}`
                          }
                        >
                          {task.status}
                        </p>
                      </div>
                      <p className="self-center text-sm text-gray-500">
                        {new Date(task.deadline).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="border border-gray-200 rounded-xl p-12 flex flex-col items-center gap-4 text-center max-w-5xl mt-5">
                <ListChecks className="size-10 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">
                  No tasks yet
                </h2>
                <p className="text-sm text-gray-500 mb-5">
                  Create your first task to get started.
                </p>
                <button
                  className={primaryButt}
                  onClick={() => handleAddTask(project.id)}
                >
                  <Plus className="size-4" /> Add Task
                </button>
              </div>
            )}
          </section>

          <section className="mt-10">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold text-gray-900 my-5">
                Deliverables
              </h2>
              <button
                className={primaryButt}
                onClick={() => handleAddDeliverable(project.id)}
              >
                <Plus className="size-4" /> Add Deliverable
              </button>
            </div>

            {projDeliverables.length > 0 ? (
              <ul className="space-y-2 mt-5">
                {projDeliverables.map((deliverable) => (
                  <li key={deliverable.id}>
                    <Link
                      to={`/deliverables/${deliverable.id}`}
                      className={`${container} p-3 max-md:flex-col hover:border-gray-300 hover:shadow-sm transition`}
                    >
                      <p>{deliverable.name}</p>
                      <p className="text-gray-400  shrink-0">
                        {new Date(deliverable.date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="border border-gray-200 rounded-xl p-12 flex flex-col items-center gap-4 text-center max-w-5xl mt-5">
                <PackageCheck className="size-10 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">
                  No deliverables yet
                </h2>
                <p className="text-sm text-gray-500 mb-5">
                  Deliverables for this project will appear here.
                </p>
              </div>
            )}
          </section>
        </div>
      ) : (
        <p>Project not found</p>
      )}
    </>
  );
}
