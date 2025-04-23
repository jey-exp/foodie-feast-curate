
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/layout/MainLayout";
import { User, Order } from "@/types";
import { toast } from "sonner";

// Mock user data - will be replaced with Supabase integration
const mockUser: User = {
  id: "c123",
  email: "caterer@example.com",
  role: "caterer",
  created_at: new Date().toISOString(),
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
  },
  {
    id: "o3",
    customer_id: "cust3",
    caterer_id: "c123",
    total_amount: 216.25,
    status: "completed",
    delivery_address: "789 Oak St, Boston, MA",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const Orders = () => {
  const [user] = useState<User>(mockUser);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredOrders = activeTab === "all" 
    ? orders 
    : orders.filter(order => order.status === activeTab);
  
  const handleOrderAction = (orderId: string, status: "confirmed" | "completed" | "cancelled") => {
    // This will be implemented with Supabase
    console.log(`Updating order ${orderId} to ${status}`);
    
    // Update local state for demo
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status, updated_at: new Date().toISOString() } : order
    ));
    
    toast.success(`Order ${orderId} has been ${status}`);
  };
  
  return (
    <MainLayout user={user}>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Manage Orders</h1>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {activeTab === "all" ? "All Orders" : 
                   `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Orders`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredOrders.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No {activeTab === "all" ? "" : activeTab} orders found
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
                          <th className="text-left py-3 px-4">Delivery Address</th>
                          <th className="text-right py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((order) => (
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
                            <td className="py-3 px-4 text-sm">{order.delivery_address}</td>
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
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Orders;
