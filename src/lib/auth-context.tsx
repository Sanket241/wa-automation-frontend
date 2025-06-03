import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { User, LoginCredentials, RegisterCredentials } from "./types";

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<User>;
  register: (credentials: RegisterCredentials) => Promise<User>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const defaultContext: AuthContextType = {
  user: null,
  login: async () => {
    throw new Error("AuthContext not initialized");
  },
  register: async () => {
    throw new Error("AuthContext not initialized");
  },
  logout: async () => {
    throw new Error("AuthContext not initialized");
  },
  isAuthenticated: false,
  isLoading: true,
  error: null
};

// Create context
const AuthContext = createContext<AuthContextType>(defaultContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is authenticated when component mounts
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/user', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (err) {
        console.error('Authentication check failed:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials): Promise<User> => {
    setError(null);
    
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include"
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      
      setUser(data);
      return data;
    } catch (error: any) {
      console.error("Login failed:", error);
      setError(error.message || "Login failed");
      throw error;
    }
  };
  
  // Register function
  const register = async (credentials: RegisterCredentials): Promise<User> => {
    setError(null);
    
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include"
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }
      
      setUser(data);
      return data;
    } catch (error: any) {
      console.error("Registration failed:", error);
      setError(error.message || "Registration failed");
      throw error;
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include"
      });
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const contextValue: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isLoading,
    error
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}


