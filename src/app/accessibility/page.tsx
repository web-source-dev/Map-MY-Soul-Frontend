"use client";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accessibility, Eye, Ear, Hand, Brain, Heart, CheckCircle, AlertCircle } from "lucide-react";

const AccessibilityStatement = () => {
  const lastUpdated = "December 2024";

  const sections = [
    {
      icon: Accessibility,
      title: "Our Commitment to Accessibility",
      content: [
        {
          subtitle: "Inclusive Design Philosophy",
          text: "At MapMySoul, we believe that spiritual healing and wellness should be accessible to everyone, regardless of their abilities. We are committed to creating an inclusive digital experience that welcomes all users on their spiritual journey."
        },
        {
          subtitle: "Ongoing Improvement",
          text: "We continuously work to improve the accessibility of our platform, regularly reviewing and updating our features to ensure they meet the needs of users with diverse abilities."
        },
        {
          subtitle: "User Feedback",
          text: "We welcome feedback from users with disabilities. Your input helps us identify areas for improvement and ensures our platform serves the entire spiritual community."
        }
      ]
    },
    {
      icon: Eye,
      title: "Visual Accessibility",
      content: [
        {
          subtitle: "Color Contrast",
          text: "Our website uses high contrast color combinations that meet WCAG 2.1 AA standards, ensuring text is readable for users with visual impairments."
        },
        {
          subtitle: "Text Scaling",
          text: "Users can zoom in up to 200% without losing functionality, and our responsive design adapts to different screen sizes and zoom levels."
        },
        {
          subtitle: "Alternative Text",
          text: "All images include descriptive alt text, and decorative images are marked appropriately to avoid confusion for screen reader users."
        },
        {
          subtitle: "Focus Indicators",
          text: "Clear focus indicators are provided for all interactive elements, making navigation easier for keyboard and screen reader users."
        }
      ]
    },
    {
      icon: Ear,
      title: "Audio and Video Accessibility",
      content: [
        {
          subtitle: "Video Sessions",
          text: "Our video healing sessions support real-time captioning and can accommodate sign language interpreters. Users can request these accommodations when booking sessions."
        },
        {
          subtitle: "Audio Content",
          text: "All audio content, including guided meditations and spiritual teachings, is accompanied by transcripts or written alternatives."
        },
        {
          subtitle: "Volume Controls",
          text: "Users have full control over audio settings, including the ability to mute, adjust volume, and control playback speed."
        }
      ]
    },
    {
      icon: Hand,
      title: "Motor and Physical Accessibility",
      content: [
        {
          subtitle: "Keyboard Navigation",
          text: "Our entire website can be navigated using only a keyboard, with logical tab order and keyboard shortcuts for common actions."
        },
        {
          subtitle: "Click Targets",
          text: "All clickable elements are sized appropriately (minimum 44x44 pixels) to accommodate users with motor difficulties."
        },
        {
          subtitle: "Time Limits",
          text: "Where time limits exist (such as session booking), users can extend or disable them to accommodate their needs."
        }
      ]
    },
    {
      icon: Brain,
      title: "Cognitive Accessibility",
      content: [
        {
          subtitle: "Clear Language",
          text: "We use clear, simple language throughout our platform, avoiding unnecessary jargon while maintaining the spiritual depth of our content."
        },
        {
          subtitle: "Consistent Navigation",
          text: "Our navigation structure is consistent across all pages, helping users understand and predict where to find information."
        },
        {
          subtitle: "Error Prevention",
          text: "We provide clear error messages and confirmation dialogs to help users avoid and correct mistakes."
        },
        {
          subtitle: "Session Management",
          text: "Users can easily reschedule or cancel sessions, with clear instructions and multiple confirmation steps to prevent accidental changes."
        }
      ]
    },
    {
      icon: Heart,
      title: "Emotional and Spiritual Accessibility",
      content: [
        {
          subtitle: "Trauma-Informed Design",
          text: "Our platform is designed with trauma-informed principles, providing gentle, non-triggering content and allowing users to control their exposure to sensitive topics."
        },
        {
          subtitle: "Personalized Experience",
          text: "Users can customize their experience, including filtering content based on their comfort level and spiritual preferences."
        },
        {
          subtitle: "Support Resources",
          text: "We provide easy access to support resources, crisis hotlines, and information about when to seek professional mental health care."
        }
      ]
    }
  ];

  const complianceInfo = [
    {
      icon: CheckCircle,
      title: "WCAG 2.1 AA Compliance",
      description: "We strive to meet Web Content Accessibility Guidelines (WCAG) 2.1 AA standards across our platform."
    },
    {
      icon: CheckCircle,
      title: "Screen Reader Compatibility",
      description: "Our website is compatible with popular screen readers including JAWS, NVDA, and VoiceOver."
    },
    {
      icon: CheckCircle,
      title: "Mobile Accessibility",
      description: "Our mobile app and responsive website maintain accessibility features across all devices."
    },
    {
      icon: AlertCircle,
      title: "Known Limitations",
      description: "Some third-party integrations may have accessibility limitations. We work with providers to improve accessibility."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-primary-glow/5 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Accessibility className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Accessibility Statement
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            We believe spiritual healing should be accessible to everyone. This statement outlines our commitment 
            to creating an inclusive experience for all users.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>
      </section>

      {/* Accessibility Content */}
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

          {/* Compliance Information */}
          <Card className="mt-12 mystical-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary" />
                Compliance and Standards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {complianceInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-1 mt-1">
                      <info.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {info.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {info.description}
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
                <Accessibility className="w-5 h-5 text-primary" />
                Contact Us About Accessibility
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We welcome your feedback on accessibility. If you encounter any barriers or have suggestions 
                for improvement, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span>Email: accessibility@mapmysoul.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Phone: +1 (555) 123-4567 (TTY available)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Response time: Within 2 business days</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Resources */}
          <div className="mt-8 p-6 bg-muted/50 rounded-lg">
            <h3 className="font-semibold text-foreground mb-3">Additional Resources</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong>Browser Accessibility:</strong> Most browsers offer built-in accessibility features. 
                Check your browser&apos;s help section for information about zoom, text scaling, and keyboard navigation.
              </p>
              <p>
                <strong>Assistive Technology:</strong> Our platform is compatible with various assistive 
                technologies. Contact us for specific compatibility information.
              </p>
              <p>
                <strong>Training and Support:</strong> We provide training materials and support for users 
                who need assistance navigating our platform.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AccessibilityStatement;
