import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Bug, Rat, Search, Check, ArrowRight, Star, X } from "lucide-react";
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{t("servicesDetails.ourServices")}</h1>
        <p className="text-muted-foreground">{t("servicesDetails.professionalSolutions")}</p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input 
          placeholder={t("servicesDetails.searchServices")} 
          className="pl-9 pr-9 bg-card shadow-sm border-border/60" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-testid="input-search-services"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            data-testid="button-clear-search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        {filteredServices.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            <p>{t("servicesDetails.searchServices")}</p>
            <p className="text-sm mt-2">"<strong>{searchQuery}</strong>"</p>
          </div>
        ) : (
          filteredServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <div className="bg-card rounded-2xl p-5 shadow-sm border border-border/50 hover:shadow-md transition-all relative overflow-hidden">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center ${service.color} shrink-0`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex justify-between items-start w-full">
                     <h3 className="font-bold text-lg text-foreground">{t(service.titleKey)}</h3>
                     <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-full border border-yellow-100">
                        <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                        <span className="text-xs font-bold text-yellow-700">{getAverageRating(t(service.titleKey))}</span>
                     </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">{t(service.descriptionKey)}</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4 pl-16">
                {service.featuresKeys.map((featureKey, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                    <Check className="w-4 h-4 text-primary" />
                    <span>{t(featureKey)}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pl-16 mt-4 border-t border-border/50 pt-4">
                <div>
                  <span className="text-xs text-muted-foreground block">{t("common.startingAt")}</span>
                  <span className="text-xl font-bold text-primary">{service.price} {t("common.sar")}</span>
                </div>
                <Link 
                  href="/book"
                  onClick={() => {
                    localStorage.setItem("selectedService", service.id);
                  }}
                >
                  <Button size="sm" className="rounded-full px-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    {t("servicesDetails.bookNow")} <ArrowRight className="w-4 h-4 ml-1" style={{ transform: language === 'ar' ? 'scaleX(-1)' : 'none' }} />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
