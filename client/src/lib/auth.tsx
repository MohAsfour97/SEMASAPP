import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

// Mock User Types
export type UserRole = "customer" | "technician" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
  getUserById: (userId: string) => User | undefined;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock Database
const MOCK_USERS: User[] = [
  { id: "1", name: "Jane Doe", email: "jane@example.com", role: "customer", phone: "+966-50-123-4567" },
  { id: "2", name: "Mike Johnson", email: "mike@semas.com", role: "technician", avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d", phone: "+966-50-987-6543" },
  { id: "3", name: "Admin User", email: "admin@semas.com", role: "admin", phone: "+966-50-111-2222" },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Check for persisted user
    const savedUser = localStorage.getItem("semas_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simple mock validation
    const foundUser = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (foundUser) {
      // In a real app, check password here. For mock, we accept any password for these users.
      // Or we can enforce "password" or "123456"
      if (password.length < 3) {
         toast({ title: "Login Failed", description: "Password must be at least 3 characters", variant: "destructive" });
         setIsLoading(false);
         return;
      }
      
      setUser(foundUser);
      localStorage.setItem("semas_user", JSON.stringify(foundUser));
      toast({ title: `Welcome back, ${foundUser.name}!` });
      setLocation("/");
    } else {
      toast({ title: "Login Failed", description: "Invalid email or password", variant: "destructive" });
    }
    setIsLoading(false);
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if user exists
    if (MOCK_USERS.some((u) => u.email === email)) {
      toast({ title: "Registration Failed", description: "Email already in use", variant: "destructive" });
      setIsLoading(false);
      return;
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: "customer", // Default role for signups
    };

    // In a real app, we wouldn't just push to a const, but this is mock state
    // We won't push to MOCK_USERS for persistence across reloads since it's a const file,
    // but we will log them in immediately.
    
    setUser(newUser);
    localStorage.setItem("semas_user", JSON.stringify(newUser));
    toast({ title: "Account Created", description: "Welcome to SEMAS!" });
    setLocation("/");
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("pestguard_user");
    toast({ title: "Logged Out", description: "See you soon!" });
    setLocation("/auth");
  };

  const updateUser = (updatedUser: Partial<User>) => {
    if (user) {
      const newUser = { ...user, ...updatedUser };
      setUser(newUser);
      localStorage.setItem("semas_user", JSON.stringify(newUser));
    }
  };

  const getUserById = (userId: string) => {
    return MOCK_USERS.find(u => u.id === userId);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateUser, getUserById }}>
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

export function ProtectedRoute({ component: Component }: { component: React.ComponentType<any> }) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/auth");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-background">Loading...</div>;
  
  // If not logged in, return null (will redirect via useEffect)
  if (!user) return null;

  return <Component />;
}
