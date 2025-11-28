import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveMapProps {
  status: string;
  customerAddress: string; // In a real app, this would be coords
  showRoute?: boolean;
}

export default function LiveMap({ status, customerAddress, showRoute = false }: LiveMapProps) {
  // Simulate progress based on status
  // If 'en_route', we simulate movement from 0 to 80%
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (status === 'en_route') {
      // Start animation loop
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 90) return 90; // Don't quite arrive until 'arrived' status
          return p + 0.5;
        });
      }, 100);
      return () => clearInterval(interval);
    } else if (status === 'in_progress' || status === 'completed') {
      setProgress(100);
    } else {
      setProgress(0);
    }
  }, [status]);

  return (
    <div className="relative w-full h-64 bg-slate-100 rounded-xl overflow-hidden shadow-inner border border-border/50 group">
      {/* Map Background (Mock) */}
      <div 
        className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-122.42,37.78,14,0,0/800x600?access_token=YOUR_TOKEN')]" 
        style={{
            backgroundImage: `url('https://maps.wikimedia.org/img/osm-intl,13,37.7749,-122.4194,600x400.png')`, // Using Wikimedia maps as a reliable public fallback
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}
      />
      
      {/* Map Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 pointer-events-none" />

      {/* Route Line */}
      {showRoute && (
         <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60">
           <line 
             x1="20%" y1="80%" 
             x2="80%" y2="30%" 
             stroke="#0f766e" 
             strokeWidth="4" 
             strokeDasharray="8 4"
             className="animate-pulse"
           />
         </svg>
      )}

      {/* Employee Marker (Moving) */}
      {(status === 'en_route' || status === 'in_progress') && (
        <motion.div
          className="absolute z-20 flex flex-col items-center"
          initial={{ left: '20%', top: '80%' }}
          animate={{ 
            left: `${20 + (progress * 0.6)}%`, 
            top: `${80 - (progress * 0.5)}%` 
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
          <div className="relative">
             <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg border-4 border-white text-white z-10 relative">
                <Navigation className="w-6 h-6 -rotate-45" fill="currentColor" />
             </div>
             <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-50" />
          </div>
          <div className="bg-white px-2 py-1 rounded-md shadow-sm text-[10px] font-bold mt-1 whitespace-nowrap">
            Tech
          </div>
        </motion.div>
      )}

      {/* Customer Marker (Static Destination) */}
      <div className="absolute left-[80%] top-[30%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-md border-2 border-white text-white animate-bounce">
           <MapPin className="w-5 h-5" fill="currentColor" />
        </div>
        <div className="bg-white px-2 py-1 rounded-md shadow-sm text-[10px] font-bold mt-1 whitespace-nowrap">
           Customer
        </div>
      </div>
      
      {/* Status Badge */}
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold shadow-sm flex items-center gap-2">
        {status === 'en_route' ? (
          <>
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Live Sharing Active
          </>
        ) : (
          <>
            <span className="w-2 h-2 bg-slate-400 rounded-full" />
            Location Static
          </>
        )}
      </div>
    </div>
  );
}
