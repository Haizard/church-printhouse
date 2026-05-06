
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sprout, Menu, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useUser, useAuth } from "@/firebase";
import { signOut } from "firebase/auth";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Sermons", href: "/sermons" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user } = useUser();
  const auth = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    setIsOpen(false);
    router.push('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="rounded-full bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
              <Sprout className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-headline font-bold text-primary tracking-tight">
              Evergreen Sanctuary
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
          <div className="h-6 w-px bg-border mx-2" />
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-sm font-bold text-primary hover:underline">
                Portal
              </Link>
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout" className="text-muted-foreground hover:text-red-500 transition-colors">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/login">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-4">
          {mounted ? (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-8 py-12">
                  <Link 
                    href="/" 
                    className="flex items-center gap-2 mb-4"
                    onClick={() => setIsOpen(false)}
                  >
                    <Sprout className="h-6 w-6 text-primary" />
                    <span className="text-xl font-headline font-bold text-primary">
                      Evergreen Sanctuary
                    </span>
                  </Link>
                  <div className="flex flex-col gap-6">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "text-lg font-medium transition-colors hover:text-primary",
                          pathname === item.href ? "text-primary" : "text-muted-foreground"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <Separator />
                    {user ? (
                      <div className="flex flex-col gap-4">
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 text-lg font-medium text-primary"
                          onClick={() => setIsOpen(false)}
                        >
                          <User className="h-5 w-5" />
                          Admin Portal
                        </Link>
                        <Button 
                          variant="destructive" 
                          className="w-full justify-start rounded-xl"
                          onClick={handleLogout}
                        >
                          <LogOut className="mr-2 h-5 w-5" /> Sign Out
                        </Button>
                      </div>
                    ) : (
                      <Link
                        href="/login"
                        className="flex items-center gap-2 text-lg font-medium text-muted-foreground hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        <User className="h-5 w-5" />
                        Staff Login
                      </Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
