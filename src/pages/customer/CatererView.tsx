
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import CatererDetail from "@/components/customer/CatererDetail";
import { User, CatererProfile, MenuItem, CuratedItem } from "@/types";
import { toast } from "sonner";

// Mock user data - will be replaced with Supabase integration
const mockUser: User = {
  id: "cust123",
  email: "customer@example.com",
  role: "customer",
  created_at: new Date().toISOString(),
};

// Mock caterer profile data - will be replaced with Supabase data
const mockCaterer: CatererProfile = {
  id: "c1",
  user_id: "u1",
  name: "Gourmet Delights",
  location: "Downtown Boston",
  description: "Specializing in gourmet catering for all occasions",
  avg_price: 35.50,
  is_complete: true,
  image_url: "https://images.unsplash.com/photo-1555244162-803834f70033",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

// Mock menu items - will be replaced with Supabase data
const mockMenuItems: MenuItem[] = [
  {
    id: "m1",
    caterer_id: "c1",
    name: "Continental Breakfast",
    description: "Assortment of pastries, fresh fruit, and coffee",
    price: 18.50,
    meal_type: "breakfast",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "m2",
    caterer_id: "c1",
    name: "Eggs Benedict",
    description: "Poached eggs with hollandaise sauce on English muffins",
    price: 15.00,
    meal_type: "breakfast",
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
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "m4",
    caterer_id: "c1",
    name: "Grilled Chicken Sandwich",
    description: "Grilled chicken with avocado, bacon, and aioli",
    price: 14.50,
    meal_type: "lunch",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "m5",
    caterer_id: "c1",
    name: "Beef Tenderloin",
    description: "Grass-fed beef with red wine sauce",
    price: 38.00,
    meal_type: "dinner",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "m6",
    caterer_id: "c1",
    name: "Grilled Salmon",
    description: "Fresh salmon with lemon butter sauce",
    price: 32.00,
    meal_type: "dinner",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const CatererView = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [user] = useState<User>(mockUser);
  const [caterer, setCaterer] = useState<CatererProfile | null>(mockCaterer);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);
  const [curatedItems, setCuratedItems] = useState<CuratedItem[]>([]);
  
  useEffect(() => {
    // This will be implemented with Supabase to fetch caterer and menu data
    console.log(`Fetching data for caterer ${id}`);
  }, [id]);
  
  const handleAddToCuration = (item: MenuItem) => {
    // Add the item to the curated list
    setCuratedItems([
      ...curatedItems,
      { ...item, quantity: 1 }
    ]);
  };
  
  const handleRemoveFromCuration = (itemId: string) => {
    // Remove the item from the curated list
    setCuratedItems(curatedItems.filter(item => item.id !== itemId));
  };
  
  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    // Update the quantity of the item in the curated list
    setCuratedItems(curatedItems.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    ));
  };
  
  const handleProceedToCheckout = () => {
    if (curatedItems.length === 0) {
      toast.error("Please add some items to your meal first");
      return;
    }
    
    // Store curated items in session storage for checkout
    sessionStorage.setItem("curatedItems", JSON.stringify(curatedItems));
    sessionStorage.setItem("caterer", JSON.stringify(caterer));
    
    // Navigate to checkout
    navigate("/customer/checkout");
  };
  
  if (!caterer) {
    return (
      <MainLayout user={user}>
        <div className="text-center py-12">
          <p>Loading caterer information...</p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout user={user}>
      <div className="space-y-8">
        <CatererDetail 
          caterer={caterer}
          menuItems={menuItems}
          curatedItems={curatedItems}
          onAddToCuration={handleAddToCuration}
          onRemoveFromCuration={handleRemoveFromCuration}
          onUpdateQuantity={handleUpdateQuantity}
          onProceedToCheckout={handleProceedToCheckout}
        />
      </div>
    </MainLayout>
  );
};

export default CatererView;
