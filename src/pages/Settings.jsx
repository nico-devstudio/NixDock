export default function Settings() {
  const h2Style = "text-lg font-semibold text-gray-900";
  const container =
    "flex flex-col border border-gray-200 rounded-xl p-6 mt-5 gap-5 max-w-5xl";

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Settings</h1>

      <section className="mt-10">
        <h2 className={h2Style}>Profile</h2>
        <div className={container}>
          <div>
            <p className="text-gray-500">Name</p>
            <p className="text-gray-900">Nico Angelo</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="text-gray-900">nico@example.com</p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className={h2Style}>Workspace</h2>
        <div className={container}>
          <div>
            <p className="text-gray-500">Workspace Name</p>
            <p className="text-gray-900">NicoDev Studio</p>
          </div>
          <div>
            <p className="text-gray-500">Workspace description</p>
            <p className="text-gray-900">
              Freelance web development and client projects
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className={h2Style}>Preferences</h2>
        <div className={container}>
          <div>
            <p className="text-gray-500">Theme</p>
            <p className="text-gray-900">Light</p>
          </div>
          <div>
            <p className="text-gray-500">Notifications</p>
            <p className="text-gray-900">Enabled</p>
          </div>
        </div>
      </section>
    </>
  );
}
