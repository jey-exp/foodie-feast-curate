
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { CatererProfile as CatererProfileType } from "@/types";

interface CatererProfileProps {
  profile?: CatererProfileType;
}

const CatererProfile = ({ profile }: CatererProfileProps) => {
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    location: profile?.location || "",
    description: profile?.description || "",
    image_url: profile?.image_url || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // This will be implemented with Supabase
      console.log("Saving profile:", formData);
      toast.success("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile. Please try again.");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Caterer Profile</CardTitle>
        <CardDescription>
          Complete your profile to start receiving orders from customers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Business Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your catering business name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Your service area (e.g., Downtown Boston)"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell customers about your catering business and specialties"
              rows={4}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image_url">Profile Image URL</Label>
            <Input
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="URL to your business logo or image"
            />
          </div>
          
          <div className="pt-4">
            <Button type="submit" className="w-full">Save Profile</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CatererProfile;
