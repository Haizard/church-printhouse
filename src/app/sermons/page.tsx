
"use client";

import { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Play, Calendar, User, Filter } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const MOCK_SERMONS = [
  {
    id: 1,
    title: "The Roots of Resilience",
    speaker: "Pastor Elena Thorne",
    date: "2024-05-05",
    topic: "Faith",
    image: "sermon-audio",
    description: "Finding strength in ancient wisdom during modern trials."
  },
  {
    id: 2,
    title: "Cultivating Community",
    speaker: "Min. David Park",
    date: "2024-04-28",
    topic: "Community",
    image: "community-gathering",
    description: "How to build lasting bonds within a church family."
  },
  {
    id: 3,
    title: "Quiet in the Chaos",
    speaker: "Pastor Elena Thorne",
    date: "2024-04-21",
    topic: "Peace",
    image: "nature-meditation",
    description: "A study of Jesus' time in the wilderness."
  },
  {
    id: 4,
    title: "Walking by Faith",
    speaker: "Sarah Jenkins",
    date: "2024-04-14",
    topic: "Faith",
    image: "hero-church",
    description: "Trusting the unknown paths before us."
  }
];

export default function SermonsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const topics = ["All", "Faith", "Community", "Peace", "Hope"];

  const filteredSermons = MOCK_SERMONS.filter(sermon => {
    const matchesSearch = sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sermon.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = activeFilter === "All" || sermon.topic === activeFilter;
    return matchesSearch && matchesTopic;
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 md:px-8">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">Sermon Library</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore our archive of teachings, organized by date, speaker, and topic. Feed your spirit with the Word.
          </p>
        </header>

        <section className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search by title or speaker..." 
              className="pl-10 h-12 rounded-full border-muted/50 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {topics.map(topic => (
              <Button
                key={topic}
                variant={activeFilter === topic ? "default" : "outline"}
                onClick={() => setActiveFilter(topic)}
                className="rounded-full"
              >
                {topic}
              </Button>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSermons.map(sermon => {
            const placeholder = PlaceHolderImages.find(img => img.id === sermon.image);
            return (
              <Card key={sermon.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all group bg-white">
                <div className="relative aspect-video">
                  <Image 
                    src={placeholder?.imageUrl || ""}
                    alt={sermon.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30 scale-0 group-hover:scale-100 transition-transform">
                      <Play className="h-6 w-6 text-white fill-white" />
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">{sermon.topic}</Badge>
                    <div className="flex items-center text-xs text-muted-foreground gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(sermon.date).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">{sermon.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <User className="h-4 w-4" />
                    <span>{sermon.speaker}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{sermon.description}</p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" className="p-0 text-accent hover:text-primary">Watch Now</Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {filteredSermons.length === 0 && (
          <div className="py-24 text-center">
            <h3 className="text-xl font-medium text-muted-foreground">No sermons found matching your criteria.</h3>
            <Button variant="link" onClick={() => { setSearchQuery(""); setActiveFilter("All"); }} className="mt-2">Clear all filters</Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
