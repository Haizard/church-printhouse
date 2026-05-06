
"use client";

import { use, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Calendar, User, ChevronLeft, Mic, Clock, Share2 } from "lucide-react";
import { useFirestore, useDoc } from "@/firebase";
import { doc } from "firebase/firestore";

export default function SermonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const db = useFirestore();
  
  const sermonRef = useMemo(() => 
    db ? doc(db, "sermons", id) : null
  , [db, id]);
  
  const { data: sermon, loading } = useDoc(sermonRef);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!sermon) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center p-8">
          <h1 className="text-3xl font-headline font-bold mb-4">Sermon Not Found</h1>
          <Button asChild>
            <Link href="/sermons">Back to Library</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <Link href="/sermons" className="inline-flex items-center text-sm opacity-80 hover:opacity-100 mb-8 transition-opacity">
              <ChevronLeft className="mr-1 h-4 w-4" /> Back to Library
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">{sermon.topic}</Badge>
                <h1 className="text-4xl md:text-6xl font-headline font-bold leading-tight">{sermon.title}</h1>
                <div className="flex flex-wrap gap-6 text-sm opacity-90">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {sermon.speaker}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {sermon.date}
                  </div>
                </div>
                <div className="pt-4 flex gap-4">
                  <Button size="lg" className="rounded-full bg-white text-primary hover:bg-slate-100">
                    <Play className="mr-2 h-5 w-5 fill-primary" /> Watch Video
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-full border-white/30 text-white hover:bg-white/10">
                    <Share2 className="mr-2 h-5 w-5" /> Share
                  </Button>
                </div>
              </div>

              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                {sermon.imageUrl ? (
                  <Image 
                    src={sermon.imageUrl}
                    alt={sermon.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                    <Mic className="h-20 w-20 text-slate-600" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 md:px-8">
          <div className="max-w-3xl mx-auto space-y-12">
            <section className="space-y-4">
              <h2 className="text-2xl font-headline font-bold text-primary">About this Teaching</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {sermon.description}
              </p>
            </section>

            <section className="bg-white p-8 rounded-3xl shadow-sm border space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" /> Sermon Resources
              </h3>
              <div className="grid gap-4">
                <Button variant="outline" className="justify-start h-12 rounded-xl text-primary border-primary/20">
                  Download Audio (MP3)
                </Button>
                <Button variant="outline" className="justify-start h-12 rounded-xl text-primary border-primary/20">
                  Download Notes (PDF)
                </Button>
                <Button variant="outline" className="justify-start h-12 rounded-xl text-primary border-primary/20">
                  Discussion Questions
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Loader2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
