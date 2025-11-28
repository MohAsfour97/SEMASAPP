import { motion } from "framer-motion";
import { Phone, MessageSquare, MapPin, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import techImage from "@assets/generated_images/friendly_pest_control_technician.png";

export default function Tracking() {
  const timeline = [
    { time: "1:30 PM", status: "Booking Confirmed", completed: true },
    { time: "2:15 PM", status: "Technician Assigned", completed: true },
    { time: "3:45 PM", status: "Technician En Route", completed: true, active: true },
    { time: "4:00 PM", status: "Service Started", completed: false },
    { time: "5:00 PM", status: "Service Completed", completed: false },
  ];

  return (
    <div className="pb-24 pt-8 px-4 max-w-md mx-auto min-h-screen bg-background">
      <h1 className="text-2xl font-bold mb-6">Track Order #4921</h1>

      {/* Map Placeholder */}
      <div className="bg-slate-200 rounded-3xl h-64 w-full mb-6 relative overflow-hidden shadow-inner border border-border">
        <div className="absolute inset-0 opacity-50 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-122.42,37.78,14,0,0/600x400?access_token=YOUR_ACCESS_TOKEN')] bg-cover bg-center" />
        
        {/* Mock Map Elements */}
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50 font-bold text-2xl">
          LIVE MAP VIEW
        </div>
        
        {/* Tech Marker */}
        <motion.div 
          initial={{ x: -50, y: 50 }}
          animate={{ x: 0, y: 0 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-1/2 left-1/2 bg-primary text-white p-2 rounded-full shadow-lg border-4 border-white"
        >
          <MapPin className="w-6 h-6" />
        </motion.div>

        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold shadow-sm">
          Arriving in 15 mins
        </div>
      </div>

      {/* Technician Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/50 mb-8 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden border-2 border-primary/20">
          <img src={techImage} alt="Technician" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg">Mike Johnson</h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-primary" /> 4.9 Rating (542 jobs)
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="icon" variant="outline" className="rounded-full w-10 h-10 border-primary/20 text-primary hover:bg-primary/5">
            <MessageSquare className="w-5 h-5" />
          </Button>
          <Button size="icon" className="rounded-full w-10 h-10 shadow-md shadow-primary/20">
            <Phone className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative pl-4 space-y-8 before:absolute before:left-[27px] before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
        {timeline.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex items-start gap-4"
          >
            <div className={`
              relative z-10 w-6 h-6 rounded-full flex items-center justify-center border-2 
              ${item.completed ? 'bg-primary border-primary text-white' : 
                item.active ? 'bg-white border-primary text-primary animate-pulse' : 'bg-white border-muted text-muted-foreground'}
            `}>
              {item.completed ? <CheckCircle2 className="w-3 h-3" /> : <div className={`w-2 h-2 rounded-full ${item.active ? 'bg-primary' : 'bg-muted'}`} />}
            </div>
            <div className="flex-1 pt-0.5">
              <div className="flex justify-between items-center mb-1">
                <h4 className={`font-semibold ${item.completed || item.active ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {item.status}
                </h4>
                <span className="text-xs text-muted-foreground font-mono bg-secondary/50 px-2 py-1 rounded-md">
                  {item.time}
                </span>
              </div>
              {item.active && (
                <p className="text-sm text-primary font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Estimated arrival: 4:00 PM
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
