
"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Play, Shield, Swords, Megaphone, Users, Heart, GraduationCap, Globe, Calendar, Mic, FileText, ArrowRight } from "lucide-react";
import { useFirestore, useCollection } from "@/firebase";
import { collection, query, limit, orderBy } from "firebase/firestore";
import { useMemo } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Slider Section */}
        <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
          <Carousel 
            plugins={[Autoplay({ delay: 5000 })]}
            className="w-full h-full"
            opts={{ loop: true }}
          >
            <CarouselContent className="h-full">
              {heroSlides.map((slide, index) => {
                const img = PlaceHolderImages.find(i => i.id === slide.image);
                return (
                  <CarouselItem key={index} className="relative h-[70vh] md:h-[80vh]">
                    <Image
                      src={img?.imageUrl || "https://picsum.photos/seed/hero/1200/600"}
                      alt={slide.title}
                      fill
                      className="object-cover brightness-[0.5]"
                      priority
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
                      <div className="max-w-4xl space-y-4">
                        <h1 className="text-3xl md:text-7xl font-headline font-bold animate-in fade-in slide-in-from-bottom-4 duration-700">
                          {slide.title}
                        </h1>
                        <p className="text-lg md:text-3xl font-light opacity-90 animate-in fade-in slide-in-from-bottom-8 duration-700">
                          "{slide.sub}"
                        </p>
                        <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-12 duration-700">
                          <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-lg px-8" asChild>
                            <Link href="/contact">Karibu Tushiriki</Link>
                          </Button>
                          <Button size="lg" variant="outline" className="rounded-full border-white text-white hover:bg-white/10 text-lg px-8" asChild>
                            <Link href="/sermons">Sikiliza Neno</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </section>

        {/* Neno la Karibuni Slider (Sermons) */}
        {sermons && sermons.length > 0 && (
          <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4 md:px-8">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h3 className="text-primary font-bold tracking-widest text-xs uppercase mb-2">Maktaba ya Neno</h3>
                  <h2 className="text-3xl md:text-4xl font-headline font-bold">Neno la Karibuni</h2>
                </div>
                <Button variant="link" asChild className="hidden md:flex gap-2">
                  <Link href="/sermons">View All <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </div>
              
              <Carousel className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {sermons.map((sermon) => (
                    <CarouselItem key={sermon.id} className="pl-2 md:pl-4 basis-1/2 lg:basis-1/3">
                      <Card className="h-full border-none shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
                        <div className="relative aspect-video">
                          <Image src={sermon.imageUrl || "https://picsum.photos/seed/sermon/400/300"} alt={sermon.title} fill className="object-cover" />
                        </div>
                        <CardHeader className="p-4">
                          <p className="text-[10px] font-bold text-accent mb-1">{sermon.date}</p>
                          <CardTitle className="text-lg line-clamp-1">{sermon.title}</CardTitle>
                        </CardHeader>
                        <CardFooter className="mt-auto p-4 pt-0">
                          <Button variant="link" size="sm" asChild className="p-0 text-primary">
                            <Link href={`/sermons/${sermon.id}`}>Sikiliza Sasa</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>
            </div>
          </section>
        )}

        {/* Matukio Yajayo Slider */}
        {events && events.length > 0 && (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-8">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h3 className="text-accent font-bold tracking-widest text-xs uppercase mb-2">Ungana Nasi</h3>
                  <h2 className="text-3xl md:text-4xl font-headline font-bold">Matukio Yajayo</h2>
                </div>
                <Button variant="link" asChild className="hidden md:flex gap-2">
                  <Link href="/events">Kalenda Yote <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </div>

              <Carousel className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {events.map((event) => (
                    <CarouselItem key={event.id} className="pl-2 md:pl-4 basis-1/2 lg:basis-1/3">
                      <Card className="h-full border border-slate-100 shadow-none bg-slate-50/50">
                        <CardHeader className="p-4">
                          <div className="flex items-center gap-2 text-primary font-bold text-xs mb-2">
                            <Calendar className="h-3 w-3" /> {event.date}
                          </div>
                          <CardTitle className="text-lg line-clamp-1">{event.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-xs text-muted-foreground line-clamp-2">{event.description}</p>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button variant="link" size="sm" asChild className="p-0 text-accent">
                            <Link href={`/events/${event.id}`}>Maelezo</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>
            </div>
          </section>
        )}

        {/* Vision & History Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <header className="text-center mb-16">
                <h3 className="text-primary font-bold tracking-widest text-sm uppercase mb-2">Asili na Maono</h3>
                <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6">Historia ya Huduma Yangu</h2>
                <div className="h-1 w-20 bg-accent mx-auto rounded-full" />
              </header>

              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-8">
                <p>
                  Mungu alianza kusema nami juu ya utumishi wangu mwaka wa <strong>1992</strong>. Alionyesha maono ya kazi nitakayoifanya duniani. Tangu wakati huo niliendelea kumtumikia Mungu bila ya maono rasmi aliyoniamuru kuanza.
                </p>
                <div className="bg-primary p-8 rounded-3xl border-l-8 border-accent italic text-primary-foreground font-headline text-2xl shadow-xl">
                  "Ilipofika 2008 nikapewa jina la huduma, jina NAYOTH DIVINE POWER CHRISTIAN CENTER... Maana ya hili jina ni NGOME YA BWANA KWA MAKIMBILIO YA WATU WAKE."
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-20">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="text-xl font-headline font-bold text-primary">Kuliandaa Kanisa</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Kuliandaa kanisa kwa unyakuo Bwana ajapo kupitia semina na vyombo vya habari.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl">
                      <Swords className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="text-xl font-headline font-bold text-primary">Kuinua Jeshi</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Kuinua jeshi la Bwana litakaloendesha uamsho kupitia mafunzo ya watumishi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blogu Slider */}
        {blogs && blogs.length > 0 && (
          <section className="py-20 bg-slate-900 text-white">
            <div className="container mx-auto px-4 md:px-8">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h3 className="text-accent font-bold tracking-widest text-xs uppercase mb-2">Makala na Shuhuda</h3>
                  <h2 className="text-3xl md:text-4xl font-headline font-bold">Blogu Yetu</h2>
                </div>
                <Button variant="link" asChild className="hidden md:flex gap-2 text-white hover:text-accent">
                  <Link href="/blog">Zote <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </div>

              <Carousel className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {blogs.map((post) => (
                    <CarouselItem key={post.id} className="pl-2 md:pl-4 basis-1/2 lg:basis-1/3">
                      <Card className="h-full border-none bg-white/5 backdrop-blur hover:bg-white/10 transition-all overflow-hidden text-white flex flex-col">
                        <div className="relative aspect-[16/10]">
                          <Image src={post.imageUrl || "https://picsum.photos/seed/blog/400/300"} alt={post.title} fill className="object-cover" />
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                          <p className="text-[10px] text-accent mb-2">{post.date}</p>
                          <h4 className="text-lg font-bold line-clamp-2 mb-3">{post.title}</h4>
                          <Button variant="link" size="sm" asChild className="mt-auto p-0 text-white justify-start">
                            <Link href={`/blog/${post.id}`}>Soma Zaidi</Link>
                          </Button>
                        </div>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>
            </div>
          </section>
        )}

        {/* Romans 1:16 Call to Action */}
        <section className="py-24 bg-primary text-primary-foreground overflow-hidden relative">
          <div className="absolute top-0 right-0 opacity-10 -translate-y-1/2 translate-x-1/4">
            <Shield className="h-96 w-96" />
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-6xl font-headline font-bold mb-8 leading-tight max-w-4xl mx-auto">
              "SIIONEI HAYA INJILI KWA MAANA NI UWEZA WA MUNGU ULETAO WOKOVU."
            </h2>
            <p className="text-2xl font-bold text-accent mb-12">Warumi 1:16</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-slate-100 font-bold px-10">
                <Link href="/contact">Jiunge Nasi</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
