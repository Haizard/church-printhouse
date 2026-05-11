
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Shield, Swords, Globe, Cross, Target, Compass, Heart } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

// Local high-contrast imagery
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
  ];

  const sampleSermons = [
    { id: "s1", title: "Nguvu ya Utakatifu", speaker: "Askofu", topic: "Utakatifu", image: WorshipImage },
    { id: "s2", title: "Jeshi la Mwisho", speaker: "Mchungaji", topic: "Uamsho", image: HeroImageOne },
    { id: "s3", title: "Kimbilio la Kweli", speaker: "Mtumishi", topic: "Imani", image: HeroImageThree },
  ];

  const sampleBlogs = [
    { id: "b1", title: "Safari yetu tangu 1992", category: "Historia", summary: "Jinsi Bwana alivyoanzisha huduma hii ya kipekee.", image: BlogFeatureImageOne },
    { id: "b2", title: "Huduma kwa Mayatima", category: "Foundation", summary: "Gibea Foundation ikigusa maisha ya wahitaji.", image: BlogFeatureImageTwo },
    { id: "b3", title: "Maandalizi ya Unyakuo", category: "Mafundisho", summary: "Nini unapaswa kufanya ukiwa Mkristo.", image: IdentityImage },
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
        {/* 1. Hero Slider */}
        <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-black">
          <Carousel plugins={[Autoplay({ delay: 6000 })]} className="h-full w-full" opts={{ loop: true }}>
            <CarouselContent className="h-full">
              {heroSlides.map((slide, index) => (
                <CarouselItem key={index} className="relative h-full basis-full">
                  <Image src={slide.image} alt={slide.title} fill priority className="object-cover opacity-100" />
                  <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                  <div className="absolute inset-0 px-4 md:px-8 pointer-events-none">
                    <div className="container mx-auto flex h-full items-center">
                      <div className="max-w-4xl pointer-events-auto">
                        <h1 className="text-5xl md:text-8xl font-headline font-bold leading-[0.96] tracking-tight text-white drop-shadow-2xl">{slide.title}</h1>
                        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl">
                          <div className="hero-stat-card">
                            <p className="hero-stat-label">Utume</p>
                            <p className="hero-stat-value">Kuliandaa Kanisa</p>
                          </div>
                          <div className="hero-stat-card">
                            <p className="hero-stat-label">Jeshi</p>
                            <p className="hero-stat-value">Kuinua Watumishi</p>
                          </div>
                          <div className="hero-stat-card hidden md:block">
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

        {/* 2. Mission Band - Glass Cards */}
        <section className="mission-band-shell">
          <div className="container mx-auto">
            <div className="mission-band-grid">
              <Card className="mission-band-card">
                <CardContent className="p-8 space-y-4">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
                    <Shield className="h-4 w-4" /> Kuliandaa Kanisa
                  </span>
                  <p className="mission-band-copy">Tunalijenga kanisa kuwa tayari kwa unyakuo kupitia mafundisho ya utakatifu na maandalizi ya kiroho.</p>
                </CardContent>
              </Card>
              <Card className="mission-band-card">
                <CardContent className="p-8 space-y-4">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
                    <Swords className="h-4 w-4" /> Kuinua Jeshi
                  </span>
                  <p className="mission-band-copy">Tunainua watumishi na waamini kupitia uamsho wa kweli wa Roho Mtakatifu duniani kote.</p>
                </CardContent>
              </Card>
              <Card className="mission-band-card hidden lg:block">
                <CardContent className="p-8 space-y-4">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
                    <Globe className="h-4 w-4" /> Uinjilisti
                  </span>
                  <p className="mission-band-copy">Tunaeneza injili ya ufalme kwa mataifa yote kupitia kila njia ya ushuhuda na mikutano ya nje.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 3. Identity - High Contrast Photography */}
        <section className="py-24 px-4 md:px-8 bg-[#fdfbf7]">
          <div className="container mx-auto">
            <div className="relative min-h-[500px] overflow-hidden rounded-[3rem] shadow-2xl bg-black">
              <Image src={IdentityImage} alt="Identity" fill className="object-cover opacity-100" />
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 flex h-full flex-col justify-center p-8 md:p-16 text-white max-w-2xl">
                <p className="section-header-kicker text-white/80">Maono ya Nayoth</p>
                <h2 className="text-4xl md:text-6xl font-headline font-bold leading-tight">Ngome ya Bwana kwa Makimbilio ya Watu Wake.</h2>
                <p className="text-lg opacity-90 mt-6 leading-relaxed">Tangu 1992, N.D.P.C.C. imekuwa kituo cha uamsho na maandalizi ya kiroho kwa ajili ya unyakuo wa watakatifu.</p>
                <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-slate-100 w-fit mt-10 h-14 px-10 font-bold shadow-xl">
                  <Link href="/about">Historia Yetu</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Events - Editorial Grid */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <SectionHeader kicker="Ushirika Wetu" title="Matukio Yajayo" actionHref="/events" actionText="Ona Yote" />
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {sampleEvents.map((event) => (
                <Card key={event.id} className="event-editorial-card">
                  <CardContent className="p-8 space-y-6">
                    <Badge className="bg-primary/10 text-primary border-none rounded-full px-4 py-1">{event.date}</Badge>
                    <h3 className="text-2xl font-headline font-bold text-primary line-clamp-1">{event.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{event.description}</p>
                    <div className="pt-4 border-t border-primary/10 flex items-center justify-between text-xs font-bold">
                      <span className="text-primary/60 flex items-center gap-1"><Clock className="h-3 w-3" /> {event.time}</span>
                      <Link href={`/events/${event.id}`} className="text-accent hover:underline">Angalia Zaidi</Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Scripture Highlight - Solid Background, No Image */}
        <section className="py-24 text-center text-white bg-primary">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            <Cross className="h-14 w-14 text-accent mx-auto mb-4" />
            <h2 className="text-3xl md:text-5xl font-headline font-bold leading-tight">
              "Siionei haya Injili kwa maana ni uweza wa Mungu uletao wokovu kwa kila aaminiye."
            </h2>
            <p className="text-2xl font-bold text-accent tracking-widest uppercase mt-4">WARUMI 1:16</p>
          </div>
        </section>

        {/* 6. Sermons - Media Rich Cards */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4 md:px-8">
            <SectionHeader kicker="Neno la Bwana" title="Mahubiri Mapya" actionHref="/sermons" actionText="Ona Yote" />
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {sampleSermons.map((sermon) => (
                <Card key={sermon.id} className="sermon-feature-card group">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <Image src={sermon.image} alt={sermon.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute bottom-4 left-4"><Badge className="bg-white/90 text-primary border-none text-[10px] font-bold uppercase tracking-wider">{sermon.topic}</Badge></div>
                  </div>
                  <CardHeader className="p-8">
                    <CardTitle className="text-2xl font-headline line-clamp-1 group-hover:text-primary transition-colors">{sermon.title}</CardTitle>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-2">{sermon.speaker}</p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Community Gallery - 2x3 Grid */}
        <section className="py-24 px-4 md:px-8 bg-white">
          <div className="container mx-auto">
            <SectionHeader kicker="Maisha ya Kanisa" title="Picha za Ushirika" actionHref="/gallery" actionText="Nyumba ya Picha" />
            <div className="community-mosaic">
              {communityGallery.map((item, i) => (
                <div key={i} className="community-mosaic-card group">
                  <Image src={item.image} alt={item.title} fill className="object-cover transition-transform group-hover:scale-110 duration-700" />
                  <div className="community-mosaic-overlay opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="community-mosaic-copy">
                      <p className="community-mosaic-title">{item.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Blog - Editorial Cards */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4 md:px-8">
            <SectionHeader kicker="Tafakari Yetu" title="Makala za Blogu" actionHref="/blog" actionText="Soma Yote" />
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {sampleBlogs.map((blog) => (
                <Card key={blog.id} className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white flex flex-col h-full hover:shadow-xl transition-all">
                  <div className="relative aspect-video bg-slate-100"><Image src={blog.image} alt={blog.title} fill className="object-cover" /></div>
                  <div className="p-8 flex flex-col flex-grow">
                    <Badge variant="outline" className="w-fit mb-4 text-[10px] font-bold uppercase border-primary/20 text-primary">{blog.category}</Badge>
                    <h3 className="text-2xl font-headline font-bold text-primary mb-4 line-clamp-2">{blog.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-6 leading-relaxed">{blog.summary}</p>
                    <Link href={`/blog/${blog.id}`} className="mt-auto text-xs font-bold text-accent hover:underline flex items-center gap-2">Soma Zaidi <ArrowRight className="h-4 w-4" /></Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Vision/Mission Cards - Final Section */}
        <section className="py-24 px-4 md:px-8 bg-white border-t">
          <div className="container mx-auto">
            <SectionHeader kicker="Dira na Utume" title="Misingi ya Huduma Yetu" />
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <Card className="rounded-[3rem] border-none shadow-2xl bg-primary text-primary-foreground p-10 flex flex-col gap-6 relative overflow-hidden group min-h-[320px]">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity"><Target className="h-40 w-40" /></div>
                <div className="p-4 bg-white/10 rounded-2xl w-fit"><Target className="h-10 w-10 text-accent" /></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-headline font-bold mb-6">Dira Yetu</h3>
                  <p className="text-lg text-primary-foreground/90 leading-relaxed italic">
                    "Kuliandaa kanisa kwa ajili ya unyakuo wa watakatifu kupitia mahubiri na utakatifu wa kweli."
                  </p>
                </div>
              </Card>

              <Card className="rounded-[3rem] border-none shadow-2xl bg-slate-50 p-10 flex flex-col gap-6 relative overflow-hidden group min-h-[320px]">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity"><Compass className="h-40 w-40 text-primary" /></div>
                <div className="p-4 bg-primary/10 rounded-2xl w-fit"><Compass className="h-10 w-10 text-primary" /></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-headline font-bold text-primary mb-6">Utume Wetu</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed italic">
                    "Kuinua na kutoa mafunzo kwa jeshi la kiroho litakaloendesha uamsho mkubwa wa nyakati za mwisho."
                  </p>
                </div>
              </Card>

              <Card className="rounded-[3rem] border-none shadow-2xl bg-accent text-accent-foreground p-10 flex flex-col gap-6 relative overflow-hidden group col-span-2 lg:col-span-1 min-h-[320px]">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity"><Heart className="h-40 w-40" /></div>
                <div className="p-4 bg-white/10 rounded-2xl w-fit"><Heart className="h-10 w-10 text-white" /></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-headline font-bold mb-6">Maadili Yetu</h3>
                  <ul className="space-y-4 text-lg font-bold">
                    <li className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-white" /> Utakatifu wa Kweli</li>
                    <li className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-white" /> Umoja wa Waamini</li>
                    <li className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-white" /> Uaminifu kwa Neno</li>
                  </ul>
                </div>
              </Card>
            </div>
            
            <div className="mt-20 text-center">
              <Button asChild size="lg" className="rounded-full bg-primary text-white hover:bg-primary/90 px-12 h-16 font-bold shadow-2xl text-lg">
                <Link href="/contact">Wasiliana Nasi Leo <ArrowRight className="ml-2 h-6 w-6" /></Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
