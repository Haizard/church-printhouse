
"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Calendar as CalendarIcon, Clock, MapPin, Share2, Loader2, Info } from "lucide-react";
import { useFirestore, useDoc } from "@/firebase";
import { doc } from "firebase/firestore";

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const db = useFirestore();
  
  const eventRef = useMemo(() => 
    db ? doc(db, "events", id) : null
  , [db, id]);
  
  const { data: event, loading } = useDoc(eventRef);

  if (loading) return <div className="flex min-h-screen items-center justify-center"><Loader2 className="h-12 w-12 text-primary animate-spin" /></div>;

  if (!event) return (
    <div className="flex min-h-screen flex-col">
      <Navbar /><main className="flex-grow flex flex-col items-center justify-center p-8"><h1 className="text-3xl font-headline font-bold mb-4">Event Not Found</h1><Button asChild><Link href="/events">Back to Calendar</Link></Button></main><Footer />
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link href="/events" className="inline-flex items-center text-sm text-primary mb-8 hover:underline"><ChevronLeft className="mr-1 h-4 w-4" /> Back to Calendar</Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-secondary text-secondary-foreground font-bold uppercase tracking-wider">{event.category}</Badge>
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">{event.title}</h1>
                <div className="flex flex-col sm:flex-row gap-6 text-slate-600 font-medium bg-white p-6 rounded-2xl border shadow-sm">
                  <div className="flex items-center gap-3"><CalendarIcon className="h-5 w-5 text-primary" /> {event.date}</div>
                  <div className="flex items-center gap-3"><Clock className="h-5 w-5 text-primary" /> {event.time}</div>
                  <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-primary" /> {event.location}</div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-6">
                <h2 className="text-2xl font-headline font-bold text-primary flex items-center gap-2"><Info className="h-6 w-6" /> Event Description</h2>
                <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-wrap">{event.description}</p>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="p-8 border-none shadow-lg bg-primary text-primary-foreground rounded-3xl">
                <h3 className="text-xl font-bold mb-4">Interested in attending?</h3>
                <p className="text-primary-foreground/80 mb-6 text-sm">Most of our events are open to the public and don't require registration. Just show up!</p>
                <Button className="w-full bg-white text-primary hover:bg-slate-100 rounded-xl font-bold" asChild>
                  <Link href="/contact">Ask a Question</Link>
                </Button>
              </Card>
              <Button variant="outline" className="w-full rounded-xl gap-2 border-slate-200"><Share2 className="h-4 w-4" /> Share Event</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
