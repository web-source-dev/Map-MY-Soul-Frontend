import { Heart, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";


export default function AboutSection() {
  return (
    <section className="py-12 relative overflow-hidden">
    {/* Background Image */}
<div className="absolute inset-0">
<Image 
src="https://static.wixstatic.com/media/11062b_83cafbd3ccd640e2935b57a5500c8687~mv2.jpg/v1/fill/w_1905,h_972,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/11062b_83cafbd3ccd640e2935b57a5500c8687~mv2.jpg" 
alt="Spiritual background" 
width={1905}
height={972}
className="w-full h-full object-cover"
/>
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
     Home is Where The Heart Is
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
     className="bg-white hover:bg-white/90 text-primary-indigo font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
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
 <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary-lavender/20 rounded-full blur-lg"></div>
 <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-secondary-vivid/20 rounded-full blur-lg"></div>
</div>
</div>
</section>

  );
}