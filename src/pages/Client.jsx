import { Link, useOutletContext, useParams } from "react-router-dom";
import { FolderDot, PackageCheck, Plus } from "lucide-react";
import { useRef } from "react";
import ProjectForm from "../components/ProjectForm";
import TaskForm from "../components/TaskForm";

export default function Client() {
  const { id } = useParams();
  const {
    clientList,
    projectList,
    deliverableList,
    setProjectList,
    taskList,
    setTaskList,
  } = useOutletContext();
  const clientId = parseInt(id, 10);
  const client = clientList.find((client) => client.id === clientId);
  const clientProjects = projectList.filter(
    (project) => project.clientId === clientId,
  );
  const projectForm = useRef();
  const taskForm = useRef();
  const cardsStyle =
    "border mt-5 border-gray-200 rounded-xl p-6 text-sm text-gray-500 hover:border-gray-300 hover:shadow-sm transition flex-1";
  const projectCardStyle =
    "border border-gray-200 rounded-xl p-4 text-sm text-gray-800 hover:border-gray-300 hover:shadow-sm transition";
  const projStatus = "text-xs font-medium px-2.5 py-1 rounded-full self-start";
  const container =
    "flex flex-wrap justify-between border border-gray-200 rounded-md";
  const primaryButt =
    "flex items-center self-center cursor-pointer gap-2 px-4 py-2 rounded-lg text-white bg-blue-600 transition-colors hover:bg-blue-700";
  const clientDeliverables = deliverableList.filter((deliverable) =>
    clientProjects.some((project) => project.id === deliverable.projectId),
  );
  const clientTasks = taskList.filter((task) =>
    clientProjects.some((project) => project.id === task.projectId),
  );

  function handleAddProject() {
    projectForm.current.open({ clientId });
  }

  function handleAddTask() {
    taskForm.current.open({});
  }

  return (
    <div className="max-w-5xl">
      <ProjectForm
        clientList={clientList}
        ref={projectForm}
        setProjectList={setProjectList}
        projectList={projectList}
      />

      <TaskForm
        ref={taskForm}
        projectList={projectList}
        setTaskList={setTaskList}
        taskList={taskList}
      />
      {client ? (
        <>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            {client.name}
          </h1>
          <p className="text-sm text-gray-700">
            Client details and project overview.
          </p>
          <div className={cardsStyle}>
            <div className="flex max-md:flex-col gap-10">
              <div>
                <p className="text-xs">Email</p>
                <p className="text-gray-900 font-semibold">{client.email}</p>
              </div>
              <div>
                <p className="text-xs">Projects</p>
                <p className="text-gray-900 font-semibold">
                  {clientProjects.length}
                </p>
              </div>
            </div>
          </div>
          <section className="mt-10">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
              <button
                className={`${primaryButt} self-start`}
                onClick={handleAddProject}
              >
                <Plus className="size-4" /> Add Project
              </button>
            </div>

            {clientProjects.length > 0 ? (
              <ul className="flex flex-col gap-3 mt-5">
                {clientProjects.map((project) => (
                  <li key={project.id}>
                    <Link
                      className={`${projectCardStyle} flex flex-col gap-2`}
                      to={`/projects/${project.id}`}
                    >
                      <p className="font-medium">{project.name}</p>
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
                      <p className="text-xs text-gray-500">
                        Deadline:{" "}
                        {new Date(project.deadline).toLocaleDateString(
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
                <FolderDot className="size-10 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">
                  No projects yet
                </h2>
                <p className="text-sm text-gray-500 mb-5">
                  Add your first project to get started.
                </p>
                <button className={primaryButt} onClick={handleAddProject}>
                  <Plus className="size-4" /> Add Project
                </button>
              </div>
            )}
          </section>

          <section className="mt-10">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold text-gray-900 my-5">
                Tasks
              </h2>
              <button className={primaryButt} onClick={handleAddTask}>
                <Plus className="size-4" /> Add Task
              </button>
            </div>
            {clientTasks.length > 0 ? (
              <ul className="space-y-2 mt-5">
                {clientTasks.map((task) => {
                  const project = projectList.find(
                    (project) => project.id === task.projectId,
                  );

                  return (
                    <li key={task.id}>
                      <Link
                        to={`/tasks/${task.id}`}
                        className={`${container} p-3 max-md:flex-col hover:border-gray-300 hover:shadow-sm transition`}
                      >
                        <div className="space-y-1 flex flex-col">
                          <p className="font-medium text-gray-900">
                            {task.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {project.name}
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
                        <div className="flex flex-col justify-center items-center">
                          <p className="text-xs text-gray-500">Deadline</p>
                          <p className="text-sm text-gray-700 self-center">
                            {new Date(task.deadline).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="border border-gray-200 rounded-xl p-12 flex flex-col items-center gap-4 text-center max-w-5xl mt-5">
                <PackageCheck className="size-10 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">
                  No tasks yet
                </h2>
                <p className="text-sm text-gray-500 mb-5">
                  Tasks for this client will appear here.
                </p>
              </div>
            )}
          </section>

          <section className="mt-10">
            <h2 className="text-lg font-semibold text-gray-900 my-5">
              Deliverables
            </h2>
            {clientDeliverables.length > 0 ? (
              <ul className="space-y-2 mt-5">
                {clientDeliverables.map((deliverable) => (
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
                  Deliverables for this client will appear here.
                </p>
              </div>
            )}
          </section>
        </>
      ) : (
        <p>Client not found</p>
      )}
    </div>
  );
}
