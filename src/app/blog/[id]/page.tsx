
"use client";

import { use, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, User, Calendar, Share2, Loader2 } from "lucide-react";
import { useFirestore, useDoc } from "@/firebase";
import { doc } from "firebase/firestore";

export default function BlogPostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const db = useFirestore();
  
  const postRef = useMemo(() => 
    db ? doc(db, "blogPosts", id) : null
  , [db, id]);
  
  const { data: post, loading } = useDoc(postRef);

  if (loading) return <div className="flex min-h-screen items-center justify-center"><Loader2 className="h-12 w-12 text-primary animate-spin" /></div>;

  if (!post) return (
    <div className="flex min-h-screen flex-col">
      <Navbar /><main className="flex-grow flex flex-col items-center justify-center p-8"><h1 className="text-3xl font-headline font-bold mb-4">Post Not Found</h1><Button asChild><Link href="/blog">Back to Stories</Link></Button></main><Footer />
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
            <Link href="/blog" className="inline-flex items-center text-sm text-primary mb-8 hover:underline"><ChevronLeft className="mr-1 h-4 w-4" /> Back to Stories</Link>
            <div className="space-y-6">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">{post.category}</Badge>
              <h1 className="text-4xl md:text-6xl font-headline font-bold text-slate-900 leading-tight">{post.title}</h1>
              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2"><User className="h-5 w-5" /> <span className="font-medium text-slate-900">{post.author}</span></div>
                <div className="flex items-center gap-2"><Calendar className="h-5 w-5" /> {post.date}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {post.imageUrl && (
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl mb-12">
              <Image src={post.imageUrl} alt={post.title} fill className="object-cover" priority />
            </div>
          )}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border prose prose-slate max-w-none">
            <div className="text-lg leading-relaxed text-slate-700 whitespace-pre-wrap">
              {post.content}
            </div>
          </div>
          <div className="mt-12 flex justify-center">
            <Button variant="outline" className="rounded-full px-8 gap-2"><Share2 className="h-4 w-4" /> Share this Reflection</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
