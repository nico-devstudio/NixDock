import { forwardRef, useImperativeHandle, useRef } from "react";

const ClientForm = forwardRef(function ClientForm({ setList }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current.showModal();
    },
  }));

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    const newdata = { ...data, projects: 0, id: Date.now() };
    setList((prevList) => [...prevList, newdata]);
    dialog.current.close();
    event.target.reset();
  }

  return (
    <>
      <dialog ref={dialog}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input required type="text" id="name" name="name" />
          <label htmlFor="email">Email</label>
          <input required type="email" id="email" name="email" />
          <button type="button" onClick={() => dialog.current.close()}>
            Cancel
          </button>
          <button type="submit">Add Client</button>
        </form>
      </dialog>
    </>
  );
});

export default ClientForm;
