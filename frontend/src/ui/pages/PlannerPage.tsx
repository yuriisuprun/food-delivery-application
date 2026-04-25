import React, { useEffect, useRef, useState } from "react";
import { Calendar, DollarSign, MapPin, RefreshCw, Sparkles, Copy, Check } from "lucide-react";
import { tripApi } from "../lib/http";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Spinner } from "../components/ui/spinner";
import { useToast } from "../hooks/use-toast";

const DEFAULT_TRIP_CONSTRAINTS = ["prefer walking", "avoid long moves"] as const;

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
  const [isCopied, setIsCopied] = useState(false);
  const copyResetTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyResetTimeoutRef.current !== null) {
        window.clearTimeout(copyResetTimeoutRef.current);
      }
    };
  }, []);

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
          constraints: [...DEFAULT_TRIP_CONSTRAINTS],
        },
      );
      
      setMarkdown(res.itineraryMarkdown ?? "");
      
      toast({
        title: "Itinerary generated",
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

  const handleCopyItinerary = async () => {
    if (!markdown) return;
    
    try {
      await navigator.clipboard.writeText(markdown);
      setIsCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "Your itinerary has been copied.",
      });
      
      if (copyResetTimeoutRef.current !== null) {
        window.clearTimeout(copyResetTimeoutRef.current);
      }
      copyResetTimeoutRef.current = window.setTimeout(() => setIsCopied(false), 2000);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Copy failed",
        description: "Could not copy to clipboard.",
      });
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
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="brand text-2xl">Trip Planner</h1>
        <p className="text-sm text-[color:var(--fg1)]">
          Create personalized itineraries with realistic schedules and budgets
        </p>
      </div>

      {/* Planning Form */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Trip Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                placeholder="e.g., Paris, Tokyo"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                disabled={isGenerating}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="days">Days</Label>
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
              <Label htmlFor="budget">Budget (EUR)</Label>
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
          
          <div className="flex gap-3">
            <Button 
              onClick={handleGenerateItinerary}
              disabled={isGenerating || !destination.trim()}
              className="flex-1 sm:flex-none"
            >
              {isGenerating ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate
                </>
              )}
            </Button>
            
            <Button 
              onClick={loadTrips}
              disabled={isLoadingTrips}
              variant="outline"
            >
              {isLoadingTrips ? (
                <Spinner size="sm" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generated Itinerary */}
      {(markdown || isGenerating) && (
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">
                  {isGenerating ? "Generating..." : "Your Itinerary"}
                </CardTitle>
                {!isGenerating && markdown && (
                  <CardDescription>
                    {destination} • {days} days • €{budgetEur}
                  </CardDescription>
                )}
              </div>
              {!isGenerating && markdown && (
                <Button
                  onClick={handleCopyItinerary}
                  variant="outline"
                  size="sm"
                >
                  {isCopied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isGenerating ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-center space-y-3">
                  <Spinner size="lg" />
                  <p className="text-sm text-[color:var(--fg1)]">
                    Creating your itinerary...
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-[color:var(--line)] bg-[color:var(--bg1)] p-4">
                <pre className="itinerary-content whitespace-pre-wrap text-sm leading-relaxed overflow-x-auto font-mono text-[color:var(--fg0)]">
                  {markdown || "Your itinerary will appear here..."}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Saved Trips */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Recent Trips</CardTitle>
            {trips.length > 0 && (
              <Badge variant="outline" className="text-xs">
                {trips.length}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {trips.length === 0 ? (
            <div className="text-center py-6 space-y-2">
              <MapPin className="h-8 w-8 mx-auto text-[color:var(--fg1)] opacity-50" />
              <p className="text-sm text-[color:var(--fg1)]">No trips yet</p>
            </div>
          ) : (
            <div className="space-y-3">
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
    <div className="flex items-center justify-between p-3 rounded-lg border border-[color:var(--line)] hover:bg-[color:var(--bg1)] transition-colors">
      <div className="space-y-1">
        <h4 className="font-medium text-sm text-[color:var(--fg0)]">{trip.destination}</h4>
        <div className="flex items-center gap-3 text-xs text-[color:var(--fg1)]">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {trip.days} days
          </span>
          <span className="flex items-center gap-1">
            <DollarSign className="h-3 w-3" />
            €{trip.budgetEur}
          </span>
        </div>
      </div>
      <Button variant="outline" size="sm" className="text-xs">
        View
      </Button>
    </div>
  );
}
