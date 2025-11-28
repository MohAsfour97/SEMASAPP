import { User, Bell, Settings, Shield, LogOut, ChevronRight, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";

export default function Profile() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div className="pb-24 pt-8 px-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold overflow-hidden">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <span>{user?.name?.charAt(0) || "U"}</span>
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold">{user?.name || "User"}</h2>
          <p className="text-muted-foreground text-sm capitalize">{user?.role || "Member"}</p>
        </div>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 pl-1">Account</h3>
          <div className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
            {[
              { icon: User, label: "Personal Information" },
              { icon: Shield, label: "Security & Privacy" },
              { icon: Bell, label: "Notifications" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 border-b border-border/30 last:border-0 hover:bg-secondary/10 cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 pl-1">Preferences</h3>
          <div className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Push Notifications</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Email Updates</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium flex items-center gap-2">
                {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                Dark Mode
              </span>
              <Switch 
                checked={theme === 'dark'} 
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} 
              />
            </div>
          </div>
        </section>

        <Button 
          variant="destructive" 
          className="w-full rounded-xl h-12 gap-2"
          onClick={logout}
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </Button>
      </div>
    </div>
  );
}
