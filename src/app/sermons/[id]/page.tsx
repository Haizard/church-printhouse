
"use client";

import { use, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Calendar, User, ChevronLeft, Mic, Clock, Share2, Loader2, BookOpen } from "lucide-react";
import { useFirestore, useDoc } from "@/firebase";
import { doc } from "firebase/firestore";

import WorshipImage from "@/images/_B4A1779.jpg";
import HeroImageOne from "@/images/_B4A1507.jpg";
import HeroImageThree from "@/images/_B4A1527.jpg";
import CommunityImageOne from "@/images/_B4A1466.jpg";

const sampleSermons: Record<string, any> = {
  "s1": { id: "s1", title: "Nguvu ya Utakatifu", speaker: "Askofu", topic: "Utakatifu", date: "2024-05-01", description: "Jinsi utakatifu ulivyo msingi wa kuliandaa kanisa kwa unyakuo. Katika somo hili, tunajifunza siri ya kuishi maisha yaliyotengwa kwa ajili ya Bwana katika ulimwengu wa sasa.", image: WorshipImage },
  "s2": { id: "s2", title: "Jeshi la Mwisho", speaker: "Mchungaji", topic: "Uamsho", date: "2024-04-25", description: "Kuinua watumishi watakaosimama katika nyakati hizi za mwisho. Bwana anatafuta watu wenye ujasiri na nguvu ya Roho Mtakatifu kuliandaa kanisa.", image: HeroImageOne },
  "s3": { id: "s3", title: "Kimbilio la Kweli", speaker: "Mtumishi", topic: "Imani", date: "2024-04-18", description: "Mungu ni ngome yetu kwa makimbilio katika kila uhitaji. Neno hili linatutia moyo kumtegemea Mungu katika nyakati zote za dhoruba.", image: HeroImageThree },
  "s4": { id: "s4", title: "Unyakuo wa Kanisa", speaker: "Askofu", topic: "Biblia", date: "2024-04-10", description: "Tafakari ya kina juu ya maandalizi ya kurudi kwa Bwana. Je, uko tayari? Tunachambua dalili za nyakati na wito wa utakatifu.", image: CommunityImageOne },
};

export default function SermonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const db = useFirestore();
  
  const sermonRef = useMemo(() => 
    db ? doc(db, "sermons", id) : null
  , [db, id]);
  
  const { data: firestoreSermon, loading } = useDoc(sermonRef);
  
  const sermon = firestoreSermon || sampleSermons[id];

  if (loading && !sermon) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!sermon) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center p-8 bg-slate-50">
          <h1 className="text-3xl font-headline font-bold mb-4 text-primary">Sermon Not Found</h1>
          <Button asChild className="rounded-full"><Link href="/sermons">Back to Library</Link></Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header Section */}
        <div className="bg-primary text-primary-foreground py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <Image src={sermon.image || sermon.imageUrl || HeroImageOne} alt="BG" fill className="object-cover" />
          </div>
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <Link href="/sermons" className="inline-flex items-center text-sm opacity-80 hover:opacity-100 mb-8 transition-opacity font-bold uppercase tracking-wider">
              <ChevronLeft className="mr-1 h-4 w-4" /> Back to Library
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-white/20 hover:bg-white/30 text-white border-none py-1 px-4">{sermon.topic}</Badge>
                <h1 className="text-4xl md:text-6xl font-headline font-bold leading-tight">{sermon.title}</h1>
                <div className="flex flex-wrap gap-6 text-sm opacity-90 font-bold uppercase tracking-wide">
                  <div className="flex items-center gap-2"><User className="h-4 w-4" /> {sermon.speaker}</div>
                  <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {sermon.date}</div>
                </div>
                <div className="pt-4 flex flex-wrap gap-4">
                  <Button size="lg" className="rounded-full bg-white text-primary hover:bg-slate-100 font-bold h-14 px-8">
                    <Play className="mr-2 h-5 w-5 fill-primary" /> Watch Video
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-full border-white/30 text-white hover:bg-white/10 font-bold h-14 px-8">
                    <Share2 className="mr-2 h-5 w-5" /> Share
                  </Button>
                </div>
              </div>

              <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/10">
                <Image 
                  src={sermon.image || sermon.imageUrl || HeroImageOne}
                  alt={sermon.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors group cursor-pointer">
                  <div className="bg-white/90 p-6 rounded-full shadow-xl transform transition group-hover:scale-110">
                    <Play className="h-8 w-8 text-primary fill-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-20 md:px-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <section className="space-y-6">
                <h2 className="text-3xl font-headline font-bold text-primary flex items-center gap-3">
                   <BookOpen className="h-8 w-8 text-accent" /> Maelezo ya Neno
                </h2>
                <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                  <p className="text-xl text-slate-700 leading-relaxed font-headline italic mb-6">
                    "{sermon.description}"
                  </p>
                  <div className="prose prose-slate max-w-none text-muted-foreground">
                    <p>Mahubiri haya yalitolewa kwa lengo la kuliandaa kanisa la Bwana kwa ajili ya nyakati hizi za mwisho. Kupitia neno hili, tunajifunza jinsi ya kusimama imara katika imani na kuwa sehemu ya jeshi la kiroho litakaloleta uamsho duniani kote.</p>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
                <h3 className="text-lg font-bold flex items-center gap-2 text-primary border-b pb-4">
                  <Mic className="h-5 w-5 text-accent" /> Resources
                </h3>
                <div className="grid gap-3">
                  <Button variant="outline" className="justify-start h-14 rounded-2xl text-primary border-primary/10 hover:bg-primary/5 font-bold group">
                    <span className="bg-primary/10 p-2 rounded-lg mr-3 group-hover:bg-primary group-hover:text-white transition-colors"><Mic className="h-4 w-4" /></span>
                    Download MP3
                  </Button>
                  <Button variant="outline" className="justify-start h-14 rounded-2xl text-primary border-primary/10 hover:bg-primary/5 font-bold group">
                    <span className="bg-primary/10 p-2 rounded-lg mr-3 group-hover:bg-primary group-hover:text-white transition-colors"><BookOpen className="h-4 w-4" /></span>
                    Notes (PDF)
                  </Button>
                </div>
              </section>

              <div className="bg-accent/10 p-8 rounded-[2.5rem] border border-accent/20">
                <h4 className="font-bold text-accent mb-3 uppercase tracking-widest text-xs">Msaada wa Kiroho</h4>
                <p className="text-sm text-primary/80 leading-relaxed mb-6">
                  Kama neno hili limekugusa na unahitaji maombi au ushauri zaidi, usisite kuwasiliana nasi.
                </p>
                <Button asChild className="w-full rounded-2xl bg-accent text-white hover:bg-accent/90 font-bold h-12">
                   <Link href="/contact">Omba Maombi</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
