import { useState } from "react";
import { Chat, ExtractedProductData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PromptTemplate } from "@/components/prompt_template";
import { promptTemplatesData, messagesData } from "@/lib/handbags";
import { cn, getInitials, timeAgo } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

interface ChatDetailProps {
  chat: Chat;
}

export function ChatDetail({ chat }: ChatDetailProps) {
  const [prompt, setPrompt] = useState(chat.prompt || "");
  const [isSubscribed, setIsSubscribed] = useState(chat.isSubscribed);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showExtractedData, setShowExtractedData] = useState(false);
  const { toast } = useToast();
  
  // Sample extracted data for demonstration
  const extractedData: ExtractedProductData = {
    productName: "Birkin 30",
    brand: "Hermès",
    material: "Togo Leather",
    color: "Black",
    hardware: "Gold",
    condition: "Pristine",
    price: "$15,900",
    includes: "Box, Dustbag, Receipt"
  };
  
  const handleProcessNow = () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt before processing",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      setShowExtractedData(true);
      toast({
        title: "Processing Complete",
        description: "The AI has successfully extracted product data",
      });
    }, 1500);
  };
  
  const handleSavePrompt = () => {
    toast({
      title: "Prompt Saved",
      description: "Your prompt has been saved for this chat",
    });
  };
  
  const handleSubscriptionToggle = () => {
    setIsSubscribed(!isSubscribed);
    toast({
      title: isSubscribed ? "Unsubscribed" : "Subscribed",
      description: isSubscribed 
        ? "You've unsubscribed from this chat" 
        : "You've subscribed to this chat",
    });
  };
  
  const handleAddToCatalog = () => {
    toast({
      title: "Added to Catalog",
      description: "The product has been added to your catalog",
    });
  };
  
  return (
    <>
      <div className="border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
            <span className="text-sm font-medium">{chat.avatar || getInitials(chat.name)}</span>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-gray-800">{chat.name}</h3>
            <p className="text-sm text-gray-500">{chat.phoneNumber}</p>
          </div>
        </div>
        <div>
          <div className="flex items-center">
            <span className="mr-2 text-sm text-gray-600">Subscribed</span>
            <Switch
              checked={isSubscribed}
              onCheckedChange={handleSubscriptionToggle}
            />
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {/* Intelligence Prompt */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Intelligence Prompt</label>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <div className="flex-1">
              <Textarea
                rows={3}
                placeholder="Add a prompt for extracting information..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2">
              <Button 
                className="bg-[#128C7E] hover:bg-[#075E54] whitespace-nowrap flex-1 md:flex-none"
                onClick={handleProcessNow}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Process Now"}
              </Button>
              <Button 
                variant="outline" 
                className="whitespace-nowrap flex-1 md:flex-none"
                onClick={handleSavePrompt}
              >
                Save Prompt
              </Button>
            </div>
          </div>
        </div>
        
        {/* Prompt Templates */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Prompt Templates</h3>
            <button className="text-xs text-[#128C7E] hover:underline">Manage Templates</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {promptTemplatesData.map(template => (
              <PromptTemplate
                key={template.id}
                title={template.name}
                content={template.content}
                onSelect={() => setPrompt(template.content)}
              />
            ))}
          </div>
        </div>
        
        {/* Sample Chat Messages */}
        <div className="border rounded-lg mb-6">
          <div className="border-b px-4 py-3 bg-gray-50 flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-700">Recent Messages</h3>
            <button className="text-xs text-[#128C7E] hover:underline">View All</button>
          </div>
          <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
            {messagesData.map(message => (
              <div key={message.id} className={cn(
                "flex items-start",
                message.isSentByMe && "justify-end"
              )}>
                {!message.isSentByMe && (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex-shrink-0 text-xs font-medium">
                    {chat.avatar || getInitials(chat.name)}
                  </div>
                )}
                <div className={cn(
                  "mx-2 p-3 rounded-lg max-w-xs",
                  message.isSentByMe 
                    ? "bg-[#25D366] bg-opacity-10 rounded-tr-none" 
                    : "bg-gray-100 rounded-tl-none"
                )}>
                  <p className="text-sm text-gray-800">{message.content}</p>
                  <span className="text-xs text-gray-500 mt-1 block">{timeAgo(message.sentAt)}</span>
                </div>
                {message.isSentByMe && (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#128C7E] text-white flex-shrink-0 text-xs font-medium">
                    Me
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Extracted Data */}
        {showExtractedData && (
          <div className="border rounded-lg">
            <div className="border-b px-4 py-3 bg-gray-50">
              <h3 className="text-sm font-medium text-gray-700">Extracted Product Data</h3>
            </div>
            <div className="p-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Product Name</p>
                    <p className="text-sm font-medium">{extractedData.productName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Brand</p>
                    <p className="text-sm font-medium">{extractedData.brand}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Material</p>
                    <p className="text-sm font-medium">{extractedData.material}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Color</p>
                    <p className="text-sm font-medium">{extractedData.color}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Hardware</p>
                    <p className="text-sm font-medium">{extractedData.hardware}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Condition</p>
                    <p className="text-sm font-medium">{extractedData.condition}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Price</p>
                    <p className="text-sm font-medium">{extractedData.price}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Includes</p>
                    <p className="text-sm font-medium">{extractedData.includes}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button size="sm" className="bg-[#128C7E] hover:bg-[#075E54]" onClick={handleAddToCatalog}>
                    Add to Catalog
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
