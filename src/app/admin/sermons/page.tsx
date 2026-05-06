
"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useFirestore, useCollection } from "@/firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";
import { Plus, Pencil, Trash2, Loader2, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function AdminSermonsPage() {
  const { toast } = useToast();
  const db = useFirestore();
  const [isDialogOpen, setIsOpen] = useState(false);
  const [editingSermon, setEditingSermon] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sermonsQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, "sermons"), orderBy("date", "desc"));
  }, [db]);

  const { data: sermons, loading } = useCollection(sermonsQuery);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!db) return;
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      speaker: formData.get("speaker") as string,
      date: formData.get("date") as string,
      topic: formData.get("topic") as string,
      imageUrl: formData.get("imageUrl") as string,
      videoUrl: formData.get("videoUrl") as string,
      description: formData.get("description") as string,
    };

    const operation = editingSermon ? "update" : "create";
    const ref = editingSermon 
      ? doc(db, "sermons", editingSermon.id) 
      : collection(db, "sermons");

    const promise = editingSermon 
      ? updateDoc(ref as any, data) 
      : addDoc(ref as any, data);

    promise
      .then(() => {
        toast({ title: editingSermon ? "Sermon Updated" : "Sermon Created" });
        setIsOpen(false);
        setEditingSermon(null);
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: editingSermon ? `sermons/${editingSermon.id}` : "sermons",
          operation,
          requestResourceData: data,
        });
        errorEmitter.emit("permission-error", permissionError);
      })
      .finally(() => setIsSubmitting(false));
  }

  function handleDelete(id: string) {
    if (!db || !confirm("Are you sure you want to delete this sermon?")) return;
    const sermonRef = doc(db, "sermons", id);
    deleteDoc(sermonRef).catch(async () => {
      errorEmitter.emit("permission-error", new FirestorePermissionError({
        path: `sermons/${id}`,
        operation: "delete"
      }));
    });
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/admin" className="text-sm text-primary hover:underline flex items-center gap-1 mb-2">
              <ChevronLeft className="h-4 w-4" /> Dashboard
            </Link>
            <h1 className="text-3xl font-headline font-bold text-primary">Manage Sermons</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) setEditingSermon(null); }}>
            <DialogTrigger asChild>
              <Button className="rounded-xl">
                <Plus className="mr-2 h-4 w-4" /> Add Sermon
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingSermon ? "Edit Sermon" : "Add New Sermon"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" defaultValue={editingSermon?.title} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="speaker">Speaker</Label>
                    <Input id="speaker" name="speaker" defaultValue={editingSermon?.speaker} required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" name="date" type="date" defaultValue={editingSermon?.date} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="topic">Topic</Label>
                    <Input id="topic" name="topic" defaultValue={editingSermon?.topic} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL (Unsplash or Picsum)</Label>
                  <Input id="imageUrl" name="imageUrl" defaultValue={editingSermon?.imageUrl} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="videoUrl">Video URL</Label>
                  <Input id="videoUrl" name="videoUrl" defaultValue={editingSermon?.videoUrl} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" defaultValue={editingSermon?.description} rows={4} />
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? <Loader2 className="animate-spin h-4 w-4" /> : (editingSermon ? "Update" : "Save")}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="border-none shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Speaker</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Topic</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={5} className="text-center py-10"><Loader2 className="animate-spin mx-auto text-primary" /></TableCell></TableRow>
              ) : sermons?.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center py-10">No sermons found.</TableCell></TableRow>
              ) : sermons?.map((sermon) => (
                <TableRow key={sermon.id}>
                  <TableCell className="font-medium">{sermon.title}</TableCell>
                  <TableCell>{sermon.speaker}</TableCell>
                  <TableCell>{sermon.date}</TableCell>
                  <TableCell>{sermon.topic}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => { setEditingSermon(sermon); setIsOpen(true); }}>
                      <Pencil className="h-4 w-4 text-slate-600" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(sermon.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
