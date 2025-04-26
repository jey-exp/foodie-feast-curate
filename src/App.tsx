import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import SupaBase from "./lib/zustand";

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
import Noroute from "./pages/auth/Noroute";
import { UserRole } from "./types";

const queryClient = new QueryClient();
const supabase = createClient('https://hmspzbpwxjaxirwqpbce.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhtc3B6YnB3eGpheGlyd3FwYmNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1NDE5OTUsImV4cCI6MjA2MTExNzk5NX0.5D1bOluivPu4GZyS2J6CTtwnJObVAW-Ld6vtHsxmGqE')

const App = () => {
  const [session, setSession] = useState(null);
  const SupaBaseObj = SupaBase((state)=> state.setSupaObj);
  const [role, setRole]= useState<UserRole>("customer");
  SupaBaseObj(supabase);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    }) 
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    supabase.auth.getUser().then(({data : {user}}) => {
      console.log(user.user_metadata?.role);
      setRole(user.user_metadata?.role);
    });
    return () => subscription.unsubscribe()
  }, [])

  
  if (!session) {
    return (
      <BrowserRouter>
      <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/" element={<Index />} />
      <Route path="*" element={<Noroute/>}/>
      </Routes>
      </BrowserRouter>
    )
  }
  else if (role === "customer"){
    return (
    <QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />

        {/* Auth Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        {/* Customer Routes */}
        <Route path="/customer/home" element={<CustomerHome />} />
        <Route path="/customer/caterer/:id" element={<CatererView />} />
        <Route path="/customer/checkout" element={<Checkout />} />
        <Route
          path="/customer/order-history"
          element={<OrderHistory />}
        />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
      <Sonner />
    </BrowserRouter>
  </TooltipProvider> 
  </QueryClientProvider>
    )
  }
  else {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
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

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }
};

export default App;
