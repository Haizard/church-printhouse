"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import Logo from "@/images/NDPCC 01.png";

export function Footer() {
  return (
    <footer className="w-full border-t bg-slate-50 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-8">
        {/* Strictly follow 2 items mobile / 3 items desktop grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          
          {/* Logo & Info Section - Spans 2 cols on mobile */}
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-8">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border border-primary/10 bg-white">
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
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              "Ngome ya Bwana kwa Makimbilio ya Watu Wake". Tumeitwa kuliandaa kanisa kwa unyakuo na kuinua jeshi la Bwana tangu mwaka 1992.
            </p>
            <div className="flex gap-8 mt-4">
              <Link href="#" className="text-primary/60 hover:text-primary transition-colors">
                <Facebook className="h-7 w-7" />
              </Link>
              <Link href="#" className="text-primary/60 hover:text-primary transition-colors">
                <Instagram className="h-7 w-7" />
              </Link>
              <Link href="#" className="text-primary/60 hover:text-primary transition-colors">
                <Youtube className="h-7 w-7" />
              </Link>
            </div>
          </div>

          {/* Links Section */}
          <div className="col-span-1 space-y-8">
            <h3 className="font-headline font-bold text-xl border-l-4 border-primary pl-4 uppercase tracking-widest text-sm text-primary">Kurasa</h3>
            <div className="flex flex-col gap-5">
              <Link href="/" className="text-lg text-muted-foreground hover:text-primary font-medium transition-colors">Mwanzo</Link>
              <Link href="/about" className="text-lg text-muted-foreground hover:text-primary font-medium transition-colors">Kuhusu Sisi</Link>
              <Link href="/sermons" className="text-lg text-muted-foreground hover:text-primary font-medium transition-colors">Neno</Link>
              <Link href="/events" className="text-lg text-muted-foreground hover:text-primary font-medium transition-colors">Matukio</Link>
              <Link href="/gallery" className="text-lg text-muted-foreground hover:text-primary font-medium transition-colors">Picha</Link>
            </div>
          </div>

          {/* Contact Section */}
          <div className="col-span-1 space-y-8">
            <h3 className="font-headline font-bold text-xl border-l-4 border-primary pl-4 uppercase tracking-widest text-sm text-primary">Wasiliana</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-lg text-muted-foreground">
                <MapPin className="h-7 w-7 text-primary shrink-0" />
                <span>Mwanzo Mpya, Kimbunga, Tanzania</span>
              </li>
              <li className="flex items-center gap-4 text-lg text-muted-foreground">
                <Phone className="h-7 w-7 text-primary shrink-0" />
                <span>+255 NDPCC OFFICE</span>
              </li>
              <li className="flex items-center gap-4 text-lg text-muted-foreground">
                <Mail className="h-7 w-7 text-primary shrink-0" />
                <span>info@ndpcc.or.tz</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-24 pt-10 border-t flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-muted-foreground uppercase tracking-[0.2em] font-bold">
          <p>© {new Date().getFullYear()} N.D.P.C.C. Haki zote zimehifadhiwa.</p>
          <div className="flex gap-10">
            <Link href="/login" className="hover:text-primary transition-colors">Staff Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}