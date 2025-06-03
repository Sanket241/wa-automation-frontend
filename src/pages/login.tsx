import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const [_, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Allow login with any input - no validation required
    
    setLoading(true);
    try {
      await login({ email, password });
      setLocation("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">WhatsApp Intelligence</h2>
            <p className="mt-2 text-sm text-gray-600">Sign in to access your dashboard</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                id="email-address"
                name="email"
                type="text"
                autoComplete="email"
                placeholder="Enter anything (no validation)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter anything (no validation)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-[#128C7E] hover:bg-[#075E54]"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>

            <Button
              type="button"
              onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
              className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300 mt-2"
            >
              Instant Access (No Input Required)
            </Button>
          </form>
          
          <div className="text-center text-sm text-gray-500">
            <p>Demo mode: Click any button to access the dashboard</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
