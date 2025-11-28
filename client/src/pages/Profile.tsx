import { useState, useRef } from "react";
import { User, Bell, Settings, Shield, LogOut, ChevronRight, Moon, Sun, Camera, X } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [editPhone, setEditPhone] = useState(user?.phone || "");

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({ 
        title: t("fileUpload.invalidFile"), 
        description: t("fileUpload.selectImageFile"),
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({ 
        title: t("fileUpload.fileTooLarge"), 
        description: t("fileUpload.fileSizeLimit"),
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
        title: t("fileUpload.photoUpdated"),
        description: t("fileUpload.photoUpdateSuccess")
      });
    };

    reader.onerror = () => {
      setIsUploadingPhoto(false);
      toast({
        title: t("common.error"),
        description: t("fileUpload.uploadError"),
        variant: "destructive"
      });
    };

    reader.readAsDataURL(file);
  };

  const handleSavePersonalInfo = () => {
    if (!editName.trim()) {
      toast({
        title: t("common.error"),
        description: "Name cannot be empty",
        variant: "destructive"
      });
      return;
    }

    updateUser({ 
      name: editName.trim(),
      phone: editPhone.trim()
    });

    setShowPersonalInfo(false);
    toast({
      title: t("common.success"),
      description: "Personal information updated successfully"
    });
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
              { id: "personal", icon: User, label: t("trackingDetails.personalInformation") },
              { id: "security", icon: Shield, label: t("trackingDetails.securityPrivacy") },
              { id: "notifications", icon: Bell, label: t("trackingDetails.notifications") },
            ].map((item, i) => (
              <div 
                key={i}
                onClick={() => item.id === "personal" && setShowPersonalInfo(true)}
                className="flex items-center justify-between p-4 border-b border-border/30 last:border-0 hover:bg-secondary/10 cursor-pointer transition-colors"
                data-testid={`button-profile-${item.id}`}
              >
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

      {/* Personal Information Modal */}
      {showPersonalInfo && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowPersonalInfo(false)}>
          <div 
            className="w-full bg-card rounded-t-3xl p-6 space-y-4 animate-in slide-in-from-bottom-5 max-h-[90vh] overflow-y-auto pb-32"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{t("trackingDetails.personalInformation")}</h2>
              <button
                onClick={() => setShowPersonalInfo(false)}
                className="p-1 hover:bg-secondary rounded-lg transition-colors"
                data-testid="button-close-personal-info"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="edit-name">{t("auth.name")}</Label>
                <Input
                  id="edit-name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder={t("auth.name")}
                  className="h-11 rounded-xl bg-card/50"
                  data-testid="input-edit-name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone Number</Label>
                <Input
                  id="edit-phone"
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  placeholder="e.g., +966 50 123 4567"
                  className="h-11 rounded-xl bg-card/50"
                  data-testid="input-edit-phone"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-6 fixed bottom-24 left-0 right-0 px-4 bg-card">
              <Button
                variant="outline"
                className="flex-1 h-11 rounded-xl"
                onClick={() => setShowPersonalInfo(false)}
                data-testid="button-cancel-personal-info"
              >
                {t("common.cancel")}
              </Button>
              <Button
                className="flex-1 h-11 rounded-xl"
                onClick={handleSavePersonalInfo}
                data-testid="button-save-personal-info"
              >
                {t("common.save")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
