
"use client";

import { use, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, User, Calendar, Share2, Loader2, Quote, ArrowLeft } from "lucide-react";
import { useFirestore, useDoc } from "@/firebase";
import { doc } from "firebase/firestore";

import BlogFeatureImageOne from "@/images/_B4A1505.jpg";
import BlogFeatureImageTwo from "@/images/_B4A7071.jpg";
import IdentityImage from "@/images/_B4A1451.jpg";
import CommunityImageTwo from "@/images/_B4A7030.jpg";

const sampleBlogs: Record<string, any> = {
  "b1": { id: "b1", title: "Safari yetu tangu 1992", author: "Admin", category: "Historia", summary: "Jinsi Bwana alivyoanzisha huduma hii ya kipekee.", content: "Mungu alianza kusema na mtumishi wake juu ya utumishi huu mwaka wa 1992. Katika kipindi hicho, Bwana alionyesha maono ya kazi kubwa nitakayoifanya duniani kuliandaa kanisa lake. Tangu wakati huo, safari imekuwa ya ushindi na uaminifu kwa maono ya Bwana.", date: "2024-05-02", image: BlogFeatureImageOne },
  "b2": { id: "b2", title: "Huduma kwa Mayatima", author: "Foundation Team", category: "Foundation", summary: "Gibea Foundation ikigusa maisha ya wahitaji.", content: "Kupitia Gibea of God Nayoth Foundation, tunajitahidi kuonyesha upendo wa Kristo kwa vitendo. Huduma yetu kwa yatima inajumuisha chakula, hifadhi, na elimu, tukiamini kuwa kila mtoto anastahili tumaini la baadaye.", date: "2024-04-28", image: BlogFeatureImageTwo },
  "b3": { id: "b3", title: "Maandalizi ya Unyakuo", author: "Askofu", category: "Mafundisho", summary: "Neno la kinabii juu ya maisha ya utakatifu.", content: "Maisha ya Mkristo katika nyakati hizi yanapaswa kuwa ya umakini na utakatifu. Unyakuo ni tukio la kweli litakalotokea hivi karibuni, na kanisa linapaswa kuwa tayari bila doa wala kunyanzi.", date: "2024-04-20", image: IdentityImage },
  "b4": { id: "b4", title: "Umoja wa Kanisa", author: "Mtumishi", category: "Ushirika", summary: "Kujenga jeshi lenye nguvu kupitia upendo.", content: "Umoja ndio silaha yetu kuu dhidi ya adui. Tunapokuwa na moyo mmoja na roho moja, Bwana anaamuru baraka zake juu yetu na kutufanya kuwa jeshi lisiloshindika.", date: "2024-04-12", image: CommunityImageTwo },
};

export default function BlogPostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const db = useFirestore();
  
  const postRef = useMemo(() => 
    db ? doc(db, "blogPosts", id) : null
  , [db, id]);
  
  const { data: firestorePost, loading } = useDoc(postRef);
  
  const post = firestorePost || sampleBlogs[id];

  if (loading && !post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center p-8 bg-slate-50">
          <h1 className="text-3xl font-headline font-bold mb-4 text-primary">Makala Haijapatikana</h1>
          <Button asChild className="rounded-full"><Link href="/blog">Back to Blog</Link></Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-grow">
        {/* Header Hero Area */}
        <div className="bg-[#fdfbf7] border-b">
          <div className="container mx-auto px-4 py-16 md:py-24 max-w-5xl">
            <Link href="/blog" className="inline-flex items-center text-sm text-primary mb-10 hover:underline font-bold uppercase tracking-[0.2em]">
               <ArrowLeft className="mr-2 h-4 w-4" /> Back to Stories
            </Link>
            <div className="space-y-8">
              <Badge className="bg-primary/5 text-primary hover:bg-primary/10 border-none px-6 py-1.5 rounded-full font-bold uppercase tracking-widest text-[10px]">{post.category}</Badge>
              <h1 className="text-4xl md:text-7xl font-headline font-bold text-slate-900 leading-[1.1] tracking-tight">{post.title}</h1>
              <div className="flex items-center gap-8 text-muted-foreground font-bold uppercase tracking-widest text-[10px]">
                <div className="flex items-center gap-2"><User className="h-4 w-4 text-accent" /> By <span className="text-slate-900">{post.author || "Admin"}</span></div>
                <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-accent" /> {post.date}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
          {/* Main Feature Image */}
          {(post.image || post.imageUrl) && (
            <div className="relative aspect-[16/9] rounded-[3rem] overflow-hidden shadow-2xl mb-20 border-8 border-white">
              <Image src={post.image || post.imageUrl || BlogFeatureImageOne} alt={post.title} fill className="object-cover" priority />
            </div>
          )}

          <div className="relative">
            <div className="absolute -left-16 top-0 hidden xl:block">
               <Quote className="h-12 w-12 text-accent/20" />
            </div>
            
            <article className="prose prose-slate lg:prose-xl max-w-none">
              <p className="text-2xl font-headline italic text-slate-600 leading-relaxed mb-10 border-l-4 border-accent pl-8 py-2 bg-slate-50 rounded-r-2xl">
                {post.summary}
              </p>
              
              <div className="text-lg leading-[1.8] text-slate-700 whitespace-pre-wrap font-body">
                {post.content}
              </div>
            </article>
          </div>

          <Separator className="my-20" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
            <div className="flex items-center gap-4">
               <div className="bg-primary text-white h-12 w-12 rounded-full flex items-center justify-center font-bold">N</div>
               <div>
                  <p className="font-bold text-primary">N.D.P.C.C. Editorial</p>
                  <p className="text-sm text-muted-foreground">Kuliandaa Kanisa kupitia elimu na neno.</p>
               </div>
            </div>
            <Button variant="outline" className="rounded-full px-8 h-12 border-primary/20 text-primary font-bold hover:bg-primary hover:text-white transition-all gap-2">
              <Share2 className="h-4 w-4" /> Share This Story
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
