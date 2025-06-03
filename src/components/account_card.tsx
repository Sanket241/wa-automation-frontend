import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WhatsAppAccount } from "@/lib/types";
import { formatDate, timeAgo } from "@/lib/utils";
import { Smartphone, Settings, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
 
interface AccountCardProps {
  account: WhatsAppAccount;
  onDisconnect: () => void;
}
 
export function AccountCard({ account, onDisconnect }: AccountCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { toast } = useToast();
  
  const handleDisconnect = () => {
    if (showConfirm) {
      onDisconnect();
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
    }
  };
  
  const handleSettings = () => {
    toast({
      title: "Settings",
      description: "Account settings would open here",
    });
  };
  
  // Generate random values for demo purposes
  const chatCount = Math.floor(Math.random() * 15) + 5;
  const subscribedCount = Math.floor(Math.random() * chatCount);
  
  return (
    <Card className="overflow-hidden">
      <div className="border-b p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white">
            <Smartphone className="h-6 w-6" />
          </div>
          <div className="ml-3">
            <h3 className="font-medium text-gray-800">{account.name}</h3>
            <p className="text-sm text-gray-500">{account.phoneNumber}</p>
          </div>
        </div>
        <div className="flex items-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <span className="w-2 h-2 mr-1 rounded-full bg-green-500"></span>
            Active
          </span>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Connected</p>
            <p className="text-sm font-medium">{formatDate(account.connectedAt)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Activity</p>
            <p className="text-sm font-medium">{timeAgo(account.lastActivity || "")}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Chats</p>
            <p className="text-sm font-medium">{chatCount} total</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Subscribed</p>
            <p className="text-sm font-medium">{subscribedCount} chats</p>
          </div>
        </div>
        
        <div className="border-t pt-4 flex justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-[#128C7E]"
            onClick={handleSettings}
          >
            <Settings className="h-4 w-4 mr-1" />
            Settings
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className={`${showConfirm ? "text-red-700" : "text-red-600"} hover:text-red-700`}
            onClick={handleDisconnect}
          >
            <LogOut className="h-4 w-4 mr-1" />
            {showConfirm ? "Confirm" : "Disconnect"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}