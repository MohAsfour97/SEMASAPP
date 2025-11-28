import { motion } from "framer-motion";
import { Shield, Clock, Star, CheckCircle, ArrowRight, Phone } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/lib/language";
import { useAuth } from "@/lib/auth";
import { useOrders } from "@/lib/orders";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@assets/generated_images/pest_control_technician_outdoor_service_landscape.png";

export default function Home() {
  const { t } = useLanguage();
  const { user, getUserById } = useAuth();
  const { getOrdersByCustomer } = useOrders();
  
  // Get customer's active order (non-completed, non-cancelled)
  const customerOrders = user ? getOrdersByCustomer(user.id) : [];
  const activeOrder = customerOrders.find(o => o.status !== 'completed' && o.status !== 'cancelled') || null;
  
  // Get technician data if order has one assigned
  const technician = activeOrder?.technicianId ? getUserById(activeOrder.technicianId) : null;
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
            <h1 className="text-3xl font-bold mb-2" style={{ 
              color: '#0d7a5f',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.5), -2px -2px 0 rgba(255, 255, 255, 0.6), 2px 2px 0 rgba(255, 255, 255, 0.6)'
            }}>{t("home.pestFree")}<br/>{t("home.worryFree")}</h1>
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
        <section data-testid="section-active-service">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold" data-testid="heading-active-service">{t("home.activeService")}</h2>
            <Link href="/track">
              <span className="text-primary text-sm font-medium cursor-pointer" data-testid="link-track-order">{t("home.track")}</span>
            </Link>
          </div>
          {activeOrder ? (
            <Card className="overflow-hidden border-none shadow-md bg-card relative" data-testid="card-active-service">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
              <CardContent className="p-4" data-testid="content-active-service">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground" data-testid="text-service-name">{activeOrder.serviceType}</h3>
                    <p className="text-sm text-muted-foreground" data-testid="text-service-time">{t("home.serviceTime")}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    activeOrder.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    activeOrder.status === 'accepted' ? 'bg-blue-100 text-blue-700' :
                    activeOrder.status === 'en_route' ? 'bg-purple-100 text-purple-700' :
                    'bg-orange-100 text-orange-700'
                  }`} data-testid="badge-status">
                    {activeOrder.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                {technician && (
                  <div className="flex items-center gap-3 pt-3 border-t border-border/50">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs overflow-hidden">
                      {technician.avatar ? (
                        <img src={technician.avatar} alt={technician.name} className="w-full h-full object-cover" />
                      ) : (
                        <span>{technician.name?.charAt(0) || "T"}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium" data-testid="text-technician-name">{technician.name}</p>
                      <p className="text-xs text-muted-foreground" data-testid="text-technician-role">{t("common.technician")}</p>
                    </div>
                    <Link href={`/chat/${activeOrder.id}`}>
                      <Button size="icon" variant="ghost" className="rounded-full h-8 w-8 text-primary bg-primary/5">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="overflow-hidden border-none shadow-md bg-card relative" data-testid="card-active-service">
              <CardContent className="p-4 text-center text-muted-foreground">
                <p>{t("trackingDetails.noOrdersYet")}</p>
                <Link href="/book">
                  <Button className="mt-3 bg-primary text-white">{t("booking.book")}</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Popular Services */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">{t("home.popularServices")}</h2>
            <Link href="/services">
              <span className="text-primary text-sm font-medium cursor-pointer" data-testid="link-view-all-services">{t("home.viewAll")}</span>
            </Link>
          </div>
          <div className="space-y-3">
            {[
              { id: "termite", nameKey: "servicesDetails.termiteInspection", price: "99", icon: Shield },
              { id: "general", nameKey: "servicesDetails.generalPestControl", price: "149", icon: CheckCircle },
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/book?service=${service.id}`}>
                  <Card className="border-border/50 shadow-sm hover:shadow-md transition-all active:scale-[0.99] cursor-pointer" data-testid={`card-service-${service.id}`}>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary/30 flex items-center justify-center text-primary">
                        <service.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{t(service.nameKey)}</h3>
                        <p className="text-sm text-muted-foreground">{t("common.startingAt")} {service.price} {t("common.sar")}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground/50" />
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
