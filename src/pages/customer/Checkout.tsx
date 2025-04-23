
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";
import FoodCurationList from "@/components/customer/FoodCurationList";
import { User, CatererProfile, CuratedItem } from "@/types";
import { toast } from "sonner";

// Mock user data - will be replaced with Supabase integration
const mockUser: User = {
  id: "cust123",
  email: "customer@example.com",
  role: "customer",
  created_at: new Date().toISOString(),
};

const Checkout = () => {
  const navigate = useNavigate();
  const [user] = useState<User>(mockUser);
  const [curatedItems, setCuratedItems] = useState<CuratedItem[]>([]);
  const [caterer, setCaterer] = useState<CatererProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  
  useEffect(() => {
    // Get curated items and caterer info from session storage
    const storedItems = sessionStorage.getItem("curatedItems");
    const storedCaterer = sessionStorage.getItem("caterer");
    
    if (storedItems && storedCaterer) {
      setCuratedItems(JSON.parse(storedItems));
      setCaterer(JSON.parse(storedCaterer));
    } else {
      navigate("/customer/home");
      toast.error("No items selected for checkout");
    }
  }, [navigate]);
  
  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    // Update the quantity of the item in the curated list
    setCuratedItems(curatedItems.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    ));
    
    // Update session storage
    sessionStorage.setItem("curatedItems", JSON.stringify(
      curatedItems.map(item => item.id === itemId ? { ...item, quantity } : item)
    ));
  };
  
  const handleRemoveItem = (itemId: string) => {
    // Remove the item from the curated list
    const updatedItems = curatedItems.filter(item => item.id !== itemId);
    setCuratedItems(updatedItems);
    
    // Update session storage
    sessionStorage.setItem("curatedItems", JSON.stringify(updatedItems));
    
    // If all items are removed, navigate back to home
    if (updatedItems.length === 0) {
      navigate("/customer/home");
      toast.info("All items removed from your meal");
    }
  };
  
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address.trim()) {
      toast.error("Please enter a delivery address");
      return;
    }
    
    setLoading(true);
    
    try {
      // This will be implemented with Supabase
      console.log("Placing order...");
      console.log("Items:", curatedItems);
      console.log("Caterer:", caterer);
      console.log("Delivery address:", address);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear session storage
      sessionStorage.removeItem("curatedItems");
      sessionStorage.removeItem("caterer");
      
      toast.success("Order placed successfully!");
      navigate("/customer/order-history");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  if (!caterer) {
    return (
      <MainLayout user={user}>
        <div className="text-center py-12">
          <p>Loading checkout information...</p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout user={user}>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Caterer Information</h2>
                
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center">
                    {caterer.image_url ? (
                      <img 
                        src={caterer.image_url} 
                        alt={caterer.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-2xl font-bold">{caterer.name.charAt(0)}</span>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">{caterer.name}</h3>
                    <p className="text-sm text-muted-foreground">{caterer.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
                
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Delivery Address</Label>
                    <Input
                      id="address"
                      placeholder="Enter your delivery address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <FoodCurationList 
              items={curatedItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
            
            <Button
              className="w-full py-6 text-lg animated-button"
              onClick={handlePlaceOrder}
              disabled={curatedItems.length === 0 || loading}
            >
              {loading ? "Processing..." : "Place Order"}
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Checkout;
