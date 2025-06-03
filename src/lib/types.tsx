export interface User {
    id: number;
    username: string;
    email: string;
  }
  
  export interface WhatsAppAccount {
    id: number;
    userId: number;
    phoneNumber: string;
    name: string;
    isActive: boolean;
    connectedAt: string;
    lastActivity?: string;
  }
  
  export interface Chat {
    id: number;
    accountId: number;
    name: string;
    phoneNumber: string;
    isSubscribed: boolean;
    prompt?: string;
    lastMessage?: string;
    lastMessageAt?: string;
    avatar?: string;
  }
  
  export interface Product {
    id: number;
    name: string;
    brand: string;
    type: string;
    price: string;
    description?: string;
    color?: string;
    material?: string;
    condition?: string;
    hardware?: string;
    sourceChat?: string;
    image?: string;
    createdAt: string;
  }
  
  export interface Supplier {
    id: number;
    name: string;
    specialty?: string;
    location?: string;
    phoneNumber: string;
    status: string;
    productCount?: number;
  }
  
  export interface PromptTemplate {
    id: number;
    userId: number;
    name: string;
    content: string;
  }
  
  export interface Message {
    id: number;
    chatId: number;
    content: string;
    isSentByMe: boolean;
    sentAt: string;
  }
  
  export interface Settings {
    id: number;
    userId: number;
    language: string;
    timezone: string;
    dateFormat: string;
    darkMode: boolean;
    compactMode: boolean;
    aiModel: string;
    temperature: number;
    autoProcessing: boolean;
    emailNotifications: boolean;
    browserNotifications: boolean;
  }
  
  export interface ExtractedProductData {
    productName: string;
    brand: string;
    material: string;
    color: string;
    hardware: string;
    condition: string;
    price: string;
    includes: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials {
    username: string;
    email: string;
    password: string;
  }
  
  
  