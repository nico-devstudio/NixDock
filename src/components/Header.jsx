import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  }

  return (
    <header className="bg-white fixed top-0 right-0 left-16 md:left-60 px-8 h-16 z-10 border-b border-gray-200 flex items-center justify-between text-lg font-semibold text-gray-900">
      <span>NixDock</span>

      <button
        type="button"
        onClick={handleLogout}
        className="text-sm font-medium text-gray-600 hover:text-red-600"
      >
        Log out
      </button>
    </header>
  );
}
