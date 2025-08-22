"use client";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Package, Globe, Clock, AlertTriangle, CheckCircle, MapPin, Calendar } from "lucide-react";

const ShippingPolicy = () => {
  const lastUpdated = "December 2024";

  const sections = [
    {
      icon: Truck,
      title: "Shipping Information",
      content: [
        {
          subtitle: "Processing Time",
          text: "Orders are typically processed and shipped within 1-3 business days after payment confirmation. During peak periods (holidays, special events), processing may take up to 5 business days."
        },
        {
          subtitle: "Shipping Methods",
          text: "We offer several shipping options to accommodate your needs: Standard Ground (5-7 business days), Express (2-3 business days), and Overnight (1 business day) where available."
        },
        {
          subtitle: "Order Confirmation",
          text: "You will receive an order confirmation email immediately after placing your order, followed by a shipping confirmation with tracking information once your order ships."
        },
        {
          subtitle: "International Shipping",
          text: "We ship to most countries worldwide. International orders may be subject to customs duties and taxes, which are the responsibility of the recipient."
        }
      ]
    },
    {
      icon: Package,
      title: "Product-Specific Shipping",
      content: [
        {
          subtitle: "Crystals and Sacred Items",
          text: "All crystals and sacred items are carefully packaged with protective materials to ensure safe delivery. Each item is individually wrapped and cushioned to prevent damage during transit."
        },
        {
          subtitle: "Books and Digital Products",
          text: "Physical books are shipped in protective packaging. Digital products (e-books, guided meditations) are delivered via email immediately after purchase confirmation."
        },
        {
          subtitle: "Fragile Items",
          text: "Fragile items such as crystal bowls, incense holders, and delicate jewelry are shipped with extra care and may require signature confirmation for delivery."
        },
        {
          subtitle: "Large Items",
          text: "Large items like meditation cushions, altars, and furniture may require special handling and longer delivery times. We will contact you with specific delivery arrangements."
        }
      ]
    },
    {
      icon: Globe,
      title: "Shipping Destinations",
      content: [
        {
          subtitle: "Domestic Shipping",
          text: "We ship to all 50 US states, Washington DC, and US territories. Standard shipping rates apply to continental US addresses. Alaska, Hawaii, and territories may have additional charges."
        },
        {
          subtitle: "International Shipping",
          text: "We ship to most countries worldwide. International shipping rates and delivery times vary by location. Some countries may have restrictions on certain products."
        },
        {
          subtitle: "Restricted Items",
          text: "Some products may be restricted in certain countries due to local regulations. We will notify you if your order contains restricted items for your destination."
        },
        {
          subtitle: "Customs and Duties",
          text: "International customers are responsible for any customs duties, taxes, or import fees. These charges are not included in our shipping costs and are collected by local authorities."
        }
      ]
    },
    {
      icon: Clock,
      title: "Delivery and Tracking",
      content: [
        {
          subtitle: "Tracking Information",
          text: "All orders include tracking information that will be sent to your email address. You can also track your order through your account dashboard on our website."
        },
        {
          subtitle: "Delivery Attempts",
          text: "Most carriers will make multiple delivery attempts. If delivery fails, packages may be held at a local facility for pickup. You will receive notification of delivery status."
        },
        {
          subtitle: "Signature Requirements",
          text: "Orders over $200 or containing fragile items may require signature confirmation. You will be notified if signature confirmation is required for your order."
        },
        {
          subtitle: "Delivery Issues",
          text: "If you experience delivery issues, please contact us within 7 days of the expected delivery date. We will work with the carrier to resolve any problems."
        }
      ]
    },
    {
      icon: AlertTriangle,
      title: "Shipping Restrictions and Limitations",
      content: [
        {
          subtitle: "Weather Delays",
          text: "Severe weather conditions may cause shipping delays. We will notify you of any weather-related delays and provide updated delivery estimates."
        },
        {
          subtitle: "Holiday Shipping",
          text: "Shipping schedules may be affected during holidays. We will post holiday shipping deadlines on our website and notify customers of any schedule changes."
        },
        {
          subtitle: "Address Accuracy",
          text: "Please ensure your shipping address is complete and accurate. Incorrect addresses may result in delivery delays or failed deliveries. Address corrections may incur additional fees."
        },
        {
          subtitle: "Package Size and Weight",
          text: "Some shipping methods have size and weight limitations. We will contact you if your order exceeds these limits to arrange alternative shipping options."
        }
      ]
    },
    {
      icon: CheckCircle,
      title: "Returns and Exchanges",
      content: [
        {
          subtitle: "Return Shipping",
          text: "Returns must be initiated within 30 days of delivery. Return shipping costs are the responsibility of the customer unless the item is defective or damaged."
        },
        {
          subtitle: "Damaged Items",
          text: "If you receive a damaged item, please contact us within 7 days of delivery. We will provide a prepaid return label and process a replacement or refund."
        },
        {
          subtitle: "Incorrect Items",
          text: "If you receive an incorrect item, we will provide a prepaid return label and ship the correct item at no additional cost."
        },
        {
          subtitle: "Return Process",
          text: "All returns must be in original condition and packaging. We will inspect returned items and may refuse returns that do not meet our return policy requirements."
        }
      ]
    }
  ];

  const shippingRates = [
    {
      method: "Standard Ground",
      time: "5-7 business days",
      cost: "$5.99",
      description: "Most economical option for non-urgent orders"
    },
    {
      method: "Express",
      time: "2-3 business days",
      cost: "$12.99",
      description: "Faster delivery for time-sensitive orders"
    },
    {
      method: "Overnight",
      time: "1 business day",
      cost: "$24.99",
      description: "Available for most US destinations"
    },
    {
      method: "International",
      time: "7-21 business days",
      cost: "Varies by location",
      description: "Rates calculated at checkout"
    }
  ];

  const shippingTimeline = [
    {
      icon: Clock,
      title: "Order Placed",
      description: "Immediate order confirmation sent"
    },
    {
      icon: Package,
      title: "Processing",
      description: "1-3 business days (up to 5 during peak periods)"
    },
    {
      icon: Truck,
      title: "Shipped",
      description: "Tracking information provided"
    },
    {
      icon: CheckCircle,
      title: "Delivered",
      description: "5-7 business days for standard shipping"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-primary-glow/5 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Truck className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Shipping Policy
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            We carefully package and ship your spiritual products with the same care and intention 
            that goes into selecting them for your journey.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>
      </section>

      {/* Shipping Rates */}
      <section className="py-8 bg-green-50 dark:bg-green-950/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-200 flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Shipping Rates and Methods
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {shippingRates.map((rate, index) => (
                  <div key={index} className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-green-800 dark:text-green-200">
                        {rate.method}
                      </h4>
                      <span className="text-lg font-bold text-green-700 dark:text-green-300">
                        {rate.cost}
                      </span>
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400 mb-1">
                      {rate.time}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      {rate.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Shipping Timeline */}
      <section className="py-8 bg-blue-50 dark:bg-blue-950/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-blue-800 dark:text-blue-200 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Shipping Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {shippingTimeline.map((step, index) => (
                  <div key={index} className="text-center p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <div className="flex justify-center mb-2">
                      <step.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 text-sm mb-1">
                      {step.title}
                    </h4>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Shipping Policy Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <Card key={index} className="mystical-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <section.icon className="w-5 h-5 text-primary" />
                    </div>
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h4 className="font-semibold text-foreground mb-2">
                        {item.subtitle}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Special Handling */}
          <Card className="mt-12 mystical-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Package className="w-5 h-5 text-primary" />
                Special Handling and Care
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Crystal Care</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• All crystals are individually wrapped in protective materials</li>
                    <li>• Fragile crystals are double-boxed for extra protection</li>
                    <li>• Each crystal includes care instructions</li>
                    <li>• Sacred items are blessed before shipping</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Packaging Standards</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Eco-friendly packaging materials when possible</li>
                    <li>• Recyclable and biodegradable options available</li>
                    <li>• Secure packaging to prevent damage</li>
                    <li>• Clear labeling for fragile items</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mt-8 mystical-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-primary" />
                Contact Us About Shipping
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have questions about shipping or need assistance with your order, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span>Email: shipping@mapmysoul.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Phone: +1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Response time: Within 24 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Hours: Monday-Friday, 9 AM - 6 PM EST</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <div className="mt-8 p-6 bg-muted/50 rounded-lg">
            <h3 className="font-semibold text-foreground mb-3">Additional Information</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong>Order Tracking:</strong> Track your order through your account dashboard or using the 
                tracking number provided in your shipping confirmation email.
              </p>
              <p>
                <strong>Delivery Notifications:</strong> We'll send you email updates at each stage of the 
                shipping process, from order confirmation to delivery.
              </p>
              <p>
                <strong>Shipping Insurance:</strong> All orders include basic shipping insurance. Additional 
                insurance is available for high-value items.
              </p>
              <p>
                <strong>Holiday Shipping:</strong> Check our website for holiday shipping deadlines and 
                schedule changes during peak periods.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ShippingPolicy;
