
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
import { Plus, Pencil, Trash2, Loader2, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function AdminBlogPage() {
  const { toast } = useToast();
  const db = useFirestore();
  const [isDialogOpen, setIsOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const blogQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, "blogPosts"), orderBy("date", "desc"));
  }, [db]);

  const { data: posts, loading } = useCollection(blogQuery);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!db) return;
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      date: formData.get("date") as string,
      category: formData.get("category") as string,
      imageUrl: formData.get("imageUrl") as string,
      summary: formData.get("summary") as string,
      content: formData.get("content") as string,
    };

    const ref = editingPost ? doc(db, "blogPosts", editingPost.id) : collection(db, "blogPosts");
    const promise = editingPost ? updateDoc(ref as any, data) : addDoc(ref as any, data);

    promise
      .then(() => {
        toast({ title: editingPost ? "Post Updated" : "Post Created" });
        setIsOpen(false);
        setEditingPost(null);
      })
      .catch(async (error) => {
        errorEmitter.emit("permission-error", new FirestorePermissionError({
          path: editingPost ? `blogPosts/${editingPost.id}` : "blogPosts",
          operation: editingPost ? "update" : "create",
          requestResourceData: data,
        }));
      })
      .finally(() => setIsSubmitting(false));
  }

  function handleDelete(id: string) {
    if (!db || !confirm("Are you sure?")) return;
    deleteDoc(doc(db, "blogPosts", id)).catch(async () => {
      errorEmitter.emit("permission-error", new FirestorePermissionError({
        path: `blogPosts/${id}`,
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
            <h1 className="text-3xl font-headline font-bold text-primary">Manage Blog</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) setEditingPost(null); }}>
            <DialogTrigger asChild>
              <Button className="rounded-xl"><Plus className="mr-2 h-4 w-4" /> New Post</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
              <DialogHeader><DialogTitle>{editingPost ? "Edit Blog Post" : "New Blog Post"}</DialogTitle></DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 py-4">
                <div className="space-y-2"><Label htmlFor="title">Title</Label><Input id="title" name="title" defaultValue={editingPost?.title} required /></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2"><Label htmlFor="author">Author</Label><Input id="author" name="author" defaultValue={editingPost?.author} required /></div>
                  <div className="space-y-2"><Label htmlFor="date">Date</Label><Input id="date" name="date" type="date" defaultValue={editingPost?.date} required /></div>
                  <div className="space-y-2"><Label htmlFor="category">Category</Label><Input id="category" name="category" defaultValue={editingPost?.category} required /></div>
                </div>
                <div className="space-y-2"><Label htmlFor="imageUrl">Image URL</Label><Input id="imageUrl" name="imageUrl" defaultValue={editingPost?.imageUrl} /></div>
                <div className="space-y-2"><Label htmlFor="summary">Summary</Label><Input id="summary" name="summary" defaultValue={editingPost?.summary} /></div>
                <div className="space-y-2"><Label htmlFor="content">Content (Markdown or Text)</Label><Textarea id="content" name="content" defaultValue={editingPost?.content} rows={10} required /></div>
                <DialogFooter><Button type="submit" disabled={isSubmitting} className="w-full">{isSubmitting ? <Loader2 className="animate-spin" /> : "Publish"}</Button></DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="border-none shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50"><TableRow><TableHead>Title</TableHead><TableHead>Author</TableHead><TableHead>Category</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={5} className="text-center py-10"><Loader2 className="animate-spin mx-auto" /></TableCell></TableRow>
              ) : posts?.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => { setEditingPost(post); setIsOpen(true); }}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
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
