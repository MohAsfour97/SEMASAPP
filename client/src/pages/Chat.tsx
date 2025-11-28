import { useState, useEffect, useRef } from "react";
import { useRoute, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { useOrders } from "@/lib/orders";
import { Send, ArrowLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function Chat() {
  const [, params] = useRoute("/chat/:orderId");
  const orderId = params?.orderId;
  const [, setLocation] = useLocation();
  
  const { user } = useAuth();
  const { orders, sendMessage } = useOrders();
  
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const order = orders.find(o => o.id === orderId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [order?.messages]);

  if (!order) return <div>Order not found</div>;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !user) return;
    
    sendMessage(order.id, user.id, text);
    setText("");
  };

  const recipientName = user?.role === "customer" 
    ? "Technician" 
    : order.customerName;

  return (
    <div className="flex flex-col h-screen bg-background pb-safe">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-card flex items-center gap-3 shadow-sm z-10">
        <Button variant="ghost" size="icon" className="-ml-2" onClick={() => window.history.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
          <User className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-bold text-sm">{recipientName}</h2>
          <p className="text-xs text-muted-foreground">Order #{order.id.slice(-4)}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background" ref={scrollRef}>
        {order.messages.length === 0 ? (
          <div className="text-center text-muted-foreground text-sm mt-10">
            <p>Start the conversation with your {user?.role === "customer" ? "technician" : "customer"}.</p>
          </div>
        ) : (
          order.messages.map((msg) => {
            const isMe = msg.senderId === user?.id;
            return (
              <div key={msg.id} className={cn("flex", isMe ? "justify-end" : "justify-start")}>
                <div 
                  className={cn(
                    "max-w-[80%] px-4 py-2 rounded-2xl text-sm",
                    isMe 
                      ? "bg-primary text-white rounded-br-none" 
                      : "bg-card border border-border/50 text-foreground rounded-bl-none shadow-sm"
                  )}
                >
                  {msg.text}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 bg-card border-t flex gap-2">
        <Input 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Type a message..." 
          className="flex-1 rounded-full bg-secondary/20 border-transparent focus:bg-white transition-all"
        />
        <Button type="submit" size="icon" className="rounded-full w-10 h-10 shrink-0" disabled={!text.trim()}>
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
