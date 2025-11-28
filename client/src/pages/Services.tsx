import { motion } from "framer-motion";
import { Shield, Bug, Rat, Search, Check, ArrowRight, Star } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOrders } from "@/lib/orders";

const servicesList = [
  {
    id: "general",
    title: "General Pest Control",
    description: "Comprehensive protection against common household pests including ants, spiders, and roaches.",
    price: "$149",
    features: ["Interior & Exterior Treatment", "Web Removal", "90-Day Guarantee"],
    icon: Shield,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    id: "termite",
    title: "Termite Defense",
    description: "Advanced termite detection and elimination system to protect your home's structure.",
    price: "$299",
    features: ["Thorough Inspection", "Bait Station Installation", "Annual Monitoring"],
    icon: Bug,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  {
    id: "rodent",
    title: "Rodent Exclusion",
    description: "Humane removal and entry point sealing to keep rats and mice out for good.",
    price: "$199",
    features: ["Entry Point Inspection", "Trapping & Removal", "Sanitization"],
    icon: Rat,
    color: "text-slate-600",
    bg: "bg-slate-100",
  },
  {
    id: "mosquito",
    title: "Mosquito Shield",
    description: "Seasonal yard treatment to reduce mosquito populations and reclaim your outdoor space.",
    price: "$89",
    features: ["Yard Fogging", "Larvicide Application", "Monthly Service"],
    icon: Bug,
    color: "text-green-600",
    bg: "bg-green-100",
  }
];

export default function Services() {
  const { orders } = useOrders();

  const getAverageRating = (serviceType: string) => {
    const serviceOrders = orders.filter(o => 
      o.serviceType.toLowerCase().includes(serviceType.toLowerCase().split(" ")[0]) && 
      o.rating
    );
    
    if (serviceOrders.length === 0) return 4.9; // Default high rating for demo
    
    const sum = serviceOrders.reduce((acc, curr) => acc + (curr.rating || 0), 0);
    return (sum / serviceOrders.length).toFixed(1);
  };

  return (
    <div className="pb-24 pt-8 px-4 max-w-md mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Our Services</h1>
        <p className="text-muted-foreground">Professional solutions for every pest problem.</p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input placeholder="Search services..." className="pl-9 bg-card shadow-sm border-border/60" />
      </div>

      <div className="space-y-4">
        {servicesList.map((service, index) => (
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
                     <h3 className="font-bold text-lg text-foreground">{service.title}</h3>
                     <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-full border border-yellow-100">
                        <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                        <span className="text-xs font-bold text-yellow-700">{getAverageRating(service.title)}</span>
                     </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">{service.description}</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4 pl-16">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                    <Check className="w-4 h-4 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pl-16 mt-4 border-t border-border/50 pt-4">
                <div>
                  <span className="text-xs text-muted-foreground block">Starting at</span>
                  <span className="text-xl font-bold text-primary">{service.price}</span>
                </div>
                <Link href={`/book?service=${service.id}`}>
                  <Button size="sm" className="rounded-full px-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    Book Now <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
