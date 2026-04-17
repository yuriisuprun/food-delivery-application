import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, Lock, Mail, Sparkles } from "lucide-react";
import { setToken } from "../lib/auth";
import { userApi } from "../lib/http";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Spinner } from "../components/ui/spinner";
import { useToast } from "../hooks/use-toast";

export function LoginPage() {
  const nav = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("demo@smarttrip.local");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      // Register idempotently (ignore conflict)
      await userApi.post("/api/auth/register", { email, password }).catch(() => undefined);
      
      const token = await userApi.postJson<{ accessToken: string }>("/api/auth/login", {
        email,
        password,
      });
      
      setToken(token.accessToken);
      
      toast({
        title: "Welcome back!",
        description: "You've been successfully logged in.",
      });
      
      nav("/planner");
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: e?.message ?? "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center animate-fade-in">
      <div className="w-full max-w-md">
        <Card className="border-[color:var(--accent)]/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-br from-[color:var(--accent)]/20 to-[color:var(--accent2)]/20 flex items-center justify-center mb-2">
              <Sparkles className="h-6 w-6 text-[color:var(--accent)]" />
            </div>
            <CardTitle className="text-2xl sm:text-3xl">Welcome back</CardTitle>
            <CardDescription>
              Sign in to your SmartTrip account to continue planning amazing trips
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    disabled={isLoading}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--fg1)] hover:text-[color:var(--fg0)] transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={handleLogin}
                disabled={isLoading || !email || !password}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
              
              <div className="text-center">
                <p className="text-xs text-[color:var(--fg1)]">
                  Demo credentials are pre-filled for testing
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
