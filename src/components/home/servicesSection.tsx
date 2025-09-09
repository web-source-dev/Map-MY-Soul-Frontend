import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";
import { useState, useEffect } from "react";
import { catalogApi } from "@/lib/api";

interface ServiceItem {
    _id: string;
    name: string;
    description?: string;
    price?: number;
    image?: string;
  }

export default function ServicesSection() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const [servicesRes] = await Promise.all([
          catalogApi.getServices().catch(() => ({ services: [] })),
        ]);
        if (!isMounted) return;
        setServices((servicesRes as { services: ServiceItem[] }).services || []);
      } catch (e) {
        console.error('Error fetching data:', e);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, []);
  return (
    <section className="py-12 bg-muted/30">
    <div className="max-w-7xl mx-auto container-padding">
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Heart className="w-4 h-4" />
          <span>Trusted Healers</span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
          Transform Your Life in 20 Minutes
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Connect with verified spiritual guides for personalized healing sessions via Zoom.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {(services && services.length > 0 ? services : []).slice(0, 3).map((service, index) => (
          <div key={index} className="hover-scale">
            <ServiceCard
              serviceId={service._id}
              name={service.name}
              price={service.price ?? 0}
              image={service.image || ""}
              description={service.description}
            />
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <Button 
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200"
        >
          View All Services
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  </section>
  );
}