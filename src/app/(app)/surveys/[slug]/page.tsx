"use client";

import { useParams, useRouter } from "next/navigation";
import { getSurveyBySlug, SurveyQuestion, type Survey as SurveyType } from "@/lib/surveys";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Answers = Record<string, string | string[]>;

export default function SurveyDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const survey = useMemo(()=>getSurveyBySlug(params.slug), [params.slug]);

  const storageKey = `wefactor-survey-${params.slug}`;
  const [answers, setAnswers] = useState<Answers>({});

  useEffect(() => {
    try {
      const cached = localStorage.getItem(storageKey);
      if (cached) setAnswers(JSON.parse(cached));
    } catch {}
  }, [storageKey]);

  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(answers)); } catch {}
  }, [answers, storageKey]);

  if (!survey) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">Survey not found.</p>
        <Button asChild variant="outline"><Link href="/surveys">Back to Surveys</Link></Button>
      </div>
    );
  }

  const s = survey as SurveyType;
  const total = s.questions.length;
  const completed = Object.keys(answers).filter((k: string) => {
    const q: SurveyQuestion | undefined = s.questions.find((qq: SurveyQuestion) => qq.id === k);
    const v = answers[k];
    if (!q) return false;
    if (q.type === 'multi') return Array.isArray(v) && v.length > 0;
    return typeof v === 'string' && v.trim().length > 0;
  }).length;
  const progress = Math.round((completed / total) * 100);

  function setAnswer(q: SurveyQuestion, value: string | string[]) {
    setAnswers((prev: Answers) => ({ ...prev, [q.id]: value }));
  }

  function canSubmit() {
    return completed === total;
  }

  function onSubmit() {
    // For MVP, pretend submit; clear and route to results
    localStorage.setItem(`${storageKey}-submitted`, '1');
    router.push(`/surveys/${s.slug}/results`);
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">{s.title}</h1>
        <p className="text-muted-foreground">Due: {s.dueDate} {s.isAnonymous && ' • Anonymous'}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Survey</CardTitle>
          <CardDescription>Progress: {progress}%</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Progress value={progress} />
          {s.questions.map((q) => (
            <div key={q.id} className="space-y-2">
              <Label className="font-medium">{q.label}</Label>
              {q.type === 'scale' && (
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{q.min ?? 1}</span>
                  <input
                    type="range"
                    min={q.min ?? 1}
                    max={q.max ?? 5}
                    value={(answers[q.id] as string) ?? String(q.min ?? 1)}
                    onChange={(e)=>setAnswer(q, e.target.value)}
                    className="w-full"
                  />
                  <span className="text-xs text-muted-foreground">{q.max ?? 5}</span>
                </div>
              )}
              {q.type === 'single' && (
                <RadioGroup value={(answers[q.id] as string) ?? ''} onValueChange={(v)=>setAnswer(q, v)}>
                  {q.options.map(opt => (
                    <div key={opt} className="flex items-center space-x-2">
                      <RadioGroupItem id={`${q.id}-${opt}`} value={opt} />
                      <Label htmlFor={`${q.id}-${opt}`}>{opt}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
              {q.type === 'multi' && (
                <div className="space-y-2">
                  {q.options.map(opt => {
                    const current = (answers[q.id] as string[] | undefined) ?? [];
                    const checked = current.includes(opt);
                    return (
                      <div key={opt} className="flex items-center space-x-2">
                        <Checkbox id={`${q.id}-${opt}`} checked={checked} onCheckedChange={(c)=>{
                          const next = new Set(current);
                          if (c) next.add(opt); else next.delete(opt);
                          setAnswer(q, Array.from(next));
                        }} />
                        <Label htmlFor={`${q.id}-${opt}`}>{opt}</Label>
                      </div>
                    );
                  })}
                </div>
              )}
              {q.type === 'text' && (
                <Textarea value={(answers[q.id] as string) ?? ''} onChange={(e)=>setAnswer(q, e.target.value)} placeholder={q.placeholder ?? ''} rows={3} />
              )}
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button asChild variant="outline"><Link href="/surveys">Cancel</Link></Button>
          <Button onClick={onSubmit} disabled={!canSubmit()}>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}


