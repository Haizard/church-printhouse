
import Link from "next/link";
import { Shield, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-muted/30 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-xl font-headline font-bold text-primary">
                N.D.P.C.C.
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              "Ngome ya Bwana kwa Makimbilio ya Watu Wake". Tumeitwa kuliandaa kanisa kwa unyakuo na kuinua jeshi la watumishi wa mwisho.
            </p>
            <div className="flex gap-4 mt-2">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-headline font-bold text-base mb-4">Viungo</h3>
            <ul className="space-y-3">
              <li><Link href="/sermons" className="text-xs text-muted-foreground hover:text-primary">Neno la Huduma</Link></li>
              <li><Link href="/events" className="text-xs text-muted-foreground hover:text-primary">Matukio</Link></li>
              <li><Link href="/gallery" className="text-xs text-muted-foreground hover:text-primary">Picha</Link></li>
              <li><Link href="/blog" className="text-xs text-muted-foreground hover:text-primary">Blogu</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-headline font-bold text-base mb-4">Wasiliana</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-xs text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>Ramah Sanctuary, TZ</span>
              </li>
              <li className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>+255 (Huduma)</span>
              </li>
              <li className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>info@ndpcc.org</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-muted-foreground">
          <p>© {new Date().getFullYear()} Nayoth Divine Power Christian Center.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-primary">Privacy</Link>
            <Link href="#" className="hover:text-primary">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
