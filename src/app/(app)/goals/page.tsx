"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { loadOrg } from "@/lib/teams";

type Goal = {
  id: string;
  title: string;
  description: string;
  owner: string;
  progress: number;
  milestones: string[];
};

const seed: Goal[] = [
  {
    id: 'g1',
    title: "Increase Product Adoption by 15%",
    description: "Drive key feature usage across all user segments.",
    owner: "Team",
    progress: 66,
    milestones: ["Q3 Objective", "Company Goal"],
  },
  {
    id: 'g2',
    title: "Master New Design Software",
    description: "Complete Figma advanced course and apply to new projects.",
    owner: "Alex Turner",
    progress: 80,
    milestones: ["Personal Goal", "Q2 Development"],
  },
  {
    id: 'g3',
    title: "Reduce Churn Rate by 5%",
    description: "Improve customer onboarding and support response times.",
    owner: "Team",
    progress: 45,
    milestones: ["Q3 Objective", "Customer Success"],
  },
  {
    id: 'g4',
    title: "Ship Project Phoenix",
    description: "Successfully launch the new platform rewrite.",
    owner: "Team",
    progress: 95,
    milestones: ["Company Goal"],
  },
];

export default function GoalsPage() {
  const storageKey = 'wefactor-goals';
  const [goals, setGoals] = useState<Goal[]>(seed);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [owner, setOwner] = useState("Team");
  const [milestonesText, setMilestonesText] = useState("");
  const teams = loadOrg().teams;

  useEffect(() => {
    try { const s = localStorage.getItem(storageKey); if (s) setGoals(JSON.parse(s)); } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(goals)); } catch {}
  }, [goals]);

  function addGoal() {
    if (!title.trim()) return;
    const g: Goal = {
      id: `g${Date.now()}`,
      title: title.trim(),
      description: desc.trim(),
      owner: owner.trim() || 'Team',
      progress: 0,
      milestones: milestonesText.split(',').map(m => m.trim()).filter(Boolean),
    };
    setGoals(prev => [g, ...prev]);
    setTitle(""); setDesc(""); setOwner("Team"); setMilestonesText("");
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Goals & Milestones</h1>
          <p className="text-muted-foreground">
            Track your progress towards individual and team objectives.
          </p>
        </div>
        <Button onClick={addGoal}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Goal
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>New Goal</CardTitle>
          <CardDescription>Define a goal linked to objectives and milestones.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <Input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
          <div>
            <label className="text-xs text-muted-foreground">Owner (Team or Individual)</label>
            <select className="w-full h-10 rounded-md border px-3" value={owner} onChange={e=>setOwner(e.target.value)}>
              <option value="Team">Team</option>
              {teams.map(t => (<option key={t.id} value={t.name}>{t.name}</option>))}
              <option value="Alex Turner">Alex Turner</option>
            </select>
          </div>
          <Textarea className="md:col-span-2" placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} />
          <Input className="md:col-span-2" placeholder="Milestones (comma-separated)" value={milestonesText} onChange={e=>setMilestonesText(e.target.value)} />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {goals.map((goal) => (
          <Card key={goal.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{goal.title}</CardTitle>
                <Badge variant={goal.owner === "Team" ? "secondary" : "outline"}>
                  {goal.owner}
                </Badge>
              </div>
              <CardDescription>{goal.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">{goal.progress}%</span>
              </div>
              <Progress value={goal.progress} />
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              {goal.milestones.map((milestone) => (
                <Badge key={milestone} variant="outline" className="font-normal">
                  {milestone}
                </Badge>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
