import { Link } from "react-router-dom";

export default function NotFound({ resource }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="mb-3 text-3xl font-semibold text-gray-900">
        {resource} not found.
      </h1>
      <p className="mb-6 max-w-lg text-gray-500">
        The {resource} you're looking for doesn't exist or may have been moved.
      </p>
      <Link
        to={`/`}
        className="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
