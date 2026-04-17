import React, { useState } from "react";
import { Link } from "react-router";
import { Moon, Sun, Menu, X, Sparkles, LogOut, User } from "lucide-react";
import { Button } from "../components/ui/button";

interface HeaderProps {
  token: string | null;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onLogout: () => void;
}

export default function Header({ token, theme, toggleTheme, onLogout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line)] backdrop-blur-md bg-[color:var(--bg0)]/80 transition-all duration-300">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex flex-shrink-0 items-center gap-3 group transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2 focus:ring-offset-[color:var(--bg0)] rounded-lg p-1 -m-1"
          aria-label="SmartTrip - Go to homepage"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[color:var(--accent)] to-[color:var(--accent2)] flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[color:var(--accent)]/25 transition-all duration-200">
            <Sparkles className="h-4 w-4 text-black group-hover:rotate-12 transition-transform duration-200" />
          </div>
          <div className="brand text-lg sm:text-xl tracking-tight font-semibold group-hover:text-[color:var(--accent)] transition-colors duration-200">
            SmartTrip
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-3 md:flex">
          <Button asChild variant="ghost">
            <Link to="/">
              Home
            </Link>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
          
          <Button asChild variant="ghost">
            <Link to="/planner">
              Planner
            </Link>
          </Button>
          
          {!token ? (
            <Button asChild>
              <Link to="/login">
                <User className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
          ) : (
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-[color:var(--line)] bg-[color:var(--bg0)]/95 backdrop-blur-md md:hidden animate-slide-down">
          <nav className="flex flex-col gap-2 px-4 py-4">
            <Button 
              asChild 
              variant="ghost" 
              className="justify-start"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link to="/">
                Home
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="ghost" 
              className="justify-start"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link to="/planner">
                Planner
              </Link>
            </Button>
            
            {!token ? (
              <Button 
                asChild 
                className="justify-start"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link to="/login">
                  <User className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
            ) : (
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
