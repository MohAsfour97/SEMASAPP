import { Link, useLocation } from "wouter";
import { Home, Calendar, MapPin, User, Shield, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { useLanguage } from "@/lib/language";

export default function BottomNav() {
  const [location] = useLocation();
  const { user } = useAuth();
  const { t } = useLanguage();

  const customerNavItems = [
    { icon: Home, label: t("nav.home"), path: "/" },
    { icon: Shield, label: t("nav.services"), path: "/services" },
    { icon: Calendar, label: t("nav.book"), path: "/book" },
    { icon: MapPin, label: t("nav.track"), path: "/track" },
    { icon: User, label: t("nav.profile"), path: "/profile" },
  ];

  const employeeNavItems = [
    { icon: Briefcase, label: t("nav.jobs"), path: "/" },
    { icon: User, label: t("nav.profile"), path: "/profile" },
  ];

  const navItems = user?.role === "technician" || user?.role === "admin" 
    ? employeeNavItems 
    : customerNavItems;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border z-50 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const isActive = location === item.path;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all duration-200 gap-1",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon 
                size={24} 
                strokeWidth={isActive ? 2.5 : 2}
                className={cn("transition-transform duration-200", isActive && "scale-110")}
              />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
