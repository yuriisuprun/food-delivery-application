import React, { useState } from "react";
import { Calendar, DollarSign, MapPin, RefreshCw, Sparkles, Users, Clock } from "lucide-react";
import { tripApi } from "../lib/http";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Spinner } from "../components/ui/spinner";
import { useToast } from "../hooks/use-toast";

interface Trip {
  id: string;
  destination: string;
  days: number;
  budgetEur: number;
  itineraryMarkdown: string | null;
}

export function PlannerPage() {
  const { toast } = useToast();
  const [destination, setDestination] = useState("Roma");
  const [days, setDays] = useState(3);
  const [budgetEur, setBudgetEur] = useState(450);
  const [markdown, setMarkdown] = useState<string>("");
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoadingTrips, setIsLoadingTrips] = useState(false);

  const handleGenerateItinerary = async () => {
    if (!destination.trim()) {
      toast({
        variant: "destructive",
        title: "Missing destination",
        description: "Please enter a destination to generate your itinerary.",
      });
      return;
    }

    setIsGenerating(true);
    setMarkdown("");
    
    try {
      const res = await tripApi.postJson<{ itineraryMarkdown: string | null }>(
        "/api/trips/plan",
        {
          destination,
          days,
          budgetEur,
          constraints: ["prefer walking", "avoid long moves"],
        },
      );
      
      setMarkdown(res.itineraryMarkdown ?? "");
      
      toast({
        title: "Itinerary generated!",
        description: `Your ${days}-day trip to ${destination} is ready.`,
      });
      
      // Refresh trips list
      await loadTrips();
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: "Generation failed",
        description: e?.message ?? "Failed to generate itinerary. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const loadTrips = async () => {
    setIsLoadingTrips(true);
    try {
      const list = await tripApi.getJson<Trip[]>("/api/trips");
      setTrips(list);
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: "Failed to load trips",
        description: e?.message ?? "Could not load your saved trips.",
      });
    } finally {
      setIsLoadingTrips(false);
    }
  };

  return (
    <div className="grid gap-6 sm:gap-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-[color:var(--accent)]">
          <Sparkles className="h-5 w-5" />
          <span className="text-sm font-medium">Trip Planner</span>
        </div>
        <h1 className="brand text-2xl sm:text-3xl">Plan your perfect trip</h1>
        <p className="text-sm sm:text-base text-[color:var(--fg1)] max-w-2xl">
          Tell us about your destination and preferences, and we'll create a personalized itinerary 
          that respects real-world constraints and your budget.
        </p>
      </div>

      {/* Planning Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Trip Details
          </CardTitle>
          <CardDescription>
            Provide your travel preferences to generate a customized itinerary
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="destination" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Destination
              </Label>
              <Input
                id="destination"
                placeholder="e.g., Paris, Tokyo, New York"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                disabled={isGenerating}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="days" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Duration (days)
              </Label>
              <Input
                id="days"
                type="number"
                min={1}
                max={30}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                disabled={isGenerating}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Budget (EUR)
              </Label>
              <Input
                id="budget"
                type="number"
                min={0}
                step={50}
                value={budgetEur}
                onChange={(e) => setBudgetEur(Number(e.target.value))}
                disabled={isGenerating}
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button 
              onClick={handleGenerateItinerary}
              disabled={isGenerating || !destination.trim()}
              variant="secondary"
              size="lg"
              className="group"
            >
              {isGenerating ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Generating itinerary...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                  Generate itinerary
                </>
              )}
            </Button>
            
            <Button 
              onClick={loadTrips}
              disabled={isLoadingTrips}
              variant="outline"
              size="lg"
            >
              {isLoadingTrips ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Loading...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh trips
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generated Itinerary */}
      {(markdown || isGenerating) && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Itinerary</CardTitle>
                <CardDescription>
                  {isGenerating 
                    ? "We're crafting your perfect trip..." 
                    : `Generated itinerary for ${destination}`
                  }
                </CardDescription>
              </div>
              {!isGenerating && markdown && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Fresh
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isGenerating ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center space-y-4">
                  <Spinner size="lg" />
                  <div className="space-y-2">
                    <p className="font-medium">Creating your itinerary...</p>
                    <p className="text-sm text-[color:var(--fg1)]">
                      This may take a few moments while we optimize your trip
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-[color:var(--line)] bg-black/20 p-4 sm:p-6">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed overflow-x-auto font-mono">
                  {markdown || "Your itinerary will appear here..."}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Saved Trips */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Your Trips
              </CardTitle>
              <CardDescription>
                Previously generated itineraries and travel plans
              </CardDescription>
            </div>
            {trips.length > 0 && (
              <Badge variant="outline">
                {trips.length} trip{trips.length !== 1 ? 's' : ''}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {trips.length === 0 ? (
            <div className="text-center py-8 space-y-2">
              <MapPin className="h-12 w-12 mx-auto text-[color:var(--fg1)] opacity-50" />
              <p className="text-[color:var(--fg1)]">No trips yet</p>
              <p className="text-sm text-[color:var(--fg1)]">
                Generate your first itinerary to get started
              </p>
            </div>
          ) : (
            <div className="grid gap-3">
              {trips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

interface TripCardProps {
  trip: Trip;
}

function TripCard({ trip }: TripCardProps) {
  return (
    <Card className="hover:bg-white/[0.07] transition-colors cursor-pointer">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="space-y-2">
            <h4 className="brand text-base sm:text-lg font-medium">{trip.destination}</h4>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-xs">
                <Calendar className="h-3 w-3 mr-1" />
                {trip.days} days
              </Badge>
              <Badge variant="outline" className="text-xs">
                <DollarSign className="h-3 w-3 mr-1" />
                €{trip.budgetEur}
              </Badge>
            </div>
          </div>
          <Button variant="outline" size="sm">
            View details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
