import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { useLanguage } from "@/lib/language";
import { useTheme } from "@/lib/theme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, ArrowRight, Mail, Lock, User, Loader2, Globe, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import heroImage from "@assets/generated_images/clean_modern_living_room_interior.png"; // Re-using the asset

export default function AuthPage() {
  const { login, register, isLoading } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mode, setMode] = useState<"login" | "register">("login");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  
  // Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      await login(email, password);
    } else {
      await register(name, email, password);
    }
  };

  const fillDemo = (role: "customer" | "tech") => {
    if (role === "customer") {
      setEmail("jane@example.com");
      setPassword("password");
    } else {
      setEmail("mike@semas.com");
      setPassword("password");
    }
    setMode("login");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Language & Theme Toggle */}
      <div className="absolute top-4 right-4 z-40 flex items-center gap-2">
        {/* Theme Toggle */}
        <Button 
          variant="ghost" 
          size="sm"
          onClick={toggleTheme}
          data-testid="button-theme-toggle-auth"
          className="p-2"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </Button>

        {/* Language Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="gap-2"
              data-testid="button-language-toggle-auth"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-medium">{language.toUpperCase()}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem 
              onClick={() => setLanguage("en")}
              className={language === "en" ? "bg-primary/10" : ""}
              data-testid="button-language-en-auth"
            >
              English
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => setLanguage("ar")}
              className={language === "ar" ? "bg-primary/10" : ""}
              data-testid="button-language-ar-auth"
            >
              العربية
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Background Design */}
      <div className="absolute top-0 left-0 right-0 h-[45vh] overflow-hidden rounded-b-[3rem] z-0">
        <div className="absolute inset-0 bg-primary/80 mix-blend-multiply z-10" />
        <img 
          src={heroImage} 
          alt="Background" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-20" />
      </div>

      <div className="relative z-30 flex-1 flex flex-col px-6 pt-20 pb-8 max-w-md mx-auto w-full">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-800 shadow-xl mb-4 shadow-blue-500/20">
            <span className="text-4xl font-black text-white" style={{ 
              WebkitTextStroke: '0.5px rgba(255,255,255,0.3)',
              textShadow: '0 2px 8px rgba(45, 212, 191, 0.4)'
            }}>S</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-1">SEMAS</h1>
          <p className="text-muted-foreground/80">{t("home.professional")}</p>
        </div>

        {/* Auth Card */}
        <div className="bg-card/95 backdrop-blur-xl border border-border/20 shadow-xl rounded-3xl p-6 flex-1 flex flex-col">
          <Tabs value={mode} onValueChange={(v) => setMode(v as "login" | "register")} className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">{t("auth.signIn")}</TabsTrigger>
              <TabsTrigger value="register">{t("auth.signUp")}</TabsTrigger>
            </TabsList>
          </Tabs>

          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onSubmit={handleSubmit}
              className="space-y-4 flex-1"
            >
              {mode === "register" && (
                <div className="space-y-2">
                  <Label htmlFor="name">{t("auth.name")}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      className="pl-10 h-12 rounded-xl bg-card/50"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">{t("auth.email")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    className="pl-10 h-12 rounded-xl bg-card/50"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t("auth.password")}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10 h-12 rounded-xl bg-card/50"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full h-12 rounded-xl text-lg font-medium shadow-lg shadow-primary/20" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : mode === "login" ? (
                    <>{t("auth.signIn")} <ArrowRight className="ml-2 w-5 h-5" style={{ transform: language === 'ar' ? 'scaleX(-1)' : 'none' }} /></>
                  ) : (
                    <>{t("auth.createAccount")} <ArrowRight className="ml-2 w-5 h-5" style={{ transform: language === 'ar' ? 'scaleX(-1)' : 'none' }} /></>
                  )}
                </Button>
              </div>
            </motion.form>
          </AnimatePresence>

          {/* Demo Logins */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <p className="text-xs text-center text-muted-foreground mb-3">{t("authPage.demoLoginsTitle")}</p>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => fillDemo("customer")}
              >
                {t("common.customer")}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => fillDemo("tech")}
              >
                {t("dashboard.technicianPortal")}
              </Button>
            </div>
          </div>
        </div>
        
        <p className="text-center text-xs text-muted-foreground mt-6">
          {t("legal.termsAndPrivacy")}
        </p>
      </div>
    </div>
  );
}
