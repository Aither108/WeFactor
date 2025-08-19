// src/app/(app)/coaching/actions.ts
'use server';

import { summarizeOneOnOne } from '@/ai/flows/summarize-one-on-one';
import { z } from 'zod';

const FormSchema = z.object({
  wins: z.string().min(1, 'Please describe recent wins.'),
  blockers: z.string().min(1, 'Please describe any blockers.'),
  actionItems: z.string().min(1, 'Please list the action items.'),
});

type State = {
  summary?: string;
  error?: string;
  errors?: {
    wins?: string[];
    blockers?: string[];
    actionItems?: string[];
  }
}

export async function generateSummary(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = FormSchema.safeParse({
    wins: formData.get('wins'),
    blockers: formData.get('blockers'),
    actionItems: formData.get('actionItems'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      error: 'Invalid input. Please fill all fields.',
    };
  }
  
  try {
    const result = await summarizeOneOnOne(validatedFields.data);
    return { summary: result.summary };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to generate summary. Please try again.' };
  }
}
