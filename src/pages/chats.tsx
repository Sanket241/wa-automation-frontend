import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatListItem } from "@/components/chat_list_item";
import { ChatDetail } from "@/components/chat_detail";
import { Chat } from "@/lib/types";
import { chatsData } from "@/lib/handbags";
import { Search, Check, Eye } from "lucide-react";

export default function Chats() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  
  // Filter chats based on search term and active tab
  const filteredChats = chatsData.filter(chat => {
    const matchesSearch = chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          chat.phoneNumber.includes(searchTerm);
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && chat.isSubscribed;
  });
  
  // Select first chat by default if none is selected
  if (!selectedChat && filteredChats.length > 0 && !searchTerm) {
    setSelectedChat(filteredChats[0]);
  }
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Limelight Chats</h1>
        <p className="text-gray-600 mt-1">Manage and extract information from your connected chats</p>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Chat List Panel */}
        <Card className="xl:col-span-1">
          <CardContent className="p-4">
            <div className="mb-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search chats..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2"
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-2">
                <TabsTrigger value="all">All Chats</TabsTrigger>
                <TabsTrigger value="subscribed">Subscribed</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="overflow-y-auto chat-list">
              {filteredChats.map(chat => (
                <ChatListItem
                  key={chat.id}
                  chat={chat}
                  isSelected={selectedChat?.id === chat.id}
                  onClick={() => setSelectedChat(chat)}
                />
              ))}
              
              {filteredChats.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No chats found matching your search.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Chat Detail Panel */}
        <Card className="xl:col-span-2">
          {selectedChat ? (
            <ChatDetail chat={selectedChat} />
          ) : (
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px]">
              <p className="text-gray-500">Select a chat to view details</p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
