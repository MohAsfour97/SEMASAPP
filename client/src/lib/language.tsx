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
