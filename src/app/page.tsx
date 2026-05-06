
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Globe, Shield, Sparkles, Swords, Cross, Target, Compass, Heart } from "lucide-react";
import { useMemo } from "react";
import { collection, limit, orderBy, query } from "firebase/firestore";
import Autoplay from "embla-carousel-autoplay";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { useCollection, useFirestore } from "@/firebase";

// Importing local images for homepage sections
import HeroImageOne from "@/images/_B4A1507.jpg";
import HeroImageTwo from "@/images/_B4A1498.jpg";
import HeroImageThree from "@/images/_B4A1527.jpg";
import HeroImageFour from "@/images/_B4A1581.jpg";
import IdentityImage from "@/images/_B4A1451.jpg";
import WorshipImage from "@/images/_B4A1779.jpg";
import CommunityImageOne from "@/images/_B4A1466.jpg";
import CommunityImageTwo from "@/images/_B4A7030.jpg";
import CommunityImageThree from "@/images/_B4A1752.jpg";
import BlogFeatureImageOne from "@/images/_B4A1505.jpg";
import BlogFeatureImageTwo from "@/images/_B4A7071.jpg";

function SectionHeader({
  kicker,
  title,
  actionHref,
  actionText,
  light = false,
}: {
  kicker: string;
  title: string;
  actionHref?: string;
  actionText?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="space-y-2">
        <p className={`section-header-kicker ${light ? "text-white/75" : ""}`}>{kicker}</p>
        <h2 className={`section-header-title ${light ? "text-white" : ""}`}>{title}</h2>
      </div>
      {actionHref && actionText ? (
        <Button
          variant="ghost"
          asChild
          className={`rounded-full px-5 ${
            light
              ? "border border-white/20 bg-white/10 text-white hover:bg-white hover:text-primary"
              : "border border-primary/15 bg-white text-primary hover:bg-primary hover:text-white"
          }`}
        >
          <Link href={actionHref}>
            {actionText} <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      ) : null}
    </div>
  );
}

export default function Home() {
  const db = useFirestore();

  const heroSlides = [
    { image: HeroImageOne, title: "Nayoth Divine Power Christian Center" },
    { image: HeroImageTwo, title: "Kuliandaa Kanisa kwa Unyakuo" },
    { image: HeroImageThree, title: "Kuinua Jeshi la Bwana Duniani" },
    { image: HeroImageFour, title: "Injili ya Ufalme kwa Mataifa" },
  ];

  const sampleEvents = [
    { id: "e1", title: "Ibada ya Jumapili", date: "Kila Jumapili", time: "09:00 AM", category: "Ibada", description: "Karibu tushiriki sifa na neno la uzima." },
    { id: "e2", title: "Semina ya Vijana", date: "Jumamosi Hii", time: "03:00 PM", category: "Huduma", description: "Kuinua jeshi la kiroho katika kizazi hiki." },
    { id: "e3", title: "Mkutano wa Injili", date: "20 Mei 2024", time: "04:30 PM", category: "Mikutano", description: "Kufikisha habari njema mitaani." },
    { id: "e4", title: "Mkesha wa Maombi", date: "Ijumaa ya Kwanza", time: "10:00 PM", category: "Maombi", description: "Kujiandaa kwa ajili ya unyakuo kupitia magoti." },
  ];

  const sampleSermons = [
    { id: "s1", title: "Nguvu ya Utakatifu", speaker: "Askofu", topic: "Utakatifu", image: WorshipImage },
    { id: "s2", title: "Jeshi la Mwisho", speaker: "Mchungaji", topic: "Uamsho", image: HeroImageOne },
    { id: "s3", title: "Kimbilio la Kweli", speaker: "Mtumishi", topic: "Imani", image: HeroImageThree },
    { id: "s4", title: "Unyakuo wa Kanisa", speaker: "Askofu", topic: "Biblia", image: CommunityImageOne },
  ];

  const sampleBlogs = [
    { id: "b1", title: "Safari yetu tangu 1992", category: "Historia", summary: "Jinsi Bwana alivyoanzisha huduma hii ya kipekee.", image: BlogFeatureImageOne },
    { id: "b2", title: "Huduma kwa Mayatima", category: "Foundation", summary: "Gibea Foundation ikigusa maisha ya wahitaji.", image: BlogFeatureImageTwo },
    { id: "b3", title: "Maandalizi ya Unyakuo", category: "Mafundisho", summary: "Nini unapaswa kufanya ukiwa Mkristo katika nyakati hizi.", image: IdentityImage },
    { id: "b4", title: "Umoja wa Kanisa", category: "Ushirika", summary: "Kujenga jeshi lenye nguvu kupitia upendo na umoja.", image: CommunityImageTwo },
  ];

  const communityGallery = [
    { image: CommunityImageOne, title: "Ibada ya Sifa" },
    { image: CommunityImageTwo, title: "Umoja wa Waamini" },
    { image: CommunityImageThree, title: "Huduma na Maombi" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-grow">
        {/* 1. Hero Slider - Lightened and Premium */}
        <section className="hero-section relative h-[90vh] min-h-[700px] overflow-hidden">
          <Carousel plugins={[Autoplay({ delay: 6000 })]} className="h-full w-full" opts={{ loop: true }}>
            <CarouselContent className="h-full">
              {heroSlides.map((slide, index) => (
                <CarouselItem key={index} className="relative h-full basis-full">
                  <Image src={slide.image} alt={slide.title} fill priority className="object-cover" />
                  <div className="absolute inset-0 bg-black/10" /> {/* Very light overlay as requested */}
                  <div className="hero-shell absolute inset-0 px-4 md:px-8">
                    <div className="container mx-auto flex h-full items-center">
                      <div className="hero-copy">
                        <h1 className="hero-title">{slide.title}</h1>
                        <div className="hero-stats-grid">
                          <div className="hero-stat-card">
                            <p className="hero-stat-label">Utume</p>
                            <p className="hero-stat-value">Kuliandaa Kanisa</p>
                          </div>
                          <div className="hero-stat-card">
                            <p className="hero-stat-label">Jeshi</p>
                            <p className="hero-stat-value">Kuinua Watumishi</p>
                          </div>
                          <div className="hero-stat-card">
                            <p className="hero-stat-label">Injili</p>
                            <p className="hero-stat-value">Kufikia Mataifa</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>

        {/* 2. Mission Band */}
        <section className="mission-band-shell">
          <div className="container mx-auto px-4 md:px-8">
            <div className="mission-band-grid">
              <Card className="mission-band-card">
                <CardContent className="space-y-4 p-8">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
                    <Shield className="h-4 w-4" /> Kuliandaa Kanisa
                  </span>
                  <p className="mission-band-copy text-sm leading-relaxed text-muted-foreground">Tunalijenga kanisa kuwa tayari kwa unyakuo kupitia mafundisho ya utakatifu.</p>
                </CardContent>
              </Card>
              <Card className="mission-band-card">
                <CardContent className="space-y-4 p-8">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
                    <Swords className="h-4 w-4" /> Kuinua Jeshi
                  </span>
                  <p className="mission-band-copy text-sm leading-relaxed text-muted-foreground">Tunainua watumishi na waamini kwa mafunzo ya kina na uamsho mkubwa.</p>
                </CardContent>
              </Card>
              <Card className="mission-band-card hidden lg:block">
                <CardContent className="space-y-4 p-8">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
                    <Globe className="h-4 w-4" /> Uinjilisti
                  </span>
                  <p className="mission-band-copy text-sm leading-relaxed text-muted-foreground">Tunaeneza injili ya ufalme kwa mataifa yote kupitia kila njia ya ushuhuda.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 3. Identity Section */}
        <section className="section-shell identity-shell px-4 md:px-8">
          <div className="container mx-auto">
            <div className="image-story-panel relative min-h-[560px] overflow-hidden rounded-[2.5rem]">
              <Image src={IdentityImage} alt="Identity" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="image-story-content relative z-10 flex h-full flex-col justify-end p-8 md:p-16 text-white max-w-3xl">
                <p className="section-header-kicker text-white/80">Utambulisho Wetu</p>
                <h2 className="text-4xl md:text-6xl font-headline font-bold leading-tight">Ngome ya Bwana kwa Makimbilio ya Watu Wake.</h2>
                <p className="text-lg opacity-80 mt-4">Tangu 1992, tumekuwa kitovu cha maombi na uamsho wa kweli wa Roho Mtakatifu kwa ajili ya kanisa la mwisho.</p>
                <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-slate-100 w-fit mt-8 h-14 px-8 font-bold">
                  <Link href="/about">Soma Historia</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Featured Events Slider */}
        <section className="section-shell events-shell bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <SectionHeader kicker="Umoja Wetu" title="Matukio Yajayo" actionHref="/events" actionText="Ona Yote" />
            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {sampleEvents.map((event) => (
                  <CarouselItem key={event.id} className="basis-1/2 lg:basis-1/3 pl-4">
                    <Card className="event-editorial-card h-full rounded-[2rem] border border-primary/5 bg-slate-50/50 hover:shadow-xl transition-all">
                      <CardContent className="p-8 space-y-6">
                        <Badge className="bg-primary/5 text-primary border-none rounded-full px-4">{event.date}</Badge>
                        <h3 className="text-2xl font-headline font-bold text-primary line-clamp-1">{event.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                        <div className="pt-4 border-t border-primary/5 flex items-center justify-between text-xs font-bold">
                          <span className="text-primary/60 flex items-center gap-1"><Clock className="h-3 w-3" /> {event.time}</span>
                          <Link href={`/events/${event.id}`} className="text-accent hover:underline">Ona Zaidi</Link>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>

        {/* 5. Worship / Scripture Highlight Section - High Contrast Image */}
        <section className="section-shell relative overflow-hidden bg-black text-white">
          <div className="absolute inset-0 pointer-events-none">
            <Image 
              src={WorshipImage} 
              alt="Worship" 
              fill 
              className="object-cover opacity-60" 
            />
          </div>
          <div className="container mx-auto px-4 text-center relative z-10 py-12">
            <div className="max-w-4xl mx-auto space-y-8">
              <Cross className="h-12 w-12 text-accent mx-auto mb-4" />
              <h2 className="text-3xl md:text-5xl font-headline font-bold leading-tight drop-shadow-lg">
                "Siionei haya Injili kwa maana ni uweza wa Mungu uletao wokovu kwa kila aaminiye."
              </h2>
              <p className="text-2xl font-bold text-accent drop-shadow-sm">WARUMI 1:16</p>
            </div>
          </div>
        </section>

        {/* 6. Recent Sermons Slider */}
        <section className="section-shell sermons-shell bg-slate-50">
          <div className="container mx-auto px-4 md:px-8">
            <SectionHeader kicker="Neno la Bwana" title="Mahubiri ya Karibuni" actionHref="/sermons" actionText="Ona Yote" />
            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {sampleSermons.map((sermon) => (
                  <CarouselItem key={sermon.id} className="basis-1/2 lg:basis-1/3 pl-4">
                    <Card className="sermon-feature-card h-full border-none bg-white shadow-lg overflow-hidden rounded-[2rem]">
                      <div className="relative aspect-[4/3]">
                        <Image src={sermon.image} alt={sermon.title} fill className="object-cover" />
                        <div className="absolute bottom-4 left-4"><Badge className="bg-white/90 text-primary border-none text-[10px] font-bold">{sermon.topic}</Badge></div>
                      </div>
                      <CardHeader className="p-6">
                        <CardTitle className="text-xl font-headline line-clamp-1">{sermon.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{sermon.speaker}</p>
                      </CardHeader>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>

        {/* 7. Community Photography Section - Mosaic limited to 3 items */}
        <section className="section-shell identity-shell px-4 md:px-8 bg-white">
          <div className="container mx-auto">
            <SectionHeader kicker="Maisha ya Kanisa" title="Picha za Ushirika na Ibada" actionHref="/gallery" actionText="Nyumba ya Picha" />
            <div className="community-mosaic grid grid-cols-2 lg:grid-cols-3 gap-4">
              {communityGallery.map((item) => (
                <div key={item.title} className="relative overflow-hidden rounded-[2rem] aspect-square group">
                  <Image src={item.image} alt={item.title} fill className="object-cover transition-transform group-hover:scale-110 duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex items-end">
                    <p className="text-white font-headline font-bold text-lg">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Blog Section Slider */}
        <section className="section-shell bg-slate-50">
          <div className="container mx-auto px-4 md:px-8">
            <SectionHeader kicker="Tafakari" title="Blogu Yetu" actionHref="/blog" actionText="Soma Yote" />
            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {sampleBlogs.map((blog) => (
                  <CarouselItem key={blog.id} className="basis-1/2 lg:basis-1/3 pl-4">
                    <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-white flex flex-col h-full hover:shadow-lg transition-shadow">
                      <div className="relative aspect-video"><Image src={blog.image} alt={blog.title} fill className="object-cover" /></div>
                      <div className="p-6 flex flex-col flex-grow">
                        <Badge variant="outline" className="w-fit mb-4 text-[10px] font-bold uppercase">{blog.category}</Badge>
                        <h3 className="text-xl font-headline font-bold text-primary mb-3 line-clamp-2">{blog.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{blog.summary}</p>
                        <Link href={`/blog/${blog.id}`} className="mt-auto text-xs font-bold text-accent hover:underline flex items-center gap-1">Soma Zaidi <ArrowRight className="h-3 w-3" /></Link>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>

        {/* 9. Vision & Mission Cards - Final Stately Section */}
        <section className="section-shell px-4 md:px-8 bg-white border-t">
          <div className="container mx-auto">
            <SectionHeader kicker="Dira na Utume" title="Misingi ya Huduma Yetu" />
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <Card className="rounded-[2.5rem] border-none shadow-xl bg-primary text-primary-foreground p-8 md:p-10 flex flex-col gap-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity"><Target className="h-32 w-32" /></div>
                <div className="p-4 bg-white/10 rounded-2xl w-fit"><Target className="h-8 w-8 text-accent" /></div>
                <div>
                  <h3 className="text-2xl font-headline font-bold mb-4">Dira Yetu (Vision)</h3>
                  <p className="text-primary-foreground/80 leading-relaxed italic">
                    "Kanisa lililoandaliwa tayari na takatifu kwa ajili ya unyakuo wa watakatifu na kurudi kwa Bwana Yesu Kristo."
                  </p>
                </div>
              </Card>

              <Card className="rounded-[2.5rem] border-none shadow-xl bg-slate-50 p-8 md:p-10 flex flex-col gap-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity"><Compass className="h-32 w-32 text-primary" /></div>
                <div className="p-4 bg-primary/10 rounded-2xl w-fit"><Compass className="h-8 w-8 text-primary" /></div>
                <div>
                  <h3 className="text-2xl font-headline font-bold text-primary mb-4">Utume Wetu (Mission)</h3>
                  <p className="text-muted-foreground leading-relaxed italic">
                    "Kuinua na kutoa mafunzo kwa jeshi la kiroho litakaloendesha uamsho mkubwa wa nyakati hizi za mwisho duniani kote."
                  </p>
                </div>
              </Card>

              <Card className="rounded-[2.5rem] border-none shadow-xl bg-accent text-accent-foreground p-8 md:p-10 flex flex-col gap-6 relative overflow-hidden group col-span-2 lg:col-span-1">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity"><Heart className="h-32 w-32" /></div>
                <div className="p-4 bg-white/10 rounded-2xl w-fit"><Heart className="h-8 w-8 text-white" /></div>
                <div>
                  <h3 className="text-2xl font-headline font-bold mb-4">Maadili Yetu (Values)</h3>
                  <ul className="space-y-3 text-accent-foreground/90 font-medium">
                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white" /> Utakatifu wa Kweli</li>
                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white" /> Umoja wa Waamini</li>
                    <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white" /> Uinjilisti kwa Mataifa</li>
                  </ul>
                </div>
              </Card>
            </div>
            
            <div className="mt-16 text-center">
              <Button asChild size="lg" className="rounded-full bg-primary text-white hover:bg-primary/90 px-10 h-14 font-bold shadow-xl">
                <Link href="/contact">Wasiliana Nasi Leo <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
