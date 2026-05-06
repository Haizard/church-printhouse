
"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
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

  const filteredEvents = events?.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || event.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 md:px-8">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">Community Calendar</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Join us as we gather, grow, and serve together. There is a place for everyone at Evergreen Sanctuary.
          </p>
        </header>

        <section className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search for an event..." 
              className="pl-10 h-12 rounded-full border-muted/50 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                onClick={() => setActiveCategory(cat)}
                className="rounded-full"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredEvents?.map(event => (
              <Card key={event.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all group bg-white">
                <div className="grid md:grid-cols-3">
                  <div className="bg-primary/5 p-8 flex flex-col items-center justify-center text-center border-r border-muted/30">
                    <div className="bg-white p-3 rounded-2xl shadow-sm mb-4">
                      <CalendarIcon className="h-8 w-8 text-primary" />
                    </div>
                    <p className="font-headline text-xl font-bold text-primary">{event.date}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <Clock className="h-3 w-3" />
                      {event.time}
                    </div>
                  </div>
                  <div className="md:col-span-2 p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="secondary" className="bg-secondary text-secondary-foreground font-bold uppercase tracking-wider text-[10px]">
                          {event.category}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </div>
                      </div>
                      <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors mb-3">
                        {event.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {event.description}
                      </p>
                    </div>
                    <div className="pt-6 flex justify-end">
                      <Button variant="link" asChild className="p-0 text-accent font-bold hover:text-primary flex items-center gap-1">
                        <Link href={`/events/${event.id}`}>
                          Event Details <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredEvents?.length === 0 && (
          <div className="py-24 text-center">
            <h3 className="text-xl font-medium text-muted-foreground">No events found matching your search.</h3>
            <Button variant="link" onClick={() => { setSearchQuery(""); setActiveCategory("All"); }} className="mt-2">View all events</Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
