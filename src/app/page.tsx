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
import CommunityImageFour from "@/images/_B4A9719.jpg";
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
      sub: "Ngome ya Bwana kwa Makimbilio ya Watu Wake",
      hint: "church worship",
    },
    {
      image: HeroImageTwo,
      title: "Kuliandaa Kanisa",
      sub: "Kwa ajili ya unyakuo wa watakatifu",
      hint: "prayer service",
    },
    {
      image: HeroImageThree,
      title: "Kuinua Jeshi la Bwana",
      sub: "Mafunzo na uamsho kwa watumishi wote",
      hint: "church gathering",
    },
    {
      image: HeroImageFour,
      title: "Injili kwa Mataifa",
      sub: "Kuwafikia wengi kwa uweza wa Mungu",
      hint: "community church",
    },
  ];

  const communityGallery = [
    { image: CommunityImageOne, title: "Nyakati za Ibada", hint: "church congregation" },
    { image: CommunityImageTwo, title: "Umoja wa Waamini", hint: "church fellowship" },
    { image: CommunityImageThree, title: "Huduma na Maombi", hint: "prayer gathering" },
    { image: CommunityImageFour, title: "Safari ya Imani", hint: "church community" },
  ];

  const sermonFallbackImages = [HeroImageOne, WorshipImage, CommunityImageOne, CommunityImageThree];
  const blogFallbackImages = [BlogFeatureImageOne, BlogFeatureImageTwo, CommunityImageTwo, CommunityImageFour];

  const sermonsQuery = useMemo(
    () => (db ? query(collection(db, "sermons"), orderBy("date", "desc"), limit(6)) : null),
    [db]
  );
  const eventsQuery = useMemo(
    () => (db ? query(collection(db, "events"), orderBy("date", "asc"), limit(3)) : null),
    [db]
  );
  const blogsQuery = useMemo(
    () => (db ? query(collection(db, "blogPosts"), orderBy("date", "desc"), limit(4)) : null),
    [db]
  );

  const { data: sermons } = useCollection(sermonsQuery);
  const { data: events } = useCollection(eventsQuery);
  const { data: blogs } = useCollection(blogsQuery);

  const recentBlogs = blogs?.slice(0, 2) ?? [];

  const imageSrc = (value: string | StaticImageData | undefined, fallback: StaticImageData) =>
    typeof value === "string" && value.length > 0 ? value : fallback;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-grow">
        <section className="hero-section relative h-[84vh] min-h-[620px] overflow-hidden">
          <Carousel plugins={[Autoplay({ delay: 5000 })]} className="h-full w-full" opts={{ loop: true }}>
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
                  <div className="hero-veil absolute inset-x-0 bottom-0 h-40" />
                  <div className="hero-shell absolute inset-0 px-4 md:px-8">
                    <div className="container mx-auto flex h-full items-center">
                      <div className="hero-copy">
                        <span className="glass-kicker">
                          <Sparkles className="mr-2 h-3.5 w-3.5" />
                          Karibu N.D.P.C.C
                        </span>
                        <p className="hero-eyebrow">Kanisa la maombi, uamsho, na maandalizi ya watakatifu</p>
                        <h1 className="hero-title">{slide.title}</h1>
                        <p className="hero-subtitle">
                          &quot;{slide.sub}&quot; Tunatangaza injili, tunainua watumishi, na tunajenga watu wa Mungu
                          katika kweli, maombi, na utakatifu.
                        </p>
                        <div className="flex flex-wrap gap-3 pt-2">
                          <Button asChild size="lg" className="rounded-full bg-white px-7 text-primary hover:bg-slate-100">
                            <Link href="/contact">Omba Maombi</Link>
                          </Button>
                          <Button asChild size="lg" variant="outline" className="modern-outline-button rounded-full px-7">
                            <Link href="/about">Fahamu Zaidi</Link>
                          </Button>
                        </div>
                        <div className="hero-stats-grid">
                          <div className="hero-stat-card">
                            <p className="hero-stat-label">Wito</p>
                            <p className="hero-stat-value">Kuandaa Kanisa</p>
                          </div>
                          <div className="hero-stat-card">
                            <p className="hero-stat-label">Msingi</p>
                            <p className="hero-stat-value">Neno na Maombi</p>
                          </div>
                          <div className="hero-stat-card">
                            <p className="hero-stat-label">Mwito wa Huduma</p>
                            <p className="hero-stat-value">Injili kwa Mataifa</p>
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
                <CardContent className="space-y-4 p-6">
                  <span className="mission-pill">
                    <Shield className="h-4 w-4" /> Kuliandaa Kanisa
                  </span>
                  <p className="mission-band-copy">
                    Tunalijenga kanisa kuwa tayari kwa unyakuo kupitia mafundisho yenye msingi wa Neno na maisha ya
                    utakatifu.
                  </p>
                </CardContent>
              </Card>
              <Card className="mission-band-card">
                <CardContent className="space-y-4 p-6">
                  <span className="mission-pill">
                    <Swords className="h-4 w-4" /> Kuinua Jeshi
                  </span>
                  <p className="mission-band-copy">
                    Tunainua watumishi na waamini kwa mafunzo ya kina, maombi, na moyo wa uamsho wa kweli.
                  </p>
                </CardContent>
              </Card>
              <Card className="mission-band-card">
                <CardContent className="space-y-4 p-6">
                  <span className="mission-pill">
                    <Globe className="h-4 w-4" /> Injili kwa Mataifa
                  </span>
                  <p className="mission-band-copy">
                    Tunaeneza injili kwa jamii nyingi kupitia ibada, ushuhuda, huduma ya upendo, na nguvu ya Roho.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="section-shell identity-shell px-4 md:px-8">
          <div className="container mx-auto">
            <div className="image-story-panel">
              <Image src={IdentityImage} alt="Worship at N.D.P.C.C." fill className="object-cover" />
              <div className="image-story-overlay" />
              <div className="image-story-content">
                <p className="section-header-kicker text-white/80">Utambulisho Wetu</p>
                <h2 className="section-header-title text-white">
                  Mahali pa maombi, kweli, na maandalizi ya kanisa kwa ajili ya kazi ya Bwana.
                </h2>
                <p className="image-story-copy">
                  N.D.P.C.C. ni nyumba ya ibada inayowaalika watu kukutana na Mungu kwa undani, kusimama katika kweli ya
                  Neno, na kujengwa kwa huduma yenye uzito wa kiroho. Tunathamini ibada safi, maombi, uamsho, na maisha
                  yanayozaa ushuhuda.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button asChild size="lg" className="rounded-full bg-white px-7 text-primary hover:bg-slate-100">
                    <Link href="/about">Kuhusu Kanisa</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="modern-outline-button rounded-full px-7">
                    <Link href="/contact">Wasiliana Nasi</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell events-shell">
          <div className="container mx-auto px-4 md:px-8">
            <SectionHeader kicker="Umoja Wetu" title="Matukio Yajayo" actionHref="/events" actionText="Tazama Matukio" />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {events?.map((event, index) => (
                <Card key={event.id} className={`event-editorial-card ${index === 0 ? "event-editorial-card-featured" : ""}`}>
                  <CardContent className="flex h-full flex-col gap-6 p-6">
                    <div className="event-meta-row">
                      <span className="event-calendar-icon">
                        <Calendar className="h-5 w-5" />
                      </span>
                      <span className="event-date-chip">{event.date}</span>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-headline font-bold text-primary">{event.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{event.description || "Karibu tushiriki pamoja katika mkusanyiko huu wa neema, maombi, na ushirika wa waamini."}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between gap-4 border-t border-primary/10 pt-5">
                      <p className="flex items-center gap-2 text-sm text-primary/80">
                        <Clock className="h-4 w-4" /> {event.time}
                      </p>
                      <Button variant="ghost" size="sm" asChild className="px-0 font-semibold text-primary hover:text-accent">
                        <Link href={`/events/${event.id}`}>
                          Maelezo <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell section-image-shell">
          <div className="container mx-auto px-4 md:px-8">
            <div className="worship-highlight-panel">
              <Image src={WorshipImage} alt="Ibada ya kanisa" fill className="object-cover" />
              <div className="worship-highlight-overlay" />
              <div className="worship-highlight-content">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div className="space-y-2">
                    <p className="section-header-kicker text-white/70">Ibada na Maombi</p>
                    <h2 className="section-header-title text-white">Jiunge Nasi Katika Ibada</h2>
                  </div>
                  <Button
                    variant="ghost"
                    asChild
                    className="rounded-full border border-white/20 bg-white/10 px-5 text-white hover:bg-white hover:text-primary"
                  >
                    <Link href="/contact">
                      Pata Maelekezo <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <p className="worship-highlight-copy">
                  Tunakusanyika kwa maombi, ibada, na ushirika wa kina ili mioyo iponywe, imani ijengwe, na watu
                  wakutane na uwepo wa Mungu kwa namna ya kweli na ya kubadilisha maisha.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell sermons-shell">
          <div className="container mx-auto px-4 md:px-8">
            <SectionHeader kicker="Neno la Bwana" title="Mahubiri ya Karibuni" actionHref="/sermons" actionText="Ona Yote" />
            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {sermons?.map((sermon, index) => (
                  <CarouselItem key={sermon.id} className="basis-[88%] pl-4 sm:basis-1/2 lg:basis-1/3">
                    <Card className="sermon-feature-card h-full overflow-hidden rounded-[2rem]">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={imageSrc(sermon.imageUrl, sermonFallbackImages[index % sermonFallbackImages.length])}
                          alt={sermon.title}
                          fill
                          className="object-cover"
                          data-ai-hint="church sermon"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <Badge className="rounded-full border-0 bg-white/90 px-3 py-1 text-[10px] font-semibold text-primary">
                            {sermon.topic || "Mahubiri"}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="space-y-3 p-6 pb-3">
                        <CardTitle className="line-clamp-2 text-xl font-headline">{sermon.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{sermon.speaker || "Mtumishi wa Kanisa"}</p>
                      </CardHeader>
                      <CardFooter className="mt-auto p-6 pt-0">
                        <Button variant="ghost" size="sm" asChild className="px-0 font-semibold text-primary hover:text-accent">
                          <Link href={`/sermons/${sermon.id}`}>
                            Sikiliza <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>

        <section className="section-shell community-shell px-4 md:px-8">
          <div className="container mx-auto">
            <SectionHeader kicker="Maisha ya Kanisa" title="Picha za Ushirika na Ibada" />
            <div className="community-mosaic">
              {communityGallery.map((item, index) => (
                <div
                  key={item.title}
                  className={`community-mosaic-card ${
                    index === 0 ? "md:col-span-7 md:row-span-2" : index === 1 ? "md:col-span-5" : index === 2 ? "md:col-span-5" : "md:col-span-7"
                  }`}
                >
                  <Image src={item.image} alt={item.title} fill className="object-cover" data-ai-hint={item.hint} />
                  <div className="community-mosaic-overlay" />
                  <div className="community-mosaic-copy">
                    <p className="community-mosaic-title">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell blog-shell">
          <div className="container mx-auto px-4 md:px-8">
            <SectionHeader kicker="Habari na Makala" title="Blogu Yetu" actionHref="/blog" actionText="Soma Zaidi" />
            <div className="grid gap-6 lg:grid-cols-2">
              {recentBlogs.map((blog, index) => (
                <Card key={blog.id} className="blog-editorial-card">
                  <div className="grid overflow-hidden lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="relative min-h-[280px]">
                      <Image
                        src={imageSrc(blog.imageUrl, blogFallbackImages[index % blogFallbackImages.length])}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-between gap-4 p-6">
                      <div className="space-y-4">
                        <Badge variant="secondary" className="w-fit rounded-full bg-primary/10 px-3 py-1 text-[10px] font-semibold text-primary">
                          {blog.category || "Makala"}
                        </Badge>
                        <h3 className="text-2xl font-headline font-bold text-primary">{blog.title}</h3>
                        <p className="line-clamp-4 text-sm leading-relaxed text-muted-foreground">
                          {blog.summary || blog.content || "Soma habari, tafakari, na ushuhuda wa kile ambacho Mungu anatenda katika maisha ya kanisa na jamii."}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" asChild className="w-fit px-0 font-semibold text-primary hover:text-accent">
                        <Link href={`/blog/${blog.id}`}>
                          Soma <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell final-cta-shell px-4 md:px-8">
          <div className="container mx-auto">
            <div className="final-cta-panel">
              <div className="absolute -left-16 top-10 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-[#c5b58a]/20 blur-3xl" />
              <div className="relative z-10 max-w-3xl space-y-5">
                <p className="glass-kicker border-white/20 bg-white/10">Jenga Nasi Safari ya Imani</p>
                <h3 className="text-4xl font-headline font-bold leading-tight md:text-6xl">
                  &quot;Siionei haya Injili kwa maana ni uweza wa Mungu uletao wokovu kwa kila aaminiye.&quot;
                </h3>
                <p className="text-lg text-white/85">Warumi 1:16</p>
                <p className="max-w-2xl text-base leading-relaxed text-white/78 md:text-lg">
                  Kama unatafuta mahali pa kuabudu, kusikia Neno, au kuungana nasi katika maombi, milango yetu iko
                  wazi. Karibu tushirikiane katika neema ya Mungu.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button asChild size="lg" className="rounded-full bg-white px-8 text-primary hover:bg-slate-100">
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
