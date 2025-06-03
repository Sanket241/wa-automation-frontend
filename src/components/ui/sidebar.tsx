import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  Home, 
  ShoppingBag, 
  MessageSquare, 
  Users, 
  Smartphone, 
  Settings
} from "lucide-react";

export function Sidebar() {
  const [location] = useLocation();
  
  const isActive = (path: string) => {
    return location === path;
  };
  
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Products", path: "/products", icon: ShoppingBag },
    { name: "Chats", path: "/chats", icon: MessageSquare },
    { name: "Suppliers", path: "/suppliers", icon: Users },
    { name: "Accounts", path: "/accounts", icon: Smartphone },
    { name: "Settings", path: "/settings", icon: Settings },
  ];
  
  return (
    <aside className="w-64 bg-white shadow-md sidebar-height flex flex-col">
      <div className="p-5 border-b">
        <h1 className="text-xl font-bold text-[#075E54]">Limelight Intelligence</h1>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                href={item.path}
                className={cn(
                  "flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#128C7E] rounded-md transition-colors",
                  isActive(item.path) && "bg-gray-100 text-[#128C7E]"
                )}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t p-4">
        <div className="text-sm text-gray-500">Limelight Intelligence</div>
      </div>
    </aside>
  );
}
