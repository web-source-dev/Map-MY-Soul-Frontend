"use client";

import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  ArrowRight, 
  Heart, 
  Star, 
  ShoppingCart, 
  Headphones, 
  Gift,
  Zap,
  Shield
} from "lucide-react";
import { getCrystalRecommendation } from "@/lib/astrology";
import { getHumanDesignInsights, getStrategyRecommendation } from "@/lib/humanDesign";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import ServiceCard from "@/components/ServiceCard";

interface QuizResults {
  services: Array<{
    _id: string;
    name: string;
    price: number;
    bookingUrl: string;
    description: string;
    practitioner: string;
    image: string;
    duration: number;
    rating: number;
    reviewCount: number;
  }>;
  products: Array<{
    _id: string;
    name: string;
    price: number;
    productUrl: string;
    description: string;
    image: string;
  }>;
  nonprofit: {
    eligible: boolean;
    applyUrl: string;
    message: string;
  };
  podcast: Array<{
    _id: string;
    title: string;
    link: string;
    description: string;
    episode?: string;
    image?: string;
  }>;
  astrology: {
    sunSign: string;
    moonSign: string;
    risingSign: string;
    birthChart?: any;
    calculationMethod?: 'accurate' | 'simplified';
  };
  humanDesign: {
    energyType: string;
    strategy: string;
    authority: string;
    profile?: string;
    definition?: string;
    calculationMethod?: 'accurate' | 'simplified';
  };
}

const QuizResults = () => {
  const router = useRouter();
  const [results, setResults] = useState<QuizResults | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only run on client side to avoid hydration mismatch
    if (typeof window !== 'undefined') {
      const fetchResults = () => {
        try {
          // Get results directly from localStorage
          const storedResults = localStorage.getItem('quizResults');
          console.log(JSON.parse(storedResults || '{}'));
          if (storedResults) {
            setResults(JSON.parse(storedResults));
          } else {
            // No results found - redirect to quiz
            router.push('/quiz');
            return;
          }
          setLoading(false);
        } catch (error) {
          console.error('Error loading results:', error);
          // Redirect to quiz if there's an error
          router.push('/quiz');
        }
      };

      fetchResults();
    }
  }, [router]);

  if (loading) {
    return (
      <Layout>
        <section className="section-padding min-h-[70vh] flex items-center">
          <div className="max-w-3xl mx-auto container-padding text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Crafting Your Personalized Path...</h1>
            <p className="text-muted-foreground">Analyzing your responses and creating your unique wellness journey</p>
          </div>
        </section>
      </Layout>
    );
  }

  if (!results) {
    return (
      <Layout>
        <section className="section-padding min-h-[70vh] flex items-center">
          <div className="max-w-3xl mx-auto container-padding text-center">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">No Results Found</h1>
            <p className="text-muted-foreground mb-6">Please complete the quiz to get your personalized recommendations.</p>
            <Button onClick={() => router.push('/quiz')} className="bg-primary hover:bg-primary/90">
              Take the Quiz
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding min-h-screen">
        <div className="max-w-6xl mx-auto container-padding">
          {/* Header */}
          <div className="text-center mb-12 fade-in">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Your Personalized Wellness Path
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Based on your unique profile, we&apos;ve crafted the perfect healing journey for you
            </p>
          </div>

          {/* Astrology & Human Design Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="modern-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Your Astrology Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sun Sign:</span>
                  <Badge variant="secondary">{results.astrology?.sunSign}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Moon Sign:</span>
                  <Badge variant="secondary">{results.astrology?.moonSign}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rising Sign:</span>
                  <Badge variant="secondary">{results.astrology?.risingSign}</Badge>
                </div>
                                 {results.astrology?.sunSign !== "Unknown" && (
                   <div className="pt-3 border-t border-border/50">
                     <p className="text-sm font-medium text-foreground mb-2">Crystal Recommendation:</p>
                     <p className="text-sm text-muted-foreground">{getCrystalRecommendation(results.astrology?.sunSign)}</p>
                   </div>
                 )}
                 {results.astrology?.calculationMethod && (
                  <div className="pt-2">
                                          <Badge variant={results.astrology?.calculationMethod === 'accurate' ? 'default' : 'secondary'} className="text-xs">
                        {results.astrology?.calculationMethod === 'accurate' ? 'Accurate Calculation' : 'Simplified Calculation'}
                      </Badge>
                      {results.astrology?.calculationMethod === 'simplified' && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Accurate calculation requires birth date, time, and location
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="modern-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-500" />
                  Your Human Design
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Energy Type:</span>
                  <Badge variant="secondary">{results.humanDesign?.energyType}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Strategy:</span>
                  <span className="text-sm">{results.humanDesign?.strategy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Authority:</span>
                  <span className="text-sm">{results.humanDesign?.authority}</span>
                </div>
                                  {results.humanDesign?.profile && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Profile:</span>
                    <Badge variant="outline">{results.humanDesign?.profile}</Badge>
                  </div>
                )}
                {results.humanDesign?.energyType !== "Unknown" && (
                  <div className="pt-3 border-t border-border/50 space-y-3">
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Your Strategy:</p>
                                              <p className="text-sm text-muted-foreground">{getStrategyRecommendation(results.humanDesign?.energyType)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Key Insight:</p>
                                              <p className="text-sm text-muted-foreground">{getHumanDesignInsights(results.humanDesign?.energyType)}</p>
                    </div>
                  </div>
                )}
                {results.humanDesign?.calculationMethod && (
                  <div className="pt-2">
                                          <Badge variant={results.humanDesign?.calculationMethod === 'accurate' ? 'default' : 'secondary'} className="text-xs">
                        {results.humanDesign?.calculationMethod === 'accurate' ? 'Accurate Calculation' : 'Simplified Calculation'}
                      </Badge>
                      {results.humanDesign?.calculationMethod === 'simplified' && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Accurate calculation requires birth date, time, and location
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Services Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500" />
              Recommended Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.services?.slice(0, 3).map((service, index) => (
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
          </div>

          {/* Products Section */}
          {results.products?.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-green-500" />
                Recommended Products
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.products?.slice(0, 3).map((product, index) => (
                  <div key={index} className="hover-scale">
                    <ProductCard
                      product={{
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        imageUrl: product.image,
                        description: product.description,
                      }}
                      onQuickView={() => console.log('Quick view:', product.name)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Nonprofit Section */}
          {results.nonprofit?.eligible && (
            <div className="mb-12">
              <Card className="modern-card border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <Gift className="w-6 h-6" />
                    Financial Support Available
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-700 mb-4">{results.nonprofit?.message}</p>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    Apply for Support
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Podcast Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Headphones className="w-6 h-6 text-blue-500" />
              Listen & Learn
            </h2>
            {results.podcast && results.podcast.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.podcast.slice(0, 3).map((podcast, index) => (
                  <Card key={podcast._id || index} className="modern-card">
                    <CardHeader>
                      <CardTitle>{podcast.title}</CardTitle>
                      <p className="text-muted-foreground">{podcast.description}</p>
                    </CardHeader>
                    <CardContent>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => window.open(podcast.link, '_blank')}>
                        Listen Now
                        <Headphones className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No podcast recommendations available.</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl"
              onClick={() => router.push('/services')}
            >
              Explore All Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <div>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-xl"
                onClick={() => router.push('/quiz')}
              >
                Retake Quiz
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default QuizResults;
