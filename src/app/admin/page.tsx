
"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  Mic, 
  Calendar, 
  Settings, 
  Wand2, 
  Image as ImageIcon, 
  PlusCircle, 
  MessageSquare,
  Sprout,
  ArrowRight
} from "lucide-react";
import { useFirestore, useCollection } from "@/firebase";
import { collection, query, limit, orderBy } from "firebase/firestore";
import { useMemo } from "react";

export default function AdminDashboard() {
  const db = useFirestore();

  const messagesQuery = useMemo(() => db ? query(collection(db, "messages"), orderBy("createdAt", "desc"), limit(5)) : null, [db]);
  const sermonsQuery = useMemo(() => db ? query(collection(db, "sermons"), limit(1)) : null, [db]);
  const eventsQuery = useMemo(() => db ? query(collection(db, "events"), limit(1)) : null, [db]);
  const blogsQuery = useMemo(() => db ? query(collection(db, "blogPosts"), limit(1)) : null, [db]);

  const { data: messages } = useCollection(messagesQuery);
  const { data: sermons } = useCollection(sermonsQuery);
  const { data: events } = useCollection(eventsQuery);
  const { data: blogs } = useCollection(blogsQuery);

  const stats = [
    { label: "Blog Posts", value: blogs?.length || 0, icon: FileText, color: "text-blue-600", href: "/admin/blog" },
    { label: "Sermons", value: sermons?.length || 0, icon: Mic, color: "text-green-600", href: "/admin/sermons" },
    { label: "Events", value: events?.length || 0, icon: Calendar, color: "text-purple-600", href: "/admin/events" },
    { label: "New Messages", value: messages?.length || 0, icon: MessageSquare, color: "text-orange-600", href: "/admin/messages" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 md:px-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-headline font-bold text-primary mb-2">Admin Portal</h1>
            <p className="text-muted-foreground">Manage your church content and sanctuary resources.</p>
          </div>
          <Button asChild className="rounded-full shadow-lg hover:shadow-xl transition-shadow">
            <Link href="/admin/sermon-assistant">
              <Wand2 className="mr-2 h-5 w-5" /> AI Sermon Assistant
            </Link>
          </Button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <Link href={stat.href} key={i}>
              <Card className="border-none shadow-sm overflow-hidden hover:ring-2 hover:ring-primary/20 transition-all cursor-pointer">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                    <h3 className="text-3xl font-bold">{stat.value}</h3>
                  </div>
                  <div className={`p-3 rounded-2xl bg-slate-100 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Action Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="lg:col-span-2 border-none shadow-sm bg-white">
            <CardHeader className="border-b bg-slate-50/50 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-headline text-xl">Recent Messages</CardTitle>
                <CardDescription>Latest inquiries from the contact form.</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/messages">View All</Link>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {messages?.map((msg) => (
                  <div key={msg.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-orange-100 text-orange-700">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">{msg.subject}</p>
                        <p className="text-xs text-muted-foreground">From: {msg.firstName} {msg.lastName}</p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {msg.createdAt?.toDate?.() ? msg.createdAt.toDate().toLocaleDateString() : 'Just now'}
                    </div>
                  </div>
                ))}
                {(!messages || messages.length === 0) && (
                  <div className="p-8 text-center text-muted-foreground">No recent messages.</div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="border-none shadow-sm bg-primary text-primary-foreground overflow-hidden">
              <CardHeader>
                <CardTitle className="font-headline text-xl flex items-center gap-2">
                  <PlusCircle className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-white text-primary hover:bg-slate-100 border-none rounded-xl" asChild>
                  <Link href="/admin/sermons">
                    Manage Sermons
                  </Link>
                </Button>
                <Button className="w-full bg-white/20 text-white hover:bg-white/30 border-none rounded-xl" asChild>
                  <Link href="/admin/events">
                    Manage Events
                  </Link>
                </Button>
                <Button className="w-full bg-white/20 text-white hover:bg-white/30 border-none rounded-xl" asChild>
                  <Link href="/admin/blog">
                    Manage Blog
                  </Link>
                </Button>
                <Button className="w-full bg-white/20 text-white hover:bg-white/30 border-none rounded-xl" asChild>
                  <Link href="/admin/gallery">
                    Manage Gallery
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="bg-slate-50/50">
                <CardTitle className="font-headline text-xl">System Management</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <Button variant="outline" className="w-full justify-start rounded-xl" asChild>
                  <Link href="/admin/sermons">
                    <Mic className="mr-2 h-4 w-4" /> Manage Sermons
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-xl" asChild>
                  <Link href="/admin/events">
                    <Calendar className="mr-2 h-4 w-4" /> Manage Events
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-xl" asChild>
                  <Link href="/admin/blog">
                    <FileText className="mr-2 h-4 w-4" /> Manage Blog
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-xl" asChild>
                  <Link href="/admin/gallery">
                    <ImageIcon className="mr-2 h-4 w-4" /> Manage Gallery
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
