
import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Smartphone, Banknote, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { usePayment, PaymentMethod } from "@/lib/payment";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export default function PaymentMethodSelector() {
  const { t } = useLanguage();
  const { selectedPaymentMethod, setPaymentMethod } = usePayment();

  const paymentMethods = [
    {
      id: "card" as PaymentMethod,
      icon: CreditCard,
      title: t("payment.cardPayment"),
      subtitle: t("payment.visaMada"),
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      id: "apple_pay" as PaymentMethod,
      icon: Smartphone,
      title: t("payment.applePay"),
      subtitle: t("payment.quickSecure"),
      color: "text-gray-800",
      bg: "bg-gray-50"
    },
    {
      id: "cash_on_delivery" as PaymentMethod,
      icon: Banknote,
      title: t("payment.cashOnDelivery"),
      subtitle: t("payment.payTechnician"),
      color: "text-green-600",
      bg: "bg-green-50"
    }
  ];

  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold">{t("payment.selectPaymentMethod")}</Label>
      <RadioGroup value={selectedPaymentMethod || ""} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedPaymentMethod === method.id;
          
          return (
            <div key={method.id}>
              <RadioGroupItem value={method.id} id={method.id} className="peer sr-only" />
              <Label
                htmlFor={method.id}
                className={cn(
                  "flex items-center justify-between rounded-xl border-2 bg-card p-4 cursor-pointer transition-all",
                  "hover:shadow-md hover:border-primary/50",
                  isSelected 
                    ? "border-primary bg-primary/5 shadow-md" 
                    : "border-muted"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", method.bg)}>
                    <Icon className={cn("w-6 h-6", method.color)} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{method.title}</p>
                    <p className="text-sm text-muted-foreground">{method.subtitle}</p>
                  </div>
                </div>
                <ChevronRight className={cn(
                  "w-5 h-5 transition-colors",
                  isSelected ? "text-primary" : "text-muted-foreground"
                )} />
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}
