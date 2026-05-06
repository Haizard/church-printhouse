
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Play, Calendar, User, Loader2 } from "lucide-react";
import { useFirestore, useCollection } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";

export default function SermonsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const db = useFirestore();

  const sermonsQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, "sermons"), orderBy("date", "desc"));
  }, [db]);

  const { data: sermons, loading } = useCollection(sermonsQuery);

  const topics = ["All", "Faith", "Community", "Peace", "Hope"];

  const filteredSermons = useMemo(() => sermons?.filter(sermon => {
    const matchesSearch = sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sermon.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = activeFilter === "All" || sermon.topic === activeFilter;
    return matchesSearch && matchesTopic;
  }), [sermons, searchQuery, activeFilter]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 md:px-8">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">Neno la Huduma</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Jifunze na kukua kiroho kupitia maktaba yetu ya mahubiri na mafundisho ya Neno la Bwana.
          </p>
        </header>

        <section className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Tafuta kichwa cha neno au mhubiri..." 
              className="pl-10 h-12 rounded-full border-muted/50 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {topics.map(topic => (
              <Button
                key={topic}
                variant={activeFilter === topic ? "default" : "outline"}
                onClick={() => setActiveFilter(topic)}
                className="rounded-full h-10 px-4 text-xs"
              >
                {topic}
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
            {filteredSermons?.map(sermon => (
              <Card key={sermon.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all group bg-white flex flex-col">
                <div className="relative aspect-video">
                  {sermon.imageUrl ? (
                    <Image 
                      src={sermon.imageUrl}
                      alt={sermon.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <Play className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 scale-0 group-hover:scale-100 transition-transform">
                      <Play className="h-4 w-4 text-white fill-white" />
                    </div>
                  </div>
                </div>
                <CardHeader className="p-4 md:p-6 pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary text-[9px] px-2">{sermon.topic}</Badge>
                    <div className="flex items-center text-[9px] text-muted-foreground gap-1">
                      <Calendar className="h-2.5 w-2.5" />
                      {sermon.date}
                    </div>
                  </div>
                  <CardTitle className="font-headline text-base md:text-xl group-hover:text-primary transition-colors line-clamp-2">{sermon.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0 flex-grow">
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-3">
                    <User className="h-3 w-3" />
                    <span>{sermon.speaker}</span>
                  </div>
                  <p className="text-[11px] md:text-sm text-muted-foreground line-clamp-2">{sermon.description}</p>
                </CardContent>
                <CardFooter className="p-4 md:p-6 pt-0 mt-auto">
                  <Button variant="link" className="p-0 text-accent text-xs h-auto" asChild>
                    <Link href={`/sermons/${sermon.id}`}>Sikiliza Sasa</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredSermons?.length === 0 && (
          <div className="py-24 text-center">
            <h3 className="text-xl font-medium text-muted-foreground">Hakuna mahubiri yaliyopatikana.</h3>
            <Button variant="link" onClick={() => { setSearchQuery(""); setActiveFilter("All"); }} className="mt-2">Futa vichujio vyote</Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
