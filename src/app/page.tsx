import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Play, Shield, Swords, Megaphone, Users, Heart, GraduationCap, Globe } from "lucide-react";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-church");
  const communityImage = PlaceHolderImages.find(img => img.id === "community-gathering");

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
                <p>
                  Nilianza kuhubiri na kufundisha katika makanisa tofauti tofauti ya kibiblia na kipentekoste. Nilikuwa chini ya huduma nyingine kwa miaka 13 kabla ya kuanza rasmi huduma ya <strong>NAYOTH</strong> inayobeba maono rasmi niliyopewa na Bwana.
                </p>
                <p>
                  Mwaka wa <strong>2007</strong> ndipo Bwana alianza kunisemesha juu ya kuanza huduma itakayobeba lile kusudi aliloniitia na nikaanza kuutafuta uso wake.
                </p>
                <div className="bg-primary p-8 rounded-3xl border-l-8 border-accent italic text-primary-foreground font-headline text-2xl shadow-xl">
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
                    Kuliandaa kanisa kwa unyakuo Bwana ajapo kupitia semina, makongamano ya kimataifa, na kutumia vyombo vya habari (redio na mitandao ya kijamii) kufikisha ujumbe kwa wengi.
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
                    Kuinua jeshi la Bwana litakaloendesha uamsho kupitia mafunzo na makongamano ya watumishi wa madhehebu mbalimbali, tukihudumia jamii kiroho na kimwili.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Foundation Section (Gibea of God Nayoth) */}
        <section className="py-24 bg-secondary/20">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="flex-1 space-y-8">
                <header>
                  <h3 className="text-accent font-bold tracking-widest text-sm uppercase mb-2">Huduma kwa Jamii</h3>
                  <h2 className="text-4xl font-headline font-bold text-primary">Gibea of God Nayoth Foundation</h2>
                </header>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Hiki ni chombo maalumu kilichosajiliwa kwa ajili ya kushughulikia mambo ya jamii na kukutana na watu waliopo katika mazingira magumu.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex gap-4">
                    <div className="bg-white p-3 rounded-2xl shadow-sm h-fit">
                      <Heart className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-bold">Wajane & Yatima</p>
                      <p className="text-sm text-muted-foreground">Kuwasaidia wajane na mayatima waliofiwa na wazazi wao.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-white p-3 rounded-2xl shadow-sm h-fit">
                      <GraduationCap className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-bold">Msaada wa Kielimu</p>
                      <p className="text-sm text-muted-foreground">Tumewawezesha vijana kumaliza sekondari, vyuo vya kati na vikuu.</p>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground italic bg-white/50 p-6 rounded-2xl border-l-4 border-accent">
                  "Tunamshukuru Mungu kuna ambao sasa wana kazi zao nzuri, wengine ndani ya nchi yetu na wengine nje ya nchi ambao tuliwashika mkono kielimu."
                </p>
              </div>
              <div className="flex-1">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                   <Image
                      src={communityImage?.imageUrl || "https://picsum.photos/seed/community1/800/600"}
                      alt="Nayoth Foundation Support"
                      fill
                      className="object-cover"
                      data-ai-hint="community support"
                    />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Outreach & Evangelism Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-4xl font-headline font-bold text-primary mb-6">Uinjilisti na Huduma ya Nje</h2>
              <p className="text-lg text-muted-foreground">
                Kusudi letu ni kuwafikia watu ambao bado hawajapata neema ya wokovu, kuzileta roho kwa Yesu Kristo.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-none shadow-sm bg-slate-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Megaphone className="h-5 w-5 text-accent" /> Mikutano ya Nje
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Tumekuwa tukifanya mikutano ya nje katika maeneo na mikoa tofauti tofauti ndani ya nchi yetu ya Tanzania.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-slate-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-accent" /> Mataifa Mengine
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Tunatarajia kuendelea zaidi hata kufikia mataifa mengine duniani kote kwa ajili ya injili ya Kristo.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-slate-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-accent" /> Kushika Mkono
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Kuwawezesha watu kufikia ndoto zao za maisha kupitia mafunzo na usaidizi wa kiroho.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

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
              <Button asChild size="lg" variant="outline" className="rounded-full border-white text-white hover:bg-white/10 px-10">
                <Link href="/sermons">Sikiliza Neno</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

