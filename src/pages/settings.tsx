import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { defaultSettings } from "@/lib/handbags";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings as SettingsIcon, 
  Lightbulb, 
  Bot, 
  Bell, 
  GitMerge, 
  Download, 
  Globe, 
  Calendar
} from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [activeTab, setActiveTab] = useState("general");
  const { toast } = useToast();

  const handleSaveChanges = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully",
    });
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600 mt-1">Configure your Limelight Intelligence settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Navigation */}
        <Card className="lg:col-span-1">
          <CardContent className="p-0">
            <div className="p-4 border-b">
              <h2 className="font-medium text-gray-800">Settings Categories</h2>
            </div>
            <div className="p-2">
              <nav>
                <button 
                  className={`flex items-center px-4 py-3 rounded-lg w-full text-left ${
                    activeTab === "general" 
                      ? "bg-[#25D366] bg-opacity-10 text-[#075E54]" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("general")}
                >
                  <SettingsIcon className="h-5 w-5 mr-3" />
                  General
                </button>
                <button 
                  className={`flex items-center px-4 py-3 rounded-lg w-full text-left mt-1 ${
                    activeTab === "ai-settings" 
                      ? "bg-[#25D366] bg-opacity-10 text-[#075E54]" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("ai-settings")}
                >
                  <Bot className="h-5 w-5 mr-3" />
                  AI Settings
                </button>
                <button 
                  className={`flex items-center px-4 py-3 rounded-lg w-full text-left mt-1 ${
                    activeTab === "subscription" 
                      ? "bg-[#25D366] bg-opacity-10 text-[#075E54]" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("subscription")}
                >
                  <Calendar className="h-5 w-5 mr-3" />
                  Subscription
                </button>
                <button 
                  className={`flex items-center px-4 py-3 rounded-lg w-full text-left mt-1 ${
                    activeTab === "notifications" 
                      ? "bg-[#25D366] bg-opacity-10 text-[#075E54]" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("notifications")}
                >
                  <Bell className="h-5 w-5 mr-3" />
                  Notifications
                </button>
                <button 
                  className={`flex items-center px-4 py-3 rounded-lg w-full text-left mt-1 ${
                    activeTab === "integrations" 
                      ? "bg-[#25D366] bg-opacity-10 text-[#075E54]" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("integrations")}
                >
                  <GitMerge className="h-5 w-5 mr-3" />
                  Integrations
                </button>
                <button 
                  className={`flex items-center px-4 py-3 rounded-lg w-full text-left mt-1 ${
                    activeTab === "data-export" 
                      ? "bg-[#25D366] bg-opacity-10 text-[#075E54]" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("data-export")}
                >
                  <Download className="h-5 w-5 mr-3" />
                  Data Export
                </button>
              </nav>
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Settings Content */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            {activeTab === "general" && (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">General Settings</h2>
                
                <div className="space-y-6">
                  {/* Language Settings */}
                  <div>
                    <h3 className="text-base font-medium text-gray-800 mb-3">Language & Region</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="language" className="mb-1">Interface Language</Label>
                        <Select value={settings.language} onValueChange={(value) => setSettings({...settings, language: value})}>
                          <SelectTrigger id="language" className="w-full">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="de">Deutsch</SelectItem>
                            <SelectItem value="it">Italiano</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="timezone" className="mb-1">Timezone</Label>
                        <Select value={settings.timezone} onValueChange={(value) => setSettings({...settings, timezone: value})}>
                          <SelectTrigger id="timezone" className="w-full">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                            <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                            <SelectItem value="UTC+0">Greenwich Mean Time (UTC+0)</SelectItem>
                            <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                            <SelectItem value="UTC+8">China Standard Time (UTC+8)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Display Settings */}
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-base font-medium text-gray-800 mb-3">Display Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Dark Mode</h4>
                          <p className="text-xs text-gray-500">Enable dark mode for the interface</p>
                        </div>
                        <Switch 
                          checked={settings.darkMode} 
                          onCheckedChange={(checked) => setSettings({...settings, darkMode: checked})} 
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Compact Mode</h4>
                          <p className="text-xs text-gray-500">Show more content by reducing spacing</p>
                        </div>
                        <Switch 
                          checked={settings.compactMode} 
                          onCheckedChange={(checked) => setSettings({...settings, compactMode: checked})} 
                        />
                      </div>
                      <div>
                        <Label htmlFor="date-format" className="mb-1">Date Format</Label>
                        <Select value={settings.dateFormat} onValueChange={(value) => setSettings({...settings, dateFormat: value})}>
                          <SelectTrigger id="date-format" className="w-full">
                            <SelectValue placeholder="Select date format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                            <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                            <SelectItem value="YYYY/MM/DD">YYYY/MM/DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {activeTab === "ai-settings" && (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">AI Model Settings</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="ai-model" className="mb-1">Default AI Model</Label>
                    <Select value={settings.aiModel} onValueChange={(value) => setSettings({...settings, aiModel: value})}>
                      <SelectTrigger id="ai-model" className="w-full">
                        <SelectValue placeholder="Select AI model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">GPT-4 (Most Capable)</SelectItem>
                        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo (Faster)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-1">Response Temperature</Label>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs text-gray-500">Precise</span>
                      <Slider 
                        value={[settings.temperature]} 
                        min={0} 
                        max={100} 
                        step={1}
                        onValueChange={(value) => setSettings({...settings, temperature: value[0]})}
                        className="flex-1" 
                      />
                      <span className="text-xs text-gray-500">Creative</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Automatic Processing</h4>
                      <p className="text-xs text-gray-500">Process messages as they arrive</p>
                    </div>
                    <Switch 
                      checked={settings.autoProcessing} 
                      onCheckedChange={(checked) => setSettings({...settings, autoProcessing: checked})} 
                    />
                  </div>
                </div>
              </>
            )}
            
            {activeTab === "notifications" && (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Notification Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Email Notifications</h4>
                      <p className="text-xs text-gray-500">Receive email alerts for new products</p>
                    </div>
                    <Switch 
                      checked={settings.emailNotifications} 
                      onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Browser Notifications</h4>
                      <p className="text-xs text-gray-500">Show browser alerts for activities</p>
                    </div>
                    <Switch 
                      checked={settings.browserNotifications} 
                      onCheckedChange={(checked) => setSettings({...settings, browserNotifications: checked})} 
                    />
                  </div>
                </div>
              </>
            )}
            
            {(activeTab === "subscription" || activeTab === "integrations" || activeTab === "data-export") && (
              <div className="py-10 text-center">
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-3 rounded-full bg-gray-100">
                    {activeTab === "subscription" && <Calendar className="h-6 w-6 text-gray-400" />}
                    {activeTab === "integrations" && <GitMerge className="h-6 w-6 text-gray-400" />}
                    {activeTab === "data-export" && <Download className="h-6 w-6 text-gray-400" />}
                  </div>
                  <h3 className="text-lg font-medium text-gray-700">
                    {activeTab === "subscription" && "Subscription Settings"}
                    {activeTab === "integrations" && "Integration Settings"}
                    {activeTab === "data-export" && "Data Export Settings"}
                  </h3>
                  <p className="text-gray-500 max-w-md">
                    This feature is not available in the prototype. It would allow you to manage your
                    {activeTab === "subscription" && " subscription plan and billing information."}
                    {activeTab === "integrations" && " integrations with third-party services."}
                    {activeTab === "data-export" && " data exports and downloads."}
                  </p>
                </div>
              </div>
            )}
            
            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
              <Button variant="outline" className="mr-3">
                Cancel
              </Button>
              <Button className="bg-[#128C7E] hover:bg-[#075E54]" onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


