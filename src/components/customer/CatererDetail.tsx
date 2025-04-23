
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CatererProfile, MenuItem, MealType, CuratedItem } from "@/types";
import { toast } from "sonner";

interface CatererDetailProps {
  caterer: CatererProfile;
  menuItems: MenuItem[];
  curatedItems: CuratedItem[];
  onAddToCuration: (item: MenuItem) => void;
  onRemoveFromCuration: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onProceedToCheckout: () => void;
}

const CatererDetail = ({
  caterer,
  menuItems,
  curatedItems,
  onAddToCuration,
  onRemoveFromCuration,
  onUpdateQuantity,
  onProceedToCheckout,
}: CatererDetailProps) => {
  const [activeTab, setActiveTab] = useState<MealType>("breakfast");
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Calculate total amount
    const total = curatedItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    setTotalAmount(total);
  }, [curatedItems]);

  const filterItemsByMealType = (type: MealType) => {
    return menuItems.filter((item) => item.meal_type === type);
  };

  const isItemInCuration = (itemId: string) => {
    return curatedItems.some((item) => item.id === itemId);
  };

  const getItemQuantity = (itemId: string) => {
    const item = curatedItems.find((item) => item.id === itemId);
    return item ? item.quantity : 0;
  };

  const handleAddItem = (item: MenuItem) => {
    if (isItemInCuration(item.id)) {
      const currentQty = getItemQuantity(item.id);
      onUpdateQuantity(item.id, currentQty + 1);
    } else {
      onAddToCuration(item);
    }
    toast.success(`${item.name} added to your curated meal!`);
  };

  const handleRemoveItem = (itemId: string) => {
    onRemoveFromCuration(itemId);
  };

  const handleQuantityChange = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      onRemoveFromCuration(itemId);
    } else {
      onUpdateQuantity(itemId, quantity);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <div className="bg-white rounded-lg overflow-hidden border">
          <div className="aspect-video w-full bg-muted overflow-hidden">
            {caterer.image_url ? (
              <img
                src={caterer.image_url}
                alt={caterer.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-secondary">
                <span className="text-4xl font-bold">{caterer.name.charAt(0)}</span>
              </div>
            )}
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold">{caterer.name}</h1>
            <p className="text-muted-foreground mt-1">{caterer.location}</p>
            <p className="mt-4">{caterer.description}</p>
            <p className="mt-2">
              <span className="font-medium">Average price:</span>{" "}
              <span className="text-primary font-semibold">${caterer.avg_price?.toFixed(2) || "N/A"}</span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg border overflow-hidden">
          <Tabs
            defaultValue="breakfast"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as MealType)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
              <TabsTrigger value="lunch">Lunch</TabsTrigger>
              <TabsTrigger value="dinner">Dinner</TabsTrigger>
            </TabsList>

            {["breakfast", "lunch", "dinner"].map((mealType) => (
              <TabsContent key={mealType} value={mealType} className="p-4">
                <h2 className="text-xl font-semibold mb-4 capitalize">{mealType} Menu</h2>
                {filterItemsByMealType(mealType as MealType).length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No {mealType} items available
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filterItemsByMealType(mealType as MealType).map((item) => (
                      <Card key={item.id} className="overflow-hidden food-item-card">
                        <CardContent className="p-0 h-full flex flex-col">
                          <div className="p-4 flex-grow">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold">{item.name}</h4>
                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                  {item.description}
                                </p>
                              </div>
                              <div className="font-medium">${item.price.toFixed(2)}</div>
                            </div>
                          </div>

                          <div className="p-4 pt-0 mt-auto">
                            {!isItemInCuration(item.id) ? (
                              <Button
                                className="w-full animated-button"
                                onClick={() => handleAddItem(item)}
                              >
                                Add to Meal
                              </Button>
                            ) : (
                              <div className="flex justify-between items-center">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleQuantityChange(item.id, getItemQuantity(item.id) - 1)}
                                >
                                  -
                                </Button>
                                <span>{getItemQuantity(item.id)}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleQuantityChange(item.id, getItemQuantity(item.id) + 1)}
                                >
                                  +
                                </Button>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      <div className="md:col-span-1">
        <div className="sticky top-24">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Your Curated Meal</h2>
              
              {curatedItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Your curated meal is empty</p>
                  <p className="text-sm mt-2">Add items from the menu to create your perfect meal!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {curatedItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.quantity} × ${item.price.toFixed(2)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div>${(item.price * item.quantity).toFixed(2)}</div>
                        <button 
                          className="text-xs text-destructive hover:underline mt-1"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-semibold">
                      <div>Total</div>
                      <div>${totalAmount.toFixed(2)}</div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full animated-button" 
                    disabled={curatedItems.length === 0}
                    onClick={onProceedToCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CatererDetail;
