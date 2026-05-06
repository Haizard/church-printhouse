
"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Maximize2, Camera } from "lucide-react";

// Importing local images from src/images
import Img1 from "@/images/_B4A1451.jpg";
import Img2 from "@/images/_B4A1779.jpg";
import Img3 from "@/images/_B4A1507.jpg";
import Img4 from "@/images/_B4A1498.jpg";
import Img5 from "@/images/_B4A1527.jpg";
import Img6 from "@/images/_B4A1581.jpg";
import Img7 from "@/images/_B4A1466.jpg";
import Img8 from "@/images/_B4A7030.jpg";
import Img9 from "@/images/_B4A1752.jpg";
import Img10 from "@/images/_B4A1505.jpg";
import Img11 from "@/images/_B4A7071.jpg";

type GalleryItem = {
  id: number;
  title: string;
  category: string;
  image: StaticImageData;
  description: string;
};

const CATEGORIES = ["All", "Ibada", "Huduma", "Ushirika", "Mikutano"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Creating a list of exactly 20 items using available local images
  const galleryItems: GalleryItem[] = [
    { id: 1, title: "Ibada ya Sifa", category: "Ibada", image: Img1, description: "Nyakati za kumsifu Bwana kwa nyimbo na mapambio." },
    { id: 2, title: "Neno la Uzima", category: "Huduma", image: Img2, description: "Mafundisho ya kina kutoka kwa watumishi wa Mungu." },
    { id: 3, title: "Umoja wa Waamini", category: "Ushirika", image: Img3, description: "Waamini wakishirikiana katika upendo wa Kristo." },
    { id: 4, title: "Maombi ya Pamoja", category: "Ibada", image: Img4, description: "Kuliandaa kanisa kupitia magoti and unyenyekevu." },
    { id: 5, title: "Mkutano wa Nje", category: "Mikutano", image: Img5, description: "Kufikisha injili ya ufalme kwa mataifa yote." },
    { id: 6, title: "Semina ya Vijana", category: "Huduma", image: Img6, description: "Kuinua jeshi la kiroho katika kizazi hiki." },
    { id: 7, title: "Siku ya Shukurani", category: "Ibada", image: Img7, description: "Kumshukuru Bwana kwa makuu aliyotutendea." },
    { id: 8, title: "Ushirika wa Meza", category: "Ushirika", image: Img8, description: "Kuvunja mkate na kushiriki baraka za Bwana." },
    { id: 9, title: "Huduma ya Jamii", category: "Huduma", image: Img9, description: "Kusaidia wahitaji kupitia Gibea Foundation." },
    { id: 10, title: "Maandalizi ya Kiroho", category: "Huduma", image: Img10, description: "Kujiandaa kwa ajili ya unyakuo wa watakatifu." },
    { id: 11, title: "Uamsho wa Kiroho", category: "Ibada", image: Img11, description: "Nguvu ya Roho Mtakatifu ikishuka katikati yetu." },
    { id: 12, title: "Mkutano wa Injili", category: "Mikutano", image: Img1, description: "Kuhubiri habari njema mitaani na vijijini." },
    { id: 13, title: "Kwaya ya NDPCC", category: "Ibada", image: Img2, description: "Uimbaji unaogusa mioyo na kuinua roho." },
    { id: 14, title: "Mafunzo ya Biblia", category: "Huduma", image: Img3, description: "Kuchunguza maandiko kwa ajili ya ukuaji wa imani." },
    { id: 15, title: "Siku ya Watoto", category: "Ushirika", image: Img4, description: "Kuinua watoto katika njia ya Bwana." },
    { id: 16, title: "Huduma ya Wanawake", category: "Huduma", image: Img5, description: "Kuinua wanawake wenye nguvu katika imani." },
    { id: 17, title: "Ubatizo wa Maji", category: "Huduma", image: Img6, description: "Kuzikwa na Kristo na kufufuka katika upya wa uzima." },
    { id: 18, title: "Mkesha wa Mwaka", category: "Ibada", image: Img7, description: "Kuanza mwaka mpya kwa ushindi." },
    { id: 19, title: "Semina ya Ndoa", category: "Huduma", image: Img8, description: "Kujenga familia zilizoimarika katika Kristo." },
    { id: 20, title: "Safari ya Misheni", category: "Mikutano", image: Img9, description: "Kufikisha injili ya ufalme kwa mataifa yote." },
  ];

  const filteredItems = galleryItems.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12 md:px-8">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider mb-4">
            <Camera className="h-4 w-4" /> Nyumba ya Picha
          </div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">Safari yetu katika Picha</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Matukio ya ibada, mafunzo, na mikutano ya nje kupitia picha za N.D.P.C.C.
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => setActiveCategory(cat)}
              className="rounded-full px-6 h-10 text-xs font-bold"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* 2 items mobile, 3 items desktop grid - Full Image Visibility */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {filteredItems.map((item) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <Card className="group relative aspect-square overflow-hidden border-none cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 rounded-[2rem] bg-slate-100">
                  <Image src={item.image} alt={item.title} fill className="object-contain group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <Badge className="w-fit mb-2 bg-white/20 backdrop-blur-md border-white/30 text-white text-[8px] px-2 py-0">{item.category}</Badge>
                    <h3 className="text-white font-headline font-bold text-base line-clamp-1">{item.title}</h3>
                    <Maximize2 className="absolute top-4 right-4 text-white/50 h-4 w-4" />
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] md:max-w-[70vw] p-0 overflow-hidden bg-black border-none rounded-[2.5rem]">
                <div className="relative aspect-video w-full"><Image src={item.image} alt={item.title} fill className="object-contain" /></div>
                <div className="p-8 bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-headline font-bold text-primary">{item.title}</h2>
                    <Badge variant="secondary" className="text-xs px-3 py-1">{item.category}</Badge>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
