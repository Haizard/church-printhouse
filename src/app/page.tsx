
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Play, Calendar, ArrowRight, Sprout, Heart, Users } from "lucide-react";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-church");
  const sermonImage = PlaceHolderImages.find(img => img.id === "sermon-audio");
  const communityImage = PlaceHolderImages.find(img => img.id === "community-gathering");
  const blogImage = PlaceHolderImages.find(img => img.id === "blog-writing");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
          <Image
            src={heroImage?.imageUrl || ""}
            alt={heroImage?.description || "Hero"}
            fill
            className="object-cover brightness-[0.7]"
            priority
            data-ai-hint="church forest"
          />
          <div className="container relative z-10 px-4 text-center text-white">
            <h1 className="text-4xl md:text-7xl font-headline font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Welcome to Evergreen Sanctuary
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto opacity-90 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              A community rooted in faith, growing in grace, and finding peace in the presence of God.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-12 duration-1000">
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Join Us This Sunday
              </Button>
              <Button size="lg" variant="outline" className="rounded-full bg-white/10 hover:bg-white/20 border-white text-white">
                Explore Sermons
              </Button>
            </div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white/50 backdrop-blur border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                    <Sprout className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Spiritual Growth</CardTitle>
                  <CardDescription>Deepen your walk with Christ through our weekly services and small groups.</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-white/50 backdrop-blur border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Community</CardTitle>
                  <CardDescription>Connect with a diverse family of believers dedicated to supporting one another.</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-white/50 backdrop-blur border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Service</CardTitle>
                  <CardDescription>Make a difference in our local community through various outreach programs.</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Sermon Section */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group">
                  <Image
                    src={sermonImage?.imageUrl || ""}
                    alt="Latest Sermon"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    data-ai-hint="pulpit microphone"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                    <div className="bg-white/20 backdrop-blur-md p-6 rounded-full border border-white/30 hover:scale-110 transition-transform cursor-pointer">
                      <Play className="h-10 w-10 text-white fill-white" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-6 text-center md:text-left">
                <h3 className="text-primary font-bold tracking-widest text-sm uppercase">Latest Sermon</h3>
                <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary">The Roots of Resilience</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Join Pastor Elena as she explores how grounding ourselves in ancient truths can help us weather the storms of modern life.
                </p>
                <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                  <Button asChild className="rounded-full">
                    <Link href="/sermons">Watch Now</Link>
                  </Button>
                  <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary/5">
                    Sermon Archive
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h3 className="text-primary font-bold tracking-widest text-sm uppercase mb-2">Join In</h3>
                <h2 className="text-4xl font-headline font-bold">Upcoming Events</h2>
              </div>
              <Button variant="ghost" asChild className="hidden md:flex text-accent hover:text-accent">
                <Link href="/events" className="flex items-center gap-2">
                  View Calendar <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Forest Prayer Walk", date: "May 15", time: "8:00 AM", desc: "A guided silent prayer walk through the sanctuary trails." },
                { title: "Spring Festival", date: "May 22", time: "11:00 AM", desc: "Celebrating community with food, music, and local vendors." },
                { title: "Midweek Refresh", date: "Every Wed", time: "7:00 PM", desc: "Interactive bible study and prayer gathering." }
              ].map((event, i) => (
                <Card key={i} className="hover:shadow-lg transition-shadow border-muted/50 bg-white/50">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-accent font-bold mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date} • {event.time}</span>
                    </div>
                    <CardTitle className="font-headline text-2xl">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{event.desc}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="p-0 text-primary">Learn More</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Preview Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h3 className="font-bold tracking-widest text-sm uppercase opacity-80">Reflections</h3>
                <h2 className="text-4xl md:text-6xl font-headline font-bold">Thoughts for the Journey</h2>
                <p className="text-xl opacity-90 leading-relaxed font-light">
                  Our blog features weekly insights from our ministry team and community members about living out our faith.
                </p>
                <Button variant="outline" size="lg" className="rounded-full border-white text-white hover:bg-white/10" asChild>
                  <Link href="/blog">Read Our Stories</Link>
                </Button>
              </div>
              <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={blogImage?.imageUrl || ""}
                  alt="Blog Preview"
                  fill
                  className="object-cover"
                  data-ai-hint="bible study"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
