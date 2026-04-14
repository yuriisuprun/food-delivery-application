import React from "react";
import { Outlet, useNavigate } from "react-router";
import { getToken, logout } from "../lib/auth";
import { useTheme } from "../lib/theme";
import Header from "./Header";

export function RootLayout() {
  const nav = useNavigate();
  const token = getToken();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    nav("/");
  };

  return (
    <div className="min-h-screen">
      <Header token={token} theme={theme} toggleTheme={toggleTheme} onLogout={handleLogout} />

      <main className="mx-auto max-w-6xl px-5 py-10">
        <Outlet />
      </main>

      <footer className="mx-auto max-w-6xl px-5 py-10 text-xs text-[color:var(--fg1)]">
        © 2026 Smart Trip Application. All rights reserved.
      </footer>
    </div>
  );
}
