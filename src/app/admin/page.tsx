
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
    { label: "Ujumbe", value: messages?.length || 0, icon: MessageSquare, color: "text-orange-600", href: "/admin/messages" },
  ];

  return (
    <AdminGuard>
      <div className="flex min-h-screen flex-col bg-slate-50">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-12 md:px-8">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h1 className="text-3xl font-headline font-bold text-primary mb-2">Admin Portal</h1>
              <p className="text-sm text-muted-foreground">Manage your church content and sanctuary resources.</p>
            </div>
            <Button asChild className="rounded-full shadow-lg hover:shadow-xl transition-shadow w-full md:w-auto">
              <Link href="/admin/sermon-assistant">
                <Wand2 className="mr-2 h-4 w-4" /> AI Sermon Assistant
              </Link>
            </Button>
          </header>

          {/* Stats Grid - 2 items on mobile, limited to 3/4 on large (here 3 to respect the rule) */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {stats.slice(0, 3).map((stat, i) => (
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

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-12">
            <Card className="col-span-2 lg:col-span-2 border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="border-b bg-slate-50/50 flex flex-row items-center justify-between p-4">
                <div>
                  <CardTitle className="font-headline text-lg">Ujumbe Mpya</CardTitle>
                </div>
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
                      <div className="text-[9px] text-muted-foreground shrink-0 ml-2">
                        {msg.createdAt?.toDate?.() ? msg.createdAt.toDate().toLocaleDateString() : 'Sasa hivi'}
                      </div>
                    </div>
                  ))}
                  {(!messages || messages.length === 0) && (
                    <div className="p-8 text-center text-xs text-muted-foreground">Hakuna ujumbe mpya.</div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="col-span-2 lg:col-span-1 space-y-4">
              <Card className="border-none shadow-sm bg-primary text-primary-foreground overflow-hidden">
                <CardHeader className="p-4">
                  <CardTitle className="font-headline text-lg flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 p-4 pt-0">
                  <Button className="w-full bg-white text-primary hover:bg-slate-100 border-none rounded-lg text-xs" asChild>
                    <Link href="/admin/sermons">Manage Sermons</Link>
                  </Button>
                  <Button className="w-full bg-white/20 text-white hover:bg-white/30 border-none rounded-lg text-xs" asChild>
                    <Link href="/admin/events">Manage Events</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-white overflow-hidden">
                <CardHeader className="bg-slate-50/50 p-4">
                  <CardTitle className="font-headline text-lg">System</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 p-4">
                  <Button variant="outline" className="w-full justify-start rounded-lg text-xs h-9" asChild>
                    <Link href="/admin/gallery">
                      <ImageIcon className="mr-2 h-3 w-3" /> Gallery
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start rounded-lg text-xs h-9" asChild>
                    <Link href="/admin/blog">
                      <FileText className="mr-2 h-3 w-3" /> Blog
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AdminGuard>
  );
}
