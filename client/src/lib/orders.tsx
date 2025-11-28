import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "./auth";

export type OrderStatus = "pending" | "accepted" | "en_route" | "in_progress" | "completed" | "cancelled";

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  serviceType: string;
  status: OrderStatus;
  date: Date;
  address: string;
  description: string;
  technicianId?: string;
  rating?: number;
  messages: Message[];
}

interface OrderContextType {
  orders: Order[];
  createOrder: (order: Omit<Order, "id" | "status" | "messages">) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus, technicianId?: string) => void;
  rateOrder: (orderId: string, rating: number) => void;
  sendMessage: (orderId: string, senderId: string, text: string) => void;
  getOrdersByCustomer: (customerId: string) => Order[];
  getOrdersByTechnician: (technicianId: string) => Order[];
  getAllPendingOrders: () => Order[];
}

const OrderContext = createContext<OrderContextType | null>(null);

// Mock Initial Data
const INITIAL_ORDERS: Order[] = [
  {
    id: "ord_123",
    customerId: "1", // Jane Doe
    customerName: "Jane Doe",
    serviceType: "General Pest Control",
    status: "pending",
    date: new Date(),
    address: "123 Maple Ave, Springfield",
    description: "Seeing ants in the kitchen",
    messages: []
  },
  {
    id: "ord_456",
    customerId: "99", // Some other customer
    customerName: "Bob Smith",
    serviceType: "Termite Inspection",
    status: "accepted",
    technicianId: "2", // Mike Johnson
    date: new Date(Date.now() + 86400000), // Tomorrow
    address: "456 Oak Ln, Springfield",
    description: "Annual inspection",
    messages: [
      { id: "m1", senderId: "2", text: "Hi Bob, looking forward to helping you tomorrow.", timestamp: Date.now() - 100000 }
    ]
  }
];

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  const createOrder = (orderData: Omit<Order, "id" | "status" | "messages">) => {
    const newOrder: Order = {
      ...orderData,
      id: `ord_${Math.random().toString(36).substr(2, 9)}`,
      status: "pending",
      messages: []
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, technicianId?: string) => {
    setOrders((prev) => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status,
          ...(technicianId ? { technicianId } : {})
        };
      }
      return order;
    }));
  };

  const rateOrder = (orderId: string, rating: number) => {
    setOrders((prev) => prev.map(order => {
      if (order.id === orderId) {
        return { ...order, rating };
      }
      return order;
    }));
  };

  const sendMessage = (orderId: string, senderId: string, text: string) => {
    setOrders((prev) => prev.map(order => {
      if (order.id === orderId) {
        const newMessage: Message = {
          id: Math.random().toString(36).substr(2, 9),
          senderId,
          text,
          timestamp: Date.now()
        };
        return {
          ...order,
          messages: [...order.messages, newMessage]
        };
      }
      return order;
    }));
  };

  const getOrdersByCustomer = (customerId: string) => {
    return orders.filter(o => o.customerId === customerId);
  };

  const getOrdersByTechnician = (technicianId: string) => {
    return orders.filter(o => o.technicianId === technicianId);
  };

  const getAllPendingOrders = () => {
    return orders.filter(o => o.status === "pending");
  };

  return (
    <OrderContext.Provider value={{ 
      orders, 
      createOrder, 
      updateOrderStatus,
      rateOrder, 
      sendMessage,
      getOrdersByCustomer,
      getOrdersByTechnician,
      getAllPendingOrders
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
}
