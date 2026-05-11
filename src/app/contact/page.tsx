
"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Send, Phone, Mail, MapPin, Clock } from "lucide-react";
import { useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

export default function ContactPage() {
  const { toast } = useToast();
  const db = useFirestore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!db) return;

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      createdAt: serverTimestamp(),
    };

    addDoc(collection(db, "messages"), data)
      .then(() => {
        toast({
          title: "Message Sent",
          description: "Thank you for reaching out. We'll get back to you shortly.",
        });
        (e.target as HTMLFormElement).reset();
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: "messages",
          operation: "create",
          requestResourceData: data,
        });
        errorEmitter.emit("permission-error", permissionError);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <header className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary mb-4">Connect With Us</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Have a question, need prayer, or want to learn more about our community? We're here to listen and serve.
              </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h3 className="text-2xl font-headline font-bold text-primary mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold">Visit Us</p>
                        <p className="text-muted-foreground">Mwanzo Mpya, Tanzania</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold">Call Us</p>
                        <p className="text-muted-foreground">+255 Mamawata</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold">Email Us</p>
                        <p className="text-muted-foreground">info@mamawata.or.tz</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/30 p-8 rounded-3xl">
                  <h3 className="text-xl font-headline font-bold text-primary mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Office Hours
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mon - Thu:</span>
                      <span className="font-medium">9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fri:</span>
                      <span className="font-medium">9:00 AM - 12:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sat - Sun:</span>
                      <span className="font-medium">Closed (Services Sunday)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                <Card className="border-none shadow-xl bg-white rounded-3xl overflow-hidden">
                  <CardHeader className="bg-primary text-primary-foreground p-8">
                    <CardTitle className="text-2xl font-headline">Send a Message</CardTitle>
                    <CardDescription className="text-primary-foreground/80">
                      Fill out the form below and an administrator will respond within 24-48 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" name="firstName" placeholder="John" required className="rounded-xl" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" name="lastName" placeholder="Doe" required className="rounded-xl" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" name="email" type="email" placeholder="john@example.com" required className="rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" name="subject" placeholder="How can we help?" required className="rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" name="message" placeholder="Your message here..." className="min-h-[150px] rounded-xl" required />
                      </div>
                      <Button type="submit" className="w-full h-12 rounded-xl text-lg font-bold" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : (
                          <>
                            Send Message <Send className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
