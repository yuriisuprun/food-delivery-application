import { getToken } from "./auth";

function base(url: string | undefined, fallback: string) {
  return (url ?? "").trim() || fallback;
}

const USER_API = base(import.meta.env.VITE_USER_API_URL, "http://localhost:8081");
const AI_API = base(import.meta.env.VITE_AI_API_URL, "http://localhost:8083");
const TRIP_API = base(import.meta.env.VITE_TRIP_API_URL, "http://localhost:8082");

async function request(method: string, baseUrl: string, path: string, body?: unknown) {
  const token = getToken();
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "content-type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  if (res.status === 204) return undefined;
  return res.json();
}

export const userApi = {
  post: (path: string, body: unknown) => request("POST", USER_API, path, body),
  postJson: <T,>(path: string, body: unknown) => request("POST", USER_API, path, body) as Promise<T>,
};

export const aiApi = {
  postJson: <T,>(path: string, body: unknown) => request("POST", AI_API, path, body) as Promise<T>,
};

export const tripApi = {
  postJson: <T,>(path: string, body: unknown) => request("POST", TRIP_API, path, body) as Promise<T>,
  getJson: <T,>(path: string) => request("GET", TRIP_API, path) as Promise<T>,
};