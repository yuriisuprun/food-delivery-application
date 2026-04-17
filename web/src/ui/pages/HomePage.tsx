import React from "react";
import { Link } from "react-router";
import { ArrowRight, Clock, DollarSign, MapPin, Sparkles, Users, Zap, Star, CheckCircle, Globe, Shield } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

export function HomePage() {
  return (
    <div className="grid gap-12 sm:gap-16 animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <Card className="border-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--accent)]/5 via-transparent to-[color:var(--accent2)]/5 pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[color:var(--accent)]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <CardHeader className="pb-6 relative">
            <div className="grid gap-4 sm:gap-6 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-[color:var(--accent)]">
                <Sparkles className="h-5 w-5 animate-pulse" />
                <span className="text-sm font-medium uppercase tracking-wider">Smart Travel Planning</span>
              </div>
              <h1 className="brand text-4xl sm:text-5xl lg:text-7xl leading-tight bg-gradient-to-r from-[color:var(--fg0)] via-[color:var(--accent)] to-[color:var(--fg0)] bg-clip-text text-transparent">
                Smart trips with 
                <span className="block text-[color:var(--accent)]">real constraints</span>
              </h1>
              <p className="max-w-2xl mx-auto sm:mx-0 text-lg sm:text-xl text-[color:var(--fg1)] leading-relaxed">
                Get optimized itineraries that respect your time, budget, and logistics. 
                No more impossible schedules or unrealistic suggestions.
              </p>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6 justify-center sm:justify-start">
              <Button asChild size="lg" className="group text-lg px-8 py-6 h-auto">
                <Link to="/planner">
                  Create your itinerary
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 h-auto">
                <a href="#features">
                  Learn more
                </a>
              </Button>
            </div>
            
            {/* Social proof */}
            <div className="mt-8 pt-6 border-t border-[color:var(--line)]/50">
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 text-sm text-[color:var(--fg1)]">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span>4.9/5 from 2,000+ travelers</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-[color:var(--fg1)] rounded-full" />
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Free to use</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Features Grid */}
      <section id="features" className="grid gap-8">
        <div className="text-center space-y-4">
          <h2 className="brand text-3xl sm:text-4xl">Why SmartTrip?</h2>
          <p className="text-[color:var(--fg1)] text-lg max-w-3xl mx-auto leading-relaxed">
            Our platform considers real-world constraints that other planners ignore, 
            giving you practical itineraries that actually work.
          </p>
        </div>
        
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard 
            icon={<Clock className="h-6 w-6" />}
            title="Real constraints" 
            description="Plausible schedules with realistic travel times, breaks, and buffer periods for a stress-free experience."
            gradient="from-blue-500/20 to-cyan-500/20"
            hoverColor="hover:border-blue-500/30"
          />
          <FeatureCard 
            icon={<DollarSign className="h-6 w-6" />}
            title="Smart budgeting" 
            description="Accurate cost estimates with money-saving tips that don't compromise your travel experience."
            gradient="from-green-500/20 to-emerald-500/20"
            hoverColor="hover:border-green-500/30"
          />
          <FeatureCard 
            icon={<MapPin className="h-6 w-6" />}
            title="Data-driven insights" 
            description="Enhanced with real travel data and local knowledge to reduce inaccuracies and improve recommendations."
            gradient="from-purple-500/20 to-pink-500/20"
            hoverColor="hover:border-purple-500/30"
          />
          <FeatureCard 
            icon={<Zap className="h-6 w-6" />}
            title="Lightning fast" 
            description="Get comprehensive itineraries in seconds, not hours of manual research and planning."
            gradient="from-yellow-500/20 to-orange-500/20"
            hoverColor="hover:border-yellow-500/30"
          />
          <FeatureCard 
            icon={<Users className="h-6 w-6" />}
            title="Group-friendly" 
            description="Perfect for solo travelers, couples, families, and groups with different preferences and needs."
            gradient="from-indigo-500/20 to-blue-500/20"
            hoverColor="hover:border-indigo-500/30"
          />
          <FeatureCard 
            icon={<Shield className="h-6 w-6" />}
            title="Reliable & secure" 
            description="Your data is protected with enterprise-grade security. Plan with confidence and peace of mind."
            gradient="from-rose-500/20 to-red-500/20"
            hoverColor="hover:border-rose-500/30"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid gap-6">
        <div className="text-center">
          <h3 className="brand text-2xl sm:text-3xl mb-2">Trusted by travelers worldwide</h3>
          <p className="text-[color:var(--fg1)]">Join thousands who've discovered smarter travel planning</p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard number="50K+" label="Itineraries created" />
          <StatCard number="150+" label="Countries covered" />
          <StatCard number="4.9★" label="Average rating" />
          <StatCard number="24/7" label="Support available" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <Card className="border-[color:var(--accent)]/30 bg-gradient-to-r from-[color:var(--accent)]/10 to-[color:var(--accent2)]/10 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--accent)]/5 via-transparent to-[color:var(--accent2)]/5 pointer-events-none" />
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-bl from-[color:var(--accent)]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-[color:var(--accent2)]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <CardContent className="pt-8 pb-8 relative">
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="space-y-3">
                <h3 className="brand text-2xl sm:text-3xl">Ready to plan your next adventure?</h3>
                <p className="text-[color:var(--fg1)] text-lg leading-relaxed">
                  Join thousands of travelers who trust SmartTrip for their perfect itineraries. 
                  Start planning in seconds, not hours.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button asChild size="lg" className="group text-lg px-8 py-6 h-auto">
                  <Link to="/planner">
                    Get started now
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <div className="flex items-center gap-2 text-sm text-[color:var(--fg1)]">
                  <Globe className="h-4 w-4" />
                  <span>No signup required to start</span>
                </div>
              </div>
            </div>
          </CardContent>
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
