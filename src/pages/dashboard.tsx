import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { handbagsData, chatsData } from "@/lib/handbags";
import { timeAgo, getInitials } from "@/lib/utils";
import { Link } from "wouter";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const [accountStats, setAccountStats] = useState({ active: 0, inactive: 0, total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  // Error state is used in the fetchAccountStats function but not displayed in the UI yet
  const [error, setError] = useState<string | null>(null);
  
  // Organization ID - In a real app, this would come from auth context or similar
  const orgId = 1; // Default org ID for testing
  
  // Fetch account status summary
  useEffect(() => {
    const fetchAccountStats = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('Fetching account stats from:', `http://localhost:3000/api/auths/accounts/${orgId}/status-summary`);
        
        const response = await axios.get(`http://localhost:3000/api/auths/accounts/${orgId}/status-summary`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // In a real app, you would include authorization headers
            // 'Authorization': `Bearer ${token}`
          }
        });
        
        console.log('Account stats response:', response.data);
        
        if (response.data && response.data.success && response.data.data) {
          setAccountStats({
            active: response.data.data.active || 0,
            inactive: response.data.data.inactive || 0,
            total: (response.data.data.active || 0) + (response.data.data.inactive || 0)
          });
        }
      } catch (error) {
        console.error("Error fetching account stats:", error);
        setError("Failed to load account statistics");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAccountStats();
  }, []);
  
  // Get top 3 recent chats
  const recentChats = [...chatsData].sort((a, b) => 
    new Date(b.lastMessageAt || "").getTime() - new Date(a.lastMessageAt || "").getTime()
  ).slice(0, 3);
  
  // Get latest 3 products
  const recentProducts = [...handbagsData].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 3);
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your Limelight Intelligence</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-[#25D366] mr-4">
                <Smartphone className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Active Accounts</p>
                {isLoading ? (
                  <div className="flex items-center">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin text-gray-400" />
                    <p className="text-2xl font-semibold text-gray-500">Loading...</p>
                  </div>
                ) : (
                  <p className="text-2xl font-semibold text-gray-800">{accountStats.active}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Active Chats</p>
                <p className="text-2xl font-semibold text-gray-800">{chatsData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Products</p>
                <p className="text-2xl font-semibold text-gray-800">{handbagsData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Products</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-800">{product.name}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{product.brand}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{product.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-right">
              <Link href="/products" className="text-sm font-medium text-[#128C7E] hover:text-[#075E54]">
                View all products →
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Chat Activity</h2>
            <div className="space-y-4">
              {recentChats.map((chat) => (
                <div key={chat.id} className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <span className="text-sm font-medium">{chat.avatar || getInitials(chat.name)}</span>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-semibold text-gray-800">{chat.name}</h3>
                      <span className="text-xs text-gray-500">{timeAgo(chat.lastMessageAt || "")}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-right">
              <Link href="/chats" className="text-sm font-medium text-[#128C7E] hover:text-[#075E54]">
                View all chats →
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Smartphone(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>
  );
}

function MessageSquare(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}

function ShoppingBag(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    </svg>
  );
}
