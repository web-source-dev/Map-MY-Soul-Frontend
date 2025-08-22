import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Star, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(/assets/hero-crystals.jpg)` }}
      />
      
      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-primary/10" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
          
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Transform Your Life</span>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight">
                A better you
              </h1>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text leading-tight tracking-tight">
                every day
              </h1>
            </div>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
              Be part of the world&apos;s most powerful spiritual transformation platform. 
              Connect with trusted healers, discover sacred tools, and awaken your highest potential.
            </p>
            
            {/* Social Proof */}
            <div className="flex items-center space-x-6 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-golden-warm fill-current" />
                  ))}
                </div>
                <span className="text-sm font-medium">4.9/5 from 2,000+ souls</span>
              </div>
              <div className="w-px h-6 bg-border"></div>
              <div className="text-sm font-medium">Trusted by 10,000+ seekers</div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 text-lg shadow-mystical hover:shadow-elevation transition-all duration-200"
              >
                <Link href="/quiz">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Begin Your Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-2 border-border text-foreground hover:bg-muted px-8 py-4 text-lg font-semibold transition-all duration-200"
              >
                <Link href="/services">
                  <Play className="w-5 h-5 mr-2" />
                  Explore Programs
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Right Column - Visual Element */}
          <div className="relative">
            <div className="glass-card p-8 rounded-3xl">
              <Image 
                src="/assets/hero-crystals.jpg" 
                alt="Spiritual transformation" 
                width={800}
                height={600}
                className="w-full h-96 object-cover rounded-2xl mb-6"
              />
              
              {/* Stats Card */}
              <div className="bg-muted/50 rounded-2xl p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">20 min</div>
                  <div className="text-sm text-muted-foreground">Daily practice for transformation</div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-golden-warm/10 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-golden-warm" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;