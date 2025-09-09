import { Sparkles } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";



export default function SocialProof() {
  return (
    <section className="py-12 bg-background">
    <div className="max-w-7xl mx-auto container-padding">
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          <span>Trusted by Millions.</span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
          Featured On
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Recognized by leading media outlets for our commitment to spiritual wellness and transformation.
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center items-center gap-12 mb-12">
        <div className="text-center">
          <Image 
            src="https://res.cloudinary.com/mindvalley/image/fetch/c_scale,dpr_1,f_auto,fl_lossy,q_auto,w_236/https://a.storyblok.com/f/60579/229x31/4504f459d4/logo_nyt.svg" 
            alt="New York Times" 
            width="150" 
            height="20" 
            className="h-10 object-contain"
          />
        </div>
        <div className="text-center">
          <Image 
            src="https://res.cloudinary.com/mindvalley/image/fetch/c_scale,dpr_1,f_auto,fl_lossy,q_auto,w_102/https://a.storyblok.com/f/60579/106x29/edff29df59/logo_forbes.svg" 
            alt="Forbes" 
            width="105" 
            height="28" 
            className="h-10 object-contain"
          />
        </div>
        <div className="text-center">
          <Image 
            src="https://res.cloudinary.com/mindvalley/image/fetch/c_scale,dpr_1,f_auto,fl_lossy,q_auto,w_173/https://a.storyblok.com/f/60579/178x33/660efad2fd/logo_usa-today.svg" 
            alt="USA Today" 
            width="154" 
            height="28" 
            className="h-10 object-contain"
          />
        </div>
        <div className="text-center">
          <Image 
            src="https://res.cloudinary.com/mindvalley/image/fetch/c_scale,dpr_1,f_auto,fl_lossy,q_auto,w_161/https://a.storyblok.com/f/60579/166x33/8cf263ffec/logo_entrepreneur.svg" 
            alt="Entrepreneur" 
            width="144" 
            height="28" 
            className="h-10 object-contain"
          />
        </div>
        <div className="text-center">
          <Image 
            src="https://res.cloudinary.com/mindvalley/image/fetch/c_scale,dpr_1,f_auto,fl_lossy,q_auto,w_110/https://a.storyblok.com/f/60579/107x31/5d683c5c4d/logo-bbc.svg" 
            alt="BBC" 
            width="98" 
            height="28" 
            className="h-10 object-contain"
          />
        </div>
        
        <div className="text-center">
          <Image 
            src="https://res.cloudinary.com/mindvalley/image/fetch/c_scale,dpr_1,f_auto,fl_lossy,q_auto,w_auto/https://a.storyblok.com/f/60579/68x33/74c459c6fe/logo_cnn.svg" 
            alt="CNN" 
            width="41" 
            height="19" 
            className="h-10 object-contain"
          />
        </div>
      </div>
      
      <div className="text-center">
        <Button 
          variant="outline" 
          size="lg"
          className="border-2 border-primary/30 text-primary hover:bg-primary hover:text-background hover:border-primary/50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
        >
          Read Our Press Coverage
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  </section>
  );
}