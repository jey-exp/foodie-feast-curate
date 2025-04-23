
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CuratedItem } from "@/types";

interface FoodCurationListProps {
  items: CuratedItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

const FoodCurationList = ({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem 
}: FoodCurationListProps) => {
  const [totalAmount, setTotalAmount] = useState(0);
  
  useEffect(() => {
    // Calculate total amount
    const total = items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    setTotalAmount(total);
  }, [items]);
  
  const handleQuantityChange = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      onRemoveItem(itemId);
    } else {
      onUpdateQuantity(itemId, quantity);
    }
  };
  
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
        <h2 className="text-xl font-semibold mb-4">Your Curated Meal</h2>
        
        {items.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Your curated meal is empty</p>
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
                        <div className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)} each
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className="w-5 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                        
                        <div className="text-right min-w-[60px]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
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

export default FoodCurationList;
