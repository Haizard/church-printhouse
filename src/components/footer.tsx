
import Link from "next/link";
import { Shield, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-muted/30 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-xl font-headline font-bold text-primary">
                N.D.P.C.C.
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
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

          <div>
            <h3 className="font-headline font-bold text-lg mb-6">Viungo vya Haraka</h3>
            <ul className="space-y-4">
              <li><Link href="/sermons" className="text-sm text-muted-foreground hover:text-primary">Neno la Huduma</Link></li>
              <li><Link href="/events" className="text-sm text-muted-foreground hover:text-primary">Matukio</Link></li>
              <li><Link href="/gallery" className="text-sm text-muted-foreground hover:text-primary">Picha</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">Blogu</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Mawasiliano</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline font-bold text-lg mb-6">Wasiliana Nasi</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>Nayoth Divine Power Christian Center, Ramah Sanctuary</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+255 (Huduma)</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>info@ndpcc.org</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline font-bold text-lg mb-6">Ratiba za Ibada</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <p className="font-bold text-foreground">Jumapili Morning</p>
                <p>Ibada Kuu: 9:00 AM & 11:00 AM</p>
              </li>
              <li>
                <p className="font-bold text-foreground">Katikati ya Wiki</p>
                <p>Ibada ya Maombi: 7:00 PM</p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Nayoth Divine Power Christian Center. Haki zote zimehifadhiwa.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
