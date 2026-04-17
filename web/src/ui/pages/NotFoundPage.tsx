import React from "react";
import { Link } from "react-router";
import { Home, MapPin, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

export function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center animate-fade-in">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-4">
          <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-[color:var(--accent)]/20 to-[color:var(--accent2)]/20 flex items-center justify-center">
            <MapPin className="h-10 w-10 text-[color:var(--accent)]" />
          </div>
          
          <div className="space-y-2">
            <h1 className="brand text-4xl sm:text-5xl text-[color:var(--fg0)]">404</h1>
            <h2 className="brand text-xl sm:text-2xl">Page not found</h2>
            <p className="text-[color:var(--fg1)] leading-relaxed">
              Looks like you've wandered off the beaten path. Let's get you back to planning amazing trips!
            </p>
          </div>
        </div>

        <Card className="border-[color:var(--accent)]/20">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="default" className="group">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go home
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="group">
                <Link to="/planner">
                  <MapPin className="mr-2 h-4 w-4" />
                  Start planning
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Button asChild variant="ghost" size="sm" className="group">
          <button onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Go back
          </button>
        </Button>
      </div>
    </div>
  );
}