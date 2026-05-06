
"use client";

import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { 
  Shield, 
  Swords, 
  Heart, 
  GraduationCap, 
  Globe, 
  Users, 
  History, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const heroImg = PlaceHolderImages.find(i => i.id === "hero-church");

  const values = [
    {
      icon: Shield,
      title: "Kuliandaa Kanisa",
      desc: "Kuliandaa kanisa kwa ajili ya unyakuo wa watakatifu kupitia mahubiri na mafundisho ya kweli ya neno la Mungu."
    },
    {
      icon: Swords,
      title: "Kuinua Jeshi",
      desc: "Kuinua jeshi la kiroho litakaloendesha uamsho mkubwa katika nyakati hizi za mwisho kupitia mafunzo ya watumishi."
    },
    {
      icon: Globe,
      title: "Uinjilisti kwa Mataifa",
      desc: "Kuhakikisha injili ya ufalme inafika kila mahali, ndani na nje ya nchi, kwa uweza wa Roho Mtakatifu."
    }
  ];

  const foundationWorks = [
    {
      icon: Heart,
      title: "Huduma kwa Mayatima",
      desc: "Kutoa hifadhi, chakula, na upendo kwa watoto wasio na wazazi kupitia Gibea of God Nayoth Foundation."
    },
    {
      icon: Users,
      title: "Kusaidia Wajane",
      desc: "Kuinua na kuwategemeza wajane kiuchumi na kiroho ili waweze kumudu maisha yao na familia zao."
    },
    {
      icon: GraduationCap,
      title: "Elimu na Mafunzo",
      desc: "Kutoa ufadhili wa masomo na mafunzo ya ufundi stadi ili kuliandaa jeshi la kesho lenye maarifa."
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 bg-primary text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image 
              src={heroImg?.imageUrl || "https://picsum.photos/seed/about/1200/600"} 
              alt="Background" 
              fill 
              className="object-cover"
            />
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-7xl font-headline font-bold mb-6">Kuhusu Huduma Yetu</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto font-light leading-relaxed">
              "Ngome ya Bwana kwa Makimbilio ya Watu Wake"
            </p>
          </div>
        </section>

        {/* History Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8 text-primary">
                <History className="h-8 w-8" />
                <h2 className="text-3xl font-headline font-bold">Historia Yetu</h2>
              </div>
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-6">
                <p>
                  Mungu alianza kusema na mtumishi wake juu ya utumishi huu mwaka wa <strong>1992</strong>. Katika kipindi hicho, Bwana alionyesha maono ya kazi kubwa nitakayoifanya duniani kuliandaa kanisa lake.
                </p>
                <p>
                  Tangu wakati huo, niliendelea kumtumikia Mungu kwa uaminifu chini ya maelekezo yake, hadi ilipofika mwaka wa <strong>2008</strong>, ambapo Bwana alitoa jina rasmi la huduma: <strong>NAYOTH DIVINE POWER CHRISTIAN CENTER (N.D.P.C.C.)</strong>.
                </p>
                <div className="bg-slate-50 p-8 rounded-3xl border-l-4 border-primary italic">
                  "Jina NAYOTH lina maana ya 'Ngome ya Bwana kwa Makimbilio ya Watu Wake'. Ni mahali ambapo kila mwenye uhitaji anapata kimbilio la kiroho na kimwili."
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Grid - 2 items on mobile, 3 on desktop */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 md:px-8">
            <header className="text-center mb-16">
              <Sparkles className="h-10 w-10 text-accent mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Maono na Ujumbe</h2>
            </header>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {values.map((v, i) => (
                <Card key={i} className="border-none shadow-sm hover:shadow-md transition-all h-full bg-white">
                  <CardContent className="p-6 md:p-8 flex flex-col items-center text-center">
                    <div className="p-4 bg-primary/5 rounded-2xl mb-6">
                      <v.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-headline font-bold text-primary mb-4">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Foundation Section - 2 items on mobile, 3 on desktop */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h3 className="text-accent font-bold tracking-widest text-sm uppercase mb-2">GIBEA OF GOD NAYOTH FOUNDATION</h3>
              <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary">Kugusa Maisha ya Jamii</h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Huduma yetu haishii madhabahuni tu; tunakwenda mtaani kuwasaidia wahitaji zaidi.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {foundationWorks.map((work, i) => (
                <div key={i} className="group p-6 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all duration-300">
                  <div className="p-3 bg-white rounded-xl shadow-sm w-fit mb-6 group-hover:scale-110 transition-transform">
                    <work.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h4 className="text-lg font-bold mb-3">{work.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{work.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-50" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-headline font-bold mb-8 max-w-4xl mx-auto">
              "Siionei haya Injili kwa maana ni uweza wa Mungu uletao wokovu."
            </h2>
            <p className="text-xl font-bold text-accent mb-12">WARUMI 1:16</p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-slate-100 font-bold px-10">
                <Link href="/contact">Shiriki Nasi Leo</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
