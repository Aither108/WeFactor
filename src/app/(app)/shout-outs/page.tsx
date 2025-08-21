"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";

type Shout = {
  author: { name: string; avatar: string };
  recipient: string;
  message: string;
  timestamp: string;
};

const seed: Shout[] = [
  {
    author: { name: "Jane Doe", avatar: "https://placehold.co/100x100.png?text=JD" },
    recipient: "Michael Scott",
    message: "Huge thanks for staying late to help me debug that critical issue. You're a lifesaver!",
    timestamp: "2 hours ago",
  },
  {
    author: { name: "Sam Lee", avatar: "https://placehold.co/100x100.png?text=SL" },
    recipient: "The Entire Dev Team",
    message: "Incredible work on the production launch this week! The collaboration and dedication were top-notch. So proud of this team!",
    timestamp: "1 day ago",
  },
  {
    author: { name: "Alex Turner", avatar: "https://placehold.co/100x100.png?text=AT" },
    recipient: "Maria Garcia",
    message: "Your presentation to the stakeholders was flawless. You articulated the project's value perfectly.",
    timestamp: "3 days ago",
  },
];

export default function ShoutOutsPage() {
  const storageKey = 'wefactor-shouts';
  const [shoutOuts, setShoutOuts] = useState<Shout[]>(seed);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try { const s = localStorage.getItem(storageKey); if (s) setShoutOuts(JSON.parse(s)); } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(shoutOuts)); } catch {}
  }, [shoutOuts]);

  function post() {
    if (!message.trim()) return;
    const now = new Date();
    setShoutOuts(prev => [
      {
        author: { name: "Alex Turner", avatar: "https://placehold.co/100x100.png?text=AT" },
        recipient: "Team",
        message: message.trim(),
        timestamp: now.toLocaleString(),
      },
      ...prev,
    ]);
    setMessage("");
  }
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Shout-outs</h1>
        <p className="text-muted-foreground">
          Recognize your teammates for their awesome contributions.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Shout-out</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="Share your appreciation... @mention a teammate or team." rows={3} />
          <Button onClick={post}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Post Shout-out
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {shoutOuts.map((shout, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-11 w-11">
                  <AvatarImage src={shout.author.avatar} data-ai-hint="person" />
                  <AvatarFallback>{shout.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <p className="font-bold">{shout.author.name}</p>
                    <span className="text-sm text-muted-foreground">to</span>
                    <p className="font-semibold text-primary">{shout.recipient}</p>
                  </div>
                  <p className="mt-2 text-foreground/90">{shout.message}</p>
                  <p className="mt-4 text-xs text-muted-foreground">{shout.timestamp}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
