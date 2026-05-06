
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
import { Search, User, Calendar, ArrowRight, Loader2 } from "lucide-react";
import { useFirestore, useCollection } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const db = useFirestore();

  const blogQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, "blogPosts"), orderBy("date", "desc"));
  }, [db]);

  const { data: posts, loading } = useCollection(blogQuery);

  const filteredPosts = posts?.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 md:px-8">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">Sanctuary Stories</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Reflections, updates, and insights from the heart of our community. Roots deep, branches wide.
          </p>
        </header>

        <section className="mb-16">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search articles or authors..." 
              className="pl-10 h-12 rounded-full border-muted/50 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </section>

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {filteredPosts?.map((post, idx) => (
              <Card key={post.id} className={`overflow-hidden border-none shadow-sm hover:shadow-md transition-all group bg-white ${idx === 0 && !searchQuery ? 'md:col-span-2' : ''}`}>
                <div className={`flex flex-col ${idx === 0 && !searchQuery ? 'md:flex-row' : ''}`}>
                  <div className={`relative aspect-[16/9] ${idx === 0 && !searchQuery ? 'md:w-1/2 md:aspect-auto' : 'w-full'}`}>
                    {post.imageUrl && (
                      <Image 
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className={`p-8 flex flex-col justify-center ${idx === 0 && !searchQuery ? 'md:w-1/2' : 'w-full'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10 font-bold">
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-xs text-muted-foreground gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </div>
                    </div>
                    <CardTitle className={`font-headline group-hover:text-primary transition-colors mb-4 ${idx === 0 && !searchQuery ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
                      {post.title}
                    </CardTitle>
                    <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                      {post.summary}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        {post.author}
                      </div>
                      <Button variant="link" asChild className="p-0 text-accent font-bold hover:text-primary flex items-center gap-2">
                        <Link href={`/blog/${post.id}`}>
                          Read Story <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredPosts?.length === 0 && (
          <div className="py-24 text-center">
            <h3 className="text-xl font-medium text-muted-foreground">No stories found.</h3>
            <Button variant="link" onClick={() => setSearchQuery("")} className="mt-2 text-primary">View all stories</Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
