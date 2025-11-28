import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, ProtectedRoute } from "@/lib/auth";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Booking from "@/pages/Booking";
import Tracking from "@/pages/Tracking";
import Profile from "@/pages/Profile";
import AuthPage from "@/pages/Auth";
import BottomNav from "@/components/BottomNav";

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <Route path="/" component={() => <ProtectedRoute component={Home} />} />
      <Route path="/services" component={() => <ProtectedRoute component={Services} />} />
      <Route path="/book" component={() => <ProtectedRoute component={Booking} />} />
      <Route path="/track" component={() => <ProtectedRoute component={Tracking} />} />
      <Route path="/profile" component={() => <ProtectedRoute component={Profile} />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function NavigationWrapper() {
  const [location] = useLocation();
  // Hide bottom nav on auth page
  if (location === "/auth") return null;
  return <BottomNav />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
            <Router />
            <NavigationWrapper />
            <Toaster />
          </div>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
