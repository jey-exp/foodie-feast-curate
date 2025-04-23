
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <MainLayout>
      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <div className="relative py-16 md:py-24 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foodie-brown">
              Curate Your Perfect Meal Experience
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-muted-foreground">
              Connect with local caterers and craft the perfect meal for your occasion. 
              Mix and match dishes to create a truly personalized dining experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="text-lg py-6 px-8 animated-button"
                onClick={() => navigate("/auth/register?role=customer")}
              >
                Find Caterers
              </Button>
              <Button 
                variant="outline" 
                className="text-lg py-6 px-8 animated-button"
                onClick={() => navigate("/auth/register?role=caterer")}
              >
                Register as Caterer
              </Button>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="bg-foodie-light py-16">
          <div className="container max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-foodie-brown">
              How It Works
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-4xl font-bold text-primary mb-4">01</div>
                <h3 className="text-xl font-semibold mb-3">Browse Caterers</h3>
                <p className="text-muted-foreground">
                  Explore our curated selection of quality local caterers, each with
                  their own specialties and signature dishes.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-4xl font-bold text-primary mb-4">02</div>
                <h3 className="text-xl font-semibold mb-3">Create Your Meal</h3>
                <p className="text-muted-foreground">
                  Pick and choose your favorite dishes from any caterer's menu to build
                  the perfect meal for your occasion.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-4xl font-bold text-primary mb-4">03</div>
                <h3 className="text-xl font-semibold mb-3">Place Your Order</h3>
                <p className="text-muted-foreground">
                  Submit your curated meal selection and the caterer will prepare everything
                  fresh to your specifications.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Caterer CTA Section */}
        <div className="py-16 bg-foodie-cream">
          <div className="container max-w-5xl mx-auto px-4">
            <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4 text-foodie-brown">
                  Are You a Caterer?
                </h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
                  Join our platform to showcase your culinary creations and connect with
                  customers looking for quality catering services.
                </p>
                <Button
                  className="text-lg py-6 px-8 animated-button"
                  onClick={() => navigate("/auth/register?role=caterer")}
                >
                  Register Your Business
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
