
import { useState } from "react";
import { CreditCard, Lock } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { usePayment } from "@/lib/payment";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CardPaymentForm() {
  const { t } = useLanguage();
  const { setCardDetails } = usePayment();
  
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.substring(0, 19); // Max 16 digits + 3 spaces
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const detectCardType = (number: string): "visa" | "mada" | "mastercard" | undefined => {
    const cleaned = number.replace(/\s/g, '');
    if (cleaned.startsWith('4')) return 'visa';
    if (cleaned.startsWith('5')) return 'mastercard';
    if (cleaned.startsWith('9')) return 'mada'; // Mada cards typically start with 9
    return undefined;
  };

  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value);
    setCardNumber(formatted);
    updateCardDetails(formatted, cardHolder, expiryDate, cvv);
  };

  const handleExpiryChange = (value: string) => {
    const formatted = formatExpiryDate(value);
    setExpiryDate(formatted);
    updateCardDetails(cardNumber, cardHolder, formatted, cvv);
  };

  const updateCardDetails = (number: string, holder: string, expiry: string, cvvValue: string) => {
    setCardDetails({
      cardNumber: number,
      cardHolder: holder,
      expiryDate: expiry,
      cvv: cvvValue,
      cardType: detectCardType(number)
    });
  };

  return (
    <div className="space-y-4 bg-card/50 rounded-xl p-5 border border-border/50">
      <div className="flex items-center gap-2 mb-4">
        <Lock className="w-4 h-4 text-primary" />
        <p className="text-sm text-muted-foreground">{t("payment.securePayment")}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cardNumber">{t("payment.cardNumber")}</Label>
        <div className="relative">
          <Input
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => handleCardNumberChange(e.target.value)}
            placeholder="1234 5678 9012 3456"
            className="pl-10"
            maxLength={19}
          />
          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        </div>
        {detectCardType(cardNumber) && (
          <p className="text-xs text-muted-foreground">
            {detectCardType(cardNumber)?.toUpperCase()} {t("payment.detected")}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="cardHolder">{t("payment.cardHolderName")}</Label>
        <Input
          id="cardHolder"
          value={cardHolder}
          onChange={(e) => {
            setCardHolder(e.target.value);
            updateCardDetails(cardNumber, e.target.value, expiryDate, cvv);
          }}
          placeholder={t("payment.fullNameOnCard")}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry">{t("payment.expiryDate")}</Label>
          <Input
            id="expiry"
            value={expiryDate}
            onChange={(e) => handleExpiryChange(e.target.value)}
            placeholder="MM/YY"
            maxLength={5}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvv">{t("payment.cvv")}</Label>
          <Input
            id="cvv"
            type="password"
            value={cvv}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').substring(0, 4);
              setCvv(value);
              updateCardDetails(cardNumber, cardHolder, expiryDate, value);
            }}
            placeholder="123"
            maxLength={4}
          />
        </div>
      </div>
    </div>
  );
}
