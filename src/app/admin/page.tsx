
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
  BarChart, 
  PlusCircle, 
  MessageSquare,
  Sprout
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Blog Posts", value: "24", icon: FileText, color: "text-blue-600" },
    { label: "Sermons", value: "156", icon: Mic, color: "text-green-600" },
    { label: "Active Events", value: "12", icon: Calendar, color: "text-purple-600" },
    { label: "New Messages", value: "5", icon: MessageSquare, color: "text-orange-600" },
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
            <Card key={i} className="border-none shadow-sm overflow-hidden">
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
          ))}
        </div>

        {/* Action Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="lg:col-span-2 border-none shadow-sm bg-white">
            <CardHeader className="border-b bg-slate-50/50">
              <CardTitle className="font-headline text-xl">Recent Content</CardTitle>
              <CardDescription>Manage your latest publications and updates.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {[
                  { title: "The Roots of Resilience", type: "Sermon", date: "2 hours ago", author: "Pastor Elena" },
                  { title: "Spring Community Garden", type: "Event", date: "Yesterday", author: "Sarah J." },
                  { title: "Walking Through Grief", type: "Blog", date: "3 days ago", author: "David P." },
                  { title: "Monthly Prayer Night", type: "Event", date: "4 days ago", author: "Admin" },
                ].map((item, i) => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        item.type === 'Sermon' ? 'bg-green-100 text-green-700' : 
                        item.type === 'Blog' ? 'bg-blue-100 text-blue-700' : 
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {item.type === 'Sermon' ? <Mic className="h-4 w-4" /> : 
                         item.type === 'Blog' ? <FileText className="h-4 w-4" /> : 
                         <Calendar className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.type} • {item.author}</p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{item.date}</div>
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="p-4 border-t text-center">
              <Button variant="ghost" size="sm" className="text-primary font-bold">View All Activity</Button>
            </div>
          </Card>

          <div className="space-y-8">
            <Card className="border-none shadow-sm bg-primary text-primary-foreground overflow-hidden">
              <CardHeader>
                <CardTitle className="font-headline text-xl flex items-center gap-2">
                  <Sprout className="h-5 w-5" />
                  Growth Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-white text-primary hover:bg-slate-100 border-none rounded-xl" asChild>
                  <Link href="/admin/sermon-assistant">
                    Generate Sermon Outline
                  </Link>
                </Button>
                <Button variant="outline" className="w-full border-white/30 hover:bg-white/10 text-white rounded-xl">
                  Schedule New Event
                </Button>
                <Button variant="outline" className="w-full border-white/30 hover:bg-white/10 text-white rounded-xl">
                  Write Newsletter
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="bg-slate-50/50">
                <CardTitle className="font-headline text-xl">Quick Help</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <p className="text-sm text-muted-foreground">Need assistance with the dashboard? Check our documentation or contact tech support.</p>
                <Button variant="link" className="p-0 text-primary">View Admin Guide</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
