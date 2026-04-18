import React from "react";
import { Link } from "react-router";
import { Home, MapPin, Car } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center animate-fade-in">
      <div className="text-center space-y-6 max-w-sm">
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-[color:var(--accent)] flex items-center justify-center shadow-lg">
            <Car className="h-8 w-8 text-white" />
          </div>
          
          <div className="space-y-2">
            <h1 className="brand text-3xl">404</h1>
            <h2 className="brand text-lg">Page not found</h2>
            <p className="text-sm text-[color:var(--fg1)]">
              The page you're looking for doesn't exist.
            </p>
          </div>
        </div>

        <Card>
          <CardContent className="pt-4">
            <div className="flex flex-col gap-2">
              <Button asChild>
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go home
                </Link>
              </Button>
              
              <Button asChild variant="outline">
                <Link to="/planner">
                  <MapPin className="mr-2 h-4 w-4" />
                  Start planning
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}