
"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Calendar as CalendarIcon, Clock, MapPin, Share2, Loader2, Info, Users, ArrowRight } from "lucide-react";
import { useFirestore, useDoc } from "@/firebase";
import { doc } from "firebase/firestore";

const sampleEvents: Record<string, any> = {
  "e1": { id: "e1", title: "Ibada ya Jumapili", date: "Kila Jumapili", time: "09:00 AM", category: "Ibada", description: "Ibada kuu ya sifa na kuandaliwa na neno la uzima. Ni wakati wa kumwabudu Mungu kwa umoja na kupokea maelekezo ya kiroho kwa juma jipya.", location: "NDPCC Sanctuary" },
  "e2": { id: "e2", title: "Semina ya Vijana", date: "Jumamosi Hii", time: "03:00 PM", category: "Huduma", description: "Mkakati wa kuinua jeshi la kiroho kwa vijana. Tunajadili nafasi ya kijana katika uamsho wa mwisho na jinsi ya kuishi maisha ya ushindi.", location: "Youth Hall" },
  "e3": { id: "e3", title: "Mkutano wa Injili", date: "20 Mei 2024", time: "04:30 PM", category: "Mikutano", description: "Kufikisha injili ya ufalme kwa mataifa yote. Mkutano huu wa hadhara utakuwa na mahubiri ya nguvu na huduma ya uponyaji.", location: "Viwanja vya Mwanzo Mpya" },
  "e4": { id: "e4", title: "Mkesha wa Maombi", date: "Ijumaa ya Kwanza", time: "10:00 PM", category: "Maombi", description: "Kujiandaa kiroho kupitia magoti na unyenyekevu. Mkesha wa usiku mzima wa kuingilia kati kwa ajili ya kanisa na taifa letu.", location: "NDPCC Sanctuary" },
};

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const db = useFirestore();
  
  const eventRef = useMemo(() => 
    db ? doc(db, "events", id) : null
  , [db, id]);
  
  const { data: firestoreEvent, loading } = useDoc(eventRef);
  
  const event = firestoreEvent || sampleEvents[id];

  if (loading && !event) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center p-8 bg-slate-50">
          <h1 className="text-3xl font-headline font-bold mb-4 text-primary">Tukio Halijapatikana</h1>
          <Button asChild className="rounded-full"><Link href="/events">Back to Calendar</Link></Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow py-12 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link href="/events" className="inline-flex items-center text-sm text-primary mb-10 hover:underline font-bold uppercase tracking-widest">
            <ChevronLeft className="mr-1 h-4 w-4" /> Back to Calendar
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 space-y-10">
              <div className="space-y-6">
                <Badge className="bg-accent text-white font-bold uppercase tracking-widest px-6 py-1.5 rounded-full border-none">{event.category}</Badge>
                <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary leading-tight">{event.title}</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 bg-white p-6 rounded-[2rem] border shadow-sm">
                    <div className="bg-primary/10 p-4 rounded-2xl"><CalendarIcon className="h-6 w-6 text-primary" /></div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Tarehe</p>
                      <p className="text-lg font-bold text-primary">{event.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-white p-6 rounded-[2rem] border shadow-sm">
                    <div className="bg-primary/10 p-4 rounded-2xl"><Clock className="h-6 w-6 text-primary" /></div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Muda</p>
                      <p className="text-lg font-bold text-primary">{event.time}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white p-6 rounded-[2rem] border shadow-sm">
                   <div className="bg-accent/10 p-4 rounded-2xl"><MapPin className="h-6 w-6 text-accent" /></div>
                   <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Mahali</p>
                      <p className="text-lg font-bold text-primary">{event.location || "NDPCC Sanctuary"}</p>
                    </div>
                </div>
              </div>

              <div className="bg-white p-10 rounded-[3rem] border shadow-sm space-y-8">
                <h2 className="text-2xl font-headline font-bold text-primary flex items-center gap-3">
                   <Info className="h-7 w-7 text-accent" /> Kuhusu Tukio Hili
                </h2>
                <div className="prose prose-slate max-w-none">
                  <p className="text-xl text-slate-700 leading-relaxed font-headline italic">
                    "{event.description}"
                  </p>
                  <Separator className="my-8" />
                  <p className="text-muted-foreground">Tukio hili ni sehemu ya mikakati yetu ya kuliandaa kanisa na kuinua jeshi la kiroho. Tunakukaribisha sana tushiriki pamoja baraka hizi za Bwana. Hakuna kiingilio, wote mnakaribishwa!</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <Card className="p-10 border-none shadow-2xl bg-primary text-primary-foreground rounded-[3rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10"><Users className="h-32 w-32" /></div>
                <div className="relative z-10 space-y-6">
                  <h3 className="text-2xl font-headline font-bold">Unahitaji Kushiriki?</h3>
                  <p className="text-primary-foreground/80 leading-relaxed">
                    Matukio yetu mengi yako wazi kwa kila mtu. Karibu ujumuike nasi bila kuhitaji usajili wa awali.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-sm font-medium">
                       <span className="h-2 w-2 rounded-full bg-accent" /> Wote mnakaribishwa (Open to All)
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium">
                       <span className="h-2 w-2 rounded-full bg-accent" /> Hakuna gharama za kushiriki
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium">
                       <span className="h-2 w-2 rounded-full bg-accent" /> Huduma ya maombi inapatikana
                    </li>
                  </ul>
                  <Button className="w-full bg-white text-primary hover:bg-slate-100 rounded-2xl font-bold h-14 text-lg shadow-xl" asChild>
                    <Link href="/contact">Uliza Swali <ArrowRight className="ml-2 h-5 w-5" /></Link>
                  </Button>
                </div>
              </Card>

              <div className="bg-white p-8 rounded-[2rem] border shadow-sm flex items-center justify-between">
                 <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Share Tukio</span>
                 <div className="flex gap-4">
                   <Button variant="ghost" size="icon" className="rounded-full bg-slate-50 hover:bg-slate-100"><Share2 className="h-5 w-5 text-primary" /></Button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
