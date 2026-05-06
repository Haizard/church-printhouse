
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Maximize2, Camera, Loader2 } from "lucide-react";
import { useFirestore, useCollection } from "@/firebase";
import { collection, query } from "firebase/firestore";

const CATEGORIES = ["All", "Worship", "Community", "Outreach", "Nature", "Sanctuary"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const db = useFirestore();

  const galleryQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, "gallery"));
  }, [db]);

  const { data: items, loading } = useCollection(galleryQuery);

  const filteredItems = items?.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12 md:px-8">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            <Camera className="h-3 w-3" /> Visual Journey
          </div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">Life at Sanctuary</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A window into our community gatherings, worship moments, and the beautiful nature that surrounds us.
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => setActiveCategory(cat)}
              className="rounded-full px-6 transition-all"
            >
              {cat}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems?.map((item) => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <Card className="group relative aspect-[4/5] overflow-hidden border-none cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500">
                    {item.imageUrl && (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                      <Badge className="w-fit mb-2 bg-white/20 backdrop-blur-md border-white/30 text-white">
                        {item.category}
                      </Badge>
                      <h3 className="text-white font-headline font-bold text-xl">{item.title}</h3>
                      <Maximize2 className="absolute top-4 right-4 text-white/50 h-5 w-5" />
                    </div>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-[90vw] md:max-w-[70vw] p-0 overflow-hidden bg-black border-none">
                  <div className="relative aspect-[16/9] w-full">
                    {item.imageUrl && (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-contain"
                      />
                    )}
                  </div>
                  <div className="p-6 bg-white dark:bg-slate-900">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-2xl font-headline font-bold text-primary">{item.title}</h2>
                      <Badge variant="secondary">{item.category}</Badge>
                    </div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}

        {!loading && filteredItems?.length === 0 && (
          <div className="py-24 text-center">
            <h3 className="text-xl font-medium text-muted-foreground">No images found in this category.</h3>
            <Button variant="link" onClick={() => setActiveCategory("All")} className="mt-2 text-primary">
              View all images
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
