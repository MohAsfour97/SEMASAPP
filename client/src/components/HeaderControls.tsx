import { motion } from "framer-motion";
import { Globe, Moon, Sun } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { useTheme } from "@/lib/theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function HeaderControls() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
      {/* Language Toggle */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background/90 transition-colors shadow-md"
            data-testid="button-language-toggle-header"
            title={t("common.language") || "Language"}
          >
            <Globe className="w-5 h-5 text-foreground" />
          </motion.button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem
            onClick={() => setLanguage("en")}
            className={language === "en" ? "bg-primary/10" : ""}
            data-testid="button-language-en-header"
          >
            English
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setLanguage("ar")}
            className={language === "ar" ? "bg-primary/10" : ""}
            data-testid="button-language-ar-header"
          >
            العربية
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Theme Toggle */}
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background/90 transition-colors shadow-md"
            data-testid="button-theme-toggle"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDark ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {isDark ? (
                <Moon className="w-5 h-5 text-foreground" />
              ) : (
                <Sun className="w-5 h-5 text-foreground" />
              )}
            </motion.div>
          </motion.button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          {isDark ? "Light Mode" : "Dark Mode"}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
