 
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";


export default function CTASection() {
  return (
    <section className="py-12 relative overflow-hidden">
    {/* Background Image */}
    <div className="absolute inset-0">
      <Image 
        src="/assets/3.png" 
        alt="Holistic wellness background" 
        width={2070}
        height={1380}
        className="w-full h-full object-cover"
      />
    </div>
    
    <div className="max-w-4xl mx-auto container-padding text-center relative z-10">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          Ignite Your Inner Light
        </h2>
        <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
          Discover personalized holistic healing with our quiz, connect with trusted healers via Zoom, and shop curated wellness products.
        </p>
      </div>
      <Button size="lg" className="bg-white hover:bg-white/90 text-purple-900 font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200 shadow-soft">
        <Sparkles className="w-5 h-5 mr-2" />
        Take The Quiz Now
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  </section>
  );
}