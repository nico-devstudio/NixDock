import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { apiRequest } from "../api";

const ClientForm = forwardRef(function ClientForm(
  { setClientList, clientList },
  ref,
) {
  const dialog = useRef();
  const [selectedClient, setSelectedClient] = useState();

  useImperativeHandle(ref, () => ({
    open(id) {
      const client = clientList.find((client) => client.id === id);
      setSelectedClient(client);
      dialog.current.showModal();
    },
  }));

  async function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    const clientData = {
      name: data.name.trim(),
      email: data.email.trim(),
    };

    try {
      if (selectedClient) {
        const updatedClient = await apiRequest(
          `/clients/${selectedClient.id}`,
          {
            method: "PUT",
            body: JSON.stringify(clientData),
          },
        );

        setClientList((prevList) =>
          prevList.map((client) =>
            client.id === selectedClient.id
              ? { ...client, ...updatedClient }
              : client,
          ),
        );
      } else {
        const newClient = await apiRequest("/clients", {
          method: "POST",
          body: JSON.stringify(clientData),
        });

        setClientList((prevList) => [...prevList, newClient]);
      }

      dialog.current.close();
      event.target.reset();
      setSelectedClient(undefined);
    } catch (error) {
      console.error("Failed to save client:", error);
      alert(error.message || "Failed to save client.");
    }
  }

  return (
    <>
      <dialog
        ref={dialog}
        className="rounded-xl border border-gray-200 p-6 shadow-lg w-full max-w-md m-auto"
      >
        <form
          onSubmit={handleSubmit}
          key={selectedClient?.id}
          className="flex flex-col gap-4"
        >
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            required
            type="text"
            id="name"
            name="name"
            defaultValue={selectedClient?.name}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-500"
          />
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            required
            type="email"
            id="email"
            name="email"
            defaultValue={selectedClient?.email}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-500"
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => dialog.current.close()}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              {selectedClient ? "Edit Client" : "Add Client"}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
});

export default ClientForm;
