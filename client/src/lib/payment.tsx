
import React, { createContext, useContext, useState, ReactNode } from "react";

export type PaymentMethod = "card" | "apple_pay" | "cash_on_delivery";

export interface CardDetails {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  cardType?: "visa" | "mada" | "mastercard";
}

export interface PaymentInfo {
  method: PaymentMethod;
  cardDetails?: CardDetails;
  amount: number;
  currency: string;
}

interface PaymentContextType {
  selectedPaymentMethod: PaymentMethod | null;
  setPaymentMethod: (method: PaymentMethod) => void;
  cardDetails: CardDetails | null;
  setCardDetails: (details: CardDetails) => void;
  processPayment: (paymentInfo: PaymentInfo) => Promise<{ success: boolean; transactionId?: string; error?: string }>;
}

const PaymentContext = createContext<PaymentContextType | null>(null);

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [cardDetails, setCardDetails] = useState<CardDetails | null>(null);

  const setPaymentMethod = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
  };

  const processPayment = async (paymentInfo: PaymentInfo): Promise<{ success: boolean; transactionId?: string; error?: string }> => {
    // Simulate payment processing
    return new Promise((resolve) => {
      setTimeout(() => {
        if (paymentInfo.method === "cash_on_delivery") {
          resolve({
            success: true,
            transactionId: `COD-${Date.now()}`
          });
        } else if (paymentInfo.method === "apple_pay") {
          // In production, integrate with Apple Pay SDK
          resolve({
            success: true,
            transactionId: `APPLE-${Date.now()}`
          });
        } else if (paymentInfo.method === "card" && paymentInfo.cardDetails) {
          // In production, integrate with payment gateway (e.g., Stripe, PayTabs, HyperPay)
          const isValid = validateCard(paymentInfo.cardDetails);
          if (isValid) {
            resolve({
              success: true,
              transactionId: `CARD-${Date.now()}`
            });
          } else {
            resolve({
              success: false,
              error: "Invalid card details"
            });
          }
        } else {
          resolve({
            success: false,
            error: "Invalid payment method"
          });
        }
      }, 1500);
    });
  };

  const validateCard = (card: CardDetails): boolean => {
    // Basic validation
    const cardNumberClean = card.cardNumber.replace(/\s/g, '');
    if (cardNumberClean.length < 13 || cardNumberClean.length > 19) return false;
    if (!/^\d+$/.test(cardNumberClean)) return false;
    if (card.cvv.length < 3 || card.cvv.length > 4) return false;
    if (!/^\d{2}\/\d{2}$/.test(card.expiryDate)) return false;
    return true;
  };

  return (
    <PaymentContext.Provider value={{
      selectedPaymentMethod,
      setPaymentMethod,
      cardDetails,
      setCardDetails,
      processPayment
    }}>
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
}
