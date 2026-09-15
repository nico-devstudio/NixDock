export default function Dashboard() {
  const cardsStyle =
    "border border-gray-200 rounded-xl p-6 text-sm text-gray-500 hover:border-gray-300 hover:shadow-sm transition flex-1";
  const numbersStyle = "text-2xl text-gray-950 block mt-5";

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900 mb-8 mt-1 ">
        Dashboard
      </h1>

      <p className="text-sm text-gray-500 mb-8">
        Good morning, Nico. Here's what's happening with your workspace.
      </p>

      <section className="flex flex-row gap-3">
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
        <h2 className="text-lg font-medium text-gray-800">Active Projects</h2>
        <div className="space-y-5 mt-5">
          <div>
            <div className="flex justify-between border border-gray-200 rounded-md p-5">
              <p className="text-gray-900 font-semibold">Website Redesign</p>
              <p className="text-gray-400">70%</p>
            </div>
            <div className="h-2  bg-slate-200 rounded-full w-full mt-3">
              <div className="h-2 bg-blue-500 rounded-full w-[70%]"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between border border-gray-200 rounded-md p-5">
              <p className="text-gray-900 font-semibold">Mobile App</p>
              <p className="text-gray-400">45%</p>
            </div>
            <div className="h-2  bg-slate-200 rounded-full w-full mt-3">
              <div className="h-2 bg-blue-500 rounded-full w-[45%]"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between border border-gray-200 rounded-md p-5">
              <p className="text-gray-900 font-semibold">Portfolio Website</p>
              <p className="text-gray-400">90%</p>
            </div>
            <div className="h-2  bg-slate-200 rounded-full w-full mt-3">
              <div className="h-2 bg-blue-500 rounded-full w-[90%]"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
