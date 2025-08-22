import { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import NewsletterPopup from "@/components/NewsletterPopup";
import { useNewsletterPopup } from "@/hooks/use-newsletter-popup";

interface LayoutProps {
  children: ReactNode;
  isFooter?: boolean;
}

const Layout = ({ children, isFooter = true }: LayoutProps) => {
  const { isOpen, closePopup } = useNewsletterPopup();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      {isFooter && <Footer />}
      <NewsletterPopup isOpen={isOpen} onClose={closePopup} />
    </div>
  );
};

export default Layout;