
import Link from "next/link";
import { Sprout, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-muted/30 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Sprout className="h-6 w-6 text-primary" />
              <span className="text-xl font-headline font-bold text-primary">
                Evergreen Sanctuary
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Growing in faith, rooted in love, and finding serenity together. Join our community as we journey toward spiritual wholeness.
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
            <h3 className="font-headline font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {["Sermons", "Events", "Gallery", "Blog", "Contact"].map((link) => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase().replace(" ", "-")}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-headline font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>123 Sanctuary Way, Grove City, OR 97000</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>hello@evergreensanctuary.org</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline font-bold text-lg mb-6">Service Times</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <p className="font-bold text-foreground">Sunday Morning</p>
                <p>9:00 AM & 11:00 AM</p>
              </li>
              <li>
                <p className="font-bold text-foreground">Wednesday Midweek</p>
                <p>7:00 PM Prayer Service</p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Evergreen Sanctuary. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
