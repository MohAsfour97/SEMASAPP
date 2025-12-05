
import { motion } from "framer-motion";
import { Shield, Clock, Star, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language";
import { useEffect } from "react";
import heroImage from "@assets/generated_images/pest_control_technician_outdoor_service_landscape.png";

interface WelcomeProps {
  onComplete: () => void;
}

export default function Welcome({ onComplete }: WelcomeProps) {
  const { t, setLanguage } = useLanguage();

  // Set Arabic as default when Welcome page loads
  useEffect(() => {
    setLanguage("ar");
  }, []);

  const features = [
    {
      icon: Shield,
      titleKey: "welcome.safeEffective",
      descKey: "welcome.safeEffectiveDesc",
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      icon: Clock,
      titleKey: "welcome.fastService",
      descKey: "welcome.fastServiceDesc",
      color: "text-blue-500",
      bg: "bg-blue-100"
    },
    {
      icon: Star,
      titleKey: "welcome.expertTeam",
      descKey: "welcome.expertTeamDesc",
      color: "text-orange-500",
      bg: "bg-orange-100"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[45vh] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img 
            src={heroImage} 
            alt="SEMAS Pest Control" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-background" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute inset-0 flex flex-col justify-end p-6 text-white"
        >
          <h1 className="text-4xl font-bold mb-2" style={{ 
            color: '#ffffff',
            WebkitTextStroke: '0.5px #2dd4bf',
            textShadow: '0 0 10px #2dd4bf, 0 0 18px #14b8a6',
            paintOrder: 'stroke fill'
          }}>
            {t("welcome.title")}
          </h1>
          <p className="text-white/90 text-base max-w-[85%]">
            {t("welcome.subtitle")}
          </p>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="flex-1 px-6 py-8 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {t("welcome.whyChooseUs")}
          </h2>
          <p className="text-muted-foreground text-sm">
            {t("welcome.whyChooseUsDesc")}
          </p>
        </motion.div>

        {/* Features */}
        <div className="space-y-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 flex items-start gap-4"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center flex-shrink-0`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(feature.descKey)}
                </p>
              </div>
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="pt-4"
        >
          <Button
            onClick={onComplete}
            className="w-full rounded-full py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-semibold shadow-lg hover:shadow-xl transition-all text-base"
          >
            <span className="flex items-center justify-center gap-2">
              {t("welcome.getStarted")}
              <ArrowRight className="w-5 h-5" />
            </span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
