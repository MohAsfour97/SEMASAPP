import { motion } from "framer-motion";
import { Shield, Clock, Star, CheckCircle, ArrowRight, MessageCircle, MessageSquare, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/language";
import { useAuth } from "@/lib/auth";
import { useOrders } from "@/lib/orders";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import heroImage from "@assets/generated_images/pest_control_technician_outdoor_service_landscape.png";

const serviceTranslationMap: Record<string, string> = {
  "General Pest Control": "servicesDetails.generalPestControl",
  "Termite Inspection": "servicesDetails.termiteInspection",
  "Rodent Control": "servicesDetails.rodentExclusion",
  "Bed Bug Treatment": "servicesDetails.mosquitoShield",
};

const getTranslatedServiceName = (serviceName: string, t: any): string => {
  const key = serviceTranslationMap[serviceName];
  return key ? t(key) : serviceName;
};

export default function Home() {
  const { t, language } = useLanguage();
  const { user, getUserById } = useAuth();
  const { getOrdersByCustomer } = useOrders();
  const { toast } = useToast();
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(['section-stats', 'section-active-service', 'section-popular-services', 'section-visit-us']));
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const lastScrollY = useRef(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [inquiryData, setInquiryData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set(prev).add(entry.target.id));
        }
      });
    }, { threshold: 0.2, rootMargin: "50px 0px 50px 0px" });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleInquirySubmit = () => {
    if (!inquiryData.name || !inquiryData.email || !inquiryData.message) {
      toast({
        title: t("home.inquiryIncomplete"),
        description: t("home.fillAllFields"),
        variant: "destructive"
      });
      return;
    }
    toast({
      title: t("home.inquirySubmitted"),
      description: t("home.thankYouInquiry")
    });
    setInquiryData({ name: "", email: "", phone: "", message: "" });
    setInquiryOpen(false);
  };
  
  // Get customer's active order (non-completed, non-cancelled)
  const customerOrders = user ? getOrdersByCustomer(user.id) : [];
  const activeOrder = customerOrders.find(o => o.status !== 'completed' && o.status !== 'cancelled') || null;
  
  // Get technician data if order has one assigned
  const technician = activeOrder?.technicianId ? getUserById(activeOrder.technicianId) : null;
  return (
    <div className="pb-24">
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full overflow-hidden rounded-b-[2rem] shadow-lg">
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
            alt="Clean home" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white" style={{ opacity: 1 - scrollY * 0.003 }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-2" style={{ 
              color: '#ffffff',
              WebkitTextStroke: '0.5px #2dd4bf',
              textShadow: '0 0 10px #2dd4bf, 0 0 18px #14b8a6',
              paintOrder: 'stroke fill'
            }}>{t("home.pestFree")}{t("home.worryFree") && <><br/>{t("home.worryFree")}</>}</h1>
            <p className="text-white/90 text-base mb-4 max-w-[80%]">
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
        <motion.div 
          id="section-stats"
          ref={(el) => {
            if (el && observerRef.current) observerRef.current.observe(el);
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={visibleSections.has('section-stats') ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-3 gap-4">
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 flex flex-col items-center text-center">
            <div className="bg-secondary/50 p-2 rounded-full mb-2">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Shield className="w-5 h-5 text-primary" />
              </motion.div>
            </div>
            <span className="text-xs font-medium text-muted-foreground">{t("home.protected")}</span>
            <span className="text-lg font-bold text-foreground">365d</span>
          </div>
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 flex flex-col items-center text-center">
            <div className="bg-orange-100 p-2 rounded-full mb-2">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-5 h-5 text-orange-500" />
              </motion.div>
            </div>
            <span className="text-xs font-medium text-muted-foreground">{t("home.rating")}</span>
            <span className="text-lg font-bold text-foreground">4.9</span>
          </div>
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 flex flex-col items-center text-center">
            <div className="bg-blue-100 p-2 rounded-full mb-2">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Clock className="w-5 h-5 text-blue-500" />
              </motion.div>
            </div>
            <span className="text-xs font-medium text-muted-foreground">{t("home.arrival")}</span>
            <span className="text-lg font-bold text-foreground">&lt;24h</span>
          </div>
        </motion.div>

        {/* Active Order */}
        <motion.section 
          id="section-active-service"
          ref={(el) => {
            if (el && observerRef.current) observerRef.current.observe(el);
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={visibleSections.has('section-active-service') ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          data-testid="section-active-service">
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
                    <h3 className="font-semibold text-foreground" data-testid="text-service-name">{getTranslatedServiceName(activeOrder.serviceType, t)}</h3>
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
                        <MessageCircle className="w-4 h-4" />
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
        </motion.section>

        {/* Popular Services */}
        <motion.section
          id="section-popular-services"
          ref={(el) => {
            if (el && observerRef.current) observerRef.current.observe(el);
          }}
          initial={{ opacity: 0, x: -30 }}
          animate={visibleSections.has('section-popular-services') ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-primary" />
              </motion.div>
              {t("home.popularServices")}
            </h2>
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
                      <ArrowRight className="w-5 h-5 text-muted-foreground/50" style={{ transform: language === 'ar' ? 'scaleX(-1)' : 'none' }} />
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Visit Us Section */}
        <motion.section 
          id="section-visit-us"
          ref={(el) => {
            if (el && observerRef.current) observerRef.current.observe(el);
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={visibleSections.has('section-visit-us') ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 150 }}
          data-testid="section-visit-us">
          <h2 className="text-lg font-semibold mb-3">{t("home.visitUs")}</h2>
          <div className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
            <p className="text-sm text-muted-foreground p-4 pb-2">{t("home.findUsRiyadh")}</p>
            <div className="w-full h-64 relative">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                src="https://www.openstreetmap.org/export/embed.html?bbox=46.5753,24.6734,46.7753,24.7536&layer=mapnik&marker=24.7136,46.6753"
                loading="lazy"
                data-testid="map-semas-office"
              />
            </div>
            <div className={`p-4 border-t border-border/30 flex items-center justify-between ${language === 'ar' ? 'flex-row' : ''}`}>
              <div className={language === 'ar' ? 'order-2' : 'order-1'}>
                <p className="font-semibold text-foreground mb-2">{t("home.office")}</p>
                <p className="text-sm text-muted-foreground">Riyadh, Saudi Arabia</p>
              </div>
              <div className={`flex gap-2 ${language === 'ar' ? 'order-1' : 'order-2'}`}>
                {/* WhatsApp Icon */}
                <a 
                  href="https://wa.me/966"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-whatsapp"
                  title={t("home.whatsapp")}
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-md hover:shadow-lg transition-all cursor-pointer flex-shrink-0"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.148.568 4.158 1.545 5.897L0 24l6.348-1.495A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm6.75 17.775c-.297.829-.914 1.56-1.719 2.005-.805.445-1.816.694-2.85.694-.986 0-1.944-.214-2.85-.625l-.204-.1-2.109.5.5-2.13-.105-.21c-.411-.916-.636-1.904-.636-2.94 0-3.865 3.135-7 7-7 3.866 0 7 3.135 7 7 0 1.036-.225 2.025-.636 2.94l-.095.195z"/>
                      <path d="M8.884 7.431c-.165 0-.429.04-.656.236-.227.195-.855.835-.855 2.038 0 1.204.877 2.363 1 2.54.124.177 1.741 2.671 4.218 3.741 2.084.878 2.503.702 2.954.659.45-.042.855-.214 1.183-.535.328-.321.412-.686.535-1.11.124-.424.165-.748.041-.952-.124-.204-.429-.328-.886-.552-.456-.224-2.707-1.339-3.129-1.49-.422-.15-.73-.224-1.038.224-.31.449-.969 1.182-1.186 1.427-.216.245-.432.276-.889.09-.456-.184-1.922-.708-3.66-2.26-1.356-1.21-2.271-2.71-2.539-3.166-.268-.456-.029-.702.201-.929.206-.206.456-.537.684-.805.228-.268.304-.456.456-.702.152-.246.076-.46-.038-.683-.114-.224-.674-1.622-.925-2.22-.246-.58-.497-.502-.702-.512z"/>
                    </svg>
                  </motion.div>
                </a>

                {/* Send Inquiry Icon */}
                <Dialog open={inquiryOpen} onOpenChange={setInquiryOpen}>
                  <DialogTrigger asChild>
                    <button
                      data-testid="button-inquiry"
                      title={t("home.sendInquiry")}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center shadow-md hover:shadow-lg transition-all cursor-pointer flex-shrink-0"
                      >
                        <MessageSquare className="w-4 h-4 text-white" />
                      </motion.div>
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t("home.inquiryForm")}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">{t("home.yourName")}</label>
                        <Input
                          placeholder={t("home.enterName")}
                          value={inquiryData.name}
                          onChange={(e) => setInquiryData({...inquiryData, name: e.target.value})}
                          data-testid="input-inquiry-name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">{t("home.yourEmail")}</label>
                        <Input
                          type="email"
                          placeholder={t("home.enterEmail")}
                          value={inquiryData.email}
                          onChange={(e) => setInquiryData({...inquiryData, email: e.target.value})}
                          data-testid="input-inquiry-email"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">{t("home.yourPhone")}</label>
                        <Input
                          placeholder={t("home.enterPhone")}
                          value={inquiryData.phone}
                          onChange={(e) => setInquiryData({...inquiryData, phone: e.target.value})}
                          data-testid="input-inquiry-phone"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">{t("home.yourMessage")}</label>
                        <Textarea
                          placeholder={t("home.enterMessage")}
                          value={inquiryData.message}
                          onChange={(e) => setInquiryData({...inquiryData, message: e.target.value})}
                          className="min-h-[100px]"
                          data-testid="textarea-inquiry-message"
                        />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setInquiryOpen(false)}>
                          {t("home.cancel")}
                        </Button>
                        <Button onClick={handleInquirySubmit}>
                          {t("home.submit")}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
