import { Link, useOutletContext } from "react-router-dom";
import { FolderKanban, ListChecks, PackageCheck } from "lucide-react";

export default function Dashboard() {
  const { clientList, projectList, deliverableList, taskList, setTaskList } =
    useOutletContext();
  const cardsStyle =
    "border border-gray-200 rounded-xl p-6 text-sm text-gray-500 hover:border-gray-300 hover:shadow-sm transition flex-1";
  const numbersStyle = "text-2xl text-gray-950 block mt-5 ";
  const container =
    "flex flex-wrap justify-between border border-gray-200 rounded-md";
  const activeProjectTitleStyle = "text-gray-900 font-semibold flex-1";
  const mutedText = "text-gray-400";
  const actProjOuterProgStyle = "h-2 bg-slate-200 rounded-full w-full mt-3";
  const actProjInnerProgStyle = "h-2 bg-blue-500 rounded-full";
  const h2Style = "text-lg font-medium text-gray-800";
  const viewAllStyle =
    "text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors";
  const activeProjects = projectList
    .filter((project) => project.status !== "Completed")
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 3);

  const upcomingTasks = taskList
    .filter(
      (task) =>
        task.status !== "Completed" &&
        new Date(task.deadline) >= new Date().setHours(0, 0, 0, 0),
    )
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 3);

  const recentDeliverables = [...deliverableList]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  function handleTaskComplete(taskId) {
    setTaskList((prevList) => {
      const updatedList = prevList.map((task) =>
        task.id === taskId ? { ...task, status: "Completed" } : task,
      );
      return updatedList;
    });
  }

  return (
    <>
      <div className="max-w-5xl">
        <h1 className="text-2xl font-semibold text-gray-900 mb-10 mt-1 ">
          Dashboard
        </h1>

        <p className="text-sm text-gray-500 mb-10">
          Good morning, Nico. Here's what's happening with your workspace.
        </p>

        <section className="flex flex-col gap-4 md:flex-row">
          <div className={cardsStyle}>
            <p>Clients</p>
            <strong className={numbersStyle}>{clientList.length}</strong>
          </div>
          <div className={cardsStyle}>
            <p>Projects</p>
            <strong className={numbersStyle}>{projectList.length}</strong>
          </div>
          <div className={cardsStyle}>
            <p>Tasks</p>
            <strong className={numbersStyle}>{taskList.length}</strong>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex justify-between items-center mb-3">
            <h2 className={h2Style}>Active Projects</h2>
            <Link to="/projects" className={viewAllStyle}>
              View all
            </Link>
          </div>
          {activeProjects.length > 0 ? (
            <ul className="space-y-5">
              {activeProjects.map((activeProj) => (
                <li key={activeProj.id}>
                  <Link to={`/projects/${activeProj.id}`}>
                    <div
                      className={`${container} p-5 hover:border-gray-300 hover:shadow-sm transition`}
                    >
                      <p className={activeProjectTitleStyle}>
                        {activeProj.name}
                      </p>
                      <p className={`${mutedText} shrink-0`}>
                        {activeProj.progress}%
                      </p>
                    </div>
                  </Link>
                  <div className={actProjOuterProgStyle}>
                    <div
                      className={actProjInnerProgStyle}
                      style={{ width: `${activeProj.progress}%` }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="border border-gray-200 rounded-xl p-8 flex flex-col items-center gap-3 text-center">
              <FolderKanban className="size-8 text-gray-400" />

              <h3 className="text-base font-semibold text-gray-900">
                No active projects
              </h3>

              <p className="text-sm text-gray-500">
                Active projects will appear here.
              </p>
            </div>
          )}
        </section>

        <section className="mt-10">
          <div className="flex justify-between items-center mb-3">
            <h2 className={h2Style}>Upcoming Tasks</h2>
            <Link to="/tasks" className={viewAllStyle}>
              View all
            </Link>
          </div>
          {upcomingTasks.length > 0 ? (
            <ul className="space-y-2">
              {upcomingTasks.map((task) => (
                <li
                  key={task.id}
                  className="border border-gray-200 rounded-md p-3 flex gap-3 hover:border-gray-300 hover:shadow-sm transition"
                >
                  <input
                    aria-label={`Mark ${task.name} as completed`}
                    checked={task.status === "Completed"}
                    type="checkbox"
                    onChange={() => handleTaskComplete(task.id)}
                  />
                  <Link
                    to={`/tasks/${task.id}`}
                    className="flex justify-between flex-1 min-w-0"
                  >
                    <p>{task.name}</p>
                    <p className={`${mutedText} shrink-0`}>
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
            <div className="border border-gray-200 rounded-xl p-8 flex flex-col items-center gap-3 text-center">
              <ListChecks className="size-8 text-gray-400" />

              <h3 className="text-base font-semibold text-gray-900">
                No upcoming tasks
              </h3>

              <p className="text-sm text-gray-500">
                Upcoming tasks will appear here.
              </p>
            </div>
          )}
        </section>

        <section className="mt-10">
          <div className="flex justify-between items-center mb-3">
            <h2 className={h2Style}>Recent Deliverables</h2>
            <Link to="/deliverables" className={viewAllStyle}>
              View all
            </Link>
          </div>
          {recentDeliverables.length > 0 ? (
            <ul className="space-y-2">
              {recentDeliverables.map((deliverable) => (
                <li key={deliverable.id}>
                  <Link
                    to={`/deliverables/${deliverable.id}`}
                    className={`${container} p-3 hover:border-gray-300 hover:shadow-sm transition`}
                  >
                    <p>{deliverable.name}</p>
                    <p className={`${mutedText} shrink-0`}>
                      {new Date(deliverable.date).toLocaleDateString("en-US", {
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
            <div className="border border-gray-200 rounded-xl p-8 flex flex-col items-center gap-3 text-center">
              <PackageCheck className="size-8 text-gray-400" />

              <h3 className="text-base font-semibold text-gray-900">
                No recent deliverables
              </h3>

              <p className="text-sm text-gray-500">
                Recent deliverables will appear here.
              </p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
