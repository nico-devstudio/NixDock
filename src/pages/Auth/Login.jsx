import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { apiRequest } from "../../api";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (error) {
      setError(error.message || "Unable to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      {" "}
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        {" "}
        <div className="mb-8 text-center">
          {" "}
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            NixDock{" "}
          </h1>{" "}
          <p className="mt-2 text-sm text-slate-500">
            Welcome back! Sign in to your workspace.{" "}
          </p>{" "}
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Email address
            </label>
            <input
              required
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              required
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {successMessage && (
            <p className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
              {successMessage}
            </p>
          )}

          {error && (
            <p
              className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
              role="alert"
            >
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
