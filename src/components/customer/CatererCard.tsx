
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CatererProfile } from "@/types";

interface CatererCardProps {
  caterer: CatererProfile;
}

const CatererCard = ({ caterer }: CatererCardProps) => {
  const navigate = useNavigate();
  
  const handleViewCaterer = () => {
    navigate(`/customer/caterer/${caterer.id}`);
  };
  
  return (
    <Card className="caterer-card h-full">
      <div className="aspect-video w-full bg-muted overflow-hidden">
        {caterer.image_url ? (
          <img 
            src={caterer.image_url} 
            alt={caterer.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary text-secondary-foreground">
            <span>{caterer.name.charAt(0)}</span>
          </div>
        )}
      </div>
      
      <CardContent className="p-5">
        <h3 className="text-xl font-semibold">{caterer.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{caterer.location}</p>
        
        <div className="mt-3 mb-4">
          <p className="line-clamp-2 text-sm h-10">
            {caterer.description}
          </p>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm font-medium">Avg. price: </span>
            <span className="font-semibold text-primary">${caterer.avg_price?.toFixed(2) || "N/A"}</span>
          </div>
          
          <Button 
            variant="default" 
            size="sm" 
            onClick={handleViewCaterer}
            className="animated-button"
          >
            View Menu
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CatererCard;
