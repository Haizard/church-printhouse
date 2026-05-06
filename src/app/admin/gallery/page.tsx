
"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useFirestore, useCollection } from "@/firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, query } from "firebase/firestore";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";
import { AdminGuard } from "@/components/admin-guard";
import { Plus, Pencil, Trash2, Loader2, ChevronLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

export default function AdminGalleryPage() {
  const { toast } = useToast();
  const db = useFirestore();
  const [isDialogOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const galleryQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, "gallery"));
  }, [db]);

  const { data: items, loading } = useCollection(galleryQuery);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!db) return;
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      imageUrl: formData.get("imageUrl") as string,
      description: formData.get("description") as string,
    };

    const ref = editingItem ? doc(db, "gallery", editingItem.id) : collection(db, "gallery");
    const promise = editingItem ? updateDoc(ref as any, data) : addDoc(ref as any, data);

    promise
      .then(() => {
        toast({ title: editingItem ? "Image Updated" : "Image Added" });
        setIsOpen(false);
        setEditingItem(null);
      })
      .catch(async (error) => {
        errorEmitter.emit("permission-error", new FirestorePermissionError({
          path: editingItem ? `gallery/${editingItem.id}` : "gallery",
          operation: editingItem ? "update" : "create",
          requestResourceData: data,
        }));
      })
      .finally(() => setIsSubmitting(false));
  }

  function handleDelete(id: string) {
    if (!db || !confirm("Are you sure?")) return;
    deleteDoc(doc(db, "gallery", id)).catch(async () => {
      errorEmitter.emit("permission-error", new FirestorePermissionError({
        path: `gallery/${id}`,
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
              <h1 className="text-3xl font-headline font-bold text-primary">Manage Gallery</h1>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) setEditingPost(null); }}>
              <DialogTrigger asChild>
                <Button className="rounded-xl"><Plus className="mr-2 h-4 w-4" /> Add Image</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>{editingItem ? "Edit Gallery Item" : "Add Gallery Item"}</DialogTitle></DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                  <div className="space-y-2"><Label htmlFor="title">Title</Label><Input id="title" name="title" defaultValue={editingItem?.title} required /></div>
                  <div className="space-y-2"><Label htmlFor="category">Category</Label><Input id="category" name="category" defaultValue={editingItem?.category} required /></div>
                  <div className="space-y-2"><Label htmlFor="imageUrl">Image URL</Label><Input id="imageUrl" name="imageUrl" defaultValue={editingItem?.imageUrl} required placeholder="https://..." /></div>
                  <div className="space-y-2"><Label htmlFor="description">Short Description</Label><Input id="description" name="description" defaultValue={editingItem?.description} /></div>
                  <DialogFooter><Button type="submit" disabled={isSubmitting} className="w-full">{isSubmitting ? <Loader2 className="animate-spin h-4 w-4" /> : "Save"}</Button></DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full py-20 flex justify-center"><Loader2 className="animate-spin h-10 w-10 text-primary" /></div>
            ) : items?.length === 0 ? (
              <div className="col-span-full py-20 text-center text-muted-foreground bg-white rounded-3xl border-2 border-dashed">
                <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>No images in the gallery yet.</p>
              </div>
            ) : items?.map((item) => (
              <Card key={item.id} className="overflow-hidden group border-none shadow-sm">
                <div className="relative aspect-square">
                  {item.imageUrl && <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="icon" variant="secondary" className="rounded-full" onClick={() => { setEditingItem(item); setIsOpen(true); }}><Pencil className="h-4 w-4" /></Button>
                    <Button size="icon" variant="destructive" className="rounded-full" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-bold truncate text-sm">{item.title}</p>
                  <p className="text-[10px] text-muted-foreground">{item.category}</p>
                </div>
              </Card>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </AdminGuard>
  );
}
