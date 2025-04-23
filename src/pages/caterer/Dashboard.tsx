
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";
import { User, CatererProfile, Order } from "@/types";
import { toast } from "sonner";

// Mock user data - will be replaced with Supabase integration
const mockUser: User = {
  id: "c123",
  email: "caterer@example.com",
  role: "caterer",
  created_at: new Date().toISOString(),
};

// Mock caterer profile data - will be replaced with Supabase data
const mockProfile: CatererProfile = {
  id: "cp123",
  user_id: "c123",
  name: "Gourmet Delights",
  location: "Downtown Boston",
  description: "Specializing in gourmet catering for all occasions",
  avg_price: 35.50,
  is_complete: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

// Mock orders data - will be replaced with Supabase data
const mockOrders: Order[] = [
  {
    id: "o1",
    customer_id: "cust1",
    caterer_id: "c123",
    total_amount: 145.75,
    status: "pending",
    delivery_address: "123 Main St, Boston, MA",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "o2",
    customer_id: "cust2",
    caterer_id: "c123",
    total_amount: 89.50,
    status: "confirmed",
    delivery_address: "456 Park Ave, Boston, MA",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user] = useState<User>(mockUser);
  const [profile, setProfile] = useState<CatererProfile | null>(mockProfile);
  const [recentOrders, setRecentOrders] = useState<Order[]>(mockOrders);
  
  // Redirect to profile page if profile is incomplete
  useEffect(() => {
    if (profile && !profile.is_complete) {
      navigate("/caterer/profile");
      toast.info("Please complete your profile to accept orders");
    }
  }, [profile, navigate]);
  
  const handleOrderAction = (orderId: string, status: "confirmed" | "completed" | "cancelled") => {
    // This will be implemented with Supabase
    console.log(`Updating order ${orderId} to ${status}`);
    
    // Update local state for demo
    setRecentOrders(recentOrders.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
    
    toast.success(`Order ${orderId} has been ${status}`);
  };
  
  return (
    <MainLayout user={user}>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Caterer Dashboard</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{recentOrders.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {recentOrders.filter(order => order.status === "pending").length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                ${recentOrders.reduce((sum, order) => sum + order.total_amount, 0).toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No orders yet
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Order ID</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Amount</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="py-3 px-4 text-sm">{order.id}</td>
                        <td className="py-3 px-4 text-sm">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 font-medium">
                          ${order.total_amount.toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                            order.status === "confirmed" ? "bg-blue-100 text-blue-800" :
                            order.status === "completed" ? "bg-green-100 text-green-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            {order.status === "pending" && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="default"
                                  onClick={() => handleOrderAction(order.id, "confirmed")}
                                >
                                  Accept
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => handleOrderAction(order.id, "cancelled")}
                                >
                                  Decline
                                </Button>
                              </>
                            )}
                            
                            {order.status === "confirmed" && (
                              <Button 
                                size="sm" 
                                variant="default"
                                onClick={() => handleOrderAction(order.id, "completed")}
                              >
                                Complete
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
