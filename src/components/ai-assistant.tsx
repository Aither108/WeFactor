"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ask } from "@/app/(app)/ai/actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Thinking…</> : 'Ask'}
    </Button>
  );
}

export function AIAssistant({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [state, formAction] = useActionState(ask, { reply: "" });
  const [message, setMessage] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>AI Assistant</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-3">
          <Textarea name="message" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Ask anything about your dashboard, goals, surveys…" rows={4} />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={()=>onOpenChange(false)}>Close</Button>
            <SubmitBtn />
          </div>
        </form>
        {state.reply && (
          <div className="rounded-lg border p-3 text-sm bg-muted/40 whitespace-pre-wrap">{state.reply}</div>
        )}
      </DialogContent>
    </Dialog>
  );
}


