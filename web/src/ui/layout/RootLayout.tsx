import { Link, Outlet, useNavigate } from "react-router";
import { getToken, logout } from "../lib/auth";

export function RootLayout() {
  const nav = useNavigate();
  const token = getToken();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-[color:var(--line)] bg-[rgba(7,10,18,0.75)] backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-baseline gap-2">
            <div className="brand text-xl tracking-tight">SmartTrip</div>
            <div className="text-xs text-[color:var(--fg1)]">AI-driven travel planning</div>
          </Link>

          <nav className="flex items-center gap-3 text-sm">
            <Link
              to="/planner"
              className="rounded-full border border-[color:var(--line)] px-4 py-2 hover:bg-white/5"
            >
              Planner
            </Link>
            {!token ? (
              <Link
                to="/login"
                className="rounded-full bg-[color:var(--accent)] px-4 py-2 font-medium text-black hover:brightness-95"
              >
                Login
              </Link>
            ) : (
              <button
                type="button"
                className="rounded-full border border-[color:var(--line)] px-4 py-2 hover:bg-white/5"
                onClick={() => {
                  logout();
                  nav("/");
                }}
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10">
        <Outlet />
      </main>

      <footer className="mx-auto max-w-6xl px-5 py-10 text-xs text-[color:var(--fg1)]">
        MVP skeleton: microservizi + UI moderna + AI layer (RAG + prompt). 
      </footer>
    </div>
  );
}

