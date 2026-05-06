
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, ArrowRight, Loader2 } from "lucide-react";
import { useFirestore, useCollection } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";

import BlogFeatureImageOne from "@/images/_B4A1505.jpg";
import BlogFeatureImageTwo from "@/images/_B4A7071.jpg";
import IdentityImage from "@/images/_B4A1451.jpg";
import CommunityImageTwo from "@/images/_B4A7030.jpg";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const db = useFirestore();

  const blogQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, "blogPosts"), orderBy("date", "desc"));
  }, [db]);

  const { data: posts, loading } = useCollection(blogQuery);

  const sampleBlogs = [
    { id: "b1", title: "Safari yetu tangu 1992", category: "Historia", summary: "Kujifunza jinsi Bwana alivyoanzisha huduma hii ya kuliandaa kanisa.", date: "2024-05-02", image: BlogFeatureImageOne },
    { id: "b2", title: "Huduma kwa Mayatima", category: "Foundation", summary: "Gibea Foundation ikifungua milango ya matumaini kwa jamii.", date: "2024-04-28", image: BlogFeatureImageTwo },
    { id: "b3", title: "Maandalizi ya Unyakuo", category: "Mafundisho", summary: "Neno la kinabii juu ya maisha ya utakatifu katika nyakati hizi.", date: "2024-04-20", image: IdentityImage },
    { id: "b4", title: "Umoja wa Kanisa", category: "Ushirika", summary: "Kujenga jeshi lenye nguvu kupitia upendo na umoja wa Roho.", date: "2024-04-12", image: CommunityImageTwo },
  ];

  const displayPosts = posts && posts.length > 0 ? posts : sampleBlogs;

  const filteredPosts = displayPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 md:px-8">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">Blogu Yetu</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">Makala, mafundisho, na habari mbalimbali kutoka N.D.P.C.C.</p>
        </header>

        <section className="mb-16">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Tafuta makala..." className="pl-10 h-12 rounded-full border-muted/50 bg-white" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </section>

        {loading && posts?.length === 0 ? (
          <div className="flex justify-center py-24"><Loader2 className="h-12 w-12 text-primary animate-spin" /></div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all group bg-white flex flex-col">
                <div className="relative aspect-[16/10] bg-slate-100">
                  <Image src={post.image || post.imageUrl || BlogFeatureImageOne} alt={post.title} fill className="object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 md:p-6 flex flex-col flex-grow">
                  <Badge variant="secondary" className="bg-primary/5 text-primary text-[10px] font-bold w-fit mb-2">{post.category}</Badge>
                  <CardTitle className="font-headline text-lg md:text-xl group-hover:text-primary transition-colors mb-3 line-clamp-2">{post.title}</CardTitle>
                  <p className="text-xs md:text-sm text-muted-foreground line-clamp-3 mb-4">{post.summary}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                    <Button variant="link" asChild className="p-0 h-auto text-accent text-xs font-bold">
                      <Link href={`/blog/${post.id}`}>Soma <ArrowRight className="h-3 w-3 ml-1" /></Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
