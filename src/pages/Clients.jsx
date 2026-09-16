export default function Clients() {
  const cardsStyle =
    "flex flex-col md:flex-row gap-5 justify-between border border-gray-200 rounded-xl p-6 text-sm text-gray-800 hover:border-gray-300 hover:shadow-sm transition";
  const mutedText = "text-gray-400 my-auto";
  const nameStyle = "text-gray-900 font-semibold text-base";

  const clients = [
    { name: "Acme Design", email: "acme@example.com", projects: 3 },
    { name: "Bright Studio", email: "hello@brightstudio.com", projects: 2 },
    { name: "Nova Labs", email: "contact@novalabs.com", projects: 1 },
  ];

  return (
    <div className="max-w-5xl">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 mb-10 mt-1 ">
          Clients
        </h1>
        <button>Add Client</button>
      </div>

      <p className="text-sm text-gray-700 mb-10">
        Manage your clients and their projects.
      </p>

      <section className="flex gap-4 flex-col ">
        {clients.map((client) => (
          <div className={cardsStyle} key={client.name}>
            <div className="flex-1 min-w-0">
              <p className={nameStyle}>{client.name}</p>
              <p className={`${mutedText} wrap-break-word`}>{client.email}</p>
            </div>
            <p className={`${mutedText} shrink-0`}>
              {client.projects} {client.projects > 1 ? "Projects" : "Project"}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
