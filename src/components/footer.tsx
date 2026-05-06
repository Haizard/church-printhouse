"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import Logo from "@/images/NDPCC 01.png";

export function Footer() {
  return (
    <footer className="w-full border-t bg-muted/30 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        {/* Strictly follow 2 items mobile / 3 items desktop grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Logo & Info Section - Spans 2 cols on mobile */}
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-primary/10 bg-white">
                <Image 
                  src={Logo} 
                  alt="N.D.P.C.C. Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-headline font-bold text-primary leading-tight">
                Nayoth Divine Power<br/>Christian Center
              </span>
            </Link>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              "Ngome ya Bwana kwa Makimbilio ya Watu Wake". Tumeitwa kuliandaa kanisa kwa unyakuo na kuinua jeshi tangu mwaka 1992.
            </p>
            <div className="flex gap-4 mt-2">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Links Section */}
          <div className="col-span-1 space-y-4">
            <h3 className="font-headline font-bold text-sm mb-4 border-l-2 border-primary pl-2 uppercase tracking-widest text-[10px]">Kurasa</h3>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-[10px] text-muted-foreground hover:text-primary font-medium">Mwanzo</Link>
              <Link href="/about" className="text-[10px] text-muted-foreground hover:text-primary font-medium">Kuhusu Sisi</Link>
              <Link href="/sermons" className="text-[10px] text-muted-foreground hover:text-primary font-medium">Neno</Link>
              <Link href="/events" className="text-[10px] text-muted-foreground hover:text-primary font-medium">Matukio</Link>
              <Link href="/gallery" className="text-[10px] text-muted-foreground hover:text-primary font-medium">Picha</Link>
            </div>
          </div>

          {/* Contact Section */}
          <div className="col-span-1 space-y-4">
            <h3 className="font-headline font-bold text-sm mb-4 border-l-2 border-primary pl-2 uppercase tracking-widest text-[10px]">Wasiliana</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-[10px] text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>Mwanzo Mpya, Kimbunga, Tanzania</span>
              </li>
              <li className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>+255 NDPCC</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] text-muted-foreground uppercase tracking-widest">
          <p>© {new Date().getFullYear()} N.D.P.C.C. Haki zote zimehifadhiwa.</p>
          <div className="flex gap-4">
            <Link href="/login" className="hover:text-primary font-bold">Staff Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
