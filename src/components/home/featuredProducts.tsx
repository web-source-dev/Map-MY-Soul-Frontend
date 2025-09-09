import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";
import { catalogApi } from "@/lib/api";

interface ProductItem {
    _id: string;
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    stock?: number;
  }
export default function FeaturedProducts() {

    
  const [products, setProducts] = useState<ProductItem[]>([]);
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const [productsRes] = await Promise.all([
          catalogApi.getProducts().catch(() => ({ products: [] })),
        ]);
        if (!isMounted) return;
        setProducts((productsRes as { products: ProductItem[] }).products || []);
      } catch (e) {
        console.error('Error fetching data:', e);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, []);

  return (
            <section className="py-12 bg-background">
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
                Curated crystals and sacred items blessed with healing mantras for your spiritual journey.
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
                className="border-2 border-primary/30 text-primary hover:bg-primary hover:border-primary/50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
              >
                Explore All Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>
  );
}