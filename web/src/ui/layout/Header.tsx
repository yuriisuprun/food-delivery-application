import React from "react";
import { Link } from "react-router";
import { Moon, Sun } from "lucide-react";

interface HeaderProps {
  token: string | null;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onLogout: () => void;
}

export default function Header({ token, theme, toggleTheme, onLogout }: HeaderProps) {
  const headerStyle = {
    backgroundColor:
      theme === "light"
        ? "rgba(248, 250, 252, 0.8)" // Very light gray with high transparency
        : "rgba(7, 10, 18, 0.75)",   // Dark theme background
    boxShadow:
      theme === "light"
        ? "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)"
        : "none",
  };

  return (
    <header
      className="sticky top-0 z-20 border-b border-[color:var(--line)] backdrop-blur transition-all duration-300"
      style={headerStyle}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-baseline gap-2">
          <div className="brand text-xl tracking-tight">SmartTrip</div>
          <div className="text-xs text-[color:var(--fg1)]">AI-driven travel planning</div>
        </Link>

        <nav className="flex items-center gap-3 text-sm">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-[color:var(--line)] p-2 hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-black/5 transition-colors"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </button>
          <Link
            to="/planner"
            className="rounded-full border border-[color:var(--line)] px-4 py-2 transition-colors"
            style={{
              backgroundColor: theme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
            }}
          >
            Planner
          </Link>
          {!token ? (
            <Link
              to="/login"
              className="rounded-full px-4 py-2 font-medium transition-opacity"
              style={{
                backgroundColor: 'var(--accent)',
                color: '#000',
              }}
            >
              Login
            </Link>
          ) : (
            <button
              type="button"
              className="rounded-full border border-[color:var(--line)] px-4 py-2 transition-colors"
              style={{
                backgroundColor: theme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
              }}
              onClick={onLogout}
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
