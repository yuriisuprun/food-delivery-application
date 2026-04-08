import { useState } from "react";
import { useNavigate } from "react-router";
import { setToken } from "../lib/auth";
import { userApi } from "../lib/http";

export function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("demo@smarttrip.local");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="mx-auto grid max-w-md gap-4 rounded-3xl border border-[color:var(--line)] bg-white/5 p-8">
      <h1 className="brand text-3xl">Login</h1>
      <p className="text-sm text-[color:var(--fg1)]">
        Skeleton auth in-memory sul `user-service`. 
      </p>

      {error ? (
        <div className="rounded-2xl border border-[color:var(--danger)]/40 bg-[color:var(--danger)]/10 px-4 py-3 text-sm">
          {error}
        </div>
      ) : null}

      <label className="grid gap-2 text-sm">
        Email
        <input
          className="rounded-2xl border border-[color:var(--line)] bg-black/20 px-4 py-3 outline-none focus:border-white/25"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </label>
      <label className="grid gap-2 text-sm">
        Password
        <input
          type="password"
          className="rounded-2xl border border-[color:var(--line)] bg-black/20 px-4 py-3 outline-none focus:border-white/25"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </label>

      <div className="grid gap-2">
        <button
          type="button"
          className="rounded-2xl bg-[color:var(--accent)] px-5 py-3 font-medium text-black hover:brightness-95"
          onClick={async () => {
            setError(null);
            try {
              // register idempotently (ignore conflict)
              await userApi.post("/api/auth/register", { email, password }).catch(() => undefined);
              const token = await userApi.postJson<{ accessToken: string }>("/api/auth/login", {
                email,
                password,
              });
              setToken(token.accessToken);
              nav("/planner");
            } catch (e: any) {
              setError(e?.message ?? "Login failed");
            }
          }}
        >
          Entra
        </button>
      </div>
    </div>
  );
}

