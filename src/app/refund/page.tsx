"use client";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Clock, CreditCard, Heart, AlertTriangle, CheckCircle, XCircle, Calendar } from "lucide-react";

const RefundPolicy = () => {
  const lastUpdated = "December 2024";

  const sections = [
    {
      icon: RefreshCw,
      title: "General Refund Policy",
      content: [
        {
          subtitle: "Our Commitment",
          text: "At MapMySoul, we are committed to your satisfaction with our spiritual healing services and products. We understand that sometimes services may not meet your expectations, and we want to ensure a fair and transparent refund process."
        },
        {
          subtitle: "Eligibility",
          text: "Refunds are available for most services and products purchased through our platform, subject to the specific terms outlined below. The eligibility and refund amount depend on the type of service, timing of cancellation, and circumstances."
        },
        {
          subtitle: "Processing Time",
          text: "Refunds are typically processed within 5-10 business days after approval. The time for funds to appear in your account depends on your payment method and financial institution."
        }
      ]
    },
    {
      icon: Heart,
      title: "Healing Session Refunds",
      content: [
        {
          subtitle: "Cancellation Policy",
          text: "Sessions cancelled more than 24 hours before the scheduled time are eligible for a full refund. Cancellations made 2-24 hours before the session receive a 50% refund. No refunds are provided for cancellations made less than 2 hours before the session."
        },
        {
          subtitle: "No-Show Policy",
          text: "If you do not attend a scheduled session without prior cancellation, no refund will be provided. We understand emergencies happen, so please contact us as soon as possible if you cannot attend."
        },
        {
          subtitle: "Technical Issues",
          text: "If technical issues prevent a session from occurring and cannot be resolved within 15 minutes of the scheduled start time, you are eligible for a full refund or session rescheduling at no additional cost."
        },
        {
          subtitle: "Healer Cancellations",
          text: "If a healer cancels a session, you will receive a full refund or the option to reschedule at no additional cost. We will notify you as soon as possible if this occurs."
        },
        {
          subtitle: "Session Quality Concerns",
          text: "If you are dissatisfied with a session, please contact us within 48 hours. We will review your concerns and may offer a partial refund or complimentary session with a different healer."
        }
      ]
    },
    {
      icon: CreditCard,
      title: "Product Refunds",
      content: [
        {
          subtitle: "Physical Products",
          text: "Physical products (crystals, books, etc.) may be returned within 30 days of delivery for a full refund, provided they are in original condition and packaging. Return shipping costs are the responsibility of the customer unless the product is defective."
        },
        {
          subtitle: "Digital Products",
          text: "Digital products (e-books, guided meditations, etc.) are generally non-refundable once downloaded, unless there is a technical issue preventing access. Contact us within 7 days of purchase if you experience technical difficulties."
        },
        {
          subtitle: "Defective Products",
          text: "If you receive a defective or damaged product, please contact us within 7 days of delivery. We will provide a full refund or replacement at no additional cost, including return shipping."
        },
        {
          subtitle: "Subscription Products",
          text: "Subscription-based products can be cancelled at any time. You will continue to have access until the end of your current billing period. No refunds are provided for partial months of subscription access."
        }
      ]
    },
    {
      icon: Clock,
      title: "Refund Processing",
      content: [
        {
          subtitle: "Request Process",
          text: "To request a refund, contact our customer support team with your order number, reason for refund, and any relevant details. We will review your request and respond within 2 business days."
        },
        {
          subtitle: "Documentation Required",
          text: "For session refunds, we may require details about the specific issues encountered. For product returns, photos of damaged items may be requested. We reserve the right to request additional information."
        },
        {
          subtitle: "Payment Method Refunds",
          text: "Refunds will be issued to the original payment method used for the purchase. If that method is no longer available, we will work with you to arrange an alternative refund method."
        },
        {
          subtitle: "Partial Refunds",
          text: "In some cases, partial refunds may be offered based on the circumstances and our assessment of the situation. We will clearly explain the reason for any partial refund."
        }
      ]
    },
    {
      icon: AlertTriangle,
      title: "Non-Refundable Items",
      content: [
        {
          subtitle: "Completed Services",
          text: "Once a healing session has been completed, it is generally non-refundable unless there are extenuating circumstances or quality concerns that we determine warrant a refund."
        },
        {
          subtitle: "Gift Certificates",
          text: "Gift certificates and gift cards are non-refundable once purchased, but they can be transferred to another person if needed."
        },
        {
          subtitle: "Donations",
          text: "Charitable donations made through our platform are non-refundable as they are immediately distributed to the intended recipients."
        },
        {
          subtitle: "Special Events",
          text: "Refunds for workshops, retreats, and special events are subject to the specific terms outlined for each event, which may differ from our general refund policy."
        }
      ]
    },
    {
      icon: CheckCircle,
      title: "Special Circumstances",
      content: [
        {
          subtitle: "Medical Emergencies",
          text: "In cases of medical emergencies or serious illness, we may offer refunds or rescheduling options even outside our standard policy. Documentation may be required."
        },
        {
          subtitle: "Bereavement",
          text: "We understand that loss and grief can affect your ability to attend sessions. In cases of bereavement, we may offer refunds or rescheduling with appropriate notice."
        },
        {
          subtitle: "Natural Disasters",
          text: "In cases of natural disasters or other major events that prevent service delivery, we will work with affected customers to provide appropriate refunds or rescheduling."
        },
        {
          subtitle: "Platform Issues",
          text: "If our platform experiences significant technical issues that prevent service delivery, we will provide appropriate refunds or compensation to affected customers."
        }
      ]
    }
  ];

  const refundTimeline = [
    {
      icon: Clock,
      title: "Immediate",
      description: "Cancellations made more than 24 hours before session"
    },
    {
      icon: Clock,
      title: "2-24 Hours",
      description: "50% refund for session cancellations"
    },
    {
      icon: XCircle,
      title: "Less than 2 Hours",
      description: "No refund available"
    },
    {
      icon: RefreshCw,
      title: "5-10 Business Days",
      description: "Refund processing time after approval"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary-indigo/10 via-primary-lavender/5 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary-indigo/10 rounded-full">
              <RefreshCw className="w-8 h-8 text-primary-indigo" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Refund Policy
          </h1>
          <p className="text-lg text-foreground/60 leading-relaxed mb-4">
            We want you to be completely satisfied with your spiritual healing experience. This policy outlines 
            our refund and cancellation procedures.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-foreground/60">
            <Calendar className="w-4 h-4" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="py-8 bg-blue-50 dark:bg-blue-950/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-blue-800 dark:text-blue-200 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Quick Reference Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {refundTimeline.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <item.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <div>
                      <div className="font-semibold text-blue-800 dark:text-blue-200 text-sm">
                        {item.title}
                      </div>
                      <div className="text-blue-600 dark:text-blue-400 text-xs">
                        {item.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Refund Policy Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <Card key={index} className="mystical-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-primary-indigo/10 rounded-lg">
                      <section.icon className="w-5 h-5 text-primary-indigo" />
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
                      <p className="text-foreground/60 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* How to Request a Refund */}
          <Card className="mt-12 mystical-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-primary-indigo" />
                How to Request a Refund
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary-indigo mb-2">1</div>
                    <h4 className="font-semibold text-foreground mb-2">Contact Us</h4>
                    <p className="text-sm text-foreground/60">
                      Email us at info@mapmysoul.com or call +1 (555) 123-4567
                    </p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary-indigo mb-2">2</div>
                    <h4 className="font-semibold text-foreground mb-2">Provide Details</h4>
                    <p className="text-sm text-foreground/60">
                      Include your order number, reason for refund, and relevant information
                    </p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary-indigo mb-2">3</div>
                    <h4 className="font-semibold text-foreground mb-2">Review & Process</h4>
                    <p className="text-sm text-foreground/60">
                      We&apos;ll review your request and process the refund within 2 business days
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mt-8 mystical-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-primary-indigo" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/60 mb-4">
                If you need to request a refund or have questions about our refund policy, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span>Email: info@mapmysoul.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Phone: +1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Response time: Within 2 business days</span>
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
            <div className="space-y-3 text-sm text-foreground/60">
              <p>
                <strong>Dispute Resolution:</strong> If you are dissatisfied with our refund decision, 
                you may request a review by our management team. We are committed to fair resolution of all disputes.
              </p>
              <p>
                <strong>Legal Rights:</strong> This refund policy does not affect your statutory rights. 
                You may have additional rights under consumer protection laws in your jurisdiction.
              </p>
              <p>
                <strong>Policy Updates:</strong> We may update this refund policy from time to time. 
                Significant changes will be communicated to users via email or platform notification.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RefundPolicy;
