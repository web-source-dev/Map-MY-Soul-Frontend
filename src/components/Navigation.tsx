"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, User, Sparkles, LogOut, Crown, ChevronDown, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { LogoutButton } from "@/components/auth/LogoutButton";
import CartDrawer from "./CartDrawer";
import WishlistDrawer from "./WishlistDrawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Logo URL from Wixstatic CDN
const logoUrl = "https://static.wixstatic.com/media/bdbc7d_0c6ab12123064711a5f85e34030152c8~mv2.png/v1/fill/w_536,h_531,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/bdbc7d_0c6ab12123064711a5f85e34030152c8~mv2.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, isAdmin, user } = useAuth();

  const router = useRouter();
  const isActive = (path: string) => pathname === path;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Quiz", path: "/quiz" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-background/80 backdrop-blur-xl border-b border-border sticky top-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Image 
                src={logoUrl} 
                alt="MapMySoul" 
                width={48}
                height={48}
                className="w-12 h-12 transition-all duration-200 group-hover:scale-105" 
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(item.path) 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <WishlistDrawer />
            <CartDrawer />
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-lg flex items-center space-x-2 hover:bg-muted/50">
                                                            <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.displayName || user?.firstName} />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                        {user?.firstName ? user.firstName.charAt(0).toUpperCase() : 
                         user?.displayName ? user.displayName.charAt(0).toUpperCase() : 
                         user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium text-foreground">
                        {user?.displayName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'User'}
                      </span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.displayName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'User'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                      {isAdmin && (
                        <div className="flex items-center mt-1">
                          <Crown className="h-3 w-3 text-yellow-600 mr-1" />
                          <span className="text-xs text-yellow-600 font-medium">Administrator</span>
                        </div>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Profile Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <LogoutButton variant="ghost" className="w-full justify-start p-0 h-auto">
                      <span>Sign Out</span>
                    </LogoutButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth">
                <Button variant="ghost" size="sm" className="rounded-lg">
                  <User className="w-4 h-4" />
                  <span className="ml-2 text-sm">Sign In</span>
                </Button>
              </Link>
            )}
            
            <Button 
              variant="default" 
              size="sm" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-4 py-2 rounded-lg shadow-soft transition-all duration-200"
              onClick={() => router.push('/quiz')}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Take Quiz
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="rounded-lg"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`block text-sm font-medium transition-colors hover:text-primary rounded-lg px-3 py-2 ${
                    isActive(item.path) ? "text-primary bg-primary/10" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <div className="flex gap-2">
                  <WishlistDrawer />
                  <CartDrawer />
                </div>
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center px-3 py-2 text-sm text-muted-foreground">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={user?.avatar} alt={user?.displayName || user?.firstName} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                          {user?.firstName ? user.firstName.charAt(0).toUpperCase() : 
                           user?.displayName ? user.displayName.charAt(0).toUpperCase() : 
                           user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">
                          {user?.displayName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'User'}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {user?.email}
                        </span>
                        {isAdmin && (
                          <div className="flex items-center mt-1">
                            <Crown className="h-3 w-3 text-yellow-600 mr-1" />
                            <span className="text-xs text-yellow-600 font-medium">Administrator</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Link href="/dashboard">
                      <Button variant="outline" size="sm" className="w-full rounded-lg">
                        <User className="w-4 h-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <Link href="/dashboard/profile">
                      <Button variant="outline" size="sm" className="w-full rounded-lg">
                        <Settings className="w-4 h-4 mr-2" />
                        Profile Settings
                      </Button>
                    </Link>
                    <LogoutButton variant="outline" size="sm" className="w-full rounded-lg">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </LogoutButton>
                  </>
                ) : (
                  <Link href="/auth">
                    <Button variant="outline" size="sm" className="w-full rounded-lg">
                      <User className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                )}
                <Button variant="default" size="sm" className="w-full rounded-lg" onClick={() => router.push('/quiz')}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Take Quiz
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;