import { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: ReactNode;
  isFooter?: boolean;
}

const Layout = ({ children, isFooter = true }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      {isFooter && <Footer />}
    </div>
  );
};

export default Layout;