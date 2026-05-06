"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import Logo from "@/images/NDPCC 01.png";

export function Footer() {
  return (
    <footer className="w-full border-t bg-slate-50 pt-20 pb-12">
      <div className="container mx-auto px-4 md:px-8">
        {/* Strictly follow 2 items mobile / 3 items desktop grid with larger font */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          
          {/* Logo & Info Section - Spans 2 cols on mobile */}
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative h-14 w-14 overflow-hidden rounded-full border border-primary/10 bg-white">
                <Image 
                  src={Logo} 
                  alt="N.D.P.C.C. Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-headline font-bold text-primary leading-tight">
                Nayoth Divine Power<br/>Christian Center
              </span>
            </Link>
            <p className="text-base text-muted-foreground leading-relaxed max-w-sm">
              "Ngome ya Bwana kwa Makimbilio ya Watu Wake". Tumeitwa kuliandaa kanisa kwa unyakuo na kuinua jeshi la Bwana tangu mwaka 1992.
            </p>
            <div className="flex gap-6 mt-2">
              <Link href="#" className="text-primary/60 hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-primary/60 hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-primary/60 hover:text-primary transition-colors">
                <Youtube className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Links Section */}
          <div className="col-span-1 space-y-6">
            <h3 className="font-headline font-bold text-lg border-l-4 border-primary pl-4 uppercase tracking-widest text-xs text-primary">Kurasa</h3>
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-base text-muted-foreground hover:text-primary font-medium">Mwanzo</Link>
              <Link href="/about" className="text-base text-muted-foreground hover:text-primary font-medium">Kuhusu Sisi</Link>
              <Link href="/sermons" className="text-base text-muted-foreground hover:text-primary font-medium">Neno</Link>
              <Link href="/events" className="text-base text-muted-foreground hover:text-primary font-medium">Matukio</Link>
              <Link href="/gallery" className="text-base text-muted-foreground hover:text-primary font-medium">Picha</Link>
            </div>
          </div>

          {/* Contact Section */}
          <div className="col-span-1 space-y-6">
            <h3 className="font-headline font-bold text-lg border-l-4 border-primary pl-4 uppercase tracking-widest text-xs text-primary">Wasiliana</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3 text-base text-muted-foreground">
                <MapPin className="h-6 w-6 text-primary shrink-0" />
                <span>Mwanzo Mpya, Kimbunga, Tanzania</span>
              </li>
              <li className="flex items-center gap-3 text-base text-muted-foreground">
                <Phone className="h-6 w-6 text-primary shrink-0" />
                <span>+255 NDPCC</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-20 pt-10 border-t flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-muted-foreground uppercase tracking-[0.2em] font-bold">
          <p>© {new Date().getFullYear()} N.D.P.C.C. Haki zote zimehifadhiwa.</p>
          <div className="flex gap-8">
            <Link href="/login" className="hover:text-primary">Staff Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}