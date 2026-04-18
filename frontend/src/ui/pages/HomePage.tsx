import React from "react";
import { Link } from "react-router";
import { ArrowRight, MapPin, Car } from "lucide-react";
import { Button } from "../components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../components/ui/card";

export function HomePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-[color:var(--accent)] flex items-center justify-center shadow-lg">
            <Car className="h-8 w-8 text-white" />
          </div>
          
          <div className="space-y-2">
            <h1 className="brand text-3xl sm:text-4xl">SmartTrip</h1>
            <p className="text-[color:var(--fg1)] text-lg">
              Plan your trips with realistic schedules and budgets
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="group">
            <Link to="/planner">
              Start planning
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="space-y-6">
        <h2 className="brand text-xl text-center">What makes it different</h2>
        
        <div className="grid gap-4">
          <Card className="p-4">
            <div className="space-y-2">
              <h3 className="font-medium">Realistic planning</h3>
              <p className="text-sm text-[color:var(--fg1)]">
                Considers actual travel times, opening hours, and practical constraints
              </p>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="space-y-2">
              <h3 className="font-medium">Budget-aware</h3>
              <p className="text-sm text-[color:var(--fg1)]">
                Provides accurate cost estimates and suggests alternatives
              </p>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="space-y-2">
              <h3 className="font-medium">Quick results</h3>
              <p className="text-sm text-[color:var(--fg1)]">
                Generate comprehensive itineraries in seconds
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Quick Start */}
      <section className="text-center">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-[color:var(--accent)]">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">Ready to start?</span>
            </div>
            
            <Button asChild className="w-full sm:w-auto">
              <Link to="/planner">
                Create itinerary
              </Link>
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  hoverColor: string;
}

function FeatureCard({ icon, title, description, gradient, hoverColor }: FeatureCardProps) {
  return (
    <Card className={`group hover:scale-[1.02] transition-all duration-300 cursor-pointer border-2 border-transparent ${hoverColor} hover:shadow-xl hover:shadow-[color:var(--accent)]/10`}>
      <CardHeader className="pb-4">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-[color:var(--accent)] mb-3 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg`}>
          {icon}
        </div>
        <CardTitle className="text-xl group-hover:text-[color:var(--accent)] transition-colors duration-200">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="leading-relaxed text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

interface StatCardProps {
  number: string;
  label: string;
}

function StatCard({ number, label }: StatCardProps) {
  return (
    <Card className="text-center hover:scale-105 transition-transform duration-200">
      <CardContent className="pt-6 pb-6">
        <div className="space-y-2">
          <div className="brand text-2xl sm:text-3xl text-[color:var(--accent)]">{number}</div>
          <div className="text-sm text-[color:var(--fg1)]">{label}</div>
        </div>
      </CardContent>
    </Card>
  );
}