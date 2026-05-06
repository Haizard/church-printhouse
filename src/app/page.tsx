import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Play, Calendar, ArrowRight, Shield, Swords, Megaphone, Users } from "lucide-react";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-church");
  const sermonImage = PlaceHolderImages.find(img => img.id === "sermon-audio");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
          {heroImage?.imageUrl ? (
            <Image
              src={heroImage.imageUrl}
              alt="Nayoth Divine Power Christian Center"
              fill
              className="object-cover brightness-[0.6]"
              priority
              data-ai-hint="church congregation"
            />
          ) : (
            <div className="absolute inset-0 bg-primary/20" />
          )}
          <div className="container relative z-10 px-4 text-center text-white">
            <h1 className="text-4xl md:text-7xl font-headline font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Nayoth Divine Power Christian Center
            </h1>
            <p className="text-xl md:text-3xl font-light mb-8 max-w-3xl mx-auto opacity-90 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              "Ngome ya Bwana kwa Makimbilio ya Watu Wake"
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-12 duration-1000">
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8" asChild>
                <Link href="/contact">Karibu Tushiriki</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full bg-white/10 hover:bg-white/20 border-white text-white text-lg px-8" asChild>
                <Link href="/sermons">Neno la Leo</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Vision Section from Image */}
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
                <p>
                  Nilianza kuhubiri na kufundisha katika makanisa tofauti tofauti ya kibiblia na kipentekoste. Nilikuwa chini ya huduma nyingine kwa miaka 13 kabla ya kuanza rasmi huduma ya <strong>NAYOTH</strong> inayobeba maono rasmi niliyopewa na Bwana.
                </p>
                <p>
                  Mwaka wa <strong>2007</strong> ndipo Bwana alianza kunisemesha juu ya kuanza huduma itakayobeba lile kusudi aliloniitia na nikaanza kuutafuta uso wake.
                </p>
                <div className="bg-secondary/30 p-8 rounded-3xl border-l-8 border-primary italic text-primary-foreground font-headline text-2xl bg-primary shadow-xl">
                  "Ilipofika 2008 nikapewa jina la huduma, jina NAYOTH DIVINE POWER CHRISTIAN CENTER... Maana ya hili jina ni NGOME YA BWANA KWA MAKIMBILIO YA WATU WAKE."
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-2xl">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="text-2xl font-headline font-bold text-primary">Kuliandaa Kanisa</h4>
                  </div>
                  <p className="text-muted-foreground">
                    Kuliandaa kanisa kwa unyakuo Bwana ajapo. Tunafanya hivi kupitia semina, makongamano ya kimataifa, na kutumia vyombo vya habari (redio na mitandao ya kijamii) kufikisha ujumbe kwa wengi.
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-2xl">
                      <Swords className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="text-2xl font-headline font-bold text-primary">Kuinua Jeshi la Bwana</h4>
                  </div>
                  <p className="text-muted-foreground">
                    Kuinua jeshi la Bwana litakaloendesha uamsho kwa siku hizi za mwisho. Tunawainua watumishi watakaotenda kazi ya kukamilisha kusudi la mwisho la Mungu kupitia mafunzo na makongamano.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Features */}
        <section className="py-24 bg-secondary/20">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white/50 backdrop-blur border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                    <Megaphone className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Uinjilisti</CardTitle>
                  <CardDescription>Kutumia vyombo vya habari kufikisha ujumbe wa Bwana duniani kote.</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-white/50 backdrop-blur border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Ushirikiano</CardTitle>
                  <CardDescription>Kufanya kazi na madhehebu mengine katika kujenga mwili wa Kristo.</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-white/50 backdrop-blur border-none shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Maandalizi</CardTitle>
                  <CardDescription>Kuliandaa kanisa kwa ajili ya unyakuo wa Bwana wetu Yesu Kristo.</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Sermon Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group">
                  {sermonImage?.imageUrl ? (
                    <Image
                      src={sermonImage.imageUrl}
                      alt="Latest Sermon"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      data-ai-hint="pastor preaching"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <Play className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                    <div className="bg-white/20 backdrop-blur-md p-6 rounded-full border border-white/30 hover:scale-110 transition-transform cursor-pointer">
                      <Play className="h-10 w-10 text-white fill-white" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-6 text-center md:text-left">
                <h3 className="font-bold tracking-widest text-sm uppercase opacity-80">Neno la Leo</h3>
                <h2 className="text-4xl md:text-5xl font-headline font-bold">1 Samweli 19: 18-24</h2>
                <p className="text-lg opacity-90 leading-relaxed">
                  Gundua maana ya ndani ya 'Nayoth' na jinsi inavyokuwa ngome na makimbilio yetu katika nyakati hizi za mwisho.
                </p>
                <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                  <Button asChild className="rounded-full bg-white text-primary hover:bg-slate-100">
                    <Link href="/sermons">Tazama Sasa</Link>
                  </Button>
                  <Button variant="outline" className="rounded-full border-white text-white hover:bg-white/10" asChild>
                    <Link href="/sermons">Maktaba ya Neno</Link>
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
