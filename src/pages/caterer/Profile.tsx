
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/layout/MainLayout";
import CatererProfile from "@/components/caterer/CatererProfile";
import MenuManager from "@/components/caterer/MenuManager";
import { User, CatererProfile as CatererProfileType, MenuItem } from "@/types";
import { toast } from "sonner";

// Mock user data - will be replaced with Supabase integration
const mockUser: User = {
  id: "c123",
  email: "caterer@example.com",
  role: "caterer",
  created_at: new Date().toISOString(),
};

// Mock caterer profile data - will be replaced with Supabase data
const mockProfile: CatererProfileType = {
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

// Mock menu items - will be replaced with Supabase data
const mockMenuItems: MenuItem[] = [
  {
    id: "m1",
    caterer_id: "cp123",
    name: "Continental Breakfast",
    description: "Assortment of pastries, fresh fruit, and coffee",
    price: 18.50,
    meal_type: "breakfast",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "m2",
    caterer_id: "cp123",
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with classic Caesar dressing",
    price: 12.00,
    meal_type: "lunch",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "m3",
    caterer_id: "cp123",
    name: "Beef Tenderloin",
    description: "Grass-fed beef with red wine sauce",
    price: 38.00,
    meal_type: "dinner",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const Profile = () => {
  const navigate = useNavigate();
  const [user] = useState<User>(mockUser);
  const [profile, setProfile] = useState<CatererProfileType | null>(mockProfile);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);
  const [activeTab, setActiveTab] = useState("profile");
  
  const handleAddMenuItem = (item: Omit<MenuItem, "id" | "caterer_id" | "created_at" | "updated_at">) => {
    // This will be implemented with Supabase
    console.log("Adding menu item:", item);
    
    // Update local state for demo
    const newItem: MenuItem = {
      id: `m${Date.now()}`,
      caterer_id: profile?.id || "",
      ...item,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    setMenuItems([...menuItems, newItem]);
  };
  
  const handleUpdateMenuItem = (id: string, itemData: Partial<MenuItem>) => {
    // This will be implemented with Supabase
    console.log("Updating menu item:", id, itemData);
    
    // Update local state for demo
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, ...itemData, updated_at: new Date().toISOString() } : item
    ));
  };
  
  const handleDeleteMenuItem = (id: string) => {
    // This will be implemented with Supabase
    console.log("Deleting menu item:", id);
    
    // Update local state for demo
    setMenuItems(menuItems.filter(item => item.id !== id));
  };
  
  return (
    <MainLayout user={user}>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Manage Profile & Menu</h1>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile Details</TabsTrigger>
            <TabsTrigger value="menu">Menu Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
            <CatererProfile profile={profile || undefined} />
          </TabsContent>
          
          <TabsContent value="menu" className="mt-6">
            <MenuManager 
              items={menuItems}
              onAddItem={handleAddMenuItem}
              onUpdateItem={handleUpdateMenuItem}
              onDeleteItem={handleDeleteMenuItem}
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Profile;
