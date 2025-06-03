import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AccountCard } from "@/components/account_card";
import { QRCodeModal } from "@/components/qr_code-modal";
import { WhatsAppAccount } from "@/lib/types";
import { Smartphone, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
 
export default function Accounts() {
  const [accounts, setAccounts] = useState<WhatsAppAccount[]>([]);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Organization ID - In a real app, this would come from auth context or similar
  const orgId = 1; // Default org ID for testing
 
  const fetchAccounts = async () => {
    try {
      setIsLoadingAccounts(true);
      setError(null);
      
      console.log('Fetching accounts from:', `http://localhost:3000/api/auths/accounts/${orgId}`);
      
      const response = await axios.get(`http://localhost:3000/api/auths/accounts/${orgId}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          // In a real app, you would include authorization headers
          // 'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('Account response:', response.data);
      
      if (response.data && response.data.success && response.data.data) {
        // Map backend account data to frontend WhatsAppAccount type
        const accountsData = response.data.data.map(account => ({
          id: account.id,
          userId: account.created_by_id || 1,
          phoneNumber: account.phone_number || 'No phone number',
          name: account.name || `Account ${account.id}`,
          isActive: account.status === 'active',
          connectedAt: account.created_at,
          lastActivity: account.updated_at
        }));
        
        setAccounts(accountsData);
      } else {
        setAccounts([]);
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
      // Don't show error message for connection issues or server errors, treat as empty state
      if (error.code === 'ERR_NETWORK' || error.response?.status === 401 || error.response?.status === 500) {
        // Connection refused, authentication error, or server error - treat as no accounts found
        setError(null);
        setAccounts([]);
      } else {
        // Only set error for other API errors
        setError("Failed to load accounts. Please try again later.");
        setAccounts([]);
      }
    } finally {
      setIsLoadingAccounts(false);
    }
  };
 
  // Load accounts when component mounts
  useEffect(() => {
    fetchAccounts();
  }, []);
 
  const handleDisconnect = async (accountId: number) => {
    try {
      // Call API to delete/disconnect the account
      await axios.delete(`http://localhost:3000/api/auths/${accountId}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          // In a real app, you would include authorization headers
          // 'Authorization': `Bearer ${token}`
        }
      });
      
      // Fetch fresh data from the server to reflect the updated status
      await fetchAccounts();
      
      toast({
        title: "Account Disconnected",
        description: "WhatsApp account has been disconnected successfully",
      });
    } catch (error) {
      console.error("Error disconnecting account:", error);
      toast({
        title: "Error",
        description: "Failed to disconnect account. Please try again later.",
        variant: "destructive"
      });
    }
  };
 
  const handleQRScanComplete = async () => {
    try {
      // Close QR modal
      setIsQRModalOpen(false);
      
      // Show loading toast
      toast({
        title: "Connecting Account",
        description: "Finalizing account connection...",
      });
      
      // In a real implementation, you would send the QR session data to your backend
      // to complete the account setup
      
      // Fetch updated accounts list to show the new account
      await fetchAccounts();
      
      toast({
        title: "Account Connected",
        description: "New Limelight account has been added successfully",
      });
    } catch (error) {
      console.error("Error completing QR scan:", error);
      toast({
        title: "Error",
        description: "Failed to complete account connection. Please try again later.",
        variant: "destructive"
      });
    }
  };
 
  const fetchQRCode = async () => {
    try {
      setIsLoading(true);
      // Add parameters to prevent direct WhatsApp Web redirection
      const response = await axios.get("http://localhost:3000/api/auths/fetch?initialize=true", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      
      if (response.data && response.data.qrDataURL) {
        setQrCodeData(response.data.qrDataURL);
        setIsQRModalOpen(true);
        
        toast({
          title: "QR Code Generated",
          description: "Scan the QR code to connect your WhatsApp account",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to generate QR code",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching QR code:", error);
      toast({
        title: "Error",
        description: "Failed to connect to authentication service",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
 
  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Limelight Accounts</h1>
          <p className="text-gray-600 mt-1">Manage your connected Limelight numbers</p>
        </div>
        <div>
          <Button
            onClick={fetchQRCode}
            className="bg-[#128C7E] hover:bg-[#075E54] flex items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">⊚</span>
                Generating QR...
              </>
            ) : (
              <>
                <Smartphone className="h-5 w-5 mr-2" />
                Add Limelight Number
              </>
            )}
          </Button>
        </div>
      </div>
 
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Error state */}
        {error && (
          <Card className="col-span-full p-6 border-red-200">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </Card>
        )}
        
        {/* Loading state */}
        {isLoadingAccounts && (
          <Card className="col-span-full p-8 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-12 w-12 text-gray-400 animate-spin" />
              <h3 className="text-lg font-medium text-gray-700">Loading Accounts</h3>
              <p className="text-gray-500">Please wait while we fetch your accounts</p>
            </div>
          </Card>
        )}
        
        {/* Account cards */}
        {!isLoadingAccounts && !error && accounts.length > 0 && accounts.map((account) => (
          <AccountCard
            key={account.id}
            account={account}
            onDisconnect={() => handleDisconnect(account.id)}
          />
        ))}
        
        {/* Empty state */}
        {!isLoadingAccounts && !error && accounts.length === 0 && (
          <Card className="col-span-full p-8 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Smartphone className="h-12 w-12 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-700">No Account found</h3>
              <p className="text-gray-500">Connect your first WhatsApp account to get started</p>
              <Button
                onClick={fetchQRCode}
                className="bg-[#128C7E] hover:bg-[#075E54] mt-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Generating QR...
                  </>
                ) : (
                  <>
                    <Smartphone className="h-5 w-5 mr-2" />
                    Add WhatsApp Number
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}
      </div>
 
      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        onScanComplete={handleQRScanComplete}
        qrCodeData={qrCodeData}
      />
    </div>
  );
}