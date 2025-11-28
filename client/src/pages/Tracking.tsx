import { useOrders } from "@/lib/orders";
import { useAuth } from "@/lib/auth";
import { useLanguage } from "@/lib/language";
import { motion } from "framer-motion";
import { Clock, MapPin, CheckCircle2, MessageSquare, ChevronRight, Star, Phone, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { format } from "date-fns";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

import LiveMap from "@/components/LiveMap";

export default function Tracking() {
  const { t } = useLanguage();
  const { user, getUserById } = useAuth();
  const { getOrdersByCustomer, rateOrder } = useOrders();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [copiedPhoneId, setCopiedPhoneId] = useState<string | null>(null);

  const copyPhoneNumber = (orderId: string, phoneNumber: string | undefined) => {
    if (!phoneNumber) {
      toast({
        title: t("common.phoneNumberNotAvailable"),
        description: t("common.phoneNumberCopyFailed"),
        variant: "destructive"
      });
      return;
    }

    navigator.clipboard.writeText(phoneNumber);
    setCopiedPhoneId(orderId);
    toast({
      title: t("common.copied"),
      description: t("common.phoneNumberCopied")
    });
    setTimeout(() => setCopiedPhoneId(null), 2000);
  };
  
  const myOrders = user ? getOrdersByCustomer(user.id) : [];
  
  const handleRate = (orderId: string) => {
    rateOrder(orderId, rating);
    toast({ title: t("common.success"), description: t("common.success") });
  };
  
  // Sort by date (newest first)
  const sortedOrders = [...myOrders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (myOrders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center mb-4">
          <Clock className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-xl font-bold mb-2">{t("trackingDetails.noOrdersYet")}</h2>
        <p className="text-muted-foreground mb-6">{t("trackingDetails.bookFirstService")}</p>
        <Link href="/book">
          <Button className="rounded-full px-8">{t("booking.book")}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-8 px-4 max-w-md mx-auto min-h-screen bg-background">
      <h1 className="text-2xl font-bold mb-6">{t("trackingDetails.myOrders")}</h1>

      <div className="space-y-4">
        {sortedOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-2xl p-4 shadow-sm border border-border/50"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className={`
                  inline-block px-2 py-1 rounded-md text-xs font-bold mb-2
                  ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    order.status === 'accepted' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'en_route' ? 'bg-purple-100 text-purple-700' :
                    order.status === 'in_progress' ? 'bg-orange-100 text-orange-700' :
                    order.status === 'completed' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'}
                `}>
                  {order.status.replace('_', ' ').toUpperCase()}
                </span>
                <h3 className="font-bold text-lg">{order.serviceType}</h3>
              </div>
              <span className="text-sm text-muted-foreground">
                {format(new Date(order.date), "MMM d")}
              </span>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{order.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span data-testid="text-service-time">{t("common.serviceTime")}</span>
              </div>
            </div>

            {/* Live Map for Customer */}
            {(order.status === 'en_route' || order.status === 'in_progress') && (
               <div className="mb-4 -mx-4 sm:mx-0">
                 <LiveMap status={order.status} customerAddress={order.address} showRoute={true} />
               </div>
            )}

            {/* Show Tech Info if Accepted/Active */}
            {order.technicianId && (() => {
              const technician = getUserById(order.technicianId);
              return (
                <div className="flex items-center gap-3 pt-3 border-t border-border/30 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm overflow-hidden">
                    {technician?.avatar ? (
                      <img src={technician.avatar} alt={technician.name} className="w-full h-full object-cover" />
                    ) : (
                      <span>{technician?.name?.charAt(0) || "T"}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{technician?.name || "Technician"}</p>
                    <p className="text-xs text-muted-foreground">{t("trackingDetails.yourExpertOnCase")}</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => copyPhoneNumber(order.id, technician?.phone)}
                      className="h-8 w-8 rounded-full text-primary bg-primary/5 hover:bg-primary/10 transition-colors flex items-center justify-center"
                      data-testid={`button-copy-phone-${order.id}`}
                      title="Copy phone number"
                    >
                      {copiedPhoneId === order.id ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Phone className="w-4 h-4" />
                      )}
                    </button>
                    <Link href={`/chat/${order.id}`}>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-primary bg-primary/5 rounded-full">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })()}
            

            {order.status === "completed" && !order.rating && (
              <Dialog>
                <DialogTrigger asChild>
                   <Button className="w-full mt-3" variant="outline">{t("tracking.rateService")} <Star className="w-4 h-4 ml-2 text-yellow-500" /></Button>
                </DialogTrigger>
                <DialogContent>
                   <DialogHeader>
                      <DialogTitle>{t("trackingDetails.rateYourExperience")}</DialogTitle>
                   </DialogHeader>
                   <div className="py-4 text-center space-y-4">
                      <p className="text-sm text-muted-foreground">{t("trackingDetails.howWasService")} {order.serviceType}?</p>
                      <div className="flex justify-center gap-2">
                         {[1, 2, 3, 4, 5].map((star) => (
                           <button key={star} onClick={() => setRating(star)} className="focus:outline-none transition-transform active:scale-95">
                             <Star 
                               className={`w-8 h-8 ${star <= rating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground/30"}`} 
                             />
                           </button>
                         ))}
                      </div>
                      <Textarea placeholder={t("trackingDetails.leaveComment")} className="min-h-[80px]" />
                      <Button className="w-full" onClick={() => handleRate(order.id)} disabled={rating === 0}>
                        {t("trackingDetails.submitRating")}
                      </Button>
                   </div>
                </DialogContent>
              </Dialog>
            )}

            {order.status === "completed" && order.rating && (
               <div className="mt-3 bg-yellow-50/50 p-2 rounded-lg flex justify-center items-center gap-2 border border-yellow-100">
                  <span className="text-sm font-medium text-yellow-700">{t("trackingDetails.youRatedThis")}</span>
                  <div className="flex">
                    {[...Array(order.rating)].map((_, i) => (
                       <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
               </div>
            )}

            {order.status === "pending" && (
              <p className="text-xs text-center text-muted-foreground bg-secondary/20 py-2 rounded-lg">
                {t("bookingDetails.waitingForTechnician")}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
