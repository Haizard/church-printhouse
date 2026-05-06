
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

import WorshipImage from "@/images/_B4A1779.jpg";
import HeroImageOne from "@/images/_B4A1507.jpg";
import HeroImageThree from "@/images/_B4A1527.jpg";
import CommunityImageOne from "@/images/_B4A1466.jpg";

export default function SermonsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const db = useFirestore();

  const sermonsQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, "sermons"), orderBy("date", "desc"));
  }, [db]);

  const { data: sermons, loading } = useCollection(sermonsQuery);

  const sampleSermons = [
    { id: "s1", title: "Nguvu ya Utakatifu", speaker: "Askofu", topic: "Utakatifu", date: "2024-05-01", description: "Jinsi utakatifu ulivyo msingi wa kuliandaa kanisa kwa unyakuo.", image: WorshipImage },
    { id: "s2", title: "Jeshi la Mwisho", speaker: "Mchungaji", topic: "Uamsho", date: "2024-04-25", description: "Kuinua watumishi watakaosimama katika nyakati hizi za mwisho.", image: HeroImageOne },
    { id: "s3", title: "Kimbilio la Kweli", speaker: "Mtumishi", topic: "Imani", date: "2024-04-18", description: "Mungu ni ngome yetu kwa makimbilio katika kila uhitaji.", image: HeroImageThree },
    { id: "s4", title: "Unyakuo wa Kanisa", speaker: "Askofu", topic: "Biblia", date: "2024-04-10", description: "Tafakari ya kina juu ya maandalizi ya kurudi kwa Bwana.", image: CommunityImageOne },
  ];

  const displaySermons = sermons && sermons.length > 0 ? sermons : sampleSermons;

  const filteredSermons = displaySermons.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.speaker.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 md:px-8">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">Neno la Huduma</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">Jifunze na kukua kiroho kupitia maktaba yetu ya mahubiri ya Neno la Bwana.</p>
        </header>

        <section className="mb-12">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Tafuta kichwa cha neno au mhubiri..." className="pl-10 h-12 rounded-full border-muted/50 bg-white" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </section>

        {loading && sermons?.length === 0 ? (
          <div className="flex justify-center py-24"><Loader2 className="h-12 w-12 text-primary animate-spin" /></div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {filteredSermons.map(sermon => (
              <Card key={sermon.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all group bg-white flex flex-col">
                <div className="relative aspect-video bg-slate-100">
                  <Image src={sermon.image || sermon.imageUrl || HeroImageOne} alt={sermon.title} fill className="object-contain group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 scale-0 group-hover:scale-100 transition-transform"><Play className="h-4 w-4 text-white fill-white" /></div>
                  </div>
                </div>
                <CardHeader className="p-4 md:p-6 pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary text-[9px] px-2">{sermon.topic}</Badge>
                    <div className="flex items-center text-[9px] text-muted-foreground gap-1"><Calendar className="h-2.5 w-2.5" /> {sermon.date}</div>
                  </div>
                  <CardTitle className="font-headline text-base md:text-xl group-hover:text-primary transition-colors line-clamp-2">{sermon.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0 flex-grow">
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-3"><User className="h-3 w-3" /> <span>{sermon.speaker}</span></div>
                  <p className="text-[11px] md:text-sm text-muted-foreground line-clamp-2">{sermon.description}</p>
                </CardContent>
                <CardFooter className="p-4 md:p-6 pt-0 mt-auto">
                  <Button variant="link" className="p-0 text-accent text-xs h-auto" asChild><Link href={`/sermons/${sermon.id}`}>Sikiliza Sasa</Link></Button>
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
