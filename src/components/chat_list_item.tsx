import { Chat } from "@/lib/types";
import { cn, timeAgo, getInitials } from "@/lib/utils";
import { Check, Eye } from "lucide-react";

interface ChatListItemProps {
  chat: Chat;
  isSelected: boolean;
  onClick: () => void;
}

export function ChatListItem({ chat, isSelected, onClick }: ChatListItemProps) {
  return (
    <div 
      className={cn(
        "flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border-l-4 border-transparent hover:border-[#25D366]",
        isSelected && "bg-gray-50 border-[#25D366]"
      )}
      onClick={onClick}
    >
      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
        <span className="text-sm font-medium">{chat.avatar || getInitials(chat.name)}</span>
      </div>
      <div className="ml-3 flex-1">
        <div className="flex justify-between items-baseline">
          <h3 className="text-sm font-semibold text-gray-800">{chat.name}</h3>
          <span className="text-xs text-gray-500">{timeAgo(chat.lastMessageAt || "")}</span>
        </div>
        <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
        <div className="flex items-center mt-1">
          {chat.isSubscribed ? (
            <div className="flex items-center text-xs text-[#128C7E]">
              <Check className="h-4 w-4 mr-1" />
              Subscribed
            </div>
          ) : (
            <button className="text-xs text-gray-500 hover:text-[#128C7E] flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              Subscribe
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
