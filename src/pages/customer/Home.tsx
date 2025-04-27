
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";
import CatererCard from "@/components/customer/CatererCard";
import { User, CatererProfile } from "@/types";
import SupaBase from "@/lib/zustand";

// Mock user data - will be replaced with Supabase integration
const mockUser: User = {
  id: "cust123",
  email: "customer@example.com",
  role: "customer",
  created_at: new Date().toISOString(),
};

// Mock caterer data - will be replaced with Supabase data
const mockCaterers: CatererProfile[] = [
  {
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
  },
  {
    id: "c2",
    user_id: "u2",
    name: "Healthy Harvest",
    location: "Cambridge",
    description: "Fresh, healthy meals made with locally-sourced ingredients",
    avg_price: 28.75,
    is_complete: true,
    image_url: "https://images.unsplash.com/photo-1547592180-85f173990554",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "c3",
    user_id: "u3",
    name: "Spice Route",
    location: "Somerville",
    description: "Authentic global cuisine with bold flavors",
    avg_price: 32.00,
    is_complete: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const Home = () => {
  const navigate = useNavigate();
  const [user] = useState<User>(mockUser);
  const [caterers, setCaterers] = useState<CatererProfile[]>(mockCaterers);
  const [searchTerm, setSearchTerm] = useState("");
  const supa = SupaBase((state)=>state.supaObj);

  
  const filteredCaterers = searchTerm
    ? caterers.filter(caterer => 
        caterer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caterer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caterer.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : caterers;
  
  return (
    <MainLayout user={user}>
      <div className="space-y-8">
        {/* Hero section */}
        <div className="bg-foodie-light rounded-xl p-8">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold mb-4 text-foodie-brown">Find Your Perfect Caterer</h1>
            <p className="text-lg mb-6">
              Browse through our selection of quality caterers and curate your perfect meal.
            </p>
            
            <div className="flex gap-4">
              <Input
                placeholder="Search by name, location, or cuisine..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
              
              <Button variant="default" onClick={() => setSearchTerm("")}>
                Search
              </Button>
            </div>
          </div>
        </div>
        
        {/* Caterer listings */}
        <div>
          <h2 className="section-title">Available Caterers</h2>
          
          {filteredCaterers.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  No caterers found matching your search criteria.
                </p>
                {searchTerm && (
                  <Button 
                    variant="link" 
                    onClick={() => setSearchTerm("")}
                    className="mt-2"
                  >
                    Clear search
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredCaterers.map((caterer) => (
                <CatererCard key={caterer.id} caterer={caterer} />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
