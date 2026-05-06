"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Shield, Swords, Globe, Calendar, ArrowRight, Clock, Sparkles } from "lucide-react";
import { useFirestore, useCollection } from "@/firebase";
import { collection, query, limit, orderBy } from "firebase/firestore";
import { useMemo } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Badge } from "@/components/ui/badge";
import HeroImageOne from "@/images/_B4A1507.jpg";
import HeroImageTwo from "@/images/_B4A1498.jpg";
import HeroImageThree from "@/images/_B4A1527.jpg";
import HeroImageFour from "@/images/_B4A1581.jpg";

function SectionHeader({
  kicker,
  title,
  actionHref,
  actionText,
}: {
  kicker: string;
  title: string;
  actionHref: string;
  actionText: string;
}) {
  return (
    <div className="mb-10 flex items-end justify-between gap-4">
      <div className="space-y-1">
        <p className="section-header-kicker">{kicker}</p>
        <h2 className="section-header-title">{title}</h2>
      </div>
      <Button variant="ghost" asChild className="rounded-full border border-primary/15 bg-white px-5 text-primary hover:bg-primary hover:text-white">
        <Link href={actionHref}>
          {actionText} <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}

export default function Home() {
  const db = useFirestore();

  const heroSlides = [
    { image: HeroImageOne, title: "Nayoth Divine Power Christian Center", sub: "Ngome ya Bwana kwa Makimbilio ya Watu Wake", hint: "church worship" },
    { image: HeroImageTwo, title: "Kuliandaa Kanisa", sub: "Kwa ajili ya unyakuo wa watakatifu", hint: "prayer service" },
    { image: HeroImageThree, title: "Kuinua Jeshi la Bwana", sub: "Mafunzo na uamsho kwa watumishi wote", hint: "church gathering" },
    { image: HeroImageFour, title: "Injili kwa Mataifa", sub: "Kuwafikia wengi kwa uweza wa Mungu", hint: "community church" },
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
        <section className="relative h-[72vh] min-h-[560px] md:h-[88vh] w-full overflow-hidden">
          <Carousel
            plugins={[Autoplay({ delay: 5000 })]}
            className="w-full h-full"
            opts={{ loop: true }}
          >
            <CarouselContent className="h-full">
              {heroSlides.map((slide, index) => {
                return (
                  <CarouselItem key={index} className="relative h-full basis-full">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      priority
                      data-ai-hint={slide.hint}
                    />
                    <div className="hero-overlay absolute inset-0" />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background/45 to-transparent" />
                    <div className="absolute inset-0 flex items-center px-4 md:px-8">
                      <div className="container mx-auto">
                        <div className="max-w-4xl space-y-6">
                          <span className="glass-kicker">
                            <Sparkles className="mr-2 h-3.5 w-3.5" />
                            Karibu N.D.P.C.C
                          </span>
                          <h1 className="hero-title">{slide.title}</h1>
                          <p className="hero-subtitle">"{slide.sub}"</p>
                          <div className="flex flex-wrap gap-3 pt-2">
                            <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-slate-100 px-7">
                              <Link href="/contact">Omba Maombi</Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="modern-outline-button rounded-full px-7">
                              <Link href="/sermons">Sikiliza Mahubiri</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </section>

        <section className="section-shell bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="premium-card rounded-3xl border-primary/10">
                <CardContent className="p-6 space-y-3">
                  <span className="mission-pill"><Shield className="h-4 w-4" /> Kuliandaa Kanisa</span>
                  <p className="text-sm text-muted-foreground leading-relaxed">Tunalijenga kanisa kuwa tayari kwa unyakuo kupitia mafundisho yenye msingi wa Neno.</p>
                </CardContent>
              </Card>
              <Card className="premium-card rounded-3xl border-primary/10">
                <CardContent className="p-6 space-y-3">
                  <span className="mission-pill"><Swords className="h-4 w-4" /> Kuinua Jeshi</span>
                  <p className="text-sm text-muted-foreground leading-relaxed">Tunainua watumishi kwa mafunzo ya kina na maisha ya maombi kwa ajili ya uamsho.</p>
                </CardContent>
              </Card>
              <Card className="premium-card rounded-3xl border-primary/10">
                <CardContent className="p-6 space-y-3">
                  <span className="mission-pill"><Globe className="h-4 w-4" /> Injili kwa Mataifa</span>
                  <p className="text-sm text-muted-foreground leading-relaxed">Tunapeleka injili kwa jamii nyingi kwa ushuhuda, huduma na upendo wa Kristo.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="section-shell section-alt">
          <div className="container mx-auto px-4 md:px-8">
            <SectionHeader kicker="Neno la Bwana" title="Mahubiri ya Karibuni" actionHref="/sermons" actionText="Ona Yote" />
            <Carousel className="w-full">
              <CarouselContent className="-ml-3 md:-ml-5">
                {sermons?.map((sermon) => (
                  <CarouselItem key={sermon.id} className="pl-3 md:pl-5 basis-[88%] sm:basis-1/2 lg:basis-1/3">
                    <Card className="premium-card h-full rounded-3xl overflow-hidden flex flex-col">
                      <div className="relative aspect-video">
                        <Image src={sermon.imageUrl || "https://picsum.photos/seed/sermon/600/400"} alt={sermon.title} fill className="object-cover" data-ai-hint="bible pulpit" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>
                      <CardHeader className="p-5 pb-3">
                        <CardTitle className="text-base line-clamp-1">{sermon.title}</CardTitle>
                      </CardHeader>
                      <CardFooter className="mt-auto p-5 pt-0">
                        <Button variant="ghost" size="sm" asChild className="px-0 text-primary font-semibold hover:text-accent">
                          <Link href={`/sermons/${sermon.id}`}>Sikiliza <ArrowRight className="ml-1 h-4 w-4" /></Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>

        <section className="section-shell bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <SectionHeader kicker="Umoja Wetu" title="Matukio Yajayo" actionHref="/events" actionText="Tazama Matukio" />
            <Carousel className="w-full">
              <CarouselContent className="-ml-3 md:-ml-5">
                {events?.map((event) => (
                  <CarouselItem key={event.id} className="pl-3 md:pl-5 basis-[88%] sm:basis-1/2 lg:basis-1/3">
                    <Card className="premium-card h-full rounded-3xl overflow-hidden flex flex-col border-primary/10">
                      <div className="p-6 bg-gradient-to-br from-primary/10 via-background to-accent/5 border-b border-primary/10">
                        <div className="mb-4 w-fit rounded-2xl bg-white p-3 shadow-sm">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <p className="font-headline text-primary font-bold text-base">{event.date}</p>
                      </div>
                      <CardContent className="p-5 flex-grow">
                        <h4 className="font-headline font-bold text-base mb-2 line-clamp-2">{event.title}</h4>
                        <p className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" /> {event.time}
                        </p>
                      </CardContent>
                      <CardFooter className="p-5 pt-0">
                        <Button variant="ghost" size="sm" asChild className="px-0 text-primary font-semibold hover:text-accent">
                          <Link href={`/events/${event.id}`}>Maelezo <ArrowRight className="ml-1 h-4 w-4" /></Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>

        <section className="section-shell section-alt">
          <div className="container mx-auto px-4 md:px-8">
            <SectionHeader kicker="Habari na Makala" title="Blogu Yetu" actionHref="/blog" actionText="Soma Zaidi" />
            <Carousel className="w-full">
              <CarouselContent className="-ml-3 md:-ml-5">
                {blogs?.map((blog) => (
                  <CarouselItem key={blog.id} className="pl-3 md:pl-5 basis-[88%] sm:basis-1/2 lg:basis-1/3">
                    <Card className="premium-card h-full rounded-3xl overflow-hidden flex flex-col">
                      <div className="relative aspect-[16/10]">
                        <Image src={blog.imageUrl || "https://picsum.photos/seed/blog/600/400"} alt={blog.title} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                      </div>
                      <CardContent className="p-5 flex-grow space-y-3">
                        <Badge variant="secondary" className="w-fit rounded-full bg-primary/10 text-primary px-3 py-1 text-[10px] font-semibold">
                          {blog.category}
                        </Badge>
                        <h4 className="font-headline font-bold text-base line-clamp-2">{blog.title}</h4>
                      </CardContent>
                      <CardFooter className="p-5 pt-0">
                        <Button variant="ghost" size="sm" asChild className="px-0 text-primary font-semibold hover:text-accent">
                          <Link href={`/blog/${blog.id}`}>Soma <ArrowRight className="ml-1 h-4 w-4" /></Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>

        <section className="section-shell px-4 md:px-8">
          <div className="container mx-auto">
            <div className="cta-band relative overflow-hidden rounded-[2rem] px-6 py-14 md:px-12 md:py-16 text-white">
              <div className="absolute -top-20 -right-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
              <div className="relative z-10 max-w-3xl space-y-5">
                <p className="glass-kicker border-white/25 bg-white/10">Jenga Nasi Safari ya Imani</p>
                <h3 className="text-3xl md:text-5xl font-headline font-bold leading-tight">
                  "Siionei haya Injili kwa maana ni uweza wa Mungu uletao wokovu kwa kila aaminiye."
                </h3>
                <p className="text-white/85 text-base md:text-lg">Warumi 1:16</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-slate-100 px-8">
                    <Link href="/contact">Wasiliana Nasi</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="modern-outline-button rounded-full px-8">
                    <Link href="/events">Jiunge na Tukio</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
