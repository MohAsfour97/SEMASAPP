import { motion } from "framer-motion";
import { Shield, Clock, Star, CheckCircle, ArrowRight, Phone } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/lib/language";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@assets/generated_images/clean_modern_living_room_interior.png";

export default function Home() {
  const { t } = useLanguage();
  return (
    <div className="pb-24">
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full overflow-hidden rounded-b-[2rem] shadow-lg">
        <img 
          src={heroImage} 
          alt="Clean home" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-2">{t("home.pestFree")}<br/>{t("home.worryFree")}</h1>
            <p className="text-white/90 text-sm mb-4 max-w-[80%]">
              {t("home.professional")}
            </p>
            <Link href="/book">
              <Button className="bg-primary text-white hover:bg-primary/90 rounded-full px-6 shadow-lg shadow-primary/25 border-none">
                {t("home.bookInspection")}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="px-4 mt-6 space-y-6 max-w-md mx-auto">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 flex flex-col items-center text-center">
            <div className="bg-secondary/50 p-2 rounded-full mb-2">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">{t("home.protected")}</span>
            <span className="text-lg font-bold text-foreground">365d</span>
          </div>
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 flex flex-col items-center text-center">
            <div className="bg-orange-100 p-2 rounded-full mb-2">
              <Star className="w-5 h-5 text-orange-500" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">{t("home.rating")}</span>
            <span className="text-lg font-bold text-foreground">4.9</span>
          </div>
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 flex flex-col items-center text-center">
            <div className="bg-blue-100 p-2 rounded-full mb-2">
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">{t("home.arrival")}</span>
            <span className="text-lg font-bold text-foreground">&lt;24h</span>
          </div>
        </div>

        {/* Active Order */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">{t("home.activeService")}</h2>
            <Link href="/track">
              <span className="text-primary text-sm font-medium cursor-pointer">{t("home.track")}</span>
            </Link>
          </div>
          <Card className="overflow-hidden border-none shadow-md bg-card relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">Quarterly Maintenance</h3>
                  <p className="text-sm text-muted-foreground">Today, 2:00 PM - 4:00 PM</p>
                </div>
                <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">
                  En Route
                </span>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-border/50">
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                  {/* Placeholder for tech avatar if we had a small one, or use icon */}
                  <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop" alt="Tech" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Mike Johnson</p>
                  <p className="text-xs text-muted-foreground">Technician</p>
                </div>
                <Button size="icon" variant="ghost" className="rounded-full h-8 w-8 text-primary bg-primary/5">
                  <Phone className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Popular Services */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Popular Services</h2>
            <Link href="/services">
              <span className="text-primary text-sm font-medium cursor-pointer">View All</span>
            </Link>
          </div>
          <div className="space-y-3">
            {[
              { name: "Termite Inspection", price: "$99", icon: Shield },
              { name: "General Pest Control", price: "$149", icon: CheckCircle },
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-border/50 shadow-sm hover:shadow-md transition-all active:scale-[0.99]">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/30 flex items-center justify-center text-primary">
                      <service.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">Starting at {service.price}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground/50" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
