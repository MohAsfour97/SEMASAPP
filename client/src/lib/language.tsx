import React, { createContext, useContext, useState } from "react";

export type Language = "en" | "ar";

export const translations = {
  en: {
    // Auth
    auth: {
      signIn: "Sign In",
      signUp: "Sign Up",
      email: "Email Address",
      password: "Password",
      name: "Full Name",
      createAccount: "Create Account",
      signin: "Sign In",
    },
    // Home
    home: {
      pestFree: "Pest Free.",
      worryFree: "Worry Free.",
      professional: "Professional protection for your home and family. Fast, safe, and effective.",
      bookInspection: "Book Inspection",
      protected: "Protected",
      rating: "Rating",
      arrival: "Arrival",
      activeService: "Active Service",
      track: "Track",
      popularServices: "Popular Services",
      viewAll: "View All",
      enRoute: "En Route",
      serviceTime: "09:00 AM - 11:00 AM",
    },
    // Navigation
    nav: {
      home: "Home",
      services: "Services",
      book: "Book",
      track: "Track",
      profile: "Profile",
      jobs: "Jobs",
      language: "Language",
    },
    // Services
    services: {
      title: "Services",
      selectService: "Select a service to book",
      rodentControl: "Rodent Control",
      pestControl: "General Pest Control",
      termiteControl: "Termite Control",
      mosquitoControl: "Mosquito Control",
      book: "Book Now",
      selectServiceFirst: "Please select a service first",
    },
    // Booking
    booking: {
      stepOne: "Select Service",
      stepTwo: "Date & Time",
      stepThree: "Location",
      stepFour: "Confirm",
      selectDate: "Select Date",
      selectTime: "Select Time",
      locationPicker: "Location Picker",
      useCurrentLocation: "Use Current Location",
      clickMap: "Click on map to select location",
      confirm: "Confirm Booking",
      bookingConfirmed: "Booking confirmed!",
      next: "Next",
      back: "Back",
      description: "Problem Description",
      enterDescription: "Describe the pest problem...",
      address: "Address",
      enterAddress: "Enter your address",
    },
    // Tracking
    tracking: {
      title: "Track Order",
      status: "Status",
      accepted: "Accepted",
      inProgress: "In Progress",
      completed: "Completed",
      pending: "Pending",
      technician: "Technician",
      location: "Location",
      eta: "ETA",
      rateService: "Rate Service",
      rate: "Rate",
      submit: "Submit",
    },
    // Profile
    profile: {
      title: "Profile",
      account: "Account",
      preferences: "Preferences",
      settings: "Settings",
      logout: "Logout",
      darkMode: "Dark Mode",
      language: "Language",
      contactSupport: "Contact Support",
      about: "About SEMAS",
    },
    // Employee Dashboard
    dashboard: {
      technicianPortal: "Technician Portal",
      welcomeBack: "Welcome back",
      available: "Available",
      myJobs: "My Jobs",
      newRequest: "NEW REQUEST",
      viewDetails: "View Details",
      accept: "Accept",
      deny: "Deny",
      cancel: "Cancel",
      orderDetails: "Order Details",
      customer: "Customer",
      service: "Service",
      problem: "Problem Description",
      noPendingOrders: "No pending orders available.",
      markInProgress: "Mark In Progress",
      markCompleted: "Mark Completed",
      noJobsAccepted: "No jobs accepted yet.",
    },
    // Chat
    chat: {
      sendMessage: "Send message",
      typeMessage: "Type a message...",
      noMessages: "No messages yet",
    },
    // Services Details
    servicesDetails: {
      ourServices: "Our Services",
      professionalSolutions: "Professional solutions for every pest problem.",
      searchServices: "Search services...",
      startingAt: "Starting at",
      generalPestControl: "General Pest Control",
      generalPestDesc: "Comprehensive protection against common household pests including ants, spiders, and roaches.",
      termiteDefense: "Termite Defense",
      termiteDesc: "Advanced termite detection and elimination system to protect your home's structure.",
      rodentExclusion: "Rodent Exclusion",
      rodentDesc: "Humane removal and entry point sealing to keep rats and mice out for good.",
      mosquitoShield: "Mosquito Shield",
      mosquitoDesc: "Seasonal yard treatment to reduce mosquito populations and reclaim your outdoor space.",
      interiorExterior: "Interior & Exterior Treatment",
      webRemoval: "Web Removal",
      guarantee: "90-Day Guarantee",
      thoroughInspection: "Thorough Inspection",
      baitStation: "Bait Station Installation",
      annualMonitoring: "Annual Monitoring",
      entryPointInspection: "Entry Point Inspection",
      trappingRemoval: "Trapping & Removal",
      sanitization: "Sanitization",
      yardFogging: "Yard Fogging",
      larvicide: "Larvicide Application",
      monthlyService: "Monthly Service",
      bookNow: "Book Now",
    },
    // Booking Details
    bookingDetails: {
      bookService: "Book Service",
      step: "Step",
      of: "of",
      selectServiceType: "Select Service Type",
      selectDate: "Select Date",
      selectTime: "Select Time",
      availableTimes: "Available Times",
      enterLocation: "Enter Location",
      confirmBooking: "Confirm Booking",
      bookingDetails: "Booking Details",
      yourOrder: "Your Order",
      confirmedAt: "Confirmed at",
      waitingForTechnician: "Waiting for technician confirmation...",
      bookingError: "Please fill in all required fields",
      selectTimeFirst: "Please select a time slot to continue",
      requestSent: "Your request has been sent to our technicians",
    },
    // Tracking Details
    trackingDetails: {
      myOrders: "My Orders",
      noOrdersYet: "No Orders Yet",
      bookFirstService: "Book your first pest control service to see tracking details here.",
      technicianAssigned: "Technician Assigned",
      yourExpertOnCase: "Your expert is on the case",
      rateYourExperience: "Rate Your Experience",
      howWasService: "How was your",
      service: "service",
      leaveComment: "Leave a comment (optional)...",
      submitRating: "Submit Rating",
      youRatedThis: "You rated this service:",
      myProfile: "My Profile",
      personalInformation: "Personal Information",
      securityPrivacy: "Security & Privacy",
      notifications: "Notifications",
      pushNotifications: "Push Notifications",
      emailUpdates: "Email Updates",
      signOut: "Sign Out",
    },
    // Booking Steps
    bookingSteps: {
      serviceDetails: "Service Details",
      dateTime: "Date & Time",
      information: "Information",
      payment: "Payment",
    },
    // Common
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success",
      cancel: "Cancel",
      confirm: "Confirm",
      close: "Close",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      search: "Search",
      filter: "Filter",
      sar: "SAR",
      riyal: "Riyal",
      member: "Member",
      customer: "Customer",
      startConversation: "Start the conversation with your",
      technician: "technician",
      orderNumber: "Order #",
      noOrderFound: "Order not found",
    },
  },
  ar: {
    // Auth
    auth: {
      signIn: "تسجيل الدخول",
      signUp: "إنشاء حساب",
      email: "عنوان البريد الإلكتروني",
      password: "كلمة المرور",
      name: "الاسم الكامل",
      createAccount: "إنشاء حساب",
      signin: "تسجيل الدخول",
    },
    // Home
    home: {
      pestFree: "خالي من الآفات.",
      worryFree: "بلا قلق.",
      professional: "حماية احترافية لمنزلك وعائلتك. سريع وآمن وفعال.",
      bookInspection: "حجز الفحص",
      protected: "محمي",
      rating: "التقييم",
      arrival: "الوصول",
      activeService: "الخدمة النشطة",
      track: "تتبع",
      popularServices: "الخدمات الشهيرة",
      viewAll: "عرض الكل",
      enRoute: "في الطريق",
      serviceTime: "09:00 صباحاً - 11:00 صباحاً",
    },
    // Navigation
    nav: {
      home: "الرئيسية",
      services: "الخدمات",
      book: "حجز",
      track: "تتبع",
      profile: "ملف شخصي",
      jobs: "الوظائف",
      language: "اللغة",
    },
    // Services
    services: {
      title: "الخدمات",
      selectService: "حدد خدمة للحجز",
      rodentControl: "مكافحة القوارض",
      pestControl: "مكافحة الآفات العامة",
      termiteControl: "مكافحة الأرضة",
      mosquitoControl: "مكافحة البعوض",
      book: "احجز الآن",
      selectServiceFirst: "يرجى تحديد خدمة أولاً",
    },
    // Booking
    booking: {
      stepOne: "حدد الخدمة",
      stepTwo: "التاريخ والوقت",
      stepThree: "الموقع",
      stepFour: "تأكيد",
      selectDate: "حدد التاريخ",
      selectTime: "حدد الوقت",
      locationPicker: "منتقي الموقع",
      useCurrentLocation: "استخدم موقعك الحالي",
      clickMap: "انقر على الخريطة لتحديد الموقع",
      confirm: "تأكيد الحجز",
      bookingConfirmed: "تم تأكيد الحجز!",
      next: "التالي",
      back: "رجوع",
      description: "وصف المشكلة",
      enterDescription: "صف مشكلة الآفات...",
      address: "العنوان",
      enterAddress: "أدخل عنوانك",
    },
    // Tracking
    tracking: {
      title: "تتبع الطلب",
      status: "الحالة",
      accepted: "مقبول",
      inProgress: "جاري المعالجة",
      completed: "مكتمل",
      pending: "قيد الانتظار",
      technician: "الفني",
      location: "الموقع",
      eta: "الوقت المتوقع للوصول",
      rateService: "تقييم الخدمة",
      rate: "تقييم",
      submit: "إرسال",
    },
    // Profile
    profile: {
      title: "ملف شخصي",
      account: "الحساب",
      preferences: "التفضيلات",
      settings: "الإعدادات",
      logout: "تسجيل الخروج",
      darkMode: "الوضع الداكن",
      language: "اللغة",
      contactSupport: "الاتصال بالدعم",
      about: "عن SEMAS",
    },
    // Employee Dashboard
    dashboard: {
      technicianPortal: "بوابة الفنيين",
      welcomeBack: "مرحبا بك",
      available: "متاح",
      myJobs: "وظائفي",
      newRequest: "طلب جديد",
      viewDetails: "عرض التفاصيل",
      accept: "قبول",
      deny: "رفض",
      cancel: "إلغاء",
      orderDetails: "تفاصيل الطلب",
      customer: "العميل",
      service: "الخدمة",
      problem: "وصف المشكلة",
      noPendingOrders: "لا توجد طلبات معلقة.",
      markInProgress: "ابدأ العمل",
      markCompleted: "مكتمل",
      noJobsAccepted: "لم يتم قبول أي وظائف حتى الآن.",
    },
    // Chat
    chat: {
      sendMessage: "إرسال الرسالة",
      typeMessage: "اكتب رسالة...",
      noMessages: "لا توجد رسائل بعد",
    },
    // Services Details
    servicesDetails: {
      ourServices: "خدماتنا",
      professionalSolutions: "حلول احترافية لكل مشكلة آفات.",
      searchServices: "ابحث عن الخدمات...",
      startingAt: "يبدأ من",
      generalPestControl: "مكافحة الآفات العامة",
      generalPestDesc: "حماية شاملة ضد الآفات المنزلية الشائعة بما فيها النمل والعناكب والصراصير.",
      termiteDefense: "الدفاع ضد الأرضة",
      termiteDesc: "نظام متقدم للكشف والقضاء على الأرضة لحماية هيكل منزلك.",
      rodentExclusion: "استبعاد القوارض",
      rodentDesc: "الإزالة الإنسانية وختم نقاط الدخول لإبقاء الفئران والقوارض بعيداً.",
      mosquitoShield: "درع البعوض",
      mosquitoDesc: "معالجة موسمية للفناء لتقليل تجمعات البعوض واستعادة مساحتك الخارجية.",
      interiorExterior: "معالجة داخلية وخارجية",
      webRemoval: "إزالة الشبكات",
      guarantee: "ضمان 90 يوماً",
      thoroughInspection: "فحص شامل",
      baitStation: "تركيب محطات الطعم",
      annualMonitoring: "المراقبة السنوية",
      entryPointInspection: "فحص نقاط الدخول",
      trappingRemoval: "الصيد والإزالة",
      sanitization: "التعقيم",
      yardFogging: "الرش في الفناء",
      larvicide: "تطبيق مبيدات اليرقات",
      monthlyService: "الخدمة الشهرية",
      bookNow: "احجز الآن",
    },
    // Booking Details
    bookingDetails: {
      bookService: "حجز الخدمة",
      step: "الخطوة",
      of: "من",
      selectServiceType: "اختر نوع الخدمة",
      selectDate: "اختر التاريخ",
      selectTime: "اختر الوقت",
      availableTimes: "الأوقات المتاحة",
      enterLocation: "أدخل الموقع",
      confirmBooking: "تأكيد الحجز",
      bookingDetails: "تفاصيل الحجز",
      yourOrder: "طلبك",
      confirmedAt: "تم التأكيد في",
      waitingForTechnician: "جاري انتظار تأكيد الفني...",
      bookingError: "يرجى ملء جميع الحقول المطلوبة",
      selectTimeFirst: "يرجى تحديد فترة زمنية للمتابعة",
      requestSent: "تم إرسال طلبك إلى فنينا",
    },
    // Tracking Details
    trackingDetails: {
      myOrders: "طلباتي",
      noOrdersYet: "لا توجد طلبات حتى الآن",
      bookFirstService: "احجز خدمة مكافحة الآفات الأولى لرؤية تفاصيل التتبع هنا.",
      technicianAssigned: "تم تعيين فني",
      yourExpertOnCase: "خبيرك يعمل على الحالة",
      rateYourExperience: "قيّم تجربتك",
      howWasService: "كيف كانت خدمة",
      service: "الخدمة",
      leaveComment: "اترك تعليقاً (اختياري)...",
      submitRating: "إرسال التقييم",
      youRatedThis: "لقد قيمت هذه الخدمة:",
      myProfile: "ملفي الشخصي",
      personalInformation: "المعلومات الشخصية",
      securityPrivacy: "الأمان والخصوصية",
      notifications: "الإشعارات",
      pushNotifications: "إشعارات دفع",
      emailUpdates: "تحديثات البريد الإلكتروني",
      signOut: "تسجيل الخروج",
    },
    // Booking Steps
    bookingSteps: {
      serviceDetails: "تفاصيل الخدمة",
      dateTime: "التاريخ والوقت",
      information: "المعلومات",
      payment: "الدفع",
    },
    // Common
    common: {
      loading: "جاري التحميل...",
      error: "خطأ",
      success: "نجاح",
      cancel: "إلغاء",
      confirm: "تأكيد",
      close: "إغلاق",
      save: "حفظ",
      delete: "حذف",
      edit: "تعديل",
      search: "بحث",
      filter: "تصفية",
      sar: "ر.س",
      riyal: "ريال",
      member: "عضو",
      customer: "عميل",
      startConversation: "ابدأ المحادثة مع",
      technician: "الفني",
      orderNumber: "طلب رقم",
      noOrderFound: "لم يتم العثور على الطلب",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultValue?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageSaved] = useState<Language>(() => {
    const saved = localStorage.getItem("semas-language");
    return (saved as Language) || "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageSaved(lang);
    localStorage.setItem("semas-language", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  // Initialize on mount
  React.useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, []);

  const t = (key: string, defaultValue?: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || defaultValue || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
