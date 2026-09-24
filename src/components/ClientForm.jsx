import { forwardRef, useImperativeHandle, useRef, useState } from "react";

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

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    selectedClient
      ? setClientList((prevList) => {
          return prevList.map((list) => {
            if (list.id === selectedClient.id) {
              const updatedClient = {
                ...data,
                id: selectedClient.id,
              };
              return updatedClient;
            }
            return list;
          });
        })
      : setClientList((prevList) => {
          const newdata = { ...data, projects: 0, id: Date.now() };
          const updatedClient = [...prevList, newdata];
          return updatedClient;
        });

    dialog.current.close();
    event.target.reset();
  }

  return (
    <>
      <dialog ref={dialog}>
        <form onSubmit={handleSubmit} key={selectedClient?.id}>
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            id="name"
            name="name"
            defaultValue={selectedClient?.name}
          />
          <label htmlFor="email">Email</label>
          <input
            required
            type="email"
            id="email"
            name="email"
            defaultValue={selectedClient?.email}
          />
          <button type="button" onClick={() => dialog.current.close()}>
            Cancel
          </button>
          <button type="submit">
            {selectedClient ? "Edit Client" : "Add Client"}
          </button>
        </form>
      </dialog>
    </>
  );
});

export default ClientForm;
