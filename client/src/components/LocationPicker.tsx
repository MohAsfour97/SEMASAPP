import { useState, useEffect } from "react";
import { MapPin, Navigation, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface LocationPickerProps {
  onSelect: (address: string) => void;
  currentAddress?: string;
}

export default function LocationPicker({ onSelect, currentAddress }: LocationPickerProps) {
  const [isLocating, setIsLocating] = useState(false);
  const [markerPosition, setMarkerPosition] = useState({ x: 50, y: 50 }); // Percentages
  
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMarkerPosition({ x, y });
    
    // Mock reverse geocoding based on position
    const mockStreets = ["Maple Ave", "Oak Lane", "Pine Street", "Cedar Blvd", "Elm Drive"];
    const mockNumbers = Math.floor(Math.random() * 900) + 100;
    const randomStreet = mockStreets[Math.floor(Math.random() * mockStreets.length)];
    
    onSelect(`${mockNumbers} ${randomStreet}, Springfield`);
  };

  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    
    // Simulate GPS delay
    setTimeout(() => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // Success (Mock address for demo since we can't real reverse geocode without API key)
            onSelect("Current Location (GPS Verified)");
            setIsLocating(false);
            setMarkerPosition({ x: 50, y: 50 }); // Center
          },
          (error) => {
            // Fallback if permission denied or error
            console.error("Geolocation error:", error);
            onSelect("123 My Current Location (Approx)");
            setIsLocating(false);
          }
        );
      } else {
        onSelect("123 Device Location");
        setIsLocating(false);
      }
    }, 1500);
  };

  return (
    <div className="space-y-3">
      <div className="relative h-48 w-full rounded-xl overflow-hidden border-2 border-muted shadow-sm group cursor-crosshair" onClick={handleMapClick}>
        {/* Map Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity"
          style={{
            backgroundImage: `url('https://maps.wikimedia.org/img/osm-intl,13,37.7749,-122.4194,600x400.png')`
          }}
        />
        
        {/* Center Crosshair (for visual guide) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
           <div className="w-full h-[1px] bg-black" />
           <div className="h-full w-[1px] bg-black absolute" />
        </div>

        {/* Interactive Marker */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-full text-primary"
          animate={{ left: `${markerPosition.x}%`, top: `${markerPosition.y}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <MapPin className="w-8 h-8 fill-current drop-shadow-md" />
        </motion.div>

        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur text-[10px] px-2 py-1 rounded shadow-sm pointer-events-none">
          Tap anywhere to pick
        </div>
      </div>

      <Button 
        type="button" 
        variant="outline" 
        className="w-full gap-2" 
        onClick={handleUseCurrentLocation}
        disabled={isLocating}
      >
        {isLocating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4 text-blue-500" />}
        {isLocating ? "Locating..." : "Use My Current Location"}
      </Button>
    </div>
  );
}
