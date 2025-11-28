import { useState, useRef } from "react";
import { User, Bell, Settings, Shield, LogOut, ChevronRight, Moon, Sun, Camera } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { t } = useLanguage();
  const { user, logout, updateUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({ 
        title: "Invalid file", 
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({ 
        title: "File too large", 
        description: "Please select an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    setIsUploadingPhoto(true);
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      updateUser({ avatar: base64String });
      setIsUploadingPhoto(false);
      toast({
        title: "Profile photo updated",
        description: "Your profile photo has been changed successfully"
      });
    };

    reader.onerror = () => {
      setIsUploadingPhoto(false);
      toast({
        title: "Error",
        description: "Failed to upload photo",
        variant: "destructive"
      });
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="pb-24 pt-8 px-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">{t("trackingDetails.myProfile")}</h1>

      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold overflow-hidden">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span>{user?.name?.charAt(0) || "U"}</span>
            )}
          </div>
          {user?.role === "technician" && (
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingPhoto}
              className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 hover:bg-primary/90 transition-colors shadow-lg disabled:opacity-50"
              data-testid="button-upload-profile-photo"
              title="Change profile photo"
            >
              <Camera className="w-4 h-4" />
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
            disabled={isUploadingPhoto}
            data-testid="input-profile-photo"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold">{user?.name || "User"}</h2>
          <p className="text-muted-foreground text-sm capitalize">{user?.role === "customer" ? t("common.customer") : user?.role || t("common.member")}</p>
        </div>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 pl-1">{t("profile.account")}</h3>
          <div className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
            {[
              { icon: User, label: t("trackingDetails.personalInformation") },
              { icon: Shield, label: t("trackingDetails.securityPrivacy") },
              { icon: Bell, label: t("trackingDetails.notifications") },
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
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 pl-1">{t("profile.preferences")}</h3>
          <div className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">{t("trackingDetails.pushNotifications")}</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">{t("trackingDetails.emailUpdates")}</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium flex items-center gap-2">
                {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                {t("profile.darkMode")}
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
          <LogOut className="w-4 h-4" /> {t("trackingDetails.signOut")}
        </Button>
      </div>
    </div>
  );
}
