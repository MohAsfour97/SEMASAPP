import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Bug, Rat, Search, Check, ArrowRight, Star, X, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/lib/language";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOrders } from "@/lib/orders";
import heroImage from "@assets/generated_images/pest_control_indoor_service_treatment.png";

const getServicesList = (t: any) => [
  {
    id: "general",
    titleKey: "servicesDetails.generalPestControl",
    descriptionKey: "servicesDetails.generalPestDesc",
    price: "149",
    featuresKeys: ["servicesDetails.interiorExterior", "servicesDetails.webRemoval", "servicesDetails.guarantee"],
    icon: Bug,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    id: "termite",
    titleKey: "servicesDetails.termiteDefense",
    descriptionKey: "servicesDetails.termiteDesc",
    price: "299",
    featuresKeys: ["servicesDetails.thoroughInspection", "servicesDetails.baitStation", "servicesDetails.annualMonitoring"],
    icon: Search,
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
    icon: Shield,
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
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const lastScrollY = useRef(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
      setScrollY(currentScrollY);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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

  const getCardOffset = (index: number) => {
    const baseOffset = scrollY * (0.3 + index * 0.1);
    return scrollDirection === 'down' ? baseOffset : -baseOffset * 0.5;
  };

  return (
    <div className="pb-24 pt-0 px-0 max-w-md mx-auto" ref={containerRef}>
      {/* Hero Section with Background */}
      <div className="relative h-40 w-full overflow-hidden rounded-b-3xl mb-0">
        <div
          style={{
            transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0001})`,
            filter: `blur(${Math.min(scrollY * 0.05, 8)}px)`,
            transition: 'transform 0.1s ease-out, filter 0.1s ease-out'
          }}
          className="absolute inset-0 origin-center"
        >
          <img 
            src={heroImage} 
            alt="Services background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-cyan-300" />
              </motion.div>
              <h1 className="text-2xl font-bold" style={{ 
                color: '#ffffff',
                WebkitTextStroke: '0.5px #2dd4bf',
                textShadow: '0 0 10px #2dd4bf, 0 0 18px #14b8a6',
                paintOrder: 'stroke fill'
              }}>{t("servicesDetails.ourServices")}</h1>
            </div>
            <p className="text-white/90 text-xs">{t("servicesDetails.professionalSolutions")}</p>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Search Bar */}
      <motion.div 
        className="relative mb-8 mt-6 px-4"
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
      <div className="space-y-5 px-4">
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
            transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
            style={{ 
              y: animatedCards.has(service.id) ? getCardOffset(index) : 0,
            }}
            className="group"
          >
            {/* Card with Modern Design */}
            <motion.div 
              className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group/card"
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Animated Background Gradient */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
                animate={{ opacity: [0, 0.05, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              {/* Animated Border with Glow */}
              <motion.div 
                className="absolute inset-0 rounded-2xl border-2 border-primary/20 group-hover/card:border-primary/50 transition-colors duration-300"
                whileHover={{ borderColor: "var(--primary)" }}
              />
              
              {/* Glow Effect on Hover */}
              <motion.div 
                className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover/card:opacity-100 blur-xl transition-opacity duration-300 -z-10"
              />
              
              <div className="relative bg-card/95 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
                {/* Top Section - Icon and Title */}
                <div className="flex items-start gap-4 mb-5">
                  <motion.div 
                    className={`w-14 h-14 rounded-xl ${service.bg} flex items-center justify-center ${service.color} shrink-0 shadow-md relative overflow-hidden`}
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    style={{
                      animation: animatedCards.has(service.id) ? `float 3s ease-in-out ${index * 0.2}s infinite` : 'none'
                    }}
                  >
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    />
                    <service.icon className="w-7 h-7 relative z-10" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h3 className="font-bold text-lg leading-tight text-foreground">{t(service.titleKey)}</h3>
                      <motion.div 
                        className="flex items-center gap-1 bg-gradient-to-r from-yellow-50 to-amber-50 px-3 py-1 rounded-full border border-yellow-200 shadow-sm shrink-0 relative overflow-hidden"
                        whileHover={{ scale: 1.1 }}
                        animate={{ 
                          boxShadow: ["0 0 0px rgba(251,191,36,0)", "0 0 12px rgba(251,191,36,0.3)", "0 0 0px rgba(251,191,36,0)"]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        </motion.div>
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
                      className="flex items-center gap-3 group/feature"
                      initial={{ opacity: 0, x: -10 }}
                      animate={animatedCards.has(service.id) ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ delay: animatedCards.has(service.id) ? 0.25 + i * 0.08 : 0, duration: 0.4 }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                      >
                        <Check className="w-5 h-5 text-primary flex-shrink-0 group-hover/feature:text-green-500 transition-colors" />
                      </motion.div>
                      <span className="text-sm text-foreground/90 group-hover/feature:text-foreground transition-colors">{t(featureKey)}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Section - Price and CTA */}
                <div className="flex items-center justify-between pt-5 border-t border-border/50">
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className="cursor-default group/price"
                  >
                    <span className="text-xs text-muted-foreground block mb-1 font-medium">{t("common.startingAt")}</span>
                    <motion.div 
                      className="text-2xl font-bold text-primary group-hover/price:text-transparent group-hover/price:bg-clip-text group-hover/price:bg-gradient-to-r group-hover/price:from-primary group-hover/price:to-purple-500 transition-all"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.15 }}
                    >
                      {service.price}
                    </motion.div>
                    <span className="text-xs text-muted-foreground ml-1">{t("common.sar")}</span>
                  </motion.div>
                  
                  <Link 
                    href="/book"
                    onClick={() => {
                      localStorage.setItem("selectedService", service.id);
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.92 }}
                    >
                      <Button 
                        size="sm" 
                        className="rounded-full px-5 py-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-medium shadow-md hover:shadow-xl transition-all"
                      >
                        <span className="flex items-center gap-2">
                          {t("servicesDetails.bookNow")} 
                          <ArrowRight className="w-4 h-4" style={{ transform: language === 'ar' ? 'scaleX(-1)' : 'none' }} />
                        </span>
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
          ))
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 0px rgba(var(--primary-rgb), 0); }
          50% { box-shadow: 0 0 15px rgba(var(--primary-rgb), 0.3); }
        }
      `}</style>
    </div>
  );
}
