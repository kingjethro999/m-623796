import React from "react";
import { Star, Users, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export interface ApartmentProps {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  size: number;
  image: string;
  location: string;
  features: string[];
}
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/AuthModal";

export default function ApartmentCard({ apartment }: { apartment: ApartmentProps }) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleBookNow = () => {
    if (!user) {
      setAuthModalOpen(true);
    } else {
      // Redirect to booking page with apartment data
      window.location.href = `/booking?apartment=${apartment.id}`;
    }
  };

  return (
    <>
      <div className="glass-card overflow-hidden group hover:shadow-xl transition-all duration-300 animate-fade-in">
        <div className="relative overflow-hidden">
          <img
            src={apartment.image}
            alt={apartment.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4">
            <span className="bg-white/90 dark:bg-background/90 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
              €{apartment.price}/{t.apartmentCard.night}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
              {apartment.name}
            </h3>
            <div className="flex items-center space-x-1 text-amber-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">4.8</span>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {apartment.description}
          </p>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{apartment.capacity} {t.apartmentCard.guests}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Home className="h-4 w-4" />
                <span>{apartment.size}m²</span>
              </div>
            </div>
            <div className="text-xs bg-muted px-2 py-1 rounded">
              {apartment.location}
            </div>
          </div>
          
          {apartment.features && (
            <div className="flex flex-wrap gap-2 mb-4">
              {apartment.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                >
                  {feature}
                </span>
              ))}
              {apartment.features.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{apartment.features.length - 3} {t.apartmentCard.more}
                </span>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <button className="text-primary hover:text-primary/80 font-medium transition-colors">
              {t.apartmentCard.viewDetails}
            </button>
            <Button onClick={handleBookNow} className="btn-primary">
              {t.apartmentCard.bookNow}
            </Button>
          </div>
        </div>
      </div>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  );
}
