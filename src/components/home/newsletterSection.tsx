import { Sparkles, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CustomTextInput } from "@/components/ui/custom-inputs";
import { useState } from "react";
import { newsletterApi } from "@/lib/api";
import { showToast } from "@/lib/utils";

export default function NewsletterSection() {


  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setIsNewsletterSubmitting(true);

    try {
      await newsletterApi.subscribe(newsletterEmail, 'homepage');
      showToast.success('Successfully subscribed to Map My Soul Daily!');
      setNewsletterEmail("");
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      showToast.error(error instanceof Error ? error.message : 'Failed to subscribe to newsletter');
    } finally {
      setIsNewsletterSubmitting(false);
    }
  };

  return (
    <section className="py-12 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 lg:px-10 relative z-10">
        <div className=" md:rounded-3xl flex flex-col md:grid grid-cols-12 gap-4 md:gap-10 lg:gap-16 overflow-hidden bg-white/90 backdrop-blur-sm shadow-2xl border border-white/20">

          {/* Image Column */}
          <div className="col-span-4 relative">
            <Image
              src="/assets/4.png"
              alt="Co-founder portrait"
              width={331}
              height={524}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Content Column */}
          <div className="col-span-8 p-6 flex flex-col justify-center">
            <div className="text-foreground">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                Become 1% Better Every Day
              </h2>
              <h3 className="text-xl md:text-2xl text-foreground mb-2 font-medium">
                Upgrade Your Soul. Elevate Your Life. Shape Your Destiny.
              </h3>
              <p className="text-foreground/70 text-lg mb-2 leading-relaxed">
                Welcome to MapMySoul Daily. We&apos;ll send you the latest breakthroughs in spiritual growth,
                personal transformation, and soul awakening—straight to your inbox.
              </p>

              {/* Newsletter Form */}
              <div className="w-full max-w-xl">
                <form onSubmit={handleNewsletterSubmit} className="w-full">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                      <CustomTextInput
                        placeholder="Enter your email address"
                        type="email"
                        value={newsletterEmail}
                        onChange={(value: string) => setNewsletterEmail(value)}
                        disabled={isNewsletterSubmitting}
                        className="w-full h-12 px-4 py-3 bg-white/90"
                      />
                    </div>
                    <div className="flex-shrink-0">
                      <Button
                        type="submit"
                        disabled={isNewsletterSubmitting}
                        className="w-full sm:w-auto h-12"
                      >
                        {isNewsletterSubmitting ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Subscribing...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center space-x-2">
                            <Sparkles className="w-4 h-4" />
                            <span>Subscribe</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
                <p className="text-foreground/60 text-sm mt-4 flex items-center justify-center space-x-1">
                  <Shield className="w-3 h-3" />
                  <span>Your information is safe with us. Unsubscribe anytime.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}