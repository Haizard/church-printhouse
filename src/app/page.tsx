
"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Shield, Swords, Globe, Calendar, ArrowRight } from "lucide-react";
import { useFirestore, useCollection } from "@/firebase";
import { collection, query, limit, orderBy } from "firebase/firestore";
import { useMemo } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Home() {
  const db = useFirestore();

  const heroSlides = [
    { image: "hero-1", title: "Nayoth Divine Power Christian Center", sub: "Ngome ya Bwana kwa Makimbilio ya Watu Wake" },
    { image: "hero-2", title: "Kuliandaa Kanisa", sub: "Kwa ajili ya unyakuo wa watakatifu" },
    { image: "hero-3", title: "Kuinua Jeshi la Bwana", sub: "Mafunzo na uamsho kwa watumishi wote" },
    { image: "hero-4", title: "Injili kwa Mataifa", sub: "Kuwafikia wengi kwa uweza wa Mungu" },
  ];

  const sermonsQuery = useMemo(() => db ? query(collection(db, "sermons"), orderBy("date", "desc"), limit(6)) : null, [db]);
  const eventsQuery = useMemo(() => db ? query(collection(db, "events"), orderBy("date", "asc"), limit(6)) : null, [db]);
  const blogsQuery = useMemo(() => db ? query(collection(db, "blogPosts"), orderBy("date", "desc"), limit(6)) : null, [db]);

  const { data: sermons } = useCollection(sermonsQuery);
  const { data: events } = useCollection(eventsQuery);
  const { data: blogs } = useCollection(blogsQuery);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Slider Section */}
        <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
          <Carousel 
            plugins={[Autoplay({ delay: 5000 })]}
            className="w-full h-full"
            opts={{ loop: true }}
          >
            <CarouselContent className="h-full">
              {heroSlides.map((slide, index) => {
                const img = PlaceHolderImages.find(i => i.id === slide.image);
                return (
                  <CarouselItem key={index} className="relative h-full basis-full">
                    <Image
                      src={img?.imageUrl || `https://picsum.photos/seed/${index}/1200/800`}
                      alt={slide.title}
                      fill
                      className="object-cover brightness-[0.5]"
                      priority
                      data-ai-hint={img?.imageHint}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
                      <div className="max-w-4xl space-y-4">
                        <h1 className="text-3xl md:text-7xl font-headline font-bold">
                          {slide.title}
                        </h1>
                        <p className="text-lg md:text-2xl font-light opacity-90 italic">
                          "{slide.sub}"
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </section>

        {/* content Sliders: 2 on mobile, 3 on desktop */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h3 className="text-primary font-bold tracking-widest text-xs uppercase mb-2">Neno la Bwana</h3>
                <h2 className="text-3xl md:text-4xl font-headline font-bold">Mahubiri ya Karibuni</h2>
              </div>
              <Button variant="link" asChild className="hidden md:flex gap-2 text-accent font-bold">
                <Link href="/sermons">Ona Yote <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
            
            <Carousel className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {sermons?.map((sermon) => (
                  <CarouselItem key={sermon.id} className="pl-2 md:pl-4 basis-1/2 lg:basis-1/3">
                    <Card className="h-full border-none shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col bg-white">
                      <div className="relative aspect-video">
                        <Image 
                          src={sermon.imageUrl || "https://picsum.photos/seed/sermon/600/400"} 
                          alt={sermon.title} 
                          fill 
                          className="object-cover" 
                          data-ai-hint="bible pulpit"
                        />
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="text-xs md:text-base line-clamp-1 font-headline">{sermon.title}</CardTitle>
                      </CardHeader>
                      <CardFooter className="mt-auto p-4 pt-0">
                        <Button variant="link" size="sm" asChild className="p-0 text-primary font-bold text-[10px]">
                          <Link href={`/sermons/${sermon.id}`}>Sikiliza</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>

        {/* Vision Section: 2 on mobile, 3 on desktop */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-12">Huduma na Maono Yetu</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-2xl w-fit mx-auto"><Shield className="h-8 w-8 text-primary" /></div>
                <h3 className="font-headline font-bold text-lg">Kuliandaa Kanisa</h3>
                <p className="text-[10px] md:text-xs text-muted-foreground">Kuhakikisha kanisa lipo tayari kwa unyakuo.</p>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-2xl w-fit mx-auto"><Swords className="h-8 w-8 text-primary" /></div>
                <h3 className="font-headline font-bold text-lg">Kuinua Jeshi</h3>
                <p className="text-[10px] md:text-xs text-muted-foreground">Kujenga jeshi la kiroho kwa ajili ya uamsho.</p>
              </div>
              <div className="space-y-4 max-lg:col-span-2">
                <div className="p-4 bg-primary/10 rounded-2xl w-fit mx-auto"><Globe className="h-8 w-8 text-primary" /></div>
                <h3 className="font-headline font-bold text-lg">Uinjilisti</h3>
                <p className="text-[10px] md:text-xs text-muted-foreground">Kufikisha injili ya ufalme kwa mataifa yote.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
