import { Leaf, Heart, Zap, Brain, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";


export default function HollisticWellness() {
  return (
  <section className="py-12 relative overflow-hidden bg-gradient-to-br from-primary-pastel/10 to-primary-lavender/5">
  <div className="max-w-7xl mx-auto container-padding relative z-10">
    <div className="text-center mb-16">
      <div className="inline-flex items-center space-x-2 bg-primary-indigo/10 text-primary-indigo px-4 py-2 rounded-full text-sm font-medium mb-6">
        <Leaf className="w-4 h-4" />
        <span>Holistic Wellness</span>
      </div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
        Nurture Your Mind, Body & Soul
      </h2>
      <p className="text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
        Experience the transformative power of holistic healing through our comprehensive wellness approach that addresses every aspect of your being
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
      {/* Left Column - Content */}
      <div className="space-y-8">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-foreground">
            Complete Wellness Transformation
          </h3>
          <p className="text-foreground/70 leading-relaxed">
            Our holistic approach integrates ancient wisdom with modern science to create lasting transformation. 
            We believe true wellness comes from harmony between your physical, emotional, mental, and spiritual dimensions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-secondary-pop/20 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-secondary-pop" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Emotional Healing</h4>
              <p className="text-sm text-foreground/70">Release emotional blockages and cultivate inner peace through guided therapy sessions.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-secondary-vivid/20 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-secondary-vivid" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Energy Balancing</h4>
              <p className="text-sm text-foreground/70">Restore your natural energy flow with chakra healing and energy work.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-primary-lavender/20 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary-lavender" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Mental Clarity</h4>
              <p className="text-sm text-foreground/70">Clear mental fog and enhance focus through mindfulness and meditation.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-support-dark/20 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-support-dark" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Spiritual Growth</h4>
              <p className="text-sm text-foreground/70">Deepen your spiritual connection and discover your life&apos;s purpose.</p>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <Button 
            size="lg"
            className="bg-primary-indigo hover:bg-primary-indigo/90 text-background font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200 shadow-soft"
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
  );
}