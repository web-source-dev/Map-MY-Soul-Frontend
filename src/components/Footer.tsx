import Link from "next/link";
import { Mail, Phone, MapPin, Star, Clock, ArrowRight, Sparkles, Zap, Shield, Linkedin } from "lucide-react";
import Image from "next/image";
import {CustomTextInput} from "@/components/ui/custom-inputs";
import { useState } from "react";
import { newsletterApi } from "@/lib/api";
import { showToast } from "@/lib/utils";

// Logo URL from Wixstatic CDN
const logoUrl = "https://static.wixstatic.com/media/bdbc7d_0c6ab12123064711a5f85e34030152c8~mv2.png/v1/fill/w_536,h_531,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/bdbc7d_0c6ab12123064711a5f85e34030152c8~mv2.png";

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    
    setIsSubmitting(true);
    
    try {
      await newsletterApi.subscribe(newsletterEmail, 'footer');
      showToast.success('Successfully subscribed to our newsletter!');
      setNewsletterEmail("");
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      showToast.error(error instanceof Error ? error.message : 'Failed to subscribe to newsletter');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-background text-foreground">

      <div className="relative z-10">

        {/* Main Footer Content */} 
        <div className="max-w-7xl mx-auto container-padding py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Enhanced Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-2">
                <div className="relative">
                  <Image 
                    src={logoUrl} 
                    alt="MapMySoul" 
                    width={64}
                    height={64}
                    className="w-16 h-16" 
                  />
                  <div className="absolute -inset-2 bg-primary-lavender/20 rounded-full blur-lg"></div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">Map My Soul</div>
                  <div className="text-sm text-foreground/70 font-medium">Marketplace</div>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-foreground/60 ml-2">4.9/5</span>
                  </div>
                </div>
              </div>
              <p className="text-foreground/80 mb-2 max-w-md leading-relaxed text-lg">
                Your holistic wellness hub for personalized healing. Connect with trusted healers, 
                discover spiritual products, and embark on your journey of self-discovery and transformation.
              </p>
              
              {/* Enhanced Newsletter Signup */}
              <div className="mb-2">
                <h4 className="text-lg font-semibold text-foreground mb-2 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-primary-indigo" />
                  Stay Connected
                </h4>
                <p className="text-foreground/60 text-sm mb-2">Get weekly insights on spiritual growth and wellness.</p>
                <form onSubmit={handleNewsletterSubmit} className="flex group w-full">
                  <CustomTextInput
                    placeholder="Your email address"
                    className="flex-1 px-4 w-72 py-3 bg-card/10 rounded-l-xl rounded-r-none text-foreground placeholder-foreground/50 transition-all duration-300"
                    type="email"
                    value={newsletterEmail}
                    onChange={(value) => setNewsletterEmail(value)}
                    disabled={isSubmitting}
                  />
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-primary-indigo text-background rounded-r-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary-lavender/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin"></div>
                    ) : (
                      <ArrowRight className="w-5 h-5" />
                    )}
                  </button>
                </form>
              </div>

                             {/* Enhanced Social Links */}
               <div className="flex space-x-3">
                 {/* LinkedIn */}
                 <a 
                   href="https://www.linkedin.com/company/mapmysoul/"
                   className="w-12 h-12 flex items-center justify-center text-foreground/70 hover:bg-primary-indigo hover:text-background hover:rounded-lg transition-all duration-300"
                   title="LinkedIn"
                 >
                   <Linkedin className="w-6 h-6" />
                 </a>
                 
                 {/* TikTok */}
                 <a 
                   href="https://www.tiktok.com/@mapmysoul"
                   className="w-12 h-12 flex items-center justify-center text-foreground/70 hover:bg-primary-indigo hover:text-background hover:rounded-lg transition-all duration-300"
                   title="TikTok"
                 >
                   <Image 
                     src="/assets/tik-tok.png" 
                     alt="TikTok" 
                     width={24}
                     height={24}
                     className="w-6 h-6" 
                   />
                 </a>
               </div>
            </div>

                         {/* Enhanced Services */}
             <div>
               <h3 className="text-xl font-bold text-foreground mb-8 flex items-center">
                 <Sparkles className="w-6 h-6 mr-3 text-primary-indigo" />
                 Services
               </h3>
               <ul className="space-y-4">
                 {[
                   { to: "/services", label: "Services" },
                   { to: "/products", label: "Products" },
                   { to: "/quiz", label: "Soul Path Quiz" },
                   { to: "/about", label: "About Us" },
                   { to: "/contact", label: "Contact Us" }
                 ].map((link, index) => (
                   <li key={index}>
                     <Link href={link.to} className="text-foreground/70 hover:text-foreground transition-all duration-300 flex items-center group">
                       <div className="w-2 h-2 bg-primary-indigo rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                       <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                     </Link>
                   </li>
                 ))}
               </ul>
             </div>

            {/* Enhanced Contact Info */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-8 flex items-center">
                <Zap className="w-6 h-6 mr-3 text-support-pastel" />
                Connect
              </h3>
              <ul className="space-y-6">
                {[
                  { icon: Mail, label: "Email", value: "info@mapmysoul.com", color: "text-primary-pastel" },
                  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", color: "text-primary-indigo" },
                  { icon: MapPin, label: "Location", value: "Everywhere, Virtually", color: "text-secondary-vivid" },
                  { icon: Clock, label: "Support", value: "24/7 Available", color: "text-support-pastel" }
                ].map((contact, index) => (
                  <li key={index} className="flex items-start space-x-4 group">
                    <div className={`w-10 h-10 bg-card/10 rounded-lg flex items-center justify-center group-hover:bg-card/20 transition-all duration-300 ${contact.color}`}>
                      <contact.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-foreground font-semibold text-sm">{contact.label}</div>
                      <div className="text-foreground/70 text-sm group-hover:text-foreground transition-colors duration-300">{contact.value}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="border-t border-foreground/10 bg-gradient-to-r from-foreground/5 to-transparent">
          <div className="max-w-7xl mx-auto container-padding py-5">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-6 mb-6 md:mb-0">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-primary-indigo" />
                  <p className="text-foreground/70 text-sm">
                    © {new Date().getFullYear()} Map My Soul. All rights reserved.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center space-x-8">
                {[
                  { to: "/privacy", label: "Privacy Policy" },
                  { to: "/terms", label: "Terms & Conditions" },
                  { to: "/refund", label: "Refund Policy" },
                  { to: "/shipping", label: "Shipping Policy" },
                  { to: "/accessibility", label: "Accessibility" }
                ].map((link, index) => (
                  <Link 
                    key={index}
                    href={link.to} 
                    className="text-foreground/70 hover:text-foreground text-sm transition-all duration-300 hover:scale-105"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;