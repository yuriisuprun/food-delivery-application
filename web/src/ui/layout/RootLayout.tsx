import React from "react";
import { Outlet, useNavigate } from "react-router";
import { getToken, logout } from "../lib/auth";
import { useTheme } from "../lib/theme";
import Header from "./Header";
import { Toaster } from "../components/ui/toaster";

export function RootLayout() {
  const nav = useNavigate();
  const token = getToken();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    nav("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header token={token} theme={theme} toggleTheme={toggleTheme} onLogout={handleLogout} />

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <Outlet />
      </main>

      <footer className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 border-t border-[color:var(--line)] text-center">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[color:var(--fg1)]">
          <p>© 2026 SmartTrip. Intelligent travel planning made simple.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[color:var(--fg0)] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[color:var(--fg0)] transition-colors">Terms</a>
            <a href="#" className="hover:text-[color:var(--fg0)] transition-colors">Support</a>
          </div>
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
}
