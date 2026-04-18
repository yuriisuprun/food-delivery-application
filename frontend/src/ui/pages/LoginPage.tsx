import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, Car } from "lucide-react";
import { setToken } from "../lib/auth";
import { userApi } from "../lib/http";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
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
        title: "Logged in successfully",
        description: "Welcome back!",
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
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-[color:var(--accent)] flex items-center justify-center mb-2 shadow-md">
              <Car className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-xl">Sign in</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
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
                <Label htmlFor="password">Password</Label>
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
              
              <p className="text-xs text-center text-[color:var(--fg1)]">
                Demo credentials are pre-filled
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}