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
        style={{ backgroundImage: `url(/assets/1.png)` }}
      />      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen py-12">
          
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Transform Your Life.</span>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight">
                An Integrative Journey
                to Healing.
              </h1>
            </div>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
              Discover your path in as little as 20 min. Connect with trusted healers, 
              discover sacred tools, and awaken your highest potential.
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
                className="text-foreground px-8 py-4 text-lg font-semibold transition-all duration-200"
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
            <div className="glass-card p-4 rounded-3xl">
              <Image 
                src="/assets/2.png" 
                alt="Spiritual transformation" 
                width={800}
                height={600}
                className="w-full h-96 object-cover rounded-2xl"
              />
              
              {/* Stats Card */}
              <div className="bg-muted/50 rounded-2xl p-2">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">20 min</div>
                  <div className="text-sm text-muted-foreground">Daily Practice For Transformation.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;