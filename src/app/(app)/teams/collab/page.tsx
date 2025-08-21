"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { loadOrg, type OrgState, type Team } from '@/lib/teams';
import { PinnedIdeasSidebar } from '@/components/pinned-ideas-sidebar';
import { ImagePlus, X, ThumbsUp, MessageSquare } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Smile } from "lucide-react"
import EmojiPicker from "emoji-picker-react"
import { Input } from '@/components/ui/input';

type Comment = {
  id: string;
  author: string;
  message: string;
};

type Post = {
  id: string;
  teamId: string;
  author: string;
  message: string;
  date: string;
  pinned?: boolean;
  image?: string;
  likes: number;
  comments: Comment[];
};

export default function TeamCollabPage() {
  const [teamId, setTeamId] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const org = loadOrg();
  const storageKey = 'wefactor-team-posts';

  useEffect(() => { try { const s = localStorage.getItem(storageKey); if (s) setPosts(JSON.parse(s)); } catch {} }, []);
  useEffect(() => { try { localStorage.setItem(storageKey, JSON.stringify(posts)); } catch {} }, [posts]);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function post() {
    if (!teamId || (!message.trim() && !image)) return;
    const p: Post = { id: `p-${Date.now()}`, teamId, author: 'Alex Turner', message: message.trim(), date: new Date().toLocaleString(), image, likes: 0, comments: [] };
    setPosts(prev => [p, ...prev]);
    setMessage('');
    setImage(null);
  }
  function pin(postId: string, pin: boolean) {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, pinned: pin } : p));
  }

  function toggleLike(postId: string) {
    setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
  }

  function addComment(postId: string, comment: string) {
    const newComment: Comment = { id: `c-${Date.now()}`, author: 'Alex Turner', message: comment };
    setPosts(posts.map(p => p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p));
  }
  function setTeamStatus(status: { emoji: string, message: string }) {
    if (!teamId) return
    setOrg(prev => ({
      ...prev,
      teams: prev.teams.map(t => t.id === teamId ? { ...t, status } : t)
    }))
  }

  const visible = posts.filter(p => !teamId || p.teamId === teamId).sort((a,b)=> (b.pinned?1:0) - (a.pinned?1:0));
  const pinnedPosts = posts.filter(p => p.pinned);

  return (
    <div className="grid md:grid-cols-4 gap-6">
      <div className="md:col-span-3 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Collaboration</h1>
          <p className="text-muted-foreground">Share updates, ideas, and coordinate with your team.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Compose</CardTitle>
            <CardDescription>Post to a specific team.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <select className="w-full h-10 rounded-md border px-3" value={teamId} onChange={e=>setTeamId(e.target.value)}>
              <option value="">Select team…</option>
              {org.teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            <Textarea placeholder="Share an update, @mention teammates, add links…" rows={3} value={message} onChange={e=>setMessage(e.target.value)} />
            {image && (
              <div className="relative">
                <img src={image} alt="Preview" className="rounded-lg max-h-48" />
                <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => setImage(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            <div className="flex justify-between">
              <input type="file" accept="image/*" id="image-upload" className="hidden" onChange={handleImageChange} />
              <Button asChild variant="outline">
                <label htmlFor="image-upload" className="cursor-pointer">
                  <ImagePlus className="h-4 w-4 mr-2" />
                  Add Image
                </label>
              </Button>
              <Button onClick={post}>Post</Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {visible.map(p => (
            <Card key={p.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{org.teams.find(t=>t.id===p.teamId)?.name} • {p.date}</p>
                    <p className="mt-1">{p.message}</p>
                    {p.image && <img src={p.image} alt="Post image" className="mt-2 rounded-lg max-h-64" />}
                    <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                      <Button variant="ghost" size="sm" onClick={() => toggleLike(p.id)}>
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {p.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {p.comments.length}
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!p.pinned ? (
                      <Button variant="outline" size="sm" onClick={()=>pin(p.id, true)}>Pin</Button>
                    ) : (
                      <Button variant="secondary" size="sm" onClick={()=>pin(p.id, false)}>Pinned</Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="md:col-span-1 space-y-6">
        <TeamStatusCard team={org.teams.find(t => t.id === teamId)} onStatusChange={setTeamStatus} />
        <PinnedIdeasSidebar pinnedPosts={pinnedPosts} />
      </div>
    </div>
  );
}

function TeamStatusCard({ team, onStatusChange }: { team: Team | undefined, onStatusChange: (status: { emoji: string, message: string }) => void }) {
  const [message, setMessage] = useState(team?.status?.message || "")
  const [emoji, setEmoji] = useState(team?.status?.emoji || "")

  if (!team) return null

  const handleSave = () => {
    onStatusChange({ emoji, message })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Status</CardTitle>
        <CardDescription>{team.name}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                {emoji ? <span>{emoji}</span> : <Smile />}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <EmojiPicker onEmojiClick={(emojiObject) => setEmoji(emojiObject.emoji)} />
            </PopoverContent>
          </Popover>
          <Input placeholder="What's your team's mood?" value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <Button onClick={handleSave} className="w-full">Set Status</Button>
      </CardContent>
    </Card>
  )
}


