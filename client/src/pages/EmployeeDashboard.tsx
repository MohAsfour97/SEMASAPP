import { useState } from "react";
import { useOrders, Order } from "@/lib/orders";
import { useAuth } from "@/lib/auth";
import { useLanguage } from "@/lib/language";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, MessageSquare, MapPin, Calendar, Clock, Filter, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "wouter";
import { format } from "date-fns";

import LiveMap from "@/components/LiveMap";

export default function EmployeeDashboard() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { getAllPendingOrders, getOrdersByTechnician, updateOrderStatus } = useOrders();
  
  const [activeTab, setActiveTab] = useState<"available" | "my_jobs">("available");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [viewMapOrder, setViewMapOrder] = useState<string | null>(null);

  const pendingOrders = getAllPendingOrders();
  const myJobs = user ? getOrdersByTechnician(user.id) : [];

  const handleAccept = (orderId: string) => {
    if (user) {
      updateOrderStatus(orderId, "accepted", user.id);
      setSelectedOrder(null);
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: any) => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto min-h-screen bg-background">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("dashboard.technicianPortal")}</h1>
          <p className="text-sm text-muted-foreground">{t("dashboard.welcomeBack")}, {user?.name}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
          {user?.name[0]}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="mb-6">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="available">
            {t("dashboard.available")} ({pendingOrders.length})
          </TabsTrigger>
          <TabsTrigger value="my_jobs">
            {t("dashboard.myJobs")} ({myJobs.length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <AnimatePresence mode="wait">
        {activeTab === "available" ? (
          <motion.div
            key="available"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-4"
          >
            {pendingOrders.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                {t("dashboard.noPendingOrders")}
              </div>
            ) : (
              pendingOrders.map((order) => (
                <div key={order.id} className="bg-card p-4 rounded-2xl shadow-sm border border-border/50">
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-md">{t("dashboard.newRequest")}</span>
                    <span className="text-xs text-muted-foreground">{format(new Date(order.date), "MMM d")}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-1 text-foreground">{order.serviceType}</h3>
                  <div className="text-sm text-muted-foreground space-y-1 mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="w-4 h-4" /> <span className="text-foreground">{order.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" /> <span className="text-foreground">{order.address}</span>
                    </div>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" onClick={() => setSelectedOrder(order)}>
                        {t("dashboard.viewDetails")}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{t("dashboard.orderDetails")}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <label className="text-muted-foreground block text-xs mb-1">{t("dashboard.customer")}</label>
                            <p className="font-medium">{order.customerName}</p>
                          </div>
                          <div>
                            <label className="text-muted-foreground block text-xs mb-1">{t("dashboard.service")}</label>
                            <p className="font-medium">{order.serviceType}</p>
                          </div>
                          <div className="col-span-2">
                            <label className="text-muted-foreground block text-xs mb-1">{t("tracking.location")}</label>
                            <p className="font-medium">{order.address}</p>
                          </div>
                          <div className="col-span-2 bg-secondary/50 p-3 rounded-lg">
                            <label className="text-muted-foreground block text-xs mb-1">{t("dashboard.problem")}</label>
                            <p className="text-sm">{order.description}</p>
                          </div>
                        </div>
                        <div className="flex gap-3 pt-4">
                          <Button variant="outline" className="flex-1" onClick={() => setSelectedOrder(null)}>{t("common.cancel")}</Button>
                          <Button className="flex-1 bg-primary" onClick={() => handleAccept(order.id)}>
                            {t("dashboard.accept")}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ))
            )}
          </motion.div>
        ) : (
          <motion.div
            key="my_jobs"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="space-y-4"
          >
             {myJobs.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                {t("dashboard.noJobsAccepted")}
              </div>
            ) : (
              myJobs.map((order) => (
                <div key={order.id} className="bg-card p-4 rounded-2xl shadow-sm border border-border/50">
                   <div className="flex justify-between items-start mb-3">
                    <span className={`
                      px-2 py-1 rounded-md text-xs font-bold
                      ${order.status === 'accepted' ? 'bg-blue-100 text-blue-700' : 
                        order.status === 'en_route' ? 'bg-purple-100 text-purple-700' :
                        order.status === 'in_progress' ? 'bg-orange-100 text-orange-700' : 
                        'bg-green-100 text-green-700'}
                    `}>
                      {order.status.replace('_', ' ').toUpperCase()}
                    </span>
                    <Link href={`/chat/${order.id}`}>
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-primary bg-primary/5">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-1 text-foreground">{order.customerName}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{order.address}</p>
                  
                  {/* Full Details Section for My Jobs */}
                  <div className="bg-secondary/10 p-3 rounded-lg mb-4 text-sm">
                    <p className="font-medium text-foreground mb-1">Job Details:</p>
                    <div className="grid grid-cols-2 gap-2 text-muted-foreground">
                       <span>Service:</span>
                       <span className="text-foreground font-medium">{order.serviceType}</span>
                       <span>Date:</span>
                       <span className="text-foreground font-medium">{format(new Date(order.date), "MMM d, yyyy")}</span>
                       <span className="col-span-2 mt-1 block border-t border-border/50 pt-1">Description:</span>
                       <span className="col-span-2 text-foreground italic">"{order.description}"</span>
                    </div>
                  </div>

                  {/* Map View Toggle */}
                  {(order.status === 'en_route' || order.status === 'in_progress') && (
                    <div className="mb-4">
                      {viewMapOrder === order.id ? (
                        <div className="space-y-2">
                          <LiveMap status={order.status} customerAddress={order.address} showRoute={true} />
                          <Button variant="outline" size="sm" onClick={() => setViewMapOrder(null)} className="w-full text-xs">
                            Hide Map
                          </Button>
                        </div>
                      ) : (
                        <Button variant="secondary" size="sm" onClick={() => setViewMapOrder(order.id)} className="w-full flex items-center gap-2">
                           <MapPin className="w-4 h-4" /> View Live Location Map
                        </Button>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    {order.status === 'accepted' && (
                      <Button className="col-span-2" onClick={() => handleStatusUpdate(order.id, 'en_route')}>
                        Start Travel
                      </Button>
                    )}
                    {order.status === 'en_route' && (
                      <Button className="col-span-2 bg-purple-600 hover:bg-purple-700" onClick={() => handleStatusUpdate(order.id, 'in_progress')}>
                        Arrived at Site
                      </Button>
                    )}
                    {order.status === 'in_progress' && (
                      <Button className="col-span-2 bg-green-600 hover:bg-green-700" onClick={() => handleStatusUpdate(order.id, 'completed')}>
                        Mark Completed
                      </Button>
                    )}
                    {order.status === 'completed' && (
                      <Button variant="outline" disabled className="col-span-2">
                        Job Done <Check className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
