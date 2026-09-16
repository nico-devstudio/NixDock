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
            <strong className={numbersStyle}>8</strong>
          </div>
          <div className={cardsStyle}>
            <p>Projects</p>
            <strong className={numbersStyle}>4</strong>
          </div>
          <div className={cardsStyle}>
            <p>Tasks</p>
            <strong className={numbersStyle}>12</strong>
          </div>
        </section>

        <section className="mt-10">
          <h2 className={h2Style}>Active Projects</h2>
          <div className="space-y-5 mt-5">
            <div>
              <div className={`${container} p-5`}>
                <p className={activeProjectTitleStyle}>Website Redesign</p>
                <p className={`${mutedText} shrink-0`}>70%</p>
              </div>
              <div className={actProjOuterProgStyle}>
                <div className={`${actProjInnerProgStyle} w-[70%]`}></div>
              </div>
            </div>
            <div>
              <div className={`${container} p-5`}>
                <p className={activeProjectTitleStyle}>Mobile App</p>
                <p className={`${mutedText} shrink-0`}>45%</p>
              </div>
              <div className={actProjOuterProgStyle}>
                <div className={`${actProjInnerProgStyle} w-[45%]`}></div>
              </div>
            </div>
            <div>
              <div className={`${container} p-5`}>
                <p className={activeProjectTitleStyle}>Portfolio Website</p>
                <p className={`${mutedText} shrink-0`}>90%</p>
              </div>
              <div className={actProjOuterProgStyle}>
                <div className={`${actProjInnerProgStyle} w-[90%]`}></div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className={h2Style}>Upcoming Tasks</h2>
          <div className="space-y-2 mt-5">
            <div className={`${container} p-3`}>
              <div className="flex gap-3 min-w-0">
                <input type="checkbox" />
                <p className="flex-1">Finish homepage</p>
              </div>
              <p className={`${mutedText} shrink-0`}>Today</p>
            </div>
            <div className={`${container} p-3`}>
              <div className="flex gap-3 min-w-0">
                <input type="checkbox" />
                <p className="flex-1">Send client revision</p>
              </div>
              <p className={`${mutedText} shrink-0`}>Tomorrow</p>
            </div>
            <div className={`${container} p-3`}>
              <div className="flex gap-3  min-w-0">
                <input type="checkbox" />
                <p className="flex-1">Deploy project</p>
              </div>
              <p className={`${mutedText} shrink-0`}>Sep 20</p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className={h2Style}>Recent Deliverables</h2>
          <div className="space-y-2 mt-5">
            <div className={`${container} p-3`}>
              <p>Homepage Design</p>
              <p className={`${mutedText} shrink-0`}>Sep 15</p>
            </div>
            <div className={`${container} p-3`}>
              <p>Logo Package</p>
              <p className={`${mutedText} shrink-0`}>Sep 12</p>
            </div>
            <div className={`${container} p-3`}>
              <p>Mobile App Prototype</p>
              <p className={`${mutedText} shrink-0`}>Sep 10</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
