"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ServiceCardProps {
  name: string;
  price: number;
  duration?: number;
  rating?: number;
  image: string;
  description?: string;
  serviceId?: string;
  onBook?: () => void;
  reviewCount?: number;
}

const ServiceCard = ({ name, price, duration, rating, image, description, serviceId, onBook, reviewCount }: ServiceCardProps) => {
  const router = useRouter();

  const handleBookClick = () => {
    if (onBook) {
      onBook();
    } else if (serviceId) {
      router.push(`/book/${serviceId}`);
    }
  };
  return (
    <Card className="modern-card group hover-lift">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-2xl">
          <Image 
            src={image} 
            alt={name}
            width={600}
            height={400}
            className="w-full h-40 object-cover transition-transform duration-200 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          
          {/* Rating */}
          {rating && (
            <div className="absolute top-3 left-3 flex items-center space-x-1 bg-background/90 backdrop-blur-sm rounded-lg px-2 py-1">
              <Star className="w-3 h-3 text-golden-warm fill-current" />
              <span className="text-xs font-medium">{rating}</span>
            </div>
          )}
        </div>
        
        <div className="p-5">
          <h3 className="text-xl font-bold text-foreground mb-2">{name}</h3>
          
          {description && (
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
          )}
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              {duration && (
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{duration}</span>
                </div>
              )}
            </div>
            <span className="text-2xl font-bold text-primary">${price}</span>
          </div>
          
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-all duration-200"
            onClick={handleBookClick}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;