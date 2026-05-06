
"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminGuard } from "@/components/admin-guard";
import { 
  FileText, 
  Mic, 
  Calendar, 
  Wand2, 
  Image as ImageIcon, 
  PlusCircle, 
  MessageSquare
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
    { label: "Blogu", value: blogs?.length || 0, icon: FileText, color: "text-blue-600", href: "/admin/blog" },
    { label: "Mahubiri", value: sermons?.length || 0, icon: Mic, color: "text-green-600", href: "/admin/sermons" },
    { label: "Matukio", value: events?.length || 0, icon: Calendar, color: "text-purple-600", href: "/admin/events" },
  ];

  return (
    <AdminGuard>
      <div className="flex min-h-screen flex-col bg-slate-50">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-12 md:px-8">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h1 className="text-3xl font-headline font-bold text-primary mb-2">Admin Portal</h1>
              <p className="text-sm text-muted-foreground">Manage your church content.</p>
            </div>
            <Button asChild className="rounded-full shadow-lg hover:shadow-xl transition-shadow w-full md:w-auto">
              <Link href="/admin/sermon-assistant">
                <Wand2 className="mr-2 h-4 w-4" /> AI Sermon Assistant
              </Link>
            </Button>
          </header>

          {/* Stats Grid: 2 on mobile, 3 on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {stats.map((stat, i) => (
              <Link href={stat.href} key={i}>
                <Card className="border-none shadow-sm overflow-hidden hover:ring-2 hover:ring-primary/20 transition-all cursor-pointer h-full">
                  <CardContent className="p-4 flex flex-col justify-between h-full gap-2">
                    <div className={`p-2 rounded-xl bg-slate-100 w-fit ${stat.color}`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-medium text-muted-foreground">{stat.label}</p>
                      <h3 className="text-xl font-bold">{stat.value}</h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="border-b bg-slate-50/50 flex flex-row items-center justify-between p-4">
                <CardTitle className="font-headline text-lg">Ujumbe Mpya</CardTitle>
                <Button variant="ghost" size="sm" asChild className="text-[10px]">
                  <Link href="/admin/messages">Ona Yote</Link>
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {messages?.map((msg) => (
                    <div key={msg.id} className="p-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="p-2 rounded-lg bg-orange-100 text-orange-700 shrink-0">
                          <MessageSquare className="h-3 w-3" />
                        </div>
                        <div className="truncate">
                          <p className="font-bold text-xs truncate">{msg.subject}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{msg.firstName} {msg.lastName}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card className="border-none shadow-sm bg-primary text-primary-foreground p-6 rounded-2xl">
                <h3 className="font-bold mb-4">Quick Links</h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                  <Button asChild variant="secondary" className="text-xs h-9 justify-start w-full"><Link href="/admin/sermons">Sermons</Link></Button>
                  <Button asChild variant="secondary" className="text-xs h-9 justify-start w-full"><Link href="/admin/events">Events</Link></Button>
                  <Button asChild variant="secondary" className="text-xs h-9 justify-start w-full"><Link href="/admin/blog">Blog</Link></Button>
                  <Button asChild variant="secondary" className="text-xs h-9 justify-start w-full"><Link href="/admin/gallery">Gallery</Link></Button>
                </div>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AdminGuard>
  );
}
