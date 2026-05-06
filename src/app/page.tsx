"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { collection, limit, orderBy, query } from "firebase/firestore";
import { ArrowRight, Calendar, Clock, Globe, Shield, Sparkles, Swords } from "lucide-react";
import { useMemo } from "react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { useCollection, useFirestore } from "@/firebase";

import Autoplay from "embla-carousel-autoplay";

import IdentityImage from "@/images/_B4A1451.jpg";
import WorshipImage from "@/images/_B4A1779.jpg";
import HeroImageOne from "@/images/_B4A1507.jpg";
import HeroImageTwo from "@/images/_B4A1498.jpg";
import HeroImageThree from "@/images/_B4A1527.jpg";
import HeroImageFour from "@/images/_B4A1581.jpg";
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
    {
      image: HeroImageOne,
      title: "Nayoth Divine Power Christian Center",
      hint: "church worship",
    },
    {
      image: HeroImageTwo,
      title: "Kuliandaa Kanisa kwa Unyakuo",
      hint: "prayer service",
    },
    {
      image: HeroImageThree,
      title: "Kuinua Jeshi la Bwana Duniani",
      hint: "church gathering",
    },
    {
      image: HeroImageFour,
      title: "Injili ya Ufalme kwa Mataifa",
      hint: "community church",
    },
  ];

  const communityGallery = [
    { image: CommunityImageOne, title: "Nyakati za Ibada", hint: "church congregation" },
    { image: CommunityImageTwo, title: "Umoja wa Waamini", hint: "church fellowship" },
    { image: CommunityImageThree, title: "Huduma na Maombi", hint: "prayer gathering" },
  ];

  const sermonFallbackImages = [HeroImageOne, WorshipImage, CommunityImageOne, CommunityImageThree];
  const blogFallbackImages = [BlogFeatureImageOne, BlogFeatureImageTwo, CommunityImageTwo];

  const sermonsQuery = useMemo(
    () => (db ? query(collection(db, "sermons"), orderBy("date", "desc"), limit(6)) : null),
    [db]
  );
  const eventsQuery = useMemo(
    () => (db ? query(collection(db, "events"), orderBy("date", "asc"), limit(6)) : null),
    [db]
  );
  const blogsQuery = useMemo(
    () => (db ? query(collection(db, "blogPosts"), orderBy("date", "desc"), limit(6)) : null),
    [db]
  );

  const { data: sermons } = useCollection(sermonsQuery);
  const { data: events } = useCollection(eventsQuery);
  const { data: blogs } = useCollection(blogsQuery);

  const imageSrc = (value: string | StaticImageData | undefined, fallback: StaticImageData) =>
    typeof value === "string" && value.length > 0 ? value : fallback;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-grow">
        {/* Simplified Hero Section with stats only */}
        <section className="hero-section relative h-[90vh] min-h-[700px] overflow-hidden">
          <Carousel plugins={[Autoplay({ delay: 6000 })]} className="h-full w-full" opts={{ loop: true }}>
            <CarouselContent className="h-full">
              {heroSlides.map((slide, index) => (
                <CarouselItem key={index} className="relative h-full basis-full">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority
                    className="object-cover"
                    data-ai-hint={slide.hint}
                  />
                  <div className="hero-overlay absolute inset-0" />
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

        <section className="mission-band-shell">
          <div className="container mx-auto px-4 md:px-8">
            <div className="mission-band-grid">
              <Card className="mission-band-card">
                <CardContent className="space-y-4 p-8">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
                    <Shield className="h-4 w-4" /> Kuliandaa Kanisa
                  </span>
                  <p className="mission-band-copy">
                    Tunalijenga kanisa kuwa tayari kwa unyakuo kupitia mafundisho yenye msingi wa Neno na maisha ya utakatifu wa kweli.
                  </p>
                </CardContent>
              </Card>
              <Card className="mission-band-card">
                <CardContent className="space-y-4 p-8">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
                    <Swords className="h-4 w-4" /> Kuinua Jeshi
                  </span>
                  <p className="mission-band-copy">
                    Tunainua watumishi na waamini kwa mafunzo ya kina, maombi, na uamsho mkubwa katika nyakati hizi za mwisho.
                  </p>
                </CardContent>
              </Card>
              <Card className="mission-band-card hidden lg:block">
                <CardContent className="space-y-4 p-8">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
                    <Globe className="h-4 w-4" /> Uinjilisti
                  </span>
                  <p className="mission-band-copy">
                    Tunaeneza injili ya ufalme kwa mataifa yote kupitia kila njia ya mawasiliano na ushuhuda wa nguvu ya Mungu.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Identity / Story Section */}
        <section className="section-shell identity-shell px-4 md:px-8">
          <div className="container mx-auto">
            <div className="image-story-panel">
              <Image src={IdentityImage} alt="Worship" fill className="object-cover" />
              <div className="image-story-overlay" />
              <div className="image-story-content">
                <p className="section-header-kicker text-white/80">Utambulisho Wetu</p>
                <h2 className="text-4xl md:text-6xl font-headline font-bold text-white leading-tight">
                  Ngome ya Bwana kwa Makimbilio ya Watu Wake.
                </h2>
                <p className="max-w-2xl text-lg text-white/80 leading-relaxed">
                  Tangu mwaka 1992, N.D.P.C.C imekuwa kitovu cha maombi, uamsho, na maandalizi ya kiroho. Tunakukaribisha kushiriki katika huduma yetu inayolenga kuliandaa kanisa kwa unyakuo.
                </p>
                <div className="flex gap-4 pt-4">
                  <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-slate-100 px-8">
                    <Link href="/about">Fahamu Zaidi</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Events Slider (2 mobile, 3 desktop) */}
        <section className="section-shell events-shell">
          <div className="container mx-auto px-4 md:px-8">
            <SectionHeader kicker="Umoja Wetu" title="Matukio Yajayo" actionHref="/events" actionText="Tazama Yote" />
            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {events?.map((event) => (
                  <CarouselItem key={event.id} className="basis-1/2 lg:basis-1/3 pl-4">
                    <Card className="event-editorial-card h-full">
                      <CardContent className="p-8 space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="p-3 rounded-2xl bg-primary/5 text-primary">
                            <Calendar className="h-5 w-5" />
                          </div>
                          <Badge className="bg-primary/5 text-primary border-none rounded-full px-4">{event.date}</Badge>
                        </div>
                        <h3 className="text-2xl font-headline font-bold text-primary">{event.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">{event.description || "Karibu tushiriki baraka."}</p>
                        <div className="pt-4 border-t border-primary/5 flex items-center justify-between">
                          <span className="text-xs font-bold flex items-center gap-1 text-primary/60"><Clock className="h-3 w-3" /> {event.time}</span>
                          <Link href={`/events/${event.id}`} className="text-xs font-bold text-accent hover:underline">Ona Zaidi</Link>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>

        {/* Sermons Slider (2 mobile, 3 desktop) */}
        <section className="section-shell sermons-shell">
          <div className="container mx-auto px-4 md:px-8">
            <SectionHeader kicker="Neno la Bwana" title="Mahubiri ya Karibuni" actionHref="/sermons" actionText="Ona Yote" />
            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {sermons?.map((sermon, index) => (
                  <CarouselItem key={sermon.id} className="basis-1/2 lg:basis-1/3 pl-4">
                    <Card className="sermon-feature-card h-full">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={imageSrc(sermon.imageUrl, sermonFallbackImages[index % sermonFallbackImages.length])}
                          alt={sermon.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <Badge className="bg-white/90 text-primary border-none text-[10px] font-bold">{sermon.topic}</Badge>
                        </div>
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

        {/* Community Gallery - 3 images total */}
        <section className="section-shell identity-shell px-4 md:px-8">
          <div className="container mx-auto">
            <SectionHeader kicker="Maisha ya Kanisa" title="Picha za Ushirika na Ibada" />
            <div className="community-mosaic">
              {communityGallery.map((item) => (
                <div key={item.title} className="community-mosaic-card">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                  <div className="community-mosaic-overlay" />
                  <div className="community-mosaic-copy">
                    <p className="community-mosaic-title">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Slider (2 mobile, 3 desktop) */}
        <section className="section-shell bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <SectionHeader kicker="Tafakari" title="Blogu Yetu" actionHref="/blog" actionText="Soma Zaidi" />
            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {blogs?.map((blog, index) => (
                  <CarouselItem key={blog.id} className="basis-1/2 lg:basis-1/3 pl-4">
                    <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-slate-50 flex flex-col h-full">
                      <div className="relative aspect-video">
                        <Image 
                          src={imageSrc(blog.imageUrl, blogFallbackImages[index % blogFallbackImages.length])}
                          alt={blog.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <Badge variant="outline" className="w-fit mb-4 text-[10px] font-bold uppercase">{blog.category}</Badge>
                        <h3 className="text-xl font-headline font-bold text-primary mb-3 line-clamp-2">{blog.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{blog.summary}</p>
                        <Link href={`/blog/${blog.id}`} className="mt-auto text-xs font-bold text-accent hover:underline flex items-center gap-1">
                          Soma Makala <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="section-shell px-4 md:px-8">
          <div className="container mx-auto">
            <div className="final-cta-panel">
              <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto">
                <h3 className="text-4xl md:text-6xl font-headline font-bold">
                  "Siionei haya Injili kwa maana ni uweza wa Mungu uletao wokovu kwa kila aaminiye."
                </h3>
                <p className="text-xl font-bold opacity-80">WARUMI 1:16</p>
                <div className="pt-8">
                  <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-slate-100 px-10 h-14 font-bold">
                    <Link href="/contact">Jiunge Nasi Leo</Link>
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