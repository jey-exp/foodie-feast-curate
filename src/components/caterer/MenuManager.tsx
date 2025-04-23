
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { MenuItem, MealType } from "@/types";

interface MenuManagerProps {
  items: MenuItem[];
  onAddItem?: (item: Omit<MenuItem, "id" | "caterer_id" | "created_at" | "updated_at">) => void;
  onUpdateItem?: (id: string, item: Partial<MenuItem>) => void;
  onDeleteItem?: (id: string) => void;
}

const MenuManager = ({ 
  items = [], 
  onAddItem, 
  onUpdateItem, 
  onDeleteItem 
}: MenuManagerProps) => {
  const [activeTab, setActiveTab] = useState<MealType>("breakfast");
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    meal_type: "breakfast" as MealType,
    image_url: "",
  });
  
  const mealTypeItems = items.filter((item) => item.meal_type === activeTab);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };
  
  const handleMealTypeChange = (value: MealType) => {
    setNewItem({ ...newItem, meal_type: value });
  };
  
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate price as a number
    const price = parseFloat(newItem.price);
    if (isNaN(price) || price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }
    
    try {
      if (onAddItem) {
        onAddItem({
          ...newItem,
          price: parseFloat(newItem.price)
        });
      }
      
      // Reset form
      setNewItem({
        name: "",
        description: "",
        price: "",
        meal_type: activeTab,
        image_url: "",
      });
      
      toast.success("Menu item added successfully!");
    } catch (error) {
      console.error("Error adding menu item:", error);
      toast.error("Failed to add menu item. Please try again.");
    }
  };
  
  const handleDeleteItem = (id: string) => {
    if (confirm("Are you sure you want to delete this menu item?")) {
      try {
        if (onDeleteItem) {
          onDeleteItem(id);
        }
        toast.success("Menu item deleted successfully!");
      } catch (error) {
        console.error("Error deleting menu item:", error);
        toast.error("Failed to delete menu item. Please try again.");
      }
    }
  };
  
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Menu Management</h2>
      
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-medium mb-4">Add New Menu Item</h3>
        
        <form onSubmit={handleAddItem} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                name="name"
                value={newItem.name}
                onChange={handleInputChange}
                placeholder="Dish name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={newItem.price}
                onChange={handleInputChange}
                placeholder="0.00"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="meal_type">Meal Type</Label>
            <Select 
              value={newItem.meal_type} 
              onValueChange={(value) => handleMealTypeChange(value as MealType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select meal type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={newItem.description}
              onChange={handleInputChange}
              placeholder="Describe your dish"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              name="image_url"
              value={newItem.image_url}
              onChange={handleInputChange}
              placeholder="URL to dish image"
            />
          </div>
          
          <div className="pt-2">
            <Button type="submit">Add Menu Item</Button>
          </div>
        </form>
      </div>
      
      <div className="bg-white rounded-lg border">
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
              {mealTypeItems.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No {mealType} items added yet. Add some above!
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mealTypeItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold">{item.name}</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {item.description}
                              </p>
                            </div>
                            <div className="font-medium">${item.price.toFixed(2)}</div>
                          </div>
                          
                          <div className="flex justify-end mt-4">
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              Delete
                            </Button>
                          </div>
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
  );
};

export default MenuManager;
