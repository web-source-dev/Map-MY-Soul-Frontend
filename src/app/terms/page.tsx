"use client";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Shield, Users, CreditCard, Heart, AlertTriangle, CheckCircle, Calendar } from "lucide-react";

const TermsAndConditions = () => {
  const lastUpdated = "December 2024";

  const sections = [
    {
      icon: FileText,
      title: "Acceptance of Terms",
      content: [
        {
          subtitle: "Agreement to Terms",
          text: "By accessing and using MapMySoul's platform, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services."
        },
        {
          subtitle: "Modifications",
          text: "We reserve the right to modify these terms at any time. We will notify users of significant changes via email or through our platform. Continued use after changes constitutes acceptance of the new terms."
        },
        {
          subtitle: "Eligibility",
          text: "You must be at least 18 years old to use our services. If you are under 18, you may only use our services with the involvement and consent of a parent or guardian."
        }
      ]
    },
    {
      icon: Users,
      title: "User Accounts and Responsibilities",
      content: [
        {
          subtitle: "Account Creation",
          text: "You are responsible for providing accurate and complete information when creating your account. You must maintain the security of your account credentials and notify us immediately of any unauthorized use."
        },
        {
          subtitle: "User Conduct",
          text: "You agree to use our platform respectfully and ethically. This includes treating healers and other users with respect, maintaining confidentiality of session information, and not engaging in harmful or disruptive behavior."
        },
        {
          subtitle: "Spiritual Disclaimer",
          text: "Our services are for spiritual and wellness purposes only. We do not provide medical, psychological, or legal advice. Always consult qualified professionals for medical or mental health concerns."
        },
        {
          subtitle: "Prohibited Activities",
          text: "You may not use our platform for illegal activities, harassment, fraud, or to harm others. We reserve the right to terminate accounts that violate these terms."
        }
      ]
    },
    {
      icon: Heart,
      title: "Healing Services",
      content: [
        {
          subtitle: "Service Descriptions",
          text: "We provide a platform connecting users with spiritual healers and practitioners. Individual healers are responsible for their own practices, qualifications, and the specific services they offer."
        },
        {
          subtitle: "Session Bookings",
          text: "All sessions must be booked through our platform. Cancellations must be made at least 24 hours in advance unless otherwise specified by the individual healer."
        },
        {
          subtitle: "Video Sessions",
          text: "Video sessions are conducted through secure third-party platforms. Users are responsible for having appropriate technology and a private, quiet space for sessions."
        },
        {
          subtitle: "Session Outcomes",
          text: "We cannot guarantee specific outcomes from healing sessions. Results vary based on individual circumstances and commitment to the healing process."
        }
      ]
    },
    {
      icon: CreditCard,
      title: "Payment and Billing",
      content: [
        {
          subtitle: "Service Fees",
          text: "All fees are clearly displayed before booking. Prices may vary by healer and service type. We reserve the right to modify pricing with appropriate notice."
        },
        {
          subtitle: "Payment Processing",
          text: "Payments are processed securely through third-party payment processors. We do not store your complete payment information on our servers."
        },
        {
          subtitle: "Refunds",
          text: "Refund policies vary by service type and healer. Please refer to our Refund Policy for detailed information about cancellation and refund procedures."
        },
        {
          subtitle: "Subscription Services",
          text: "Some services may be offered on a subscription basis. Subscriptions will automatically renew unless cancelled before the renewal date."
        }
      ]
    },
    {
      icon: Shield,
      title: "Privacy and Data Protection",
      content: [
        {
          subtitle: "Data Collection",
          text: "We collect and process personal information as described in our Privacy Policy. By using our services, you consent to our data practices."
        },
        {
          subtitle: "Confidentiality",
          text: "We maintain strict confidentiality of your personal information and session details. However, we may disclose information if required by law or to protect safety."
        },
        {
          subtitle: "Data Security",
          text: "We implement appropriate security measures to protect your information, but no method of transmission over the internet is 100% secure."
        }
      ]
    },
    {
      icon: AlertTriangle,
      title: "Limitations and Disclaimers",
      content: [
        {
          subtitle: "Service Availability",
          text: "We strive to maintain platform availability but cannot guarantee uninterrupted service. We are not liable for any damages resulting from service interruptions."
        },
        {
          subtitle: "Third-Party Services",
          text: "Our platform integrates with third-party services (payment processors, video platforms, etc.). We are not responsible for the privacy practices or content of these services."
        },
        {
          subtitle: "Limitation of Liability",
          text: "To the maximum extent permitted by law, MapMySoul shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services."
        },
        {
          subtitle: "Indemnification",
          text: "You agree to indemnify and hold harmless MapMySoul from any claims arising from your use of our services or violation of these terms."
        }
      ]
    },
    {
      icon: CheckCircle,
      title: "Intellectual Property",
      content: [
        {
          subtitle: "Platform Content",
          text: "All content on our platform, including text, graphics, logos, and software, is owned by MapMySoul or our licensors and is protected by copyright laws."
        },
        {
          subtitle: "User Content",
          text: "You retain ownership of content you submit to our platform. By submitting content, you grant us a license to use, display, and distribute it in connection with our services."
        },
        {
          subtitle: "Trademarks",
          text: "MapMySoul and related trademarks are our property. You may not use our trademarks without our written permission."
        }
      ]
    }
  ];

  const importantNotes = [
    {
      icon: AlertTriangle,
      title: "Medical Disclaimer",
      description: "Our services are not a substitute for professional medical, psychological, or legal advice. Always consult qualified professionals for serious health concerns."
    },
    {
      icon: Shield,
      title: "Emergency Situations",
      description: "If you are experiencing a medical emergency or mental health crisis, please contact emergency services immediately (911 in the US)."
    },
    {
      icon: Users,
      title: "Healer Qualifications",
      description: "While we vet our healers, we cannot guarantee their qualifications or the effectiveness of their services. Users should research healers independently."
    },
    {
      icon: Calendar,
      title: "Session Scheduling",
      description: "All sessions are subject to healer availability. We recommend booking sessions well in advance to secure your preferred time."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary-indigo/10 via-primary-lavender/5 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary-indigo/10 rounded-full">
              <FileText className="w-8 h-8 text-primary-indigo" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Terms and Conditions
          </h1>
          <p className="text-lg text-foreground/60 leading-relaxed mb-4">
            These terms govern your use of MapMySoul&apos;s spiritual healing platform. Please read them carefully 
            before using our services.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-foreground/60">
            <Calendar className="w-4 h-4" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="py-8 bg-amber-50 dark:bg-amber-950/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-amber-200 dark:border-amber-800">
            <CardHeader>
              <CardTitle className="text-amber-800 dark:text-amber-200 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Legal Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed">
                These terms are provided for informational purposes only and do not constitute legal advice. 
                We recommend consulting with a legal professional to understand how these terms apply to your 
                specific situation. Your use of our services indicates acceptance of these terms.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Terms Content */}
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

          {/* Important Notes */}
          <Card className="mt-12 mystical-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-primary-indigo" />
                Important Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {importantNotes.map((note, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-1 mt-1">
                      <note.icon className="w-4 h-4 text-primary-indigo" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {note.title}
                      </h4>
                      <p className="text-sm text-foreground/60">
                        {note.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mt-8 mystical-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary-indigo" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/60 mb-4">
                If you have questions about these Terms and Conditions, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span>Email: info@mapmysoul.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Phone: +1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Response time: Within 3-5 business days</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <div className="mt-8 p-6 bg-muted/50 rounded-lg">
            <h3 className="font-semibold text-foreground mb-3">Governing Law</h3>
            <div className="space-y-3 text-sm text-foreground/60">
              <p>
                These Terms and Conditions are governed by the laws of the state where MapMySoul is incorporated. 
                Any disputes arising from these terms or your use of our services will be resolved in the courts 
                of that jurisdiction.
              </p>
              <p>
                <strong>Severability:</strong> If any provision of these terms is found to be unenforceable, 
                the remaining provisions will continue in full force and effect.
              </p>
              <p>
                <strong>Entire Agreement:</strong> These terms constitute the entire agreement between you and 
                MapMySoul regarding your use of our services, superseding any prior agreements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TermsAndConditions;
