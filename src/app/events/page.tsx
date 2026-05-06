
"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar as CalendarIcon, Clock, ChevronRight, Loader2 } from "lucide-react";
import { useFirestore, useCollection } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import Link from "next/link";

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const db = useFirestore();

  const eventsQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, "events"), orderBy("date", "asc"));
  }, [db]);

  const { data: events, loading } = useCollection(eventsQuery);

  const sampleEvents = [
    { id: "e1", title: "Ibada ya Jumapili", date: "Kila Jumapili", time: "09:00 AM", category: "Ibada", description: "Ibada kuu ya sifa na kuandaliwa na neno la uzima." },
    { id: "e2", title: "Semina ya Vijana", date: "Jumamosi Hii", time: "03:00 PM", category: "Huduma", description: "Mkakati wa kuinua jeshi la kiroho kwa vijana." },
    { id: "e3", title: "Mkutano wa Injili", date: "20 Mei 2024", time: "04:30 PM", category: "Mikutano", description: "Kufikisha injili ya ufalme kwa mataifa yote." },
    { id: "e4", title: "Mkesha wa Maombi", date: "Ijumaa ya Kwanza", time: "10:00 PM", category: "Maombi", description: "Kujiandaa kiroho kupitia magoti na unyenyekevu." },
  ];

  const displayEvents = events && events.length > 0 ? events : sampleEvents;

  const filteredEvents = displayEvents.filter(e => 
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    e.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 md:px-8">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">Matukio ya Huduma</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">Jiunge nasi katika ibada, semina, na mikutano ya nje ya N.D.P.C.C.</p>
        </header>

        <section className="mb-12">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Tafuta tukio..." className="pl-10 h-12 rounded-full border-muted/50 bg-white" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </section>

        {loading && events?.length === 0 ? (
          <div className="flex justify-center py-24"><Loader2 className="h-12 w-12 text-primary animate-spin" /></div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {filteredEvents.map(event => (
              <Card key={event.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all group bg-white flex flex-col">
                <div className="bg-primary/5 p-6 text-center border-b border-muted/30">
                  <div className="bg-white p-2 rounded-xl shadow-sm mb-3 w-fit mx-auto"><CalendarIcon className="h-6 w-6 text-primary" /></div>
                  <p className="font-headline text-lg font-bold text-primary">{event.date}</p>
                  <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground mt-1"><Clock className="h-3 w-3" /> {event.time}</div>
                </div>
                <CardContent className="p-4 md:p-6 flex-grow">
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground text-[10px] font-bold uppercase tracking-wider mb-3">{event.category}</Badge>
                  <CardTitle className="font-headline text-lg md:text-xl group-hover:text-primary transition-colors mb-3 line-clamp-2">{event.title}</CardTitle>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-3">{event.description}</p>
                </CardContent>
                <CardFooter className="p-4 md:p-6 pt-0 mt-auto">
                  <Button variant="link" asChild className="p-0 text-accent text-xs font-bold hover:text-primary h-auto"><Link href={`/events/${event.id}`}>Angalia Zaidi <ChevronRight className="h-3 w-3 ml-1" /></Link></Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
