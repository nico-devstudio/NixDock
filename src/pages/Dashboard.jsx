import { clients } from "../data/clients";
import { projects } from "../data/projects";
import { tasks } from "../data/tasks";
import { deliverables } from "../data/deliverables";
import { Link } from "react-router-dom";

export default function Dashboard() {
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
  const activeProjects = projects.filter(
    (project) => project.status !== "Completed",
  );
  const activeTasks = tasks.filter((task) => task.status !== "Completed");
  const recentDeliverables = [...deliverables]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

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
            <strong className={numbersStyle}>{clients.length}</strong>
          </div>
          <div className={cardsStyle}>
            <p>Projects</p>
            <strong className={numbersStyle}>{projects.length}</strong>
          </div>
          <div className={cardsStyle}>
            <p>Tasks</p>
            <strong className={numbersStyle}>{tasks.length}</strong>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex justify-between items-center">
            <h2 className={h2Style}>Active Projects</h2>
            <Link to="/projects" className={viewAllStyle}>
              View all
            </Link>
          </div>
          <ul className="space-y-5 mt-5">
            {activeProjects.map((activeProj) => (
              <li key={activeProj.id}>
                <Link to={`/projects/${activeProj.id}`}>
                  <div
                    className={`${container} p-5 hover:border-gray-300 hover:shadow-sm transition`}
                  >
                    <p className={activeProjectTitleStyle}>{activeProj.name}</p>
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
        </section>

        <section className="mt-10">
          <div className="flex justify-between items-center">
            <h2 className={h2Style}>Upcoming Tasks</h2>
            <Link to="/tasks" className={viewAllStyle}>
              View all
            </Link>
          </div>
          <ul className="space-y-2 mt-5">
            {activeTasks.map((task) => (
              <li
                key={task.id}
                className="border border-gray-200 rounded-md p-3 flex gap-3 hover:border-gray-300 hover:shadow-sm transition"
              >
                <input type="checkbox" />
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
        </section>

        <section className="mt-10">
          <div className="flex justify-between items-center">
            <h2 className={h2Style}>Recent Deliverables</h2>
            <Link to="/deliverables" className={viewAllStyle}>
              View all
            </Link>
          </div>
          <ul className="space-y-2 mt-5">
            {recentDeliverables.map((deliverable) => (
              <li key={deliverable.id}>
                <Link
                  to={`/deliverables/${deliverable.id}`}
                  className={`${container} p-3 max-md:flex-col hover:border-gray-300 hover:shadow-sm transition`}
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
        </section>
      </div>
    </>
  );
}
