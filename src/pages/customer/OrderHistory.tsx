
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";
import OrderSummary from "@/components/customer/OrderSummary";
import { User, Order, CuratedItem, CatererProfile } from "@/types";

// Mock user data - will be replaced with Supabase integration
const mockUser: User = {
  id: "cust123",
  email: "customer@example.com",
  role: "customer",
  created_at: new Date().toISOString(),
};

// Mock orders data - will be replaced with Supabase data
const mockOrders = [
  {
    id: "o1",
    caterer: {
      id: "c1",
      user_id: "u1",
      name: "Gourmet Delights",
      location: "Downtown Boston",
      description: "Specializing in gourmet catering for all occasions",
      avg_price: 35.50,
      is_complete: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    items: [
      {
        id: "m1",
        caterer_id: "c1",
        name: "Continental Breakfast",
        description: "Assortment of pastries, fresh fruit, and coffee",
        price: 18.50,
        meal_type: "breakfast",
        quantity: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: "m3",
        caterer_id: "c1",
        name: "Caesar Salad",
        description: "Fresh romaine lettuce with classic Caesar dressing",
        price: 12.00,
        meal_type: "lunch",
        quantity: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ],
    status: "confirmed",
    total_amount: 49.00,
    created_at: new Date().toISOString(),
  },
  {
    id: "o2",
    caterer: {
      id: "c2",
      user_id: "u2",
      name: "Healthy Harvest",
      location: "Cambridge",
      description: "Fresh, healthy meals made with locally-sourced ingredients",
      avg_price: 28.75,
      is_complete: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    items: [
      {
        id: "m5",
        caterer_id: "c2",
        name: "Grilled Vegetable Platter",
        description: "Seasonal vegetables, grilled to perfection",
        price: 22.00,
        meal_type: "dinner",
        quantity: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ],
    status: "completed",
    total_amount: 22.00,
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  }
];

const OrderHistory = () => {
  const [user] = useState<User>(mockUser);
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);
  
  return (
    <MainLayout user={user}>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Your Order History</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Past Orders</CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    You haven't placed any orders yet
                  </p>
                ) : (
                  <div className="space-y-2">
                    {orders.map((order) => (
                      <div 
                        key={order.id} 
                        className={`border p-4 rounded-md cursor-pointer transition-colors ${
                          selectedOrder?.id === order.id ? "bg-secondary border-primary" : ""
                        }`}
                        onClick={() => setSelectedOrder(order)}
                      >
                        <div className="flex justify-between mb-2">
                          <div className="font-medium">{order.caterer.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <div className="flex justify-between">
                          <div className="text-sm">{order.items.length} items</div>
                          <div className="font-medium">${order.total_amount.toFixed(2)}</div>
                        </div>
                        
                        <div className="mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                            order.status === "confirmed" ? "bg-blue-100 text-blue-800" :
                            order.status === "completed" ? "bg-green-100 text-green-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            {selectedOrder ? (
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-semibold">Order Details</h2>
                        <p className="text-muted-foreground text-sm">
                          {new Date(selectedOrder.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedOrder.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                        selectedOrder.status === "confirmed" ? "bg-blue-100 text-blue-800" :
                        selectedOrder.status === "completed" ? "bg-green-100 text-green-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="border-b pb-4 mb-4">
                      <h3 className="font-medium">Caterer</h3>
                      <div className="flex items-center space-x-3 mt-2">
                        <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                          <span>{selectedOrder.caterer.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-medium">{selectedOrder.caterer.name}</div>
                          <div className="text-sm text-muted-foreground">{selectedOrder.caterer.location}</div>
                        </div>
                      </div>
                    </div>
                    
                    <OrderSummary
                      items={selectedOrder.items}
                      catererName={selectedOrder.caterer.name}
                    />
                  </CardContent>
                </Card>
                
                {selectedOrder.status === "pending" && (
                  <div className="text-right">
                    <Button variant="destructive">
                      Cancel Order
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">
                    Select an order to view details
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderHistory;
