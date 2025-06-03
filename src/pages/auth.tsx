import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "wouter";
import { LoginCredentials, RegisterCredentials } from "@/lib/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function AuthPage() {
  const { user, login, register, isLoading, error: authError } = useAuth();
  const { toast } = useToast();
  const [_, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<string>("login");
  
  // Login form state
  const [loginData, setLoginData] = useState<LoginCredentials>({
    email: "",
    password: ""
  });
  
  // Register form state
  const [registerData, setRegisterData] = useState<RegisterCredentials>({
    username: "",
    email: "",
    password: ""
  });
  
  // Loading states
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      setLocation("/");
    }
  }, [user, setLocation]);

  // Update local error state when auth context error changes
  useEffect(() => {
    setError(authError);
  }, [authError]);

  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setError(null);
    
    try {
      console.log("Attempting login with:", loginData);
      const result = await login(loginData);
      console.log("Login successful:", result);
      
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      
      // Force a hard redirect to avoid navigation issues
      window.location.href = "/";
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "Login failed. Please check your credentials and try again.");
      toast({
        title: "Login Failed",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle register form submission
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterLoading(true);
    setError(null);
    
    try {
      console.log("Attempting registration with:", registerData);
      const result = await register(registerData);
      console.log("Registration successful:", result);
      
      toast({
        title: "Registration Successful",
        description: "Your account has been created.",
      });
      
      // Force a hard redirect to avoid navigation issues
      window.location.href = "/";
    } catch (error: any) {
      console.error("Registration error:", error);
      setError(error.message || "Registration failed. Please try again with a different email.");
      toast({
        title: "Registration Failed",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setRegisterLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#128C7E]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <Card className="max-w-md w-full border-none shadow-none">
          <CardContent className="pt-6 space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-[#128C7E] to-[#25D366] text-transparent bg-clip-text">WhatsApp Intelligence</h2>
              <p className="mt-2 text-sm text-gray-600">Manage your business intelligence</p>
            </div>
            
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              {/* Login Form */}
              <TabsContent value="login" className="mt-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Email address"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      className="w-full"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      className="w-full"
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-[#128C7E] hover:bg-[#075E54]"
                    disabled={loginLoading}
                  >
                    {loginLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </form>
              </TabsContent>
              
              {/* Register Form */}
              <TabsContent value="register" className="mt-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      id="register-username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      placeholder="Username"
                      value={registerData.username}
                      onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
                      className="w-full"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Input
                      id="register-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Email address"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                      className="w-full"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Input
                      id="register-password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      placeholder="Password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                      className="w-full"
                      required
                      minLength={6}
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-[#128C7E] hover:bg-[#075E54]"
                    disabled={registerLoading}
                  >
                    {registerLoading ? "Creating account..." : "Create account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* Right side: Hero */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#128C7E] to-[#25D366] flex-col justify-center items-center p-12 text-white">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-6">Business Intelligence for WhatsApp</h1>
          <p className="text-lg mb-8">
            Connect your WhatsApp accounts, manage product catalogs, and extract insights from your chats with our AI-powered dashboard.
          </p>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Connect Multiple Accounts</h3>
                <p className="text-white text-opacity-80">Manage all your WhatsApp business accounts in one place.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Product Catalog</h3>
                <p className="text-white text-opacity-80">Organize your products with detailed information and images.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain-circuit"><path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z"></path><path d="M16 8V5c0-1.1.9-2 2-2"></path><path d="M12 13h4"></path><path d="M12 18h6a2 2 0 0 1 2 2v1"></path><path d="M12 8h8"></path><path d="M20.5 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"></path><path d="M16.5 13a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"></path><path d="M20.5 21a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"></path><path d="M18.5 3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"></path></svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">AI Processing</h3>
                <p className="text-white text-opacity-80">Extract product details and insights from your conversations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}