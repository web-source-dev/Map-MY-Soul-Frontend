"use client";

import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowLeft, Home, Search, Heart, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  const quickLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Take the Quiz", path: "/quiz", icon: Sparkles },
    { name: "Services", path: "/services", icon: Heart },
    { name: "Products", path: "/products", icon: Star },
  ];

  return (
    <Layout>
      <section className="section-padding min-h-[70vh] flex items-center">
        <div className="max-w-4xl mx-auto container-padding">
          {/* Main 404 Content */}
          <div className="text-center mb-12 fade-in">
            <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Sparkles className="w-12 h-12 text-primary" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-6">
              404
            </h1>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Page Not Found
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
              The page you&apos;re looking for seems to have wandered off on its own spiritual journey. 
              Let&apos;s guide you back to your path of transformation and healing.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => router.back()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200 shadow-soft"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
            
            <Button 
              asChild
              size="lg" 
              variant="outline"
              className="border-2 border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
            >
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                Return Home
              </Link>
            </Button>
          </div>

          {/* Quick Navigation Card */}
          <Card className="modern-card max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Continue Your Journey
                </h3>
                <p className="text-muted-foreground">
                  Explore these popular destinations on your spiritual path
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickLinks.map((link, index) => (
                  <Link key={index} href={link.path}>
                    <Button 
                      variant="ghost" 
                      className="w-full h-auto p-4 flex flex-col items-center space-y-2 hover:bg-primary/5 hover:text-primary transition-all duration-200 rounded-xl"
                    >
                      <link.icon className="w-6 h-6" />
                      <span className="font-medium">{link.name}</span>
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Search Suggestion */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-2 bg-muted/50 text-muted-foreground px-4 py-2 rounded-full text-sm">
              <Search className="w-4 h-4" />
              <span>Can&apos;t find what you&apos;re looking for? Try our search or contact support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Help Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            Need Help Finding Your Path?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our team is here to guide you to the right resources and services for your spiritual journey
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200"
            >
              <Link href="/quiz">
                <Sparkles className="w-5 h-5 mr-2" />
                Take the Soul Path Quiz
              </Link>
            </Button>
            
            <Button 
              asChild
              size="lg" 
              variant="outline"
              className="border-2 border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
            >
              <Link href="/about">
                <Heart className="w-5 h-5 mr-2" />
                Learn About Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
