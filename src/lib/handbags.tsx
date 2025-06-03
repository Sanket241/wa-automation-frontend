import { Product } from "./types";

// Sample data for designer handbags
export const handbagsData: Product[] = [
  {
    id: 1,
    name: "Birkin 30",
    brand: "Hermès",
    type: "Tote",
    price: "$15,900",
    description: "Black Togo leather with gold hardware. Excellent condition, minimal wear.",
    color: "Black",
    material: "Togo Leather",
    condition: "Excellent",
    hardware: "Gold",
    sourceChat: "Luxury Supplier",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Classic Flap Medium",
    brand: "Chanel",
    type: "Shoulder Bag",
    price: "$8,800",
    description: "Black caviar leather with silver hardware. Quilted pattern and iconic CC lock.",
    color: "Black",
    material: "Caviar Leather",
    condition: "Very Good",
    hardware: "Silver",
    sourceChat: "Paris Connection",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Saddle Bag",
    brand: "Dior",
    type: "Shoulder Bag",
    price: "$3,950",
    description: "Blue Oblique canvas with antique gold-finish metal details. Adjustable shoulder strap.",
    color: "Blue",
    material: "Oblique Canvas",
    condition: "Excellent",
    hardware: "Antique Gold",
    sourceChat: "Milano Boutique",
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Neverfull MM",
    brand: "Louis Vuitton",
    type: "Tote",
    price: "$1,960",
    description: "Damier Ebene canvas with cherry lining. Versatile tote with side laces to cinch for custom look.",
    color: "Brown",
    material: "Damier Ebene Canvas",
    condition: "Good",
    hardware: "Brass",
    sourceChat: "Paris Connection",
    image: "https://images.unsplash.com/photo-1604782206219-3b9d4b6b9bd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    name: "Dionysus Small",
    brand: "Gucci",
    type: "Shoulder Bag",
    price: "$2,550",
    description: "GG Supreme canvas with black suede details. Textured tiger head closure with crystals.",
    color: "Beige/Ebony",
    material: "GG Supreme Canvas",
    condition: "Excellent",
    hardware: "Antiqued Silver",
    sourceChat: "Milano Boutique",
    image: "https://images.unsplash.com/photo-1610374792793-f016b77ca51a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
    createdAt: new Date().toISOString(),
  },
  {
    id: 6,
    name: "Lady Dior Medium",
    brand: "Dior",
    type: "Handbag",
    price: "$5,300",
    description: "Black lambskin with Cannage stitching. Silver-tone 'D.I.O.R.' charms and detachable strap.",
    color: "Black",
    material: "Lambskin",
    condition: "Pristine",
    hardware: "Silver",
    sourceChat: "Paris Connection",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
    createdAt: new Date().toISOString(),
  },
  {
    id: 7,
    name: "Sylvie Small",
    brand: "Gucci",
    type: "Shoulder Bag",
    price: "$2,650",
    description: "Smooth leather with signature Web stripe and gold-toned chain strap.",
    color: "Red",
    material: "Smooth Leather",
    condition: "Very Good",
    hardware: "Gold",
    sourceChat: "Milano Boutique",
    image: "https://images.unsplash.com/photo-1590739225294-502879d1e952?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
    createdAt: new Date().toISOString(),
  },
  {
    id: 8,
    name: "Puzzle Small",
    brand: "Loewe",
    type: "Crossbody",
    price: "$2,900",
    description: "Tan calfskin leather. Innovative folding design that allows it to lay completely flat.",
    color: "Tan",
    material: "Calfskin",
    condition: "Excellent",
    hardware: "Gold",
    sourceChat: "Luxury Supplier",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
    createdAt: new Date().toISOString(),
  },
  {
    id: 9,
    name: "Peekaboo Medium",
    brand: "Fendi",
    type: "Satchel",
    price: "$4,200",
    description: "Black leather with contrasting interior. Iconic turn-lock fastening and top handle.",
    color: "Black",
    material: "Nappa Leather",
    condition: "Very Good",
    hardware: "Palladium",
    sourceChat: "Milano Boutique",
    image: "https://images.unsplash.com/photo-1592500453369-9f4e08fbfa6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
    createdAt: new Date().toISOString(),
  },
  {
    id: 10,
    name: "Kelly 28",
    brand: "Hermès",
    type: "Handbag",
    price: "$12,500",
    description: "Rouge H Epsom leather with palladium hardware. Classic trapezoid shape with single top handle.",
    color: "Rouge H",
    material: "Epsom Leather",
    condition: "Pristine",
    hardware: "Palladium",
    sourceChat: "Luxury Supplier",
    image: "https://images.unsplash.com/photo-1595950653613-ab04d5e0481f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350&q=80",
    createdAt: new Date().toISOString(),
  }
];

// Sample data for suppliers
export const suppliersData = [
  {
    id: 1,
    name: "Luxury Supplier",
    specialty: "Hermès Specialist",
    location: "Paris, France",
    phoneNumber: "+33 6 12 34 56 78",
    status: "Active",
    productCount: 4,
  },
  {
    id: 2,
    name: "Paris Connection",
    specialty: "Multi-brand Dealer",
    location: "Paris, France",
    phoneNumber: "+33 7 98 76 54 32",
    status: "Active",
    productCount: 3,
  },
  {
    id: 3,
    name: "Milano Boutique",
    specialty: "Italian Luxury",
    location: "Milan, Italy",
    phoneNumber: "+39 333 123 4567",
    status: "Active",
    productCount: 2,
  },
  {
    id: 4,
    name: "Hong Kong Dealer",
    specialty: "Asian Market",
    location: "Hong Kong",
    phoneNumber: "+852 9876 5432",
    status: "Pending",
    productCount: 1,
  }
];

// Sample data for WhatsApp accounts
export const accountsData = [
  {
    id: 1,
    userId: 1,
    phoneNumber: "+1 (555) 123-4567",
    name: "Primary Account",
    isActive: true,
    connectedAt: "2023-04-12T10:00:00.000Z",
    lastActivity: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
  },
  {
    id: 2,
    userId: 1,
    phoneNumber: "+1 (555) 987-6543",
    name: "Business Account",
    isActive: true,
    connectedAt: "2023-05-03T14:30:00.000Z",
    lastActivity: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  }
];

// Sample data for chats
export const chatsData = [
  {
    id: 1,
    accountId: 1,
    name: "Luxury Supplier",
    phoneNumber: "+33 6 12 34 56 78",
    isSubscribed: true,
    prompt: "Extract product name, brand, type, size, color, material, condition, and price from all messages. Include additional details like hardware type if available.",
    lastMessage: "New Birkin 30 available in Noir, Gold hardware...",
    lastMessageAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    avatar: "LS",
  },
  {
    id: 2,
    accountId: 1,
    name: "Paris Connection",
    phoneNumber: "+33 7 98 76 54 32",
    isSubscribed: true,
    prompt: "Extract product information and pricing details from all messages.",
    lastMessage: "Lady Dior in black lambskin, medium size, amazing condition...",
    lastMessageAt: new Date(Date.now() - 18000000).toISOString(), // 5 hours ago
    avatar: "PC",
  },
  {
    id: 3,
    accountId: 1,
    name: "Milano Boutique",
    phoneNumber: "+39 333 123 4567",
    isSubscribed: false,
    lastMessage: "Limited edition Saddle bag from Dior now in stock...",
    lastMessageAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    avatar: "MB",
  },
  {
    id: 4,
    accountId: 2,
    name: "Hong Kong Dealer",
    phoneNumber: "+852 9876 5432",
    isSubscribed: false,
    lastMessage: "Chanel Classic Flap Medium, pristine condition, comes with all...",
    lastMessageAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    avatar: "HK",
  }
];

// Sample data for prompt templates
export const promptTemplatesData = [
  {
    id: 1,
    userId: 1,
    name: "Product Extraction",
    content: "Extract product name, brand, type, size, color, material, and price from messages."
  },
  {
    id: 2,
    userId: 1,
    name: "Price Negotiation",
    content: "Analyze price negotiations and extract initial price, final price, and discount percentage."
  }
];

// Sample data for messages (for a specific chat)
export const messagesData = [
  {
    id: 1,
    chatId: 1,
    content: "Hello! I have a new Birkin 30 available. Black Togo leather with gold hardware. Pristine condition, still has plastic on the hardware. Price is $15,900.",
    isSentByMe: false,
    sentAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
  {
    id: 2,
    chatId: 1,
    content: "That sounds interesting. Do you have any photos of the bag?",
    isSentByMe: true,
    sentAt: new Date(Date.now() - 3480000).toISOString(), // 58 minutes ago
  },
  {
    id: 3,
    chatId: 1,
    content: "Yes, here you go. The bag comes with all original packaging, box, dustbag, and receipt.",
    isSentByMe: false,
    sentAt: new Date(Date.now() - 3300000).toISOString(), // 55 minutes ago
  }
];

// Default settings
export const defaultSettings = {
  id: 1,
  userId: 1,
  language: "en",
  timezone: "UTC-8",
  dateFormat: "MM/DD/YYYY",
  darkMode: false,
  compactMode: false,
  aiModel: "gpt-4",
  temperature: 70,
  autoProcessing: true,
  emailNotifications: true,
  browserNotifications: false,
};


