"use client";
import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import SocialProof from "@/components/home/socialProof";
import CTASection from "@/components/home/ctaSection";
import FeaturedProducts from "@/components/home/featuredProducts";
import HollisticWellness from "@/components/home/HollisticWellness";
import ServicesSection from "@/components/home/servicesSection";
import NewsletterSection from "@/components/home/newsletterSection";
import AboutSection from "@/components/home/aboutSection";
import TestimonialSection from "@/components/home/testimonialSection";
import FinalCtaSection from "@/components/home/finalCtaSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />      
      <SocialProof />
      <CTASection />
      <FeaturedProducts />
      <HollisticWellness />
      <ServicesSection />
      <NewsletterSection />
      <AboutSection />
      <TestimonialSection />
      <FinalCtaSection />
    </Layout>
  );
};

export default Index;