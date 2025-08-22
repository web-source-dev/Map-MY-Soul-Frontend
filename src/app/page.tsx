"use client";
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";  
import { Star, ArrowRight, Heart, Sparkles, Zap, Leaf, Brain } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { catalogApi } from "@/lib/api";

const Index = () => {
  interface ProductItem {
    _id: string;
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    stock?: number;
  }

  interface ServiceItem {
    _id?: string;
    name: string;
    description?: string;
    price?: number;
    image?: string;
    serviceType?: string;
    serviceProviderName?: string;
    serviceProviderEmail?: string;
  }

  interface PodcastItem {
    _id?: string;
    title: string;
    description?: string;
    podcastImageUrl?: string;
    podcastUrl?: string;
    podcastType?: string;
  }

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [podcasts, setPodcasts] = useState<PodcastItem[]>([]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const [productsRes, servicesRes, podcastsRes] = await Promise.all([
          catalogApi.getProducts().catch(() => ({ products: [] })),
          catalogApi.getServices().catch(() => ({ services: [] })),
          catalogApi.getPodcasts().catch(() => ({ podcasts: [] })),
        ]);
        if (!isMounted) return;
        setProducts((productsRes as { products: ProductItem[] }).products || []);
        setServices((servicesRes as { services: ServiceItem[] }).services || []);
        setPodcasts((podcastsRes as { podcasts: PodcastItem[] }).podcasts || []);
      } catch (e) {
        console.error('Error fetching data:', e);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, []);

  const testimonials = [
    {
      name: "Traci",
      text: "MapMySoul provided me with the perfect healer to give me guidance that has truly changed my spiritual path towards positivity and growth.",
      rating: 5
    },
    {
      name: "Andy", 
      text: "The crystals are personally blessed by the company owner with healing mantra and cleansed in sacred waters. Each crystal has so much character.",
      rating: 5
    }
  ];
  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection />

      {/* Social Proof Section - Inspired by Mindvalley */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Trusted by Millions</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Featured on
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Recognized by leading media outlets for our commitment to spiritual wellness and transformation
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-12 mb-12">
            <div className="text-center">
              <Image 
                src="https://res.cloudinary.com/mindvalley/image/fetch/c_scale,dpr_1,f_auto,fl_lossy,q_auto,w_236/https://a.storyblok.com/f/60579/229x31/4504f459d4/logo_nyt.svg" 
                alt="New York Times" 
                width="206" 
                height="28" 
                className="h-10"
              />
            </div>
            <div className="text-center">
              <Image 
                src="https://res.cloudinary.com/mindvalley/image/fetch/c_scale,dpr_1,f_auto,fl_lossy,q_auto,w_102/https://a.storyblok.com/f/60579/106x29/edff29df59/logo_forbes.svg" 
                alt="Forbes" 
                width="105" 
                height="28" 
                className="h-10"
              />
            </div>
            <div className="text-center">
              <Image 
                src="https://res.cloudinary.com/mindvalley/image/fetch/c_scale,dpr_1,f_auto,fl_lossy,q_auto,w_173/https://a.storyblok.com/f/60579/178x33/660efad2fd/logo_usa-today.svg" 
                alt="USA Today" 
                width="154" 
                height="28" 
                className="h-10"
              />
            </div>
            <div className="text-center">
              <Image 
                src="https://res.cloudinary.com/mindvalley/image/fetch/c_scale,dpr_1,f_auto,fl_lossy,q_auto,w_161/https://a.storyblok.com/f/60579/166x33/8cf263ffec/logo_entrepreneur.svg" 
                alt="Entrepreneur" 
                width="144" 
                height="28" 
                className="h-10"
              />
            </div>
            <div className="text-center">
              <Image 
                src="https://res.cloudinary.com/mindvalley/image/fetch/c_scale,dpr_1,f_auto,fl_lossy,q_auto,w_110/https://a.storyblok.com/f/60579/107x31/5d683c5c4d/logo-bbc.svg" 
                alt="BBC" 
                width="98" 
                height="28" 
                className="h-10"
              />
            </div>
            
            <div className="text-center">
              <Image 
                src="https://res.cloudinary.com/mindvalley/image/fetch/c_scale,dpr_1,f_auto,fl_lossy,q_auto,w_auto/https://a.storyblok.com/f/60579/68x33/74c459c6fe/logo_cnn.svg" 
                alt="CNN" 
                width="41" 
                height="19" 
                className="h-10"
              />
            </div>
          </div>
          
          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
            >
              Read Our Press Coverage
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      

      {/* CTA Section - Enhanced with Background Image */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Holistic wellness background" 
            width={2070}
            height={1380}
            className="w-full h-full object-cover opacity-60"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-blue-900/70 to-indigo-900/80"></div> */}
        </div>
        
        {/* Floating decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto container-padding text-center relative z-10">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              IGNITE YOUR INNER LIGHT
            </h2>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Discover personalized holistic healing with our quiz, connect with trusted healers via Zoom, and shop curated wellness products
            </p>
          </div>
          <Button size="lg" className="bg-white hover:bg-white/90 text-purple-900 font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200 shadow-soft">
            <Sparkles className="w-5 h-5 mr-2" />
            Take The Quiz Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

    

      {/* Featured Products Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Curated Collection</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Sacred Tools for Your Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Curated crystals and sacred items blessed with healing mantras for your spiritual journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {(products && products.length > 0 ? products : []).slice(0, 3).map((product, index) => (
              <div key={index} className="hover-scale">
                <ProductCard
                  product={{
                    _id: product._id || "",
                    name: product.name,
                    price: product.price || 0,
                    imageUrl: product.imageUrl || "",
                    description: product.description || ""
                  }}
                  onQuickView={() => console.log('Quick view:', product.name)}
                />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
            >
              Explore All Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
  {/* Holistic Wellness Section */}
  <section className="py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-20 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-48 h-48 bg-teal-200/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-cyan-200/20 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto container-padding relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Leaf className="w-4 h-4" />
              <span>Holistic Wellness</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Nurture Your Mind, Body & Soul
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the transformative power of holistic healing through our comprehensive wellness approach that addresses every aspect of your being
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Complete Wellness Transformation
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our holistic approach integrates ancient wisdom with modern science to create lasting transformation. 
                  We believe true wellness comes from harmony between your physical, emotional, mental, and spiritual dimensions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Emotional Healing</h4>
                    <p className="text-sm text-gray-600">Release emotional blockages and cultivate inner peace through guided therapy sessions</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Energy Balancing</h4>
                    <p className="text-sm text-gray-600">Restore your natural energy flow with chakra healing and energy work</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Mental Clarity</h4>
                    <p className="text-sm text-gray-600">Clear mental fog and enhance focus through mindfulness and meditation</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Spiritual Growth</h4>
                    <p className="text-sm text-gray-600">Deepen your spiritual connection and discover your life&apos;s purpose</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button 
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200 shadow-soft"
                >
                  Start Your Wellness Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            {/* Right Column - Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-2xl shadow-soft hover-scale">
                  <Image 
                    src="https://static.wixstatic.com/media/c2dd9b_8c7ce204944b4f5b802c3260404e46a7~mv2.jpg/v1/fill/w_873,h_953,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c2dd9b_8c7ce204944b4f5b802c3260404e46a7~mv2.jpg" 
                    alt="Meditation and mindfulness" 
                    width={873}
                    height={953}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-semibold text-sm">Mindfulness</p>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-2xl shadow-soft hover-scale">
                  <Image 
                    src="https://static.wixstatic.com/media/c2dd9b_045db9e9754647bb9dc8c8d6623695ba~mv2.jpg/v1/fill/w_1905,h_953,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c2dd9b_045db9e9754647bb9dc8c8d6623695ba~mv2.jpg" 
                    alt="Crystal healing" 
                    width={1905}
                    height={953}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-semibold text-sm">Crystal Healing</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative overflow-hidden rounded-2xl shadow-soft hover-scale">
                  <Image 
                    src="https://static.wixstatic.com/media/c2dd9b_d47ae7757a4e49cc82d2ceccba246495~mv2.png/v1/fill/w_1905,h_953,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/c2dd9b_d47ae7757a4e49cc82d2ceccba246495~mv2.png" 
                    alt="Yoga and movement" 
                    width={1905}
                    height={953}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-semibold text-sm">Movement</p>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-2xl shadow-soft hover-scale">
                  <Image 
                    src="https://static.wixstatic.com/media/c2dd9b_6065825aa64f4badb153d800c0f9c67e~mv2.jpg/v1/fill/w_1905,h_953,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c2dd9b_6065825aa64f4badb153d800c0f9c67e~mv2.jpg" 
                    alt="Aromatherapy and essential oils" 
                    width={1905}
                    height={953}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-semibold text-sm">Aromatherapy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        
        </div>
      </section>
      {/* Services Section - Inspired by Mindvalley's program showcase */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-golden-warm/10 text-golden-warm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              <span>Trusted Healers</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Transform Your Life in 20 Minutes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Connect with verified spiritual guides for personalized healing sessions via Zoom
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

      {/* Podcasts Section - Inspired by Mindvalley's auto-carousel */}
      <section 
        className="py-20 bg-background relative overflow-hidden"
        style={{
          WebkitFontSmoothing: 'antialiased',
          color: '#0f131a',
          fontSize: '16px',
          textRendering: 'optimizeLegibility',
          WebkitTextSizeAdjust: '100%',
          lineHeight: 1.5,
          '--swiper-theme-color': '#007aff',
          '--swiper-navigation-size': '44px',
          '--vs-colors--lightest': 'rgba(60,60,60,0.26)',
          '--vs-colors--light': 'rgba(60,60,60,0.5)',
          '--vs-colors--dark': '#333',
          '--vs-colors--darkest': 'rgba(0,0,0,0.15)',
          '--vs-search-input-color': 'inherit',
          '--vs-search-input-bg': '#fff',
          '--vs-search-input-placeholder-color': 'inherit',
          '--vs-font-size': '1rem',
          '--vs-line-height': 1.4,
          '--vs-state-disabled-bg': '#f8f8f8',
          '--vs-state-disabled-color': 'var(--vs-colors--light)',
          '--vs-state-disabled-controls-color': 'var(--vs-colors--light)',
          '--vs-state-disabled-cursor': 'not-allowed',
          '--vs-border-color': 'var(--vs-colors--lightest)',
          '--vs-border-width': '1px',
          '--vs-border-style': 'solid',
          '--vs-border-radius': '4px',
          '--vs-actions-padding': '4px 6px 0 3px',
          '--vs-controls-color': 'var(--vs-colors--light)',
          '--vs-controls-size': 1,
          '--vs-controls--deselect-text-shadow': '0 1px 0 #fff',
          '--vs-selected-bg': '#f0f0f0',
          '--vs-selected-color': 'var(--vs-colors--dark)',
          '--vs-selected-border-color': 'var(--vs-border-color)',
          '--vs-selected-border-style': 'var(--vs-border-style)',
          '--vs-selected-border-width': 'var(--vs-border-width)',
          '--vs-dropdown-bg': '#fff',
          '--vs-dropdown-color': 'inherit',
          '--vs-dropdown-z-index': 1000,
          '--vs-dropdown-min-width': '160px',
          '--vs-dropdown-max-height': '350px',
          '--vs-dropdown-box-shadow': '0px 3px 6px 0px var(--vs-colors--darkest)',
          '--vs-dropdown-option-bg': '#000',
          '--vs-dropdown-option-color': 'var(--vs-dropdown-color)',
          '--vs-dropdown-option-padding': '3px 20px',
          '--vs-dropdown-option--active-bg': '#5897fb',
          '--vs-dropdown-option--active-color': '#fff',
          '--vs-dropdown-option--deselect-bg': '#fb5858',
          '--vs-dropdown-option--deselect-color': '#fff',
          '--vs-transition-timing-function': 'cubic-bezier(1,0.5,0.8,1)',
          '--vs-transition-duration': '0.15s',
          '--vs-disabled-bg': 'var(--vs-state-disabled-bg)',
          '--vs-disabled-color': 'var(--vs-state-disabled-color)',
          '--vs-disabled-cursor': 'var(--vs-state-disabled-cursor)',
          fontFamily: 'Grotesk-Regular,sans-serif',
          fontWeight: 400,
          border: '0 solid',
          boxSizing: 'border-box',
          marginTop: '1rem',
          minHeight: 'fit-content'
        } as React.CSSProperties}
      >
        {/* Header Section - Centered */}
        <div className="max-w-7xl mx-auto container-padding mb-6 lg:mb-12">
          <div className="w-full lg:w-4/6">
            <div className="text-aqua-dark text-sm font-medium mb-4">
              <p>growth in all areas</p>
            </div>
            <div className="text-cool-grey-700 pt-4 lg:py-5">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                100+ of the world&apos;s top programs for personal growth and transformation
              </h3>
            </div>
            <div className="text-cool-grey-600 hidden lg:block">
              <p className="text-lg leading-relaxed">
                Forge lasting transformations in your mind, body, soul, love and career with 20-minute micro-coaching sessions each day led by top-tier teachers worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* Auto Carousel Section - Full Viewport Width */}
        <div className="w-full overflow-hidden">
          <div className="mv-auto-carousel">
            {/* First Strip - Top Row */}
            <div 
              id="stripFlexTop" 
              className="--strip flex gap-4"
              style={{
                transform: 'matrix(1, 0, 0, 1, -1669, 0)',
                animation: 'scrollLeft 30s linear infinite'
              }}
            >
              {/* Dynamic Podcast Cards */}
              {podcasts && podcasts.length > 0 && (
                <>
                  {podcasts.slice(0, 5).map((podcast, index) => (
                    <div 
                      key={`podcast-${index}`} 
                      className="--item rounded-xl three-items w-1/5 h-48 flex-shrink-0 relative group cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={() => podcast.podcastUrl && window.open(podcast.podcastUrl, '_blank')}
                    >
                      <div className="relative overflow-hidden rounded-xl shadow-lg">
                        <Image 
                          src={podcast.podcastImageUrl || ""} 
                          alt={podcast.title} 
                          width="320" 
                          height="400" 
                          loading="lazy" 
                          className="w-full h-48 object-cover rounded-xl"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-xl"></div>
                        
                        {/* Content Overlay */}
                        <div className="absolute inset-0 p-2 flex flex-col justify-end bg-black/20">
                          <div className="space-y-2">
                            <h4 className="font-bold text-xl text-white leading-tight">{podcast.title}</h4>
                            {podcast.description && (
                              <p className="text-sm text-white/90 line-clamp-2 leading-relaxed">{podcast.description}</p>
                            )}
                            {/* Play Button */}
                            <div className="flex items-center space-x-2 mt-3">
                              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
                              </div>
                              <span className="text-white/80 text-xs font-medium">Listen Now</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Duplicate cards for seamless loop */}
                  {podcasts.slice(0, 5).map((podcast, index) => (
                    <div 
                      key={`podcast-duplicate-${index}`} 
                      className="--item rounded-xl three-items w-1/5 h-48 flex-shrink-0 relative group cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={() => podcast.podcastUrl && window.open(podcast.podcastUrl, '_blank')}
                    >
                      <div className="relative overflow-hidden rounded-xl shadow-lg">
                        <Image 
                          src={podcast.podcastImageUrl || ""} 
                          alt={podcast.title} 
                          width="320" 
                          height="400" 
                          loading="lazy" 
                          className="w-full h-48 object-cover rounded-xl"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-xl"></div>
                        
                        {/* Content Overlay */}
                        <div className="absolute inset-0 p-2 flex flex-col justify-end bg-black/20">
                          <div className="space-y-2">
                            <h4 className="font-bold text-xl text-white leading-tight">{podcast.title}</h4>
                            {podcast.description && (
                              <p className="text-sm text-white/90 line-clamp-2 leading-relaxed">{podcast.description}</p>
                            )}
                            {/* Play Button */}
                            <div className="flex items-center space-x-2 mt-3">
                              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
                              </div>
                              <span className="text-white/80 text-xs font-medium">Listen Now</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Second Strip - Bottom Row */}
            <div 
              id="stripFlexBottom" 
              className="--strip flex gap-4 mt-6"
              style={{
                transform: 'matrix(1, 0, 0, 1, -1020, 0)',
                animation: 'scrollRight 25s linear infinite'
              }}
            >
              {/* Dynamic Podcast Cards - Bottom Row */}
              {podcasts && podcasts.length > 0 && (
                <>
                  {podcasts.slice(5, 10).map((podcast, index) => (
                    <div 
                      key={`podcast-bottom-${index}`} 
                      className="--item rounded-xl three-items flex-shrink-0 w-100 relative group cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={() => podcast.podcastUrl && window.open(podcast.podcastUrl, '_blank')}
                    >
                      <div className="relative overflow-hidden rounded-xl shadow-lg">
                        <Image 
                          src={podcast.podcastImageUrl || ""} 
                          alt={podcast.title} 
                          width="320" 
                          height="400" 
                          loading="lazy" 
                          className="w-full h-48 object-cover rounded-xl"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-xl"></div>
                        
                        {/* Content Overlay */}
                        <div className="absolute inset-0 p-2 flex flex-col justify-end bg-black/20">
                          <div className="space-y-2">
                            <h4 className="font-bold text-xl text-white leading-tight">{podcast.title}</h4>
                            {podcast.description && (
                              <p className="text-sm text-white/90 line-clamp-2 leading-relaxed">{podcast.description}</p>
                            )}
                            {/* Play Button */}
                            <div className="flex items-center space-x-2 mt-3">
                              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
                              </div>
                              <span className="text-white/80 text-xs font-medium">Listen Now</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Duplicate cards for seamless loop */}
                  {podcasts.slice(5, 10).map((podcast, index) => (
                    <div 
                      key={`podcast-bottom-duplicate-${index}`} 
                      className="--item rounded-xl three-items flex-shrink-0 w-100 relative group cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={() => podcast.podcastUrl && window.open(podcast.podcastUrl, '_blank')}
                    >
                      <div className="relative overflow-hidden rounded-xl shadow-lg">
                        <Image 
                          src={podcast.podcastImageUrl || ""} 
                          alt={podcast.title} 
                          width="320" 
                          height="400" 
                          loading="lazy" 
                          className="w-full h-48 object-cover rounded-xl"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-xl"></div>
                        
                        {/* Content Overlay */}
                        <div className="absolute inset-0 p-2 flex flex-col justify-end bg-black/20">
                          <div className="space-y-2">
                            <h4 className="font-bold text-xl text-white leading-tight">{podcast.title}</h4>
                            {podcast.description && (
                              <p className="text-sm text-white/90 line-clamp-2 leading-relaxed">{podcast.description}</p>
                            )}
                            {/* Play Button */}
                            <div className="flex items-center space-x-2 mt-3">
                              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
                              </div>
                              <span className="text-white/80 text-xs font-medium">Listen Now</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* CTA Button - Centered */}
        <div className="max-w-7xl mx-auto container-padding text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
          >
            Explore All Programs
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Newsletter Section - Inspired by Mindvalley */}
      <section className="py-24 bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <div className="rounded-lg md:rounded-xl flex flex-col md:grid grid-cols-12 gap-4 md:gap-10 lg:gap-16 overflow-hidden bg-white/80 backdrop-blur-sm shadow-soft">
            
            {/* Image Column */}
            <div className="col-span-4 relative">
              <div className="w-full hidden md:block relative">
                <div className="absolute bottom-4 left-4 right-4 z-20 text-center">
                   <div className="mb-2">
                     <Image 
                       src="https://static.wixstatic.com/media/bdbc7d_0c6ab12123064711a5f85e34030152c8~mv2.png/v1/fill/w_536,h_531,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/bdbc7d_0c6ab12123064711a5f85e34030152c8~mv2.png" 
                       alt="MapMySoul Logo" 
                       width="243" 
                       height="68" 
                       style={{ opacity: 0.3}}
                       className="mx-auto"
                     />
                   </div>
                   <p className="text-white text-sm font-medium drop-shadow-lg">Co-founder and CEO of MapMySoul</p>
                 </div>
                <div className="relative">
                  <Image 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=331&h=524&fit=crop&crop=face" 
                    alt="Co-founder portrait" 
                    width={331} 
                    height={524} 
                    className="w-full h-auto object-cover rounded-lg mystical-pulse"
                    style={{
                      filter: 'drop-shadow(0 0 20px hsl(var(--mystic-purple) / 0.4)) drop-shadow(0 0 40px hsl(var(--primary-glow) / 0.3))'
                    }}
                  />
                </div>
              </div>
              
              {/* Mobile Image */}
              <div className="w-full block md:hidden relative">
                <div className="absolute bottom-4 left-4 right-4 z-20 text-center">
                   <div className="mb-2">
                     <Image 
                       src="https://static.wixstatic.com/media/bdbc7d_0c6ab12123064711a5f85e34030152c8~mv2.png/v1/fill/w_536,h_531,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/bdbc7d_0c6ab12123064711a5f85e34030152c8~mv2.png" 
                       alt="MapMySoul Logo" 
                       width="243" 
                       height="68" 
                       className="mx-auto"
                     />
                   </div>
                   <p className="text-white text-sm font-medium drop-shadow-lg">Co-founder and CEO of MapMySoul</p>
                 </div>
                <div className="relative">
                  <Image 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=685&h=682&fit=crop&crop=face" 
                    alt="Co-founder portrait" 
                    width={685} 
                    height={682} 
                    className="w-full h-auto object-cover rounded-lg mystical-pulse"
                    style={{
                      filter: 'drop-shadow(0 0 20px hsl(var(--mystic-purple) / 0.4)) drop-shadow(0 0 40px hsl(var(--primary-glow) / 0.3))'
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* Content Column */}
            <div className="col-span-8 px-4 md:px-0 pb-5 md:pb-0 md:pl-2 flex flex-col justify-center">
              <div className="text-cool-grey-700">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                  Become 1% Better Every Day
                </h2>
                <h3 className="text-xl md:text-2xl text-cool-grey-700 mb-4 md:mb-6 font-medium">
                  Upgrade Your Soul. Elevate Your Life. Shape Your Destiny.
                </h3>
                <p className="text-cool-grey-600 text-lg mb-4 md:mb-12 leading-relaxed">
                  Welcome to MapMySoul Daily. We&apos;ll send you the latest breakthroughs in spiritual growth, 
                  personal transformation, and soul awakening—straight to your inbox.
                </p>
                
                {/* Newsletter Form */}
                <div className="w-full max-w-xl"> 
                  <form className="w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="lg:col-span-1 relative">
                        <input 
                          id="newsletter-email"
                          type="email" 
                          placeholder="Your email address"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                        />
                        
                      </div>
                      <div className="lg:col-span-1 flex justify-end">
                        <Button 
                          type="submit"
                          className="w-full lg:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg transition-all duration-200"
                        >
                          Subscribe
                        </Button>
                      </div>
                    </div>
                  </form>
                  <p className="text-cool-grey-600 text-sm mt-4">
                    Your information is safe with us. Unsubscribe anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - "Home is Where The Heart Is" */}
      <section className="py-24 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
                 {/* Background Image */}
         <div className="absolute inset-0">
           <Image 
             src="https://static.wixstatic.com/media/11062b_83cafbd3ccd640e2935b57a5500c8687~mv2.jpg/v1/fill/w_1905,h_972,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/11062b_83cafbd3ccd640e2935b57a5500c8687~mv2.jpg" 
             alt="Spiritual background" 
             width={1905}
             height={972}
             className="w-full h-full object-cover opacity-75"
           />
         </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        <div className="max-w-7xl mx-auto container-padding relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Content Column */}
            <div className="space-y-8">
              {/* Section Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                <Heart className="w-4 h-4" />
                <span>About MapMySoul</span>
              </div>
              
              {/* Main Heading */}
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                  Home is Where The{' '}
                  <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
                    Heart Is
                  </span>
                </h2>
                
                {/* Mission Description */}
                <div className="space-y-6">
                  <p className="text-xl text-white/90 leading-relaxed">
                    MapMySoul is more than a platform—it is a way of living, an awakening to your highest potential. 
                    We invite you on a profound journey of healing and transformation.
                  </p>
                  <p className="text-lg text-white/80 leading-relaxed">
                    Whether you are drawn to spiritual guidance, community gatherings, or tools for personal growth, 
                    MapMySoul is a sanctuary where authenticity, connection, and healing come alive.
                  </p>
                </div>
              </div>
              
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button 
                  size="lg"
                  className="bg-white hover:bg-white/90 text-purple-900 font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Learn More About Us
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-4 rounded-xl font-semibold transition-all duration-200 backdrop-blur-sm"
                >
                  Take the Quiz
                  <Sparkles className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
        
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-purple-500/20 rounded-full blur-lg"></div>
              <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-blue-500/20 rounded-full blur-lg"></div>
            </div>
          </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              What Our Community Says
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real stories from people who have transformed their lives through our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="modern-card p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-golden-warm fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg text-muted-foreground mb-6 italic leading-relaxed">
                  &quot;{testimonial.text}&quot;
                </blockquote>
                <cite className="text-primary font-semibold">- {testimonial.name}</cite>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-mystic-purple via-mystic-purple-light to-mystic-purple-dark"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-golden-warm/20 via-transparent to-golden-light/10"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-golden-warm/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-mystic-purple-light/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-golden-light/20 rounded-full blur-2xl"></div>
        
        <div className="relative max-w-5xl mx-auto text-center container-padding">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight drop-shadow-lg">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl text-white/95 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Your next big breakthrough is just 20 minutes a day away. Experience personalized healing 
              and spiritual guidance with our trusted platform.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white hover:bg-white/90 text-mystic-purple px-12 py-6 text-xl font-bold rounded-xl shadow-mystical hover:shadow-golden transition-all duration-300 hover:scale-105"
            >
              <Heart className="w-6 h-6 mr-3" />
              Start Your Soul Map Quiz
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
            <Button 
              size="lg" 
              className="border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/60 px-12 py-6 text-xl font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm hover:scale-105"
            >
              Explore Services
            </Button>
          </div>
          
          <div className="mt-8 text-white/80">
            <p className="text-sm drop-shadow-sm">Join 10,000+ souls on their spiritual journey</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
