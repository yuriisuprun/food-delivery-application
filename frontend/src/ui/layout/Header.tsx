import React, { useState } from "react";
import { Link } from "react-router";
import { Moon, Sun, Menu, X, Car, LogOut, User } from "lucide-react";
import { Button } from "../components/ui";

interface HeaderProps {
  token: string | null;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onLogout: () => void;
}

export default function Header({ token, theme, toggleTheme, onLogout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line)] backdrop-blur-md bg-[color:var(--bg0)]/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 group"
          aria-label="SmartTrip"
        >
          <div className="w-7 h-7 rounded-lg bg-[color:var(--accent)] flex items-center justify-center shadow-sm">
            <Car className="h-4 w-4 text-white" />
          </div>
          <span className="brand text-lg font-semibold">SmartTrip</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" size="sm"><Link to="/">Home</Link></Button>

          <Button asChild variant="ghost" size="sm"><Link to="/planner">Planner</Link></Button>
          
          <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
          
          {!token ? (<Button asChild size="sm"><Link to="/login">Login</Link></Button>) : (
            <Button variant="outline" size="sm" onClick={onLogout}><LogOut className="mr-1 h-3 w-3" />Logout</Button>)}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-1 md:hidden">
          <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
          
          <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-[color:var(--line)] bg-[color:var(--bg0)]/95 backdrop-blur-md md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-3">
            <Button asChild variant="ghost" size="sm" className="justify-start" onClick={() => setMobileMenuOpen(false)}>
              <Link to="/">Home</Link>
            </Button>
            
            <Button asChild variant="ghost" size="sm" className="justify-start" onClick={() => setMobileMenuOpen(false)}>
              <Link to="/planner">Planner</Link>
            </Button>
            
            {!token ? (
              <Button asChild size="sm" className="justify-start" onClick={() => setMobileMenuOpen(false)}>
                <Link to="/login"><User className="mr-2 h-4 w-4" />Login</Link>
              </Button>
            ) : (
              <Button variant="outline" size="sm" className="justify-start" onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}>
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