"use client";

import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function TestimonialSection() {

    const testimonials = [
        {
          name: "Traci Williams",
          text: "MapMySoul provided me with the perfect healer to give me guidance that has truly changed my spiritual path towards positivity and growth.",
          rating: 5,
          service: "Spiritual Guidance",
          location: "Los Angeles, CA",
          image: "data:image/jpeg;base64,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",
          date: "2 weeks ago"
        },
        {
          name: "Andy Chen", 
          text: "The crystals are personally blessed by the company owner with healing mantra and cleansed in sacred waters. Each crystal has so much character.",
          rating: 5,
          service: "Sacred Crystals",
          location: "San Francisco, CA",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
          date: "1 month ago"
        },
        {
          name: "Sarah Mitchell",
          text: "The human design reading was incredibly accurate and helped me understand my energy type. I finally know why certain situations drain me while others energize me.",
          rating: 5,
          service: "Human Design Reading",
          location: "Austin, TX",
          image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
          date: "3 weeks ago"
        },
        {
          name: "Michael Rodriguez",
          text: "After taking the quiz, I discovered services I never knew existed. The personalized recommendations led me to a life-changing astrology session.",
          rating: 5,
          service: "Personalized Quiz",
          location: "Miami, FL",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
          date: "1 week ago"
        },
        {
          name: "Luna Kowalski",
          text: "The meditation sessions and spiritual products have transformed my daily practice. I feel more centered and connected to my higher self than ever before.",
          rating: 5,
          service: "Meditation & Products",
          location: "Portland, OR",
          image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
          date: "2 months ago"
        },
        {
          name: "David Thompson",
          text: "The booking process was seamless, and my practitioner was incredibly knowledgeable. The session provided clarity I've been seeking for years.",
          rating: 5,
          service: "Spiritual Consultation",
          location: "Denver, CO",
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
          date: "3 weeks ago"
        },
        {
          name: "Emma Taylor",
          text: "I love how each product comes with a story and blessing. You can truly feel the positive energy and intention behind every item.",
          rating: 5,
          service: "Blessed Products",
          location: "Seattle, WA",
          image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
          date: "1 month ago"
        },
        {
          name: "James Wilson",
          text: "The podcast recommendations were spot-on! I've learned so much about manifestation and spiritual growth through the curated content.",
          rating: 5,
          service: "Podcast Curation",
          location: "New York, NY",
          image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
          date: "2 weeks ago"
        }
      ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);

    // Auto-scroll functionality
    useEffect(() => {
      if (!isAutoScrolling) return;

      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000); // Change testimonial every 4 seconds

      return () => clearInterval(interval);
    }, [isAutoScrolling, testimonials.length]);

    const goToPrevious = () => {
      setIsAutoScrolling(false);
      setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
      // Resume auto-scroll after 10 seconds of manual control
      setTimeout(() => setIsAutoScrolling(true), 10000);
    };

    const goToNext = () => {
      setIsAutoScrolling(false);
      setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
      // Resume auto-scroll after 10 seconds of manual control
      setTimeout(() => setIsAutoScrolling(true), 10000);
    };

    const goToSlide = (index: number) => {
      setIsAutoScrolling(false);
      setCurrentIndex(index);
      // Resume auto-scroll after 10 seconds of manual control
      setTimeout(() => setIsAutoScrolling(true), 10000);
    };

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 via-background to-muted/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,183,77,0.1),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto container-padding relative z-10">
      <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-current" />
            <span>Trusted by 10,000+ Souls</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Transformative Stories
        </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real experiences from our community members who found their path to spiritual growth and healing.
        </p>
      </div>
      
        {/* Testimonial Carousel */}
        <div className="relative max-w-6xl mx-auto">
        

          {/* Testimonial Display */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
        {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 border border-primary rounded-3xl backdrop-blur-sm p-8">
                      <div className="grid md:grid-cols-3 gap-8 items-center">
                        {/* Profile Section */}
                        <div className="text-center md:text-left">
                          <div className="relative w-24 h-24 mx-auto md:mx-0 mb-4">
                            <Image
                              src={testimonial.image}
                              alt={testimonial.name}
                              fill
                              className="rounded-full object-cover border-4 border-primary/20"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-1">
                              <Star className="w-4 h-4 text-background fill-current" />
                            </div>
                          </div>
                          <h4 className="font-bold text-lg text-foreground mb-1">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {testimonial.location}
                          </p>
                          <div className="inline-flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                            {testimonial.service}
                          </div>
                        </div>

                        {/* Testimonial Content */}
                        <div className="md:col-span-2">
                          {/* Star Rating */}
                          <div className="flex justify-center md:justify-start mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-golden-warm fill-current" />
              ))}
            </div>
                          
                          {/* Quote */}
                          <blockquote className="text-lg md:text-xl text-foreground mb-6 leading-relaxed font-medium">
              &quot;{testimonial.text}&quot;
            </blockquote>
                          
                          {/* Meta Info */}
                          <div className="flex items-center justify-center md:justify-start space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              Verified Review
                            </span>
                            <span>{testimonial.date}</span>
                          </div>
                        </div>
                      </div>
          </div>
        ))}
            </div>
          </div>

          {/* Enhanced Pagination with Navigation */}
          <div className="flex justify-center items-center space-x-6 mt-12">
            {/* Left Arrow */}
            <Button
              variant="ghost"
              size="sm"
              className="bg-background/80 backdrop-blur-sm hover:bg-background shadow-lg rounded-full w-10 h-10 p-0 border border-border/30"
              onClick={goToPrevious}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Pagination Dots */}
            <div className="flex items-center space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`transition-all duration-300 ${
                    index === currentIndex 
                      ? 'w-8 h-3 bg-primary rounded-full' 
                      : 'w-3 h-3 bg-muted-foreground/30 hover:bg-muted-foreground/50 rounded-full hover:scale-110'
                  }`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <Button
              variant="ghost"
              size="sm"
              className="bg-background/80 backdrop-blur-sm hover:bg-background shadow-lg rounded-full w-10 h-10 p-0 border border-border/30"
              onClick={goToNext}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
      </div>
    </div>
  </section>
  );
}