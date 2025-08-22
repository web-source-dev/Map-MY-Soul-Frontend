"use client";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, ShoppingBag, Star, Heart, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { catalogApi } from "@/lib/api";

interface ProductItem {
  _id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  stock?: number;
}

const Products = () => {

  const [products, setProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsRes = await catalogApi.getProducts();
      setProducts(productsRes.products);
    };
    fetchProducts();
  }, []);

  const features = [
    {
      icon: Heart,
      title: "Personally Blessed",
      description: "Every crystal is blessed with healing mantras by our founder"
    },
    {
      icon: Shield,
      title: "Sacred Cleansing",
      description: "All items are cleansed in sacred waters for purity"
    },
    {
      icon: Star,
      title: "Authentic Quality",
      description: "Sourced from trusted suppliers with genuine crystals"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto container-padding text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              <span>Sacred Collection</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Blessed & Cleansed with Love
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover our curated collection of crystals, sacred items, and wellness products. 
              Each item is personally blessed and cleansed with healing energy.
            </p>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            Every crystal and sacred item carries unique character and positive energy
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            To support your spiritual journey and create a deeper connection with the sacred.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-10 w-full sm:w-64 rounded-lg"
                />
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-48 rounded-lg">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="crystals">Crystals</SelectItem>
                  <SelectItem value="cleansing">Cleansing Tools</SelectItem>
                  <SelectItem value="jewelry">Jewelry</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-48 rounded-lg">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-20">Under $20</SelectItem>
                  <SelectItem value="20-40">$20 - $40</SelectItem>
                  <SelectItem value="over-40">Over $40</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" className="rounded-lg">
              <ShoppingBag className="w-4 h-4 mr-2" />
              View Cart (0)
            </Button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Sacred Products for Your Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Curated collection of spiritual products to support your healing and growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
            {products.map((product, index) => (
              <div key={index} className="hover-scale">
                <ProductCard
                  product={product}
                  onQuickView={() => console.log('Quick view:', product.name)}
                />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="outline" size="lg" className="rounded-xl">
              Load More Products
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Sacred Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              How we prepare each sacred item for your spiritual journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Sacred Sourcing</h3>
              <p className="text-muted-foreground">
                We carefully select each crystal and sacred item from trusted suppliers who share our values.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Blessing Ceremony</h3>
              <p className="text-muted-foreground">
                Our founder personally blesses each item with healing mantras and positive intentions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Sacred Cleansing</h3>
              <p className="text-muted-foreground">
                Each item is cleansed in sacred waters to remove any negative energies and restore purity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center container-padding">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Learn About Our Process
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Every crystal and sacred item in our collection is personally blessed with healing mantras 
            and cleansed in sacred waters. Each piece carries unique character and positive energy 
            to support your spiritual journey.
          </p>
          <Button size="lg" variant="outline" className="rounded-xl">
            Discover Our Story
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Products;