import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Products from "@/pages/products";
import Chats from "@/pages/chats";
import Suppliers from "@/pages/suppliers";
import Accounts from "@/pages/accounts";
import Settings from "@/pages/settings";
import { Sidebar } from "@/components/ui/sidebar";
import Login from "./pages/login";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-hidden">
      <div className="flex h-full">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 content-height">
          {children}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Switch>
        <Route path="/">
          <AppLayout>
            <Dashboard />
          </AppLayout>
        </Route>
        
        <Route path="/dashboard">
          <AppLayout>
            <Dashboard />
          </AppLayout>
        </Route>
        
        <Route path="/products">
          <AppLayout>
            <Products />
          </AppLayout>
        </Route>
        
        <Route path="/chats">
          <AppLayout>
            <Chats />
          </AppLayout>
        </Route>
        
        <Route path="/suppliers">
          <AppLayout>
            <Suppliers />
          </AppLayout>
        </Route>
        
        <Route path="/accounts">
          <AppLayout>
            <Accounts />
          </AppLayout>
        </Route>
        
        <Route path="/settings">
          <AppLayout>
            <Settings />
          </AppLayout>
        </Route>

        <Route path="/login">
          <Login />
        </Route>
        
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </TooltipProvider>
  );
}

export default App;
