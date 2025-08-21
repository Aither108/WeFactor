"use client";

import { useParams } from "next/navigation";
import { getSurveyBySlug } from "@/lib/surveys";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SurveyResultsPage() {
  const params = useParams<{ slug: string }>();
  const survey = getSurveyBySlug(params.slug);

  if (!survey) return <p className="text-sm text-muted-foreground">Survey not found.</p>;

  // Mock aggregation; in MVP we only show when threshold met
  const submitted = typeof window !== 'undefined' && localStorage.getItem(`wefactor-survey-${params.slug}-submitted`) === '1';
  const thresholdMet = submitted; // pretend 5+ once you submit

  const data = [
    { name: 'Engagement', score: 4.1 },
    { name: 'Enablement', score: 3.8 },
    { name: 'Communication', score: 4.4 },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">{survey.title} — Results</h1>
        <p className="text-muted-foreground">Minimum threshold: {survey.minThreshold ?? 5} participants</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
          <CardDescription>Aggregated results are shown only when enough responses are collected.</CardDescription>
        </CardHeader>
        <CardContent>
          {!thresholdMet ? (
            <div className="text-sm text-muted-foreground space-y-3">
              <p>Results are hidden until at least {survey.minThreshold ?? 5} responses are submitted to preserve anonymity.</p>
              <Button asChild variant="outline"><Link href={`/surveys/${survey.slug}`}>Back to Survey</Link></Button>
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0,5]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


