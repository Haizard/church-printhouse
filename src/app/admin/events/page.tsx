
"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useFirestore, useCollection } from "@/firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";
import { AdminGuard } from "@/components/admin-guard";
import { Plus, Pencil, Trash2, Loader2, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function AdminEventsPage() {
  const { toast } = useToast();
  const db = useFirestore();
  const [isDialogOpen, setIsOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const eventsQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, "events"), orderBy("date", "asc"));
  }, [db]);

  const { data: events, loading } = useCollection(eventsQuery);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!db) return;
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      location: formData.get("location") as string,
      category: formData.get("category") as string,
      description: formData.get("description") as string,
    };

    const ref = editingEvent ? doc(db, "events", editingEvent.id) : collection(db, "events");
    const promise = editingEvent ? updateDoc(ref as any, data) : addDoc(ref as any, data);

    promise
      .then(() => {
        toast({ title: editingEvent ? "Event Updated" : "Event Created" });
        setIsOpen(false);
        setEditingEvent(null);
      })
      .catch(async (error) => {
        errorEmitter.emit("permission-error", new FirestorePermissionError({
          path: editingEvent ? `events/${editingEvent.id}` : "events",
          operation: editingEvent ? "update" : "create",
          requestResourceData: data,
        }));
      })
      .finally(() => setIsSubmitting(false));
  }

  function handleDelete(id: string) {
    if (!db || !confirm("Are you sure?")) return;
    deleteDoc(doc(db, "events", id)).catch(async () => {
      errorEmitter.emit("permission-error", new FirestorePermissionError({
        path: `events/${id}`,
        operation: "delete"
      }));
    });
  }

  return (
    <AdminGuard>
      <div className="flex min-h-screen flex-col bg-slate-50">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <Link href="/admin" className="text-sm text-primary hover:underline flex items-center gap-1 mb-2">
                <ChevronLeft className="h-4 w-4" /> Dashboard
              </Link>
              <h1 className="text-3xl font-headline font-bold text-primary">Manage Events</h1>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) setEditingEvent(null); }}>
              <DialogTrigger asChild>
                <Button className="rounded-xl"><Plus className="mr-2 h-4 w-4" /> Add Event</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader><DialogTitle>{editingEvent ? "Edit Event" : "Add Event"}</DialogTitle></DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                  <div className="space-y-2"><Label htmlFor="title">Title</Label><Input id="title" name="title" defaultValue={editingEvent?.title} required /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label htmlFor="date">Date</Label><Input id="date" name="date" defaultValue={editingEvent?.date} required /></div>
                    <div className="space-y-2"><Label htmlFor="time">Time</Label><Input id="time" name="time" defaultValue={editingEvent?.time} required /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label htmlFor="location">Location</Label><Input id="location" name="location" defaultValue={editingEvent?.location} required /></div>
                    <div className="space-y-2"><Label htmlFor="category">Category</Label><Input id="category" name="category" defaultValue={editingEvent?.category} required /></div>
                  </div>
                  <div className="space-y-2"><Label htmlFor="description">Description</Label><Textarea id="description" name="description" defaultValue={editingEvent?.description} rows={3} /></div>
                  <DialogFooter><Button type="submit" disabled={isSubmitting} className="w-full">{isSubmitting ? <Loader2 className="animate-spin" /> : "Save"}</Button></DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="border-none shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50"><TableRow><TableHead>Event</TableHead><TableHead>Date/Time</TableHead><TableHead>Location</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={4} className="text-center py-10"><Loader2 className="animate-spin mx-auto text-primary" /></TableCell></TableRow>
                ) : events?.length === 0 ? (
                  <TableRow><TableCell colSpan={4} className="text-center py-10 text-muted-foreground">No upcoming events scheduled.</TableCell></TableRow>
                ) : events?.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>{event.date} at {event.time}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => { setEditingEvent(event); setIsOpen(true); }}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(event.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </main>
        <Footer />
      </div>
    </AdminGuard>
  );
}
