"use client";

import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <Layout isFooter={false} isHeader={false}>
      <section className="min-h-[100vh] flex items-center">
        <div className="max-w-4xl mx-auto container-padding">
          {/* Main 404 Content */}
          <div className="text-center mb-12 fade-in">
            
            <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-6">
              404
            </h1>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Page Not Found
            </h2>
            
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed mb-8">
              The page you&apos;re looking for seems to have wandered off on its own spiritual journey. 
              Let&apos;s guide you back to your path of transformation and healing.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => router.back()}
              className="bg-primary hover:bg-primary/90 text-background font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200 shadow-soft"
            >
              
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
            
            <Button 
              asChild
              size="lg" 
              variant="outline"
              className="border-2 border-primary/30 text-primary-indigo hover:bg-primary/5 hover:text-primary-indigo hover:border-primary/50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
            >
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                Return Home
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
