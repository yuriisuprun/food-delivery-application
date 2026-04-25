import { getToken } from "./auth";

function base(url: string | undefined, fallback: string) {
  return (url ?? "").trim() || fallback;
}

const USER_API = base(import.meta.env.VITE_USER_API_URL, "http://localhost:8081");
const AI_API = base(import.meta.env.VITE_AI_API_URL, "http://localhost:8083");
const TRIP_API = base(import.meta.env.VITE_TRIP_API_URL, "http://localhost:8082");

type HttpMethod = "GET" | "POST";

async function request<T>(method: HttpMethod, baseUrl: string, path: string, body?: unknown): Promise<T> {
  const token = getToken();
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const userApi = {
  post: (path: string, body: unknown) => request<unknown>("POST", USER_API, path, body),
  postJson: <T,>(path: string, body: unknown) => request<T>("POST", USER_API, path, body),
};

export const aiApi = {
  postJson: <T,>(path: string, body: unknown) => request<T>("POST", AI_API, path, body),
};

export const tripApi = {
  postJson: <T,>(path: string, body: unknown) => request<T>("POST", TRIP_API, path, body),
  getJson: <T,>(path: string) => request<T>("GET", TRIP_API, path),
};
