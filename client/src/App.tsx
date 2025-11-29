import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, ProtectedRoute, useAuth } from "@/lib/auth";
import { OrderProvider } from "@/lib/orders";
import { ThemeProvider } from "@/lib/theme";
import { LanguageProvider } from "@/lib/language";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Booking from "@/pages/Booking";
import Tracking from "@/pages/Tracking";
import Profile from "@/pages/Profile";
import AuthPage from "@/pages/Auth";
import EmployeeDashboard from "@/pages/EmployeeDashboard";
import Chat from "@/pages/Chat";
import BottomNav from "@/components/BottomNav";
import HeaderControls from "@/components/HeaderControls";

// Dynamic Home Component based on Role
function HomeRouter() {
  const { user } = useAuth();
  
  if (user?.role === "technician" || user?.role === "admin") {
    return <EmployeeDashboard />;
  }
  
  return <Home />;
}

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <Route path="/" component={() => <ProtectedRoute component={HomeRouter} />} />
      <Route path="/services" component={() => <ProtectedRoute component={Services} />} />
      <Route path="/book" component={() => <ProtectedRoute component={Booking} />} />
      <Route path="/track" component={() => <ProtectedRoute component={Tracking} />} />
      <Route path="/profile" component={() => <ProtectedRoute component={Profile} />} />
      <Route path="/chat/:orderId" component={() => <ProtectedRoute component={Chat} />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function NavigationWrapper() {
  const [location] = useLocation();
  // Hide bottom nav on auth page and chat page (to give more space for typing)
  if (location === "/auth" || location.startsWith("/chat/")) return null;
  return <BottomNav />;
}

function HeaderWrapper() {
  const [location] = useLocation();
  // Hide header controls on auth page only
  if (location === "/auth") return null;
  return <HeaderControls />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="semas-ui-theme">
        <LanguageProvider>
          <TooltipProvider>
            <AuthProvider>
              <OrderProvider>
                <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
                  <HeaderWrapper />
                  <Router />
                  <NavigationWrapper />
                  <Toaster />
                </div>
              </OrderProvider>
            </AuthProvider>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
