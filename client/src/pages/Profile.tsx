import { useState, useRef, useEffect } from "react";
import { User, Bell, Settings, Shield, LogOut, ChevronRight, Moon, Sun, Camera, X, Send, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";
import { useToast } from "@/hooks/use-toast";

const getSupportResponses = (question: string, language: string, t: any) => {
  const lowerQ = question.toLowerCase();
  
  const responsesEn: Record<string, string> = {
    // Booking related
    "how do i book": "You can book a service by clicking the 'Book' in the navigation menu. Then select your preferred service type, date, time, and provide your address. Finally, confirm the booking!",
    "how to book": "Navigate to the Book section, select a service, choose your date and time slot, enter your address and problem description, review the summary, and complete the booking.",
    "when can i book": "You can book services Monday to Sunday. Our technicians are available from 9:00 AM to 5:00 PM. Select any available time slot during your booking.",
    
    // Services
    "what services": "We offer: General Pest Control, Termite Inspection, Rodent Control, and Mosquito Shield. Each service has different features and pricing.",
    "general pest control": "General Pest Control includes interior and exterior treatment, web removal, and a 30-day satisfaction guarantee. Starting at 149 SAR.",
    "termite inspection": "Includes thorough inspection, bait station installation, and annual monitoring service. Starting at 299 SAR.",
    "rodent control": "Includes entry point inspection, trapping and removal, and sanitization. Starting at 199 SAR.",
    "mosquito shield": "Includes yard fogging, larvicide treatment, and monthly service maintenance. Starting at 89 SAR.",
    
    // Tracking
    "how to track": "Go to the Track section to see your active orders and their real-time status. You can see your technician details and contact them via chat.",
    "track order": "Click on Track in the navigation to view all your orders. You'll see active orders with technician info and completed orders with ratings.",
    
    // Payment
    "payment method": "We accept credit/debit cards for all payments. Payment is processed securely during checkout.",
    "price": "Prices vary by service. General Pest Control: 149 SAR, Termite: 299 SAR, Rodent: 199 SAR, Mosquito: 89 SAR.",
    
    // Chat
    "can i message": "Yes! You can chat with your assigned technician through the chat feature in your active order details.",
    "chat": "Click on any active order and select the chat icon to message your technician directly.",
    
    // Technical
    "issue": "We're sorry you're experiencing an issue. Please describe it and we'll help! Common issues can often be solved by refreshing the app.",
    "bug": "If you've found a bug, please describe what happened and what you expected. We'll investigate and fix it!",
    "not working": "Try refreshing the page or restarting the app. If the issue persists, please contact support with details.",
    
    // General
    "help": "I'm here to help! You can ask about booking, services, tracking, payments, or any issues you're experiencing.",
    "support": "Our support team is available 24/7. You can chat with us here or contact via WhatsApp for urgent issues.",
    "contact": "You can reach us through this chat, WhatsApp, or visit our office in Riyadh.",
  };

  const responsesAr: Record<string, string> = {
    // Booking related
    "كيف احجز": "يمكنك حجز خدمة بالنقر على 'حجز' في قائمة التنقل. ثم حدد نوع الخدمة والتاريخ والوقت وعنوانك. وأخيراً قم بتأكيد الحجز!",
    "كيفية الحجز": "انتقل إلى قسم الحجز، حدد خدمة، اختر تاريخاً ووقتاً، أدخل عنوانك ووصف المشكلة، راجع الملخص واكمل الحجز.",
    "متى يمكن الحجز": "يمكنك حجز الخدمات من الاثنين إلى الأحد. فنيونا متاحون من 9:00 صباحاً إلى 5:00 مساءً. اختر أي فترة زمنية متاحة أثناء الحجز.",
    
    // Services
    "ما الخدمات": "نحن نقدم: مكافحة الآفات العامة، فحص الأرضة، مكافحة القوارض، ودرع البعوض. لكل خدمة ميزات وأسعار مختلفة.",
    "مكافحة الآفات": "تشمل مكافحة الآفات العامة معالجة داخلية وخارجية وإزالة الأنسجة وضمان رضا 30 يوماً. يبدأ من 149 ريال.",
    "فحص الأرضة": "يشمل الفحص الشامل وتركيب محطات الطعم والمراقبة السنوية. يبدأ من 299 ريال.",
    "مكافحة القوارض": "يشمل فحص نقاط الدخول والقبض والإزالة والتعقيم. يبدأ من 199 ريال.",
    "درع البعوض": "يشمل الرش في الفناء ومعالجة اليرقات وصيانة الخدمة الشهرية. يبدأ من 89 ريال.",
    
    // Tracking
    "كيف أتابع": "انتقل إلى قسم التتبع لرؤية طلباتك النشطة وحالتها في الوقت الفعلي. يمكنك رؤية تفاصيل الفني والاتصال به عبر الدردشة.",
    "تتبع الطلب": "انقر على التتبع في التنقل لعرض جميع طلباتك. ستشاهد الطلبات النشطة مع معلومات الفني والطلبات المكتملة مع التقييمات.",
    
    // Payment
    "طريقة الدفع": "نقبل بطاقات الائتمان والخصم لجميع المدفوعات. يتم معالجة الدفع بأمان أثناء الدفع.",
    "السعر": "تختلف الأسعار حسب الخدمة. مكافحة الآفات: 149 ريال، الأرضة: 299 ريال، القوارض: 199 ريال، البعوض: 89 ريال.",
    
    // Chat
    "هل يمكن أرسال": "نعم! يمكنك الدردشة مع الفني المعين من خلال ميزة الدردشة في تفاصيل طلبك النشط.",
    "دردشة": "انقر على أي طلب نشط واختر رمز الدردشة للرسائل إلى الفني مباشرة.",
    
    // Technical
    "مشكلة": "نعتذر عن المشكلة التي تواجهها. يرجى وصفها وسنساعدك! غالباً يمكن حل المشاكل الشائعة بتحديث التطبيق.",
    "خطأ": "إذا وجدت خطأ، يرجى وصف ما حدث وما كنت تتوقعه. سنحقق ونصلحه!",
    "لا يعمل": "جرب تحديث الصفحة أو إعادة تشغيل التطبيق. إذا استمرت المشكلة، تواصل مع الدعم.",
    
    // General
    "مساعدة": "أنا هنا للمساعدة! يمكنك السؤال عن الحجز والخدمات والتتبع والدفع أو أي مشاكل.",
    "دعم": "فريق الدعم متاح 24/7. يمكنك الدردشة معنا هنا أو التواصل عبر واتس آب للمسائل الاستعجالية.",
    "التواصل": "يمكنك الوصول إلينا عبر هذه الدردشة أو واتس آب أو زيارة مكتبنا في الرياض.",
  };

  const responses = language === 'ar' ? responsesAr : responsesEn;

  for (const [key, response] of Object.entries(responses)) {
    if (lowerQ.includes(key)) {
      return response;
    }
  }
  
  const defaultEn = "I'm here to help! Try asking about booking services, how to track orders, available services, pricing, or any issues you're facing.";
  const defaultAr = "أنا هنا للمساعدة! جرب السؤال عن حجز الخدمات أو تتبع الطلبات أو الخدمات المتاحة أو الأسعار أو أي مشاكل.";
  
  return language === 'ar' ? defaultAr : defaultEn;
};

export default function Profile() {
  const { t, language } = useLanguage();
  const { user, logout, updateUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [editPhone, setEditPhone] = useState(user?.phone || "");
  const getInitialGreeting = () => {
    return language === 'ar' 
      ? { id: '1', text: "مرحباً! 👋 كيف يمكنني مساعدتك اليوم؟", sender: 'bot' as const }
      : { id: '1', text: "Hi! 👋 How can I help you today?", sender: 'bot' as const };
  };

  const [supportMessages, setSupportMessages] = useState<Array<{id: string, text: string, sender: 'user' | 'bot'}>>([
    getInitialGreeting()
  ]);
  const [supportInput, setSupportInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [supportMessages]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({ 
        title: t("fileUpload.invalidFile"), 
        description: t("fileUpload.selectImageFile"),
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({ 
        title: t("fileUpload.fileTooLarge"), 
        description: t("fileUpload.fileSizeLimit"),
        variant: "destructive"
      });
      return;
    }

    setIsUploadingPhoto(true);
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      updateUser({ avatar: base64String });
      setIsUploadingPhoto(false);
      toast({
        title: t("fileUpload.photoUpdated"),
        description: t("fileUpload.photoUpdateSuccess")
      });
    };

    reader.onerror = () => {
      setIsUploadingPhoto(false);
      toast({
        title: t("common.error"),
        description: t("fileUpload.uploadError"),
        variant: "destructive"
      });
    };

    reader.readAsDataURL(file);
  };

  const handleSavePersonalInfo = () => {
    if (!editName.trim()) {
      toast({
        title: t("common.error"),
        description: t("profile.nameCannotBeEmpty"),
        variant: "destructive"
      });
      return;
    }

    updateUser({ 
      name: editName.trim(),
      phone: editPhone.trim()
    });

    setShowPersonalInfo(false);
    toast({
      title: t("common.success"),
      description: t("profile.personalInfoUpdated")
    });
  };

  const handleSendSupportMessage = () => {
    if (!supportInput.trim()) return;

    const userMessage = supportInput.trim();
    setSupportMessages(prev => [...prev, { id: Date.now().toString(), text: userMessage, sender: 'user' }]);
    setSupportInput("");

    setTimeout(() => {
      const botResponse = getSupportResponses(userMessage, language, t);
      setSupportMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: botResponse, sender: 'bot' }]);
    }, 300);
  };

  return (
    <div className="pb-24 pt-8 px-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">{t("trackingDetails.myProfile")}</h1>

      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold overflow-hidden">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span>{user?.name?.charAt(0) || "U"}</span>
            )}
          </div>
          {user?.role === "technician" && (
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingPhoto}
              className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 hover:bg-primary/90 transition-colors shadow-lg disabled:opacity-50"
              data-testid="button-upload-profile-photo"
              title="Change profile photo"
            >
              <Camera className="w-4 h-4" />
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
            disabled={isUploadingPhoto}
            data-testid="input-profile-photo"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold">{user?.name || "User"}</h2>
          <p className="text-muted-foreground text-sm capitalize">{user?.role === "customer" ? t("common.customer") : user?.role || t("common.member")}</p>
        </div>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 pl-1">{t("profile.account")}</h3>
          <div className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
            {[
              { id: "personal", icon: User, label: t("trackingDetails.personalInformation") },
              { id: "security", icon: Shield, label: t("trackingDetails.securityPrivacy") },
              { id: "notifications", icon: Bell, label: t("trackingDetails.notifications") },
            ].map((item, i) => (
              <div 
                key={i}
                onClick={() => item.id === "personal" && setShowPersonalInfo(true)}
                className="flex items-center justify-between p-4 border-b border-border/30 last:border-0 hover:bg-secondary/10 cursor-pointer transition-colors"
                data-testid={`button-profile-${item.id}`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 pl-1">{t("profile.preferences")}</h3>
          <div className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
            <div className="p-4 space-y-4 border-b border-border/30">
              <div className="flex items-center justify-between">
                <span className="font-medium">{t("trackingDetails.pushNotifications")}</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">{t("trackingDetails.emailUpdates")}</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium flex items-center gap-2">
                  {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  {t("profile.darkMode")}
                </span>
                <Switch 
                  checked={theme === 'dark'} 
                  onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} 
                />
              </div>
            </div>
            
            {/* Customer Support Option */}
            <button
              onClick={() => setShowSupport(true)}
              className="w-full flex items-center justify-between p-4 hover:bg-secondary/10 transition-colors"
              data-testid="button-customer-support"
            >
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-primary" />
                <span className="font-medium">{t("support.customerSupport")}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
            </button>
          </div>
        </section>

        <Button 
          variant="destructive" 
          className="w-full rounded-xl h-12 gap-2"
          onClick={logout}
        >
          <LogOut className="w-4 h-4" /> {t("trackingDetails.signOut")}
        </Button>
      </div>

      {/* Personal Information Modal */}
      <AnimatePresence>
        {showPersonalInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end"
            onClick={() => setShowPersonalInfo(false)}
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30 }}
              className="w-full bg-card rounded-t-3xl p-6 space-y-4 max-h-[90vh] overflow-y-auto pb-32"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">{t("trackingDetails.personalInformation")}</h2>
                <button
                  onClick={() => setShowPersonalInfo(false)}
                  className="p-1 hover:bg-secondary rounded-lg transition-colors"
                  data-testid="button-close-personal-info"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">{t("auth.name")}</Label>
                  <Input
                    id="edit-name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder={t("auth.name")}
                    className="h-11 rounded-xl bg-card/50"
                    data-testid="input-edit-name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-phone">{t("profile.phoneNumber")}</Label>
                  <Input
                    id="edit-phone"
                    type="tel"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    placeholder="e.g., +966 50 123 4567"
                    className="h-11 rounded-xl bg-card/50"
                    data-testid="input-edit-phone"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-6 fixed bottom-24 left-0 right-0 px-4 bg-card">
                <Button
                  variant="outline"
                  className="flex-1 h-11 rounded-xl"
                  onClick={() => setShowPersonalInfo(false)}
                  data-testid="button-cancel-personal-info"
                >
                  {t("common.cancel")}
                </Button>
                <Button
                  className="flex-1 h-11 rounded-xl"
                  onClick={handleSavePersonalInfo}
                  data-testid="button-save-personal-info"
                >
                  {t("common.save")}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Customer Support Chatbot Modal */}
      <AnimatePresence>
        {showSupport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end"
            onClick={() => setShowSupport(false)}
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30 }}
              className="w-full bg-card rounded-t-3xl h-[95vh] max-h-[95vh] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header - Fixed */}
              <div className="flex-shrink-0 p-4 border-b border-border/30 flex items-center justify-between bg-gradient-to-r from-primary/10 to-primary/5">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg font-bold truncate">{t("support.semasSupport")}</h2>
                    <p className="text-xs text-muted-foreground">{t("support.aiAssistant")}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSupport(false)}
                  className="p-1 hover:bg-secondary rounded-lg transition-colors flex-shrink-0 ml-2"
                  data-testid="button-close-support"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages - Scrollable */}
              <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3">
                {supportMessages.map((msg, i) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl ${
                        msg.sender === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-secondary/50 text-foreground rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} className="h-1" />
              </div>

              {/* Input Area - Fixed at Bottom */}
              <div className="flex-shrink-0 p-4 pb-20 border-t border-border/30 bg-background safe-area-bottom">
                <div className="flex gap-2">
                  <Input
                    value={supportInput}
                    onChange={(e) => setSupportInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendSupportMessage()}
                    placeholder={t("support.askQuestion")}
                    className="flex-1 h-11 rounded-full bg-card border-border/50 text-base"
                    data-testid="input-support-message"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendSupportMessage}
                    disabled={!supportInput.trim()}
                    className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 disabled:opacity-50 transition-colors flex-shrink-0"
                    data-testid="button-send-support-message"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
