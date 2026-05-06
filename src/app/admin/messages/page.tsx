
"use client";

import { useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFirestore, useCollection } from "@/firebase";
import { collection, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { MessageSquare, Trash2, Mail, User, Clock, ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function AdminMessagesPage() {
  const db = useFirestore();

  const messagesQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, "messages"), orderBy("createdAt", "desc"));
  }, [db]);

  const { data: messages, loading } = useCollection(messagesQuery);

  function handleDelete(id: string) {
    if (!db || !confirm("Delete this message?")) return;
    deleteDoc(doc(db, "messages", id));
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <header className="mb-8">
          <Link href="/admin" className="text-sm text-primary hover:underline flex items-center gap-1 mb-2">
            <ChevronLeft className="h-4 w-4" /> Dashboard
          </Link>
          <h1 className="text-3xl font-headline font-bold text-primary">Inquiries & Messages</h1>
          <p className="text-muted-foreground">Manage communications from the contact form.</p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin h-10 w-10 text-primary" /></div>
        ) : messages?.length === 0 ? (
          <Card className="p-20 text-center text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p>No messages received yet.</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {messages?.map((msg) => (
              <Card key={msg.id} className="border-none shadow-sm">
                <CardHeader className="flex flex-row items-start justify-between bg-slate-50/50">
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-headline">{msg.subject}</CardTitle>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1"><User className="h-4 w-4" /> {msg.firstName} {msg.lastName}</div>
                      <div className="flex items-center gap-1"><Mail className="h-4 w-4" /> {msg.email}</div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" /> 
                        {msg.createdAt?.toDate ? format(msg.createdAt.toDate(), "PPpp") : "Recently"}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(msg.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {msg.message}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
