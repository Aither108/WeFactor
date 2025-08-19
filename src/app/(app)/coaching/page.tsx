import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CoachingForm } from "./coaching-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const history = [
  {
    name: "David Chen",
    date: "May 20, 2024",
    status: "Completed",
  },
  {
    name: "David Chen",
    date: "April 15, 2024",
    status: "Completed",
  },
  {
    name: "Sarah Jones",
    date: "June 1, 2024",
    status: "Completed"
  }
];

export default function CoachingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">1-on-1 Coaching</h1>
        <p className="text-muted-foreground">
          Track your coaching sessions, set agendas, and review history.
        </p>
      </div>
      <Tabs defaultValue="agenda">
        <TabsList>
          <TabsTrigger value="agenda">Agenda</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="agenda" className="mt-6">
          <CoachingForm />
        </TabsContent>
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Session History</CardTitle>
              <CardDescription>
                Review your past 1-on-1 sessions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {history.map((session, index) => (
                  <li key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                         <AvatarImage src={`https://placehold.co/100x100.png?text=${session.name.substring(0,1)}`} data-ai-hint="person" />
                        <AvatarFallback>{session.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{session.name}</p>
                        <p className="text-sm text-muted-foreground">{session.date}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{session.status}</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
