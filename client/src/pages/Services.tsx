import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Bug, Rat, Search, Check, ArrowRight, Star, X, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/lib/language";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOrders } from "@/lib/orders";

const getServicesList = (t: any) => [
  {
    id: "general",
    titleKey: "servicesDetails.generalPestControl",
    descriptionKey: "servicesDetails.generalPestDesc",
    price: "149",
    featuresKeys: ["servicesDetails.interiorExterior", "servicesDetails.webRemoval", "servicesDetails.guarantee"],
    icon: Shield,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    id: "termite",
    titleKey: "servicesDetails.termiteDefense",
    descriptionKey: "servicesDetails.termiteDesc",
    price: "299",
    featuresKeys: ["servicesDetails.thoroughInspection", "servicesDetails.baitStation", "servicesDetails.annualMonitoring"],
    icon: Bug,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  {
    id: "rodent",
    titleKey: "servicesDetails.rodentExclusion",
    descriptionKey: "servicesDetails.rodentDesc",
    price: "199",
    featuresKeys: ["servicesDetails.entryPointInspection", "servicesDetails.trappingRemoval", "servicesDetails.sanitization"],
    icon: Rat,
    color: "text-slate-600",
    bg: "bg-slate-100",
  },
  {
    id: "mosquito",
    titleKey: "servicesDetails.mosquitoShield",
    descriptionKey: "servicesDetails.mosquitoDesc",
    price: "89",
    featuresKeys: ["servicesDetails.yardFogging", "servicesDetails.larvicide", "servicesDetails.monthlyService"],
    icon: Bug,
    color: "text-green-600",
    bg: "bg-green-100",
  }
];

export default function Services() {
  const { t, language } = useLanguage();
  const { orders } = useOrders();
  const [searchQuery, setSearchQuery] = useState("");
  const servicesList = getServicesList(t);
  const [animatedCards, setAnimatedCards] = useState<Set<string>>(
    new Set(servicesList.map(s => s.id))
  );
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "50px 0px 50px 0px"
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setAnimatedCards(prev => new Set(prev).add(entry.target.id));
        }
      });
    }, observerOptions);

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const getAverageRating = (serviceType: string) => {
    const serviceOrders = orders.filter(o => 
      o.serviceType.toLowerCase().includes(serviceType.toLowerCase().split(" ")[0]) && 
      o.rating
    );
    
    if (serviceOrders.length === 0) return 4.9; // Default high rating for demo
    
    const sum = serviceOrders.reduce((acc, curr) => acc + (curr.rating || 0), 0);
    return (sum / serviceOrders.length).toFixed(1);
  };

  const filteredServices = servicesList.filter(service =>
    t(service.titleKey).toLowerCase().includes(searchQuery.toLowerCase()) ||
    t(service.descriptionKey).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-24 pt-8 px-4 max-w-md mx-auto">
      {/* Header Section with Enhanced Typography */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">{t("servicesDetails.ourServices")}</h1>
        </div>
        <p className="text-muted-foreground text-sm">{t("servicesDetails.professionalSolutions")}</p>
      </motion.div>

      {/* Enhanced Search Bar */}
      <motion.div 
        className="relative mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input 
          placeholder={t("servicesDetails.searchServices")} 
          className="pl-9 pr-9 bg-card shadow-sm border-border/60 rounded-xl focus:ring-2 focus:ring-primary/50" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-testid="input-search-services"
        />
        {searchQuery && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            data-testid="button-clear-search"
          >
            <X className="w-4 h-4" />
          </motion.button>
        )}
      </motion.div>

      {/* Services Grid */}
      <div className="space-y-5">
        {filteredServices.length === 0 ? (
          <motion.div 
            className="text-center py-12 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm">{t("servicesDetails.searchServices")}</p>
            <p className="text-xs mt-2">"<strong>{searchQuery}</strong>"</p>
          </motion.div>
        ) : (
          filteredServices.map((service, index) => (
          <motion.div
            key={service.id}
            id={`card-${service.id}`}
            ref={(el) => {
              if (el && observerRef.current) {
                observerRef.current.observe(el);
              }
            }}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={animatedCards.has(service.id) ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            className="group"
          >
            {/* Card with Modern Design */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Animated Border */}
              <motion.div 
                className="absolute inset-0 rounded-2xl border-2 border-primary/20 group-hover:border-primary/40 transition-colors duration-300"
                whileHover={{ borderColor: "rgba(var(--primary), 0.6)" }}
              />
              
              <div className="relative bg-card/95 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
                {/* Top Section - Icon and Title */}
                <div className="flex items-start gap-4 mb-5">
                  <motion.div 
                    className={`w-14 h-14 rounded-xl ${service.bg} flex items-center justify-center ${service.color} shrink-0 shadow-md`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <service.icon className="w-7 h-7" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h3 className="font-bold text-lg leading-tight text-foreground">{t(service.titleKey)}</h3>
                      <motion.div 
                        className="flex items-center gap-1 bg-gradient-to-r from-yellow-50 to-amber-50 px-3 py-1 rounded-full border border-yellow-200 shadow-sm shrink-0"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        <span className="text-xs font-bold text-yellow-700">{getAverageRating(t(service.titleKey))}</span>
                      </motion.div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t(service.descriptionKey)}</p>
                  </div>
                </div>
                
                {/* Features Section */}
                <div className="space-y-3 mb-5 pl-5 border-l-2 border-primary/20">
                  {service.featuresKeys.map((featureKey, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={animatedCards.has(service.id) ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ delay: animatedCards.has(service.id) ? 0.2 + i * 0.1 : 0 }}
                    >
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground/90">{t(featureKey)}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Section - Price and CTA */}
                <div className="flex items-center justify-between pt-5 border-t border-border/50">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="cursor-default"
                  >
                    <span className="text-xs text-muted-foreground block mb-1 font-medium">{t("common.startingAt")}</span>
                    <span className="text-2xl font-bold text-primary">{service.price}</span>
                    <span className="text-xs text-muted-foreground ml-1">{t("common.sar")}</span>
                  </motion.div>
                  
                  <Link 
                    href="/book"
                    onClick={() => {
                      localStorage.setItem("selectedService", service.id);
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        size="sm" 
                        className="rounded-full px-5 py-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-medium shadow-md hover:shadow-lg transition-all"
                      >
                        {t("servicesDetails.bookNow")} 
                        <ArrowRight className="w-4 h-4 ml-2" style={{ transform: language === 'ar' ? 'scaleX(-1)' : 'none' }} />
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
