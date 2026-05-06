
"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar as CalendarIcon, Clock, MapPin, ChevronRight, Loader2 } from "lucide-react";
import { useFirestore, useCollection } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import Link from "next/link";

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const db = useFirestore();

  const eventsQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, "events"), orderBy("date", "asc"));
  }, [db]);

  const { data: events, loading } = useCollection(eventsQuery);

  const categories = ["All", "Worship", "Community", "Learning", "Youth", "Service"];

  const filteredEvents = useMemo(() => events?.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || event.category === activeCategory;
    return matchesSearch && matchesCategory;
  }), [events, searchQuery, activeCategory]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 md:px-8">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">Matukio ya Huduma</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Jiunge nasi katika ibada, semina, na mikutano ya nje. Karibu tushiriki baraka za Bwana.
          </p>
        </header>

        <section className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Tafuta tukio..." 
              className="pl-10 h-12 rounded-full border-muted/50 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                onClick={() => setActiveCategory(cat)}
                className="rounded-full h-10 px-4 text-xs"
              >
                {cat}
              </Button>
            ))}
          </div>
        </section>

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {filteredEvents?.map(event => (
              <Card key={event.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all group bg-white flex flex-col">
                <div className="bg-primary/5 p-6 text-center border-b border-muted/30">
                  <div className="bg-white p-2 rounded-xl shadow-sm mb-3 w-fit mx-auto">
                    <CalendarIcon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-headline text-lg font-bold text-primary">{event.date}</p>
                  <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground mt-1">
                    <Clock className="h-3 w-3" /> {event.time}
                  </div>
                </div>
                <CardContent className="p-4 md:p-6 flex-grow">
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground text-[10px] font-bold uppercase tracking-wider mb-3">
                    {event.category}
                  </Badge>
                  <CardTitle className="font-headline text-lg md:text-xl group-hover:text-primary transition-colors mb-3 line-clamp-2">
                    {event.title}
                  </CardTitle>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {event.description}
                  </p>
                </CardContent>
                <CardFooter className="p-4 md:p-6 pt-0 mt-auto">
                  <Button variant="link" asChild className="p-0 text-accent text-xs font-bold hover:text-primary h-auto">
                    <Link href={`/events/${event.id}`}>
                      Angalia Zaidi <ChevronRight className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredEvents?.length === 0 && (
          <div className="py-24 text-center">
            <h3 className="text-xl font-medium text-muted-foreground">Hakuna matukio yaliyopatikana.</h3>
            <Button variant="link" onClick={() => { setSearchQuery(""); setActiveCategory("All"); }} className="mt-2">Onyesha yote</Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
