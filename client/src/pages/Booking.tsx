import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, MapPin, Check, CreditCard, ChevronLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { id: 1, title: "Service Details" },
  { id: 2, title: "Date & Time" },
  { id: 3, title: "Information" },
  { id: 4, title: "Payment" },
];

export default function Booking() {
  const [step, setStep] = useState(1);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleBooking();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleBooking = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Booking Confirmed!",
        description: "Your pest control expert has been scheduled.",
      });
      setLocation("/track");
    }, 2000);
  };

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        {step > 1 && (
          <Button variant="ghost" size="icon" onClick={handleBack} className="-ml-2">
            <ChevronLeft className="w-6 h-6" />
          </Button>
        )}
        <div>
          <h1 className="text-2xl font-bold">Book Service</h1>
          <p className="text-sm text-muted-foreground">Step {step} of 4: {steps[step-1].title}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex gap-2 mb-8">
        {steps.map((s) => (
          <div 
            key={s.id} 
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              s.id <= step ? "bg-primary" : "bg-secondary"
            }`} 
          />
        ))}
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <Label className="text-base">Select Service Type</Label>
                <RadioGroup defaultValue="general" className="grid gap-4">
                  {['General Pest Control', 'Termite Inspection', 'Rodent Control', 'Bed Bug Treatment'].map((type) => (
                    <div key={type}>
                      <RadioGroupItem value={type.toLowerCase()} id={type} className="peer sr-only" />
                      <Label
                        htmlFor={type}
                        className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-white p-4 hover:bg-accent/5 hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary cursor-pointer transition-all"
                      >
                        <span className="text-sm font-medium">{type}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label className="text-base">Property Size</Label>
                <RadioGroup defaultValue="medium" className="grid grid-cols-3 gap-4">
                  {['Small', 'Medium', 'Large'].map((size) => (
                    <div key={size}>
                      <RadioGroupItem value={size.toLowerCase()} id={size} className="peer sr-only" />
                      <Label
                        htmlFor={size}
                        className="flex flex-col items-center justify-center rounded-xl border-2 border-muted bg-white p-3 hover:bg-accent/5 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all text-center"
                      >
                        <span className="text-sm font-medium">{size}</span>
                        <span className="text-[10px] text-muted-foreground mt-1">
                          {size === 'Small' ? '<1000 sqft' : size === 'Medium' ? '1-2500 sqft' : '2500+ sqft'}
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-border/50">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md mx-auto"
                />
              </div>
              
              <div className="space-y-3">
                <Label>Available Slots</Label>
                <div className="grid grid-cols-3 gap-3">
                  {['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'].map((time) => (
                    <Button key={time} variant="outline" className="text-xs rounded-xl border-dashed border-2 hover:border-primary hover:bg-primary/5 hover:text-primary">
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input placeholder="John Doe" className="bg-white h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input placeholder="123 Green Street" className="pl-10 bg-white h-12 rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Problem Description</Label>
                  <Textarea placeholder="Describe the pests you've seen..." className="bg-white rounded-xl min-h-[120px]" />
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/50 space-y-4">
                <h3 className="font-semibold text-lg border-b pb-4">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Service</span>
                    <span className="text-foreground font-medium">General Control</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Date</span>
                    <span className="text-foreground font-medium">{date ? format(date, "MMM do, yyyy") : "Selected Date"}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Time</span>
                    <span className="text-foreground font-medium">09:00 AM</span>
                  </div>
                  <div className="pt-4 mt-4 border-t flex justify-between items-center">
                    <span className="font-bold">Total</span>
                    <span className="text-xl font-bold text-primary">$149.00</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Payment Method</Label>
                <div className="flex items-center gap-4 p-4 border rounded-xl bg-white">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">•••• •••• •••• 4242</p>
                    <p className="text-xs text-muted-foreground">Expires 12/25</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary">Change</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 pt-4 border-t bg-background">
        <Button 
          className="w-full h-14 text-lg font-semibold rounded-full shadow-xl shadow-primary/20" 
          onClick={handleNext}
          disabled={loading}
        >
          {loading ? (
            "Processing..."
          ) : step === 4 ? (
            <>Pay & Book <Check className="ml-2 w-5 h-5" /></>
          ) : (
            <>Continue <ArrowRight className="ml-2 w-5 h-5" /></>
          )}
        </Button>
      </div>
    </div>
  );
}
