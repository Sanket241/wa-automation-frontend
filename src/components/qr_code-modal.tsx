import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Loader } from "lucide-react";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanComplete: () => void;
  qrCodeData: string | null;
}

export function QRCodeModal({ isOpen, onClose, onScanComplete, qrCodeData }: QRCodeModalProps) {
  const [isScanning, setIsScanning] = useState(false);
  
  const handleScanComplete = () => {
    setIsScanning(true);
    // Simulate scanning delay
    setTimeout(() => {
      setIsScanning(false);
      onScanComplete();
    }, 1500);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">Connect WhatsApp</DialogTitle>
          <DialogDescription className="text-gray-600">
            Scan this QR code from your WhatsApp app to connect your number
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-center py-4">
          {qrCodeData ? (
            <img 
              src={qrCodeData} 
              alt="WhatsApp QR Code" 
              className="w-64 h-64 border rounded-lg"
            />
          ) : (
            <div className="w-64 h-64 border rounded-lg flex items-center justify-center bg-gray-50">
              <Loader className="h-10 w-10 text-gray-400 animate-spin" />
            </div>
          )}
        </div>
        
        <div className="text-center text-sm text-gray-500 space-y-1">
          <p>1. Open WhatsApp on your phone</p>
          <p>2. Tap Menu or Settings and select WhatsApp Web</p>
          <p>3. Point your phone camera to this screen to scan the code</p>
        </div>
        
        <DialogFooter className="sm:justify-center">
          <Button
            onClick={handleScanComplete}
            className="w-full bg-[#128C7E] hover:bg-[#075E54]"
            disabled={isScanning || !qrCodeData}
          >
            {isScanning ? "Scanning..." : "Scan Complete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
