"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { generateSummary } from "./actions";
import { Loader2, Wand2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Generate AI Summary
        </>
      )}
    </Button>
  );
}

export function CoachingForm() {
  const initialState = { summary: "", error: "", errors: {} };
  const [state, dispatch] = useActionState(generateSummary, initialState);
  const [wins, setWins] = useState("");
  const [blockers, setBlockers] = useState("");
  const [actionItems, setActionItems] = useState("");

  function saveDraft() {
    const storageKey = 'wefactor-coaching-drafts';
    try {
      const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
      existing.unshift({ wins, blockers, actionItems, date: new Date().toISOString() });
      localStorage.setItem(storageKey, JSON.stringify(existing));
    } catch {}
  }

  function sendToActionPlan() {
    const boardKey = 'wefactor-board';
    try {
      const board = JSON.parse(localStorage.getItem(boardKey) || '{"todo":[],"doing":[],"done":[]}');
      const items = actionItems.split(/\n|;|\,/).map(s=>s.trim()).filter(Boolean);
      const mapped = items.map((t: string) => ({ id: `ai${Date.now()}-${Math.random().toString(36).slice(2,6)}`, title: t, points: 10 }));
      board.todo = [...mapped, ...board.todo];
      localStorage.setItem(boardKey, JSON.stringify(board));
    } catch {}
  }

  return (
    <form action={async (formData) => {
      setWins((formData.get('wins') as string) ?? '');
      setBlockers((formData.get('blockers') as string) ?? '');
      setActionItems((formData.get('actionItems') as string) ?? '');
      await dispatch(formData);
    }}>
      <Card>
        <CardHeader>
          <CardTitle>New 1-on-1 Session</CardTitle>
          <CardDescription>
            Log your wins, blockers, and action items. Then, let AI summarize it for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="wins">Wins & Accomplishments</Label>
            <Textarea value={wins} onChange={(e)=>setWins(e.target.value)} placeholder="What went well since our last session?" id="wins" name="wins" rows={4} />
            {state.errors?.wins && <p className="text-sm font-medium text-destructive">{state.errors.wins[0]}</p>}
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="blockers">Growth & Blockers</Label>
            <Textarea value={blockers} onChange={(e)=>setBlockers(e.target.value)} placeholder="Any challenges or areas for growth?" id="blockers" name="blockers" rows={4} />
            {state.errors?.blockers && <p className="text-sm font-medium text-destructive">{state.errors.blockers[0]}</p>}
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="actionItems">Action Items</Label>
            <Textarea value={actionItems} onChange={(e)=>setActionItems(e.target.value)} placeholder="What are the next steps for you and your manager?" id="actionItems" name="actionItems" rows={4} />
            {state.errors?.actionItems && <p className="text-sm font-medium text-destructive">{state.errors.actionItems[0]}</p>}
          </div>
          {state.summary && (
            <Alert>
              <Wand2 className="h-4 w-4" />
              <AlertTitle>AI Summary</AlertTitle>
              <AlertDescription>
                {state.summary}
              </AlertDescription>
            </Alert>
          )}
           {state.error && !state.errors && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {state.error}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-between gap-3">
          <SubmitButton />
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={saveDraft}>Save as Draft</Button>
            <Button type="button" variant="secondary" onClick={sendToActionPlan}>Add Action Items to Action Plan</Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
