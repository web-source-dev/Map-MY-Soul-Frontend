import { ReactNode } from "react";
import Navigation from "@/components/Navigation";

interface QuizLayoutProps {
  children: ReactNode;
}

const QuizLayout = ({ children }: QuizLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default QuizLayout;
