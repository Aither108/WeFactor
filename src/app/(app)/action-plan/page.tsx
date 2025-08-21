"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Task = { id: string; title: string; description?: string; points: number };
type Board = { todo: Task[]; doing: Task[]; done: Task[] };

const seed: Board = {
  todo: [
    { id: 't1', title: "Review Q2 survey results", points: 20 },
    { id: 't2', title: "Draft personal development goals", points: 40 },
  ],
  doing: [
    { id: 't3', title: "Finalize Q3 OKRs", points: 50 },
    { id: 't4', title: "Prepare for 1-on-1 with Sarah", points: 10 },
  ],
  done: [
    { id: 't5', title: "Complete engagement survey", points: 25 },
    { id: 't6', title: "Onboard new team member", points: 100 },
    { id: 't7', title: "Submit project retrospective", points: 30 },
  ],
};

const TaskCard = ({ task, onMove }: { task: Task; onMove: (dir: 'left' | 'right') => void }) => (
  <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
    <CardContent className="p-4 space-y-2">
      <p className="font-medium">{task.title}</p>
      {task.description && <p className="text-sm text-muted-foreground">{task.description}</p>}
      <div className="flex items-center justify-between">
        <Badge variant="secondary">+{task.points} pts</Badge>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={()=>onMove('left')}>◀</Button>
          <Button size="sm" variant="outline" onClick={()=>onMove('right')}>▶</Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function ActionPlanPage() {
  const storageKey = 'wefactor-board';
  const [board, setBoard] = useState<Board>(seed);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPoints, setNewPoints] = useState(10);

  useEffect(() => {
    try { const s = localStorage.getItem(storageKey); if (s) setBoard(JSON.parse(s)); } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(board)); } catch {}
  }, [board]);

  const totalPoints = useMemo(() => board.done.reduce((acc, t) => acc + t.points, 0), [board.done]);

  function moveTask(task: Task, from: keyof Board, dir: 'left' | 'right') {
    const order: (keyof Board)[] = ['todo','doing','done'];
    const idx = order.indexOf(from);
    const next = dir === 'left' ? Math.max(0, idx - 1) : Math.min(order.length - 1, idx + 1);
    if (next === idx) return;
    setBoard(prev => {
      const copy: Board = { todo: [...prev.todo], doing: [...prev.doing], done: [...prev.done] };
      copy[from] = copy[from].filter(t => t.id !== task.id);
      copy[order[next]].push(task);
      return copy;
    });
  }

  function addTask() {
    if (!newTitle.trim()) return;
    const t: Task = { id: `t${Date.now()}`, title: newTitle.trim(), description: newDesc.trim() || undefined, points: Math.max(0, Number(newPoints) || 0) };
    setBoard(prev => ({ ...prev, todo: [t, ...prev.todo] }));
    setNewTitle(""); setNewDesc(""); setNewPoints(10);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Action Plan & Points</h1>
        <p className="text-muted-foreground">
          Manage your tasks and watch your level-up points grow.
        </p>
      </div>

      <Card>
        <CardHeader className="flex-row items-center gap-4 space-y-0">
          <Award className="h-10 w-10 text-yellow-500" />
          <div>
            <CardTitle>Gold Tier</CardTitle>
            <CardDescription>{totalPoints} Total Points</CardDescription>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add Action Item</CardTitle>
          <CardDescription>Quickly add items to your To Do column.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <Input placeholder="Title" value={newTitle} onChange={e=>setNewTitle(e.target.value)} />
          <Textarea placeholder="Description (optional)" value={newDesc} onChange={e=>setNewDesc(e.target.value)} />
          <div className="flex items-center gap-2">
            <Input type="number" min={0} value={newPoints} onChange={e=>setNewPoints(parseInt(e.target.value || '0', 10))} />
            <Button onClick={addTask}>Add</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">To Do ({board.todo.length})</h2>
          <div className="space-y-3 rounded-lg bg-muted/50 p-4 h-full">
            {board.todo.map(task => (
              <TaskCard key={task.id} task={task} onMove={(dir)=>moveTask(task, 'todo', dir)} />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Doing ({board.doing.length})</h2>
          <div className="space-y-3 rounded-lg bg-muted/50 p-4 h-full">
            {board.doing.map(task => (
              <TaskCard key={task.id} task={task} onMove={(dir)=>moveTask(task, 'doing', dir)} />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Done ({board.done.length})</h2>
          <div className="space-y-3 rounded-lg bg-muted/50 p-4 h-full">
            {board.done.map(task => (
              <TaskCard key={task.id} task={task} onMove={(dir)=>moveTask(task, 'done', dir)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
