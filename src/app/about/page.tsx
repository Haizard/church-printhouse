
"use client";

import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
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
  ArrowRight,
  Cross
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const heroImg = PlaceHolderImages.find(i => i.id === "hero-church");

  const pillars = [
    {
      icon: Shield,
      title: "Kuliandaa Kanisa",
      desc: "Kuhakikisha kanisa lipo tayari kwa ajili ya unyakuo."
    },
    {
      icon: Swords,
      title: "Kuinua Jeshi",
      desc: "Kujenga jeshi la kiroho kwa ajili ya uamsho wa mwisho."
    },
    {
      icon: Globe,
      title: "Uinjilisti",
      desc: "Kufikisha injili ya ufalme kwa mataifa yote duniani."
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
            <h1 className="text-4xl md:text-7xl font-headline font-bold mb-6">Kuhusu N.D.P.C.C.</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto font-light leading-relaxed italic">
              "Ngome ya Bwana kwa Makimbilio ya Watu Wake"
            </p>
          </div>
        </section>

        {/* Vision Pillars Grid - 2 items mobile, 3 items desktop */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <header className="text-center mb-16">
              <h2 className="text-3xl font-headline font-bold text-primary mb-4">Misingi Yetu Mitatu</h2>
              <div className="h-1 w-20 bg-accent mx-auto rounded-full" />
            </header>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {pillars.map((v, i) => (
                <Card key={i} className="border-none shadow-sm hover:shadow-md transition-all bg-slate-50/50">
                  <CardContent className="p-6 md:p-8 flex flex-col items-center text-center">
                    <div className="p-4 bg-white rounded-2xl mb-6 shadow-sm">
                      <v.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-headline font-bold text-primary mb-2">{v.title}</h3>
                    <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Content with Accordions */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <Accordion type="single" collapsible className="w-full space-y-4">
              
              {/* Historia Section */}
              <AccordionItem value="history" className="bg-white border rounded-2xl px-6">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-4 text-left">
                    <History className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="text-xl font-headline font-bold text-primary">Historia na Chimbuko</h3>
                      <p className="text-xs text-muted-foreground">Jifunze safari yetu tangu mwaka 1992</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-8 pt-2">
                  <div className="prose prose-slate max-w-none text-muted-foreground space-y-4 text-sm md:text-base leading-relaxed">
                    <p>
                      Mungu alianza kusema na mtumishi wake juu ya utumishi huu mwaka wa <strong>1992</strong>. Katika kipindi hicho, Bwana alionyesha maono ya kazi kubwa nitakayoifanya duniani kuliandaa kanisa lake.
                    </p>
                    <p>
                      Tangu wakati huo, niliendelea kumtumikia Mungu kwa uaminifu chini ya maelekezo yake, nikifanya kazi ya kuliandaa kanisa bila jina rasmi, hadi ilipofika mwaka wa <strong>2008</strong>, ambapo Bwana alitoa jina rasmi la huduma.
                    </p>
                    <div className="bg-primary/5 p-6 rounded-2xl border-l-4 border-primary font-headline italic text-primary">
                      "Jina NAYOTH lina maana ya 'Ngome ya Bwana kwa Makimbilio ya Watu Wake'. Ni mahali ambapo kila mwenye uhitaji anapata kimbilio la kiroho na kimwili."
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Ujumbe na Maono Section */}
              <AccordionItem value="vision" className="bg-white border rounded-2xl px-6">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-4 text-left">
                    <Sparkles className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="text-xl font-headline font-bold text-primary">Ujumbe Wetu wa Kiroho</h3>
                      <p className="text-xs text-muted-foreground">Kuliandaa kanisa na kuinua jeshi la Bwana</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-8 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm md:text-base text-muted-foreground">
                    <div className="space-y-4">
                      <h4 className="font-bold text-primary flex items-center gap-2"><Shield className="h-4 w-4" /> Kuliandaa Kanisa</h4>
                      <p>Tunafanya kazi ya kuliandaa kanisa kwa ajili ya unyakuo wa watakatifu kupitia mahubiri, semina, mikutano ya nje, na kupitia vyombo vya habari (Redio na TV).</p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-bold text-primary flex items-center gap-2"><Swords className="h-4 w-4" /> Kuinua Jeshi la Kiroho</h4>
                      <p>Kuinua jeshi la kiroho litakaloendesha uamsho mkubwa katika nyakati hizi za mwisho kupitia mafunzo ya watumishi wa Mungu na mafundisho ya kweli.</p>
                    </div>
                    <div className="col-span-full space-y-4">
                      <h4 className="font-bold text-primary flex items-center gap-2"><Globe className="h-4 w-4" /> Uinjilisti kwa Mataifa</h4>
                      <p>Kuhakikisha injili ya ufalme inafika kila mahali, ndani na nje ya nchi, kwa uweza wa Roho Mtakatifu ili kuliandaa kanisa la Bwana kote duniani.</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Foundation Section */}
              <AccordionItem value="foundation" className="bg-white border rounded-2xl px-6">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-4 text-left">
                    <Heart className="h-6 w-6 text-accent" />
                    <div>
                      <h3 className="text-xl font-headline font-bold text-primary">Huduma kwa Jamii (Foundation)</h3>
                      <p className="text-xs text-muted-foreground">Gibea of God Nayoth Foundation</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-8 pt-2">
                  <div className="space-y-6">
                    <p className="text-muted-foreground italic">"Huduma yetu haishii madhabahuni tu; tunakwenda mtaani kuwasaidia wahitaji zaidi kupitia taasisi yetu ya Gibea of God Nayoth Foundation."</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <Users className="h-5 w-5 text-accent mb-2" />
                        <h5 className="font-bold text-xs mb-1">Kusaidia Wajane</h5>
                        <p className="text-[10px] text-muted-foreground">Kuwapatia misaada ya kujiendeleza na kuwategemeza kiroho na kimwili.</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <Heart className="h-5 w-5 text-accent mb-2" />
                        <h5 className="font-bold text-xs mb-1">Huduma kwa Mayatima</h5>
                        <p className="text-[10px] text-muted-foreground">Kutoa hifadhi, chakula, na upendo kwa watoto wasio na wazazi.</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <GraduationCap className="h-5 w-5 text-accent mb-2" />
                        <h5 className="font-bold text-xs mb-1">Elimu na Mafunzo</h5>
                        <p className="text-[10px] text-muted-foreground">Kutoa ufadhili wa masomo na mafunzo ya ufundi stadi kwa vijana.</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <Globe className="h-5 w-5 text-accent mb-2" />
                        <h5 className="font-bold text-xs mb-1">Misheni za Nje</h5>
                        <p className="text-[10px] text-muted-foreground">Kuendesha mikutano ya injili vijijini na kusaidia jamii zilizo mbali.</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Call to Action with Scripture */}
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-50" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-4xl mx-auto space-y-8">
              <Cross className="h-12 w-12 text-accent mx-auto mb-4 opacity-50" />
              <h2 className="text-3xl md:text-5xl font-headline font-bold leading-tight">
                "Siionei haya Injili kwa maana ni uweza wa Mungu uletao wokovu kwa kila aaminiye."
              </h2>
              <p className="text-2xl font-bold text-accent">WARUMI 1:16</p>
              <div className="pt-8">
                <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-slate-100 font-bold px-10 h-14 text-lg">
                  <Link href="/contact">Shiriki Nasi Leo <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
