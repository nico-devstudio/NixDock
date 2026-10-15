const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";


async function apiRequest(path, options = {}) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...options.headers,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        if (response.status === 401 && path !== "/auth/login") {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }

        throw new Error(data.message || "Something went wrong");
    }

    return data;
}

export { API_URL, apiRequest };