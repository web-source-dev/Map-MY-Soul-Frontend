"use client";
import Layout from "@/components/Layout";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Calendar, Star, Clock, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { catalogApi } from "@/lib/api";

const Services = () => {
  interface ServiceItem {
    _id?: string;
    name: string;
    description?: string;
    price?: number;
    serviceType?: string;
    serviceProviderName?: string;
    serviceProviderEmail?: string;
    uniqueId?: string;
    createdAt?: string;
    updatedAt?: string;
    image?: string;
  }

  const [services, setServices] = useState<ServiceItem[]>([]);


  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await catalogApi.getServices();
        // Handle the response structure from backend
        if (response && (response as { services: ServiceItem[] }).services) {
          setServices((response as { services: ServiceItem[] }).services);
        } else if (Array.isArray(response)) {
          setServices(response as ServiceItem[]);
        } else {
          console.error('Unexpected services response format:', response);
          setServices([]);
        }
      } catch (error) {
        console.error('Failed to fetch services:', error);
        setServices([]);
      }
    };
    fetchServices();
  }, []);

  const stats = [
    { number: "100+", label: "Healing Sessions", icon: Calendar },
    { number: "4.9/5", label: "Average Rating", icon: Star },
    { number: "20min", label: "Daily Practice", icon: Clock },
    { number: "10K+", label: "Souls Transformed", icon: Users },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-[image:url('/assets/1.png')] bg-cover bg-center min-h-screen">
        <div className="max-w-7xl mx-auto container-padding text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-primary-indigo/10 text-primary-indigo-indigo px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              <span>Healing Services</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Transform Your Life in 20 Minutes
            </h1>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
              Connect with trusted healers through personalized video sessions designed 
              to support your spiritual growth and emotional well-being.
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-primary-indigo" />
                </div>
                <div className="text-xl font-bold text-foreground mb-1">{stat.number}</div>
                <div className="text-xs text-foreground/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-foreground/5">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              100+ of the world&apos;s top healing programs
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Choose from our curated collection of transformative healing sessions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <div key={index} className="hover-scale">
                <ServiceCard
                  serviceId={service._id}
                  name={service.name || ""}
                  price={service.price || 0}
                  image={service.image || ""}
                  description={service.description || ""}
                />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              size="lg"
              variant="outline"
            >
              View All Services
              <Calendar className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              How It Works
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Your journey to transformation in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-primary-indigo rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-indigo">1</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Take the Quiz</h3>
              <p className="text-foreground/60">
                Answer a few questions to discover your perfect healing path and get matched with your ideal guide.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-primary-indigo rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-indigo">2</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Book Your Session</h3>
              <p className="text-foreground/60">
                Schedule your personalized healing session with a trusted spiritual guide via Zoom.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-primary-indigo rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-indigo">3</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Transform & Grow</h3>
              <p className="text-foreground/60">
                Experience profound healing and spiritual growth with ongoing support and guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[image:url('/assets/1.png')] bg-cover bg-center">
        <div className="max-w-4xl mx-auto text-center container-padding">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Not Sure Which Service is Right for You?
          </h2>
          <p className="text-lg text-foreground/60 mb-8">
            Take our personalized quiz to get matched with the perfect healing service
          </p>
          <Button size="lg" variant="outline">
            Take the Soul Path Quiz
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Services;