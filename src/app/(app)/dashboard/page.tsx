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
import Link from 'next/link';
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Activity,
  ArrowRight,
  Award,
  Calendar,
  Heart,
  Lightbulb,
  PlusCircle,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const teamPulseData = [
  { name: "Engagement", score: 82 },
  { name: "Wellbeing", score: 91 },
  { name: "Enablement", score: 75 },
];

export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Open Tasks</CardTitle>
          <CardDescription>Tasks from surveys, 1-on-1s, and goals.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li>
              <Link href="/goals" className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                <div>
                  <p className="font-medium">Finalize Q3 OKRs</p>
                  <p className="text-sm text-muted-foreground">Due: 3 days</p>
                </div>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </li>
            <li>
              <Link href="/surveys" className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                <div>
                  <p className="font-medium">Complete engagement survey</p>
                  <p className="text-sm text-muted-foreground">Due: 1 week</p>
                </div>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </li>
            <li>
              <Link href="/coaching" className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                <div>
                  <p className="font-medium">Prepare for 1-on-1 with Sarah</p>
                  <p className="text-sm text-muted-foreground">Due: Tomorrow</p>
                </div>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Level-up Points</CardTitle>
          <CardDescription>Your current tier and progress.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center gap-4">
          <div className="relative">
            <Award className="h-24 w-24 text-primary" />
            <Badge className="absolute top-16 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
              Gold
            </Badge>
          </div>
          <p className="text-2xl font-bold">1,250 PTS</p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full"><Link href="/action-plan">View Action Plan</Link></Button>
        </CardFooter>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Goal Progress</CardTitle>
          <CardDescription>Your progress towards company and personal goals.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="font-medium">Increase product adoption by 15%</span>
              <span className="text-muted-foreground">66%</span>
            </div>
            <Progress value={66} />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="font-medium">Master new design software</span>
              <span className="text-muted-foreground">80%</span>
            </div>
            <Progress value={80} />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Next 1-on-1</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Calendar className="h-8 w-8 text-primary" />
          <div>
            <p className="font-semibold">With David Chen</p>
            <p className="text-sm text-muted-foreground">Friday, 10:00 AM</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full"><Link href="/coaching">View Agenda</Link></Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Pulse</CardTitle>
          <CardDescription>Engagement, Wellbeing, Enablement</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={teamPulseData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} />
              <Tooltip
                cursor={{ fill: 'hsl(var(--muted))' }}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
              />
              <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Shout-outs</CardTitle>
          <Button asChild size="sm"><Link href="/shout-outs"><PlusCircle className="h-4 w-4 mr-2" />New</Link></Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
             <Avatar>
                <AvatarImage src="https://placehold.co/100x100.png" alt="Jane" data-ai-hint="person" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            <div>
              <p className="text-sm font-medium">Jane Doe to Michael</p>
              <p className="text-sm text-muted-foreground">&quot;Thanks for the help on the API integration!&quot;</p>
            </div>
          </div>
           <div className="flex items-start gap-3">
             <Avatar>
                <AvatarImage src="https://placehold.co/100x100.png" alt="Sam" data-ai-hint="person" />
                <AvatarFallback>SL</AvatarFallback>
              </Avatar>
            <div>
              <p className="text-sm font-medium">Sam Lee to Team</p>
              <p className="text-sm text-muted-foreground">&quot;Amazing launch everyone! Proud of what we accomplished.&quot;</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
