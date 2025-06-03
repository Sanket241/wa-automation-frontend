import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DebugPage() {
  const { user, login, register, isLoading, error } = useAuth();
  const [apiStatus, setApiStatus] = useState<string>('Checking...');
  const [userApiResult, setUserApiResult] = useState<string>('');
  
  useEffect(() => {
    const checkApi = async () => {
      try {
        // Basic API check
        const response = await fetch('/api/user', {
          credentials: 'include'
        });
        
        const text = await response.text();
        
        setApiStatus(`Status: ${response.status} ${response.statusText}`);
        setUserApiResult(text);
      } catch (err) {
        setApiStatus(`Error: ${err instanceof Error ? err.message : String(err)}`);
      }
    };
    
    checkApi();
  }, []);
  
  const handleSimpleLogin = async () => {
    try {
      console.log('Attempting login...');
      const result = await login({
        email: 'test@example.com',
        password: 'password123'
      });
      console.log('Login result:', result);
      // Refresh the page to show the updated data
      window.location.reload();
    } catch (err) {
      console.error('Login error:', err);
    }
  };
  
  const handleSimpleRegister = async () => {
    try {
      console.log('Attempting registration...');
      const result = await register({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
      console.log('Register result:', result);
      // Refresh the page to show the updated data
      window.location.reload();
    } catch (err) {
      console.error('Register error:', err);
    }
  };
  
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Debug Page</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-lg font-medium">Auth Context Status</h2>
            <p><strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
            <p><strong>User:</strong> {user ? JSON.stringify(user) : 'Not logged in'}</p>
            <p><strong>Error:</strong> {error || 'None'}</p>
          </div>
          
          <div>
            <h2 className="text-lg font-medium">API Status</h2>
            <p>{apiStatus}</p>
            <p><strong>API Response:</strong> {userApiResult}</p>
          </div>
          
          <div className="flex space-x-4">
            <Button onClick={handleSimpleLogin}>
              Test Login
            </Button>
            <Button variant="outline" onClick={handleSimpleRegister}>
              Test Register
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}