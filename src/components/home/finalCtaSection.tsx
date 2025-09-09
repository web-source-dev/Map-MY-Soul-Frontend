import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";



export default function FinalCtaSection() {
  return (
         <section className="py-12 relative overflow-hidden bg-[image:url('/assets/1.png')]">
         
         <div className="relative max-w-5xl mx-auto text-center container-padding">
           <div className="mb-8">
             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight drop-shadow-lg">
               Ready to Begin Your Journey?
             </h2>
             <p className="text-xl text-foreground mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
               Your next big breakthrough is just 20 minutes a day away. Experience personalized healing 
               and spiritual guidance with our trusted platform.
             </p>
           </div>
           
           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
             <Button 
               size="lg" 
               className="bg-white hover:bg-white/90 text-primary-indigo px-12 py-6 text-xl font-bold rounded-xl shadow-mystical hover:shadow-soft transition-all duration-300 hover:scale-105"
             >
               <Heart className="w-6 h-6 mr-3" />
               Start Your Soul Map Quiz
               <ArrowRight className="w-6 h-6 ml-3" />
             </Button>
             <Button 
               size="lg" 
               className="border-2 border-white/40 text-white hover:text-primary-indigo hover:bg-white/10 hover:border-white/60 px-12 py-6 text-xl font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm hover:scale-105"
             >
               Explore Services
             </Button>
           </div>
         </div>
       </section>
  );
}