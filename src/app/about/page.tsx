"use client";
  import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Sparkles, Globe, ArrowRight } from "lucide-react";
import Image from "next/image";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassionate Healing",
      description: "We believe in the power of compassionate, personalized healing that honors each individual's unique journey."
    },
    {
      icon: Users,
      title: "Trusted Community",
      description: "Our network of vetted healers and practitioners are carefully selected for their expertise and genuine care."
    },
    {
      icon: Sparkles,
      title: "Sacred Products",
      description: "Every crystal and sacred item is personally blessed with healing mantras and cleansed in sacred waters."
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Connect with healers from anywhere in the world through our secure video-enabled platform."
    }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "Founder & Spiritual Guide",
      description: "30+ years of experience in holistic healing and spiritual guidance",
      image: "/assets/aura-cleansing.jpg"
    },
    {
      name: "Maya Rodriguez", 
      role: "Head of Healer Relations",
      description: "Curates our network of trusted practitioners and ensures quality standards",
      image: "/assets/crystal-therapy.jpg"
    },
    {
      name: "David Thompson",
      role: "Product Curator",
      description: "Sources and blesses our collection of sacred crystals and spiritual tools",
      image: "/assets/aura-cleansing.jpg"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-primary-glow/5 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Story
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            MapMySoul Marketplace was born from a vision to democratize access to authentic spiritual healing. 
            We believe everyone deserves personalized guidance on their journey to wellness and self-discovery.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                MapMySoul Marketplace is dedicated to empowering wellness seekers by connecting them 
                with trusted healers through a personalized, video-enabled platform that seamlessly 
                blends holistic services, curated products, and impactful nonprofit initiatives.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our quiz-driven recommendations, Zoom-based sessions, wellness essentials, and curated 
                workshops and retreats create a nurturing space for emotional, mental, and spiritual 
                healing, guiding all users toward self-discovery and balance.
              </p>
              <Button size="lg">
                Take Our Quiz
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="relative">
              <div className="mystical-card p-8">
                <Image 
                  src="/assets/aura-cleansing.jpg" 
                  alt="Spiritual healing session" 
                  className="w-full h-80 object-cover rounded-xl"
                  width={1000}
                  height={1000}
                />
                <div className="hero-overlay" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do at MapMySoul
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="mystical-card text-center">
                <CardContent className="p-8">
                  <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate individuals dedicated to bringing you authentic spiritual experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="mystical-card text-center">
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover mystical-glow"
                      width={1000}
                      height={1000}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-glow">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Start Your Healing Journey?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8">
            Join thousands who have found their path to wellness through our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Take the Quiz
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              Explore Services
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;