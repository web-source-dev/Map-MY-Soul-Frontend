"use client";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, Users, Globe, Mail, Phone, Calendar } from "lucide-react";

const PrivacyPolicy = () => {
  const lastUpdated = "December 2024";

  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          text: "We collect information you provide directly to us, such as when you create an account, take our spiritual assessment quiz, book healing sessions, purchase products, or contact us for support. This may include your name, email address, phone number, date of birth, location, and spiritual preferences."
        },
        {
          subtitle: "Quiz and Assessment Data",
          text: "When you take our spiritual assessment quiz, we collect your responses to provide personalized recommendations for healers, services, and products that align with your spiritual journey and wellness goals."
        },
        {
          subtitle: "Session and Booking Information",
          text: "We collect information about your healing sessions, including session notes, preferences, and feedback to improve your experience and provide better recommendations."
        },
        {
          subtitle: "Payment Information",
          text: "We collect payment information when you purchase services or products, but we do not store your complete payment details. Payment processing is handled securely by our third-party payment processors."
        },
        {
          subtitle: "Usage Information",
          text: "We automatically collect certain information about your use of our platform, including your IP address, browser type, device information, pages visited, and time spent on our website."
        }
      ]
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Providing Our Services",
          text: "We use your information to provide, maintain, and improve our spiritual healing platform, including processing bookings, facilitating video sessions, and delivering personalized recommendations."
        },
        {
          subtitle: "Personalization",
          text: "We use your quiz responses and preferences to create personalized recommendations for healers, services, and products that match your spiritual journey and wellness goals."
        },
        {
          subtitle: "Communication",
          text: "We use your contact information to send you important updates about your sessions, respond to your inquiries, and provide customer support."
        },
        {
          subtitle: "Marketing and Updates",
          text: "With your consent, we may send you newsletters, spiritual insights, and information about new services or products that may interest you."
        },
        {
          subtitle: "Analytics and Improvement",
          text: "We analyze usage patterns to improve our platform, develop new features, and enhance the overall user experience."
        }
      ]
    },
    {
      icon: Users,
      title: "Information Sharing and Disclosure",
      content: [
        {
          subtitle: "Healers and Practitioners",
          text: "We share relevant information with healers and practitioners to facilitate your sessions, including your name, contact information, and spiritual assessment results to ensure personalized care."
        },
        {
          subtitle: "Service Providers",
          text: "We work with trusted third-party service providers who help us operate our platform, including payment processors, video conferencing services, and analytics providers."
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose your information if required by law, court order, or government regulation, or if we believe such disclosure is necessary to protect our rights or the safety of others."
        },
        {
          subtitle: "Business Transfers",
          text: "In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction, subject to the same privacy protections."
        },
        {
          subtitle: "With Your Consent",
          text: "We will not share your personal information with third parties for marketing purposes without your explicit consent."
        }
      ]
    },
    {
      icon: Shield,
      title: "Data Security and Protection",
      content: [
        {
          subtitle: "Security Measures",
          text: "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
        },
        {
          subtitle: "Encryption",
          text: "We use industry-standard encryption to protect data in transit and at rest, ensuring your sensitive information remains secure."
        },
        {
          subtitle: "Access Controls",
          text: "We limit access to your personal information to authorized employees and service providers who need it to perform their duties."
        },
        {
          subtitle: "Regular Audits",
          text: "We regularly review and update our security practices to maintain the highest standards of data protection."
        }
      ]
    },
    {
      icon: Globe,
      title: "Your Rights and Choices",
      content: [
        {
          subtitle: "Access and Update",
          text: "You have the right to access, update, or correct your personal information at any time through your account settings or by contacting us."
        },
        {
          subtitle: "Data Portability",
          text: "You can request a copy of your personal information in a structured, machine-readable format."
        },
        {
          subtitle: "Deletion",
          text: "You may request deletion of your personal information, subject to certain legal and contractual obligations."
        },
        {
          subtitle: "Marketing Preferences",
          text: "You can opt out of marketing communications at any time by clicking the unsubscribe link in our emails or updating your preferences in your account."
        },
        {
          subtitle: "Session Recording",
          text: "You have control over whether your healing sessions are recorded, and you can withdraw consent for recording at any time."
        }
      ]
    },
    {
      icon: Calendar,
      title: "Data Retention",
      content: [
        {
          subtitle: "Retention Period",
          text: "We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements."
        },
        {
          subtitle: "Account Deletion",
          text: "When you delete your account, we will delete or anonymize your personal information, except where we need to retain certain information for legal or legitimate business purposes."
        },
        {
          subtitle: "Anonymous Data",
          text: "We may retain anonymous, aggregated data for analytics and improvement purposes even after your account is deleted."
        }
      ]
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary-indigo/10 via-primary-lavender/5 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary-indigo/10 rounded-full">
              <Shield className="w-8 h-8 text-primary-indigo" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-foreground/60 leading-relaxed mb-4">
            Your privacy and spiritual journey are sacred to us. This policy explains how we collect, 
            use, and protect your personal information on MapMySoul.
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
                <Shield className="w-5 h-5" />
                Legal Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed">
                The explanations and information provided on this page are only general and high-level 
                explanations and information on how to write your own document of a Privacy Policy. 
                You should not rely on this article as legal advice or as recommendations regarding 
                what you should actually do, because we cannot know in advance what are the specific 
                privacy policies you wish to establish between your business and your customers and 
                visitors. We recommend that you seek legal advice to help you understand and to assist 
                you in the creation of your own Privacy Policy.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Privacy Policy Content */}
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

          {/* Contact Information */}
          <Card className="mt-12 mystical-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-indigo" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/60 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary-indigo" />
                  <span>Email: info@mapmysoul.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary-indigo" />
                  <span>Phone: +1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary-indigo" />
                  <span>Website: www.mapmysoul.com</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
