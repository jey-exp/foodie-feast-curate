
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CatererDashboard from "./pages/caterer/Dashboard";
import CatererProfile from "./pages/caterer/Profile";
import CatererOrders from "./pages/caterer/Orders";
import CustomerHome from "./pages/customer/Home";
import CatererView from "./pages/customer/CatererView";
import Checkout from "./pages/customer/Checkout";
import OrderHistory from "./pages/customer/OrderHistory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Auth Routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          
          {/* Caterer Routes */}
          <Route path="/caterer/dashboard" element={<CatererDashboard />} />
          <Route path="/caterer/profile" element={<CatererProfile />} />
          <Route path="/caterer/orders" element={<CatererOrders />} />
          
          {/* Customer Routes */}
          <Route path="/customer/home" element={<CustomerHome />} />
          <Route path="/customer/caterer/:id" element={<CatererView />} />
          <Route path="/customer/checkout" element={<Checkout />} />
          <Route path="/customer/order-history" element={<OrderHistory />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
