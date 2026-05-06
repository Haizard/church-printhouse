
"use client";

import { useState } from "react";
import { aiSermonOutlineAssistant, type AiSermonOutlineAssistantOutput } from "@/ai/flows/ai-sermon-outline-assistant-flow";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2, BookOpen, Hash, Copy, CheckCircle2, ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function SermonAssistantPage() {
  const { toast } = useToast();
  const [scripture, setScripture] = useState("");
  const [keywords, setKeywords] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<AiSermonOutlineAssistantOutput | null>(null);

  async function handleGenerate() {
    if (!scripture && !keywords) {
      toast({
        title: "Input Required",
        description: "Please provide either a scripture passage or thematic keywords.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setResult(null);

    try {
      const thematicKeywords = keywords.split(',').map(k => k.trim()).filter(k => k !== "");
      const output = await aiSermonOutlineAssistant({
        scripturePassage: scripture || undefined,
        thematicKeywords: thematicKeywords.length > 0 ? thematicKeywords : undefined
      });
      setResult(output);
    } catch (error) {
      console.error(error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your outline. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  }

  function handleCopy() {
    if (!result) return;
    const text = `
Title: ${result.title}

Introduction:
${result.introduction}

Main Points:
${result.mainPoints.map(p => `${p.heading}\n${p.details}`).join('\n\n')}

Conclusion:
${result.conclusion}
    `.trim();

    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: "Sermon outline has been copied for your use.",
    });
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 md:px-8">
        <header className="mb-8">
          <Link href="/admin" className="text-sm font-medium text-primary hover:underline flex items-center gap-1 mb-4">
            <ChevronLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <Wand2 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-headline font-bold text-primary">Sermon Outline Assistant</h1>
              <p className="text-muted-foreground">AI-powered suggestions to spark your sermon preparation.</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Generation Parameters</CardTitle>
                <CardDescription>Enter details to guide the AI assistant.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="scripture" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" /> Scripture Passage
                  </Label>
                  <Input 
                    id="scripture" 
                    placeholder="e.g. John 3:16, Psalm 23" 
                    value={scripture}
                    onChange={(e) => setScripture(e.target.value)}
                    className="rounded-xl"
                  />
                  <p className="text-[10px] text-muted-foreground">Focus the outline on a specific biblical text.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords" className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-primary" /> Thematic Keywords
                  </Label>
                  <Input 
                    id="keywords" 
                    placeholder="e.g. love, forgiveness, community" 
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="rounded-xl"
                  />
                  <p className="text-[10px] text-muted-foreground">Comma-separated themes to incorporate.</p>
                </div>

                <Button 
                  onClick={handleGenerate} 
                  className="w-full h-12 rounded-xl text-lg font-bold"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating...
                    </>
                  ) : (
                    <>
                      Generate Outline <Wand2 className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <div className="bg-secondary/30 p-6 rounded-3xl text-sm">
              <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Pro Tip
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Try combining a specific scripture with a modern theme for more contextualized results. The AI works best when given clear, specific references.
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            {isGenerating ? (
              <div className="h-full flex flex-col items-center justify-center p-12 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                <p className="text-xl font-headline font-bold text-slate-400">Harvesting insights...</p>
                <p className="text-sm text-slate-400 mt-2">Our AI is drafting a structured outline for you.</p>
              </div>
            ) : result ? (
              <Card className="border-none shadow-xl bg-white rounded-3xl overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
                <CardHeader className="bg-primary text-primary-foreground p-8 flex flex-row items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-widest opacity-80">Generated Suggestion</p>
                    <CardTitle className="text-3xl font-headline font-bold">{result.title}</CardTitle>
                  </div>
                  <Button variant="outline" size="icon" className="bg-white/10 border-white/20 hover:bg-white/20 text-white rounded-full" onClick={handleCopy}>
                    <Copy className="h-5 w-5" />
                  </Button>
                </CardHeader>
                <CardContent className="p-8 space-y-10">
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-primary border-l-4 border-primary pl-4">Introduction</h4>
                    <p className="text-muted-foreground leading-relaxed">{result.introduction}</p>
                  </div>

                  <div className="space-y-8">
                    <h4 className="text-lg font-bold text-primary border-l-4 border-primary pl-4">Main Points</h4>
                    <div className="grid gap-6">
                      {result.mainPoints.map((point, i) => (
                        <div key={i} className="bg-slate-50 p-6 rounded-2xl">
                          <h5 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs">{i + 1}</span>
                            {point.heading}
                          </h5>
                          <p className="text-sm text-muted-foreground leading-relaxed">{point.details}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-primary border-l-4 border-primary pl-4">Conclusion</h4>
                    <p className="text-muted-foreground leading-relaxed italic">{result.conclusion}</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-12 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <div className="p-4 bg-slate-50 rounded-full mb-4">
                  <Wand2 className="h-12 w-12 text-slate-300" />
                </div>
                <p className="text-xl font-headline font-bold text-slate-400">Ready to Assist</p>
                <p className="text-sm text-slate-400 mt-2 text-center max-w-xs">
                  Fill out the parameters on the left to generate your first AI-suggested sermon outline.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
