
import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import Logo from "@/images/NDPCC 01.png";

export function Footer() {
  return (
    <footer className="w-full border-t bg-muted/30 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        {/* Main Footer Grid - 2 columns on mobile, 3 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Logo & Info Section */}
          <div className="col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-primary/10">
                <Image 
                  src={Logo} 
                  alt="N.D.P.C.C. Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-headline font-bold text-primary">
                N.D.P.C.C.
              </span>
            </Link>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              "Ngome ya Bwana kwa Makimbilio ya Watu Wake". Tumeitwa kuliandaa kanisa kwa unyakuo na kuinua jeshi la watumishi wa mwisho.
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
          <div className="col-span-1">
            <h3 className="font-headline font-bold text-sm mb-4">Viungo</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <Link href="/" className="text-[10px] text-muted-foreground hover:text-primary">Mwanzo</Link>
              <Link href="/about" className="text-[10px] text-muted-foreground hover:text-primary">Kuhusu Sisi</Link>
              <Link href="/sermons" className="text-[10px] text-muted-foreground hover:text-primary">Neno</Link>
              <Link href="/events" className="text-[10px] text-muted-foreground hover:text-primary">Matukio</Link>
              <Link href="/gallery" className="text-[10px] text-muted-foreground hover:text-primary">Picha</Link>
              <Link href="/blog" className="text-[10px] text-muted-foreground hover:text-primary">Blogu</Link>
            </div>
          </div>

          {/* Contact Section - spans 2 on mobile to maintain 2-col balance */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <h3 className="font-headline font-bold text-sm mb-4">Wasiliana</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-[10px] text-muted-foreground">
                <MapPin className="h-3 w-3 text-primary shrink-0" />
                <span>Ramah Sanctuary, Tanzania</span>
              </li>
              <li className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <Phone className="h-3 w-3 text-primary shrink-0" />
                <span>+255 (Huduma)</span>
              </li>
              <li className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <Mail className="h-3 w-3 text-primary shrink-0" />
                <span>info@ndpcc.org</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] text-muted-foreground">
          <p>© {new Date().getFullYear()} Nayoth Divine Power Christian Center.</p>
          <div className="flex gap-4">
            <Link href="/login" className="hover:text-primary">Staff Login</Link>
            <Link href="#" className="hover:text-primary">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
