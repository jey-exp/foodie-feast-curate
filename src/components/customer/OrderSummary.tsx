
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CuratedItem } from "@/types";

interface OrderSummaryProps {
  items: CuratedItem[];
  catererName?: string;
}

const OrderSummary = ({ items, catererName }: OrderSummaryProps) => {
  const [totalAmount, setTotalAmount] = useState(0);
  
  useEffect(() => {
    // Calculate total amount
    const total = items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    setTotalAmount(total);
  }, [items]);
  
  const groupItemsByMealType = () => {
    const grouped = {
      breakfast: items.filter(item => item.meal_type === "breakfast"),
      lunch: items.filter(item => item.meal_type === "lunch"),
      dinner: items.filter(item => item.meal_type === "dinner"),
    };
    
    return grouped;
  };
  
  const groupedItems = groupItemsByMealType();
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        
        {catererName && (
          <p className="text-sm text-muted-foreground mb-4">
            Caterer: {catererName}
          </p>
        )}
        
        {items.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No items in your order</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedItems).map(([mealType, mealItems]) => 
              mealItems.length > 0 && (
                <div key={mealType} className="space-y-3">
                  <h3 className="font-semibold capitalize">{mealType}</h3>
                  
                  {mealItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-muted-foreground">
                          ${item.price.toFixed(2)} × {item.quantity}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
            
            <div className="pt-4 border-t">
              <div className="flex justify-between font-semibold text-lg">
                <div>Total</div>
                <div>${totalAmount.toFixed(2)}</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
