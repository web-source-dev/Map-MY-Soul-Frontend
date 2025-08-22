import { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import NewsletterPopup from "@/components/NewsletterPopup";
import { useNewsletterPopup } from "@/hooks/use-newsletter-popup";

interface QuizLayoutProps {
  children: ReactNode;
}

const QuizLayout = ({ children }: QuizLayoutProps) => {
  const { isOpen, closePopup } = useNewsletterPopup();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <NewsletterPopup isOpen={isOpen} onClose={closePopup} />
    </div>
  );
};

export default QuizLayout;
