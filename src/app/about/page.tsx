
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

// Static imports for high contrast local images
import IdentityImage from "@/images/_B4A1451.jpg";
import CommunityImageOne from "@/images/_B4A1466.jpg";
import WorshipImage from "@/images/_B4A1779.jpg";

export default function AboutPage() {
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
        {/* Hero Section - Maximum Contrast, No Dimming */}
        <section className="relative py-32 md:py-48 bg-black text-white overflow-hidden">
          <div className="absolute inset-0">
            <Image 
              src={IdentityImage} 
              alt="About NDPCC" 
              fill 
              className="object-cover"
              priority
            />
            {/* Very minimal overlay just for text shadow safety */}
            <div className="absolute inset-0 bg-black/5" />
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-5xl md:text-8xl font-headline font-bold mb-6 drop-shadow-2xl">Kuhusu N.D.P.C.C.</h1>
            <p className="text-xl md:text-3xl opacity-90 max-w-3xl mx-auto font-light leading-relaxed italic drop-shadow-lg">
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
                <Card key={i} className="border-none shadow-sm hover:shadow-xl transition-all bg-slate-50/50 rounded-[2rem]">
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <div className="p-5 bg-white rounded-2xl mb-6 shadow-md">
                      <v.icon className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-headline font-bold text-primary mb-3">{v.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Content with High Contrast Background Image */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <Image 
              src={CommunityImageOne} 
              alt="Church Life" 
              fill 
              className="object-cover"
            />
            {/* Removed blur and high-opacity color to maintain image contrast */}
            <div className="absolute inset-0 bg-black/10" />
          </div>
          
          <div className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10">
            <Accordion type="single" collapsible className="w-full space-y-6">
              
              {/* Historia Section */}
              <AccordionItem value="history" className="bg-white/95 border-none rounded-[2.5rem] px-8 shadow-2xl">
                <AccordionTrigger className="hover:no-underline py-8">
                  <div className="flex items-center gap-5 text-left">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <History className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-headline font-bold text-primary">Historia na Chimbuko</h3>
                      <p className="text-sm text-muted-foreground">Jifunze safari yetu tangu mwaka 1992</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-10 pt-2">
                  <div className="prose prose-slate max-w-none text-muted-foreground space-y-6 text-base md:text-lg leading-relaxed">
                    <p>
                      Mungu alianza kusema na mtumishi wake juu ya utumishi huu mwaka wa <strong>1992</strong>. Katika kipindi hicho, Bwana alionyesha maono ya kazi kubwa nitakayoifanya duniani kuliandaa kanisa lake.
                    </p>
                    <p>
                      Tangu wakati huo, niliendelea kumtumikia Mungu kwa uaminifu chini ya maelekezo yake, nikifanya kazi ya kuliandaa kanisa bila jina rasmi, hadi ilipofika mwaka wa <strong>2008</strong>, ambapo Bwana alitoa jina rasmi la huduma.
                    </p>
                    <div className="bg-primary/5 p-8 rounded-[2rem] border-l-8 border-primary font-headline italic text-primary text-xl">
                      "Jina NAYOTH lina maana ya 'Ngome ya Bwana kwa Makimbilio ya Watu Wake'. Ni mahali ambapo kila mwenye uhitaji anapata kimbilio la kiroho na kimwili."
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Ujumbe na Maono Section */}
              <AccordionItem value="vision" className="bg-white/95 border-none rounded-[2.5rem] px-8 shadow-2xl">
                <AccordionTrigger className="hover:no-underline py-8">
                  <div className="flex items-center gap-5 text-left">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Sparkles className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-headline font-bold text-primary">Ujumbe Wetu wa Kiroho</h3>
                      <p className="text-sm text-muted-foreground">Kuliandaa kanisa na kuinua jeshi la Bwana</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-10 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-base md:text-lg text-muted-foreground">
                    <div className="space-y-4">
                      <h4 className="font-bold text-primary flex items-center gap-2 text-xl"><Shield className="h-5 w-5" /> Kuliandaa Kanisa</h4>
                      <p>Tunafanya kazi ya kuliandaa kanisa kwa ajili ya unyakuo wa watakatifu kupitia mahubiri, semina, mikutano ya nje, na kupitia vyombo vya habari (Redio na TV).</p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-bold text-primary flex items-center gap-2 text-xl"><Swords className="h-5 w-5" /> Kuinua Jeshi la Kiroho</h4>
                      <p>Kuinua jeshi la kiroho litakaloendesha uamsho mkubwa katika nyakati hizi za mwisho kupitia mafunzo ya watumishi wa Mungu na mafundisho ya kweli.</p>
                    </div>
                    <div className="col-span-full space-y-4 border-t pt-6">
                      <h4 className="font-bold text-primary flex items-center gap-2 text-xl"><Globe className="h-5 w-5" /> Uinjilisti kwa Mataifa</h4>
                      <p>Kuhakikisha injili ya ufalme inafika kila mahali, ndani na nje ya nchi, kwa uweza wa Roho Mtakatifu ili kuliandaa kanisa la Bwana kote duniani.</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Foundation Section */}
              <AccordionItem value="foundation" className="bg-white/95 border-none rounded-[2.5rem] px-8 shadow-2xl">
                <AccordionTrigger className="hover:no-underline py-8">
                  <div className="flex items-center gap-5 text-left">
                    <div className="p-3 bg-accent/10 rounded-xl">
                      <Heart className="h-7 w-7 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-headline font-bold text-primary">Huduma kwa Jamii (Foundation)</h3>
                      <p className="text-sm text-muted-foreground">Gibea of God Nayoth Foundation</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-10 pt-2">
                  <div className="space-y-8">
                    <p className="text-lg text-muted-foreground italic border-l-4 border-accent pl-6">"Huduma yetu haishii madhabahuni tu; tunakwenda mtaani kuwasaidia wahitaji zaidi kupitia taasisi yetu ya Gibea of God Nayoth Foundation."</p>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-accent hover:text-white transition-all duration-300">
                        <Users className="h-6 w-6 text-accent group-hover:text-white mb-4" />
                        <h5 className="font-bold text-base mb-2">Kusaidia Wajane</h5>
                        <p className="text-xs opacity-90">Kuwapatia misaada ya kujiendeleza na kuwategemeza kiroho na kimwili.</p>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-accent hover:text-white transition-all duration-300">
                        <Heart className="h-6 w-6 text-accent group-hover:text-white mb-4" />
                        <h5 className="font-bold text-base mb-2">Huduma kwa Mayatima</h5>
                        <p className="text-xs opacity-90">Kutoa hifadhi, chakula, na upendo kwa watoto wasio na wazazi.</p>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-accent hover:text-white transition-all duration-300">
                        <GraduationCap className="h-6 w-6 text-accent group-hover:text-white mb-4" />
                        <h5 className="font-bold text-base mb-2">Elimu na Mafunzo</h5>
                        <p className="text-xs opacity-90">Kutoa ufadhili wa masomo na mafunzo ya ufundi stadi kwa vijana.</p>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-accent hover:text-white transition-all duration-300">
                        <Globe className="h-6 w-6 text-accent group-hover:text-white mb-4" />
                        <h5 className="font-bold text-base mb-2">Misheni za Nje</h5>
                        <p className="text-xs opacity-90">Kuendesha mikutano ya injili vijijini na kusaidia jamii zilizo mbali.</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Call to Action - Solid Background for maximum readability */}
        <section className="relative py-32 bg-primary text-white overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-4xl mx-auto space-y-10">
              <Cross className="h-16 w-16 text-accent mx-auto mb-4" />
              <h2 className="text-4xl md:text-6xl font-headline font-bold leading-tight drop-shadow-2xl">
                "Siionei haya Injili kwa maana ni uweza wa Mungu uletao wokovu kwa kila aaminiye."
              </h2>
              <p className="text-3xl font-bold text-accent tracking-widest uppercase">WARUMI 1:16</p>
              <div className="pt-10">
                <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-slate-100 font-bold px-12 h-16 text-xl shadow-2xl">
                  <Link href="/contact">Shiriki Nasi Leo <ArrowRight className="ml-2 h-6 w-6" /></Link>
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
