'use server';

/**
 * @fileOverview Summarizes action items from 1-on-1 coaching sessions.
 *
 * - summarizeOneOnOne - A function that handles the summarization process.
 * - SummarizeOneOnOneInput - The input type for the summarizeOneOnOne function.
 * - SummarizeOneOnOneOutput - The return type for the summarizeOneOnOne function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeOneOnOneInputSchema = z.object({
  wins: z.string().describe('Wins discussed during the 1-on-1 session.'),
  blockers: z.string().describe('Blockers encountered during the 1-on-1 session.'),
  actionItems: z.string().describe('Action items agreed upon during the 1-on-1 session.'),
});
export type SummarizeOneOnOneInput = z.infer<typeof SummarizeOneOnOneInputSchema>;

const SummarizeOneOnOneOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the action items from the 1-on-1 session.'),
});
export type SummarizeOneOnOneOutput = z.infer<typeof SummarizeOneOnOneOutputSchema>;

export async function summarizeOneOnOne(input: SummarizeOneOnOneInput): Promise<SummarizeOneOnOneOutput> {
  return summarizeOneOnOneFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeOneOnOnePrompt',
  input: {schema: SummarizeOneOnOneInputSchema},
  output: {schema: SummarizeOneOnOneOutputSchema},
  prompt: `You are an AI assistant helping managers summarize 1-on-1 coaching sessions.

  Based on the wins, blockers, and action items discussed, provide a concise summary of the action items. Focus on what needs to be done and who is responsible.

  Wins: {{{wins}}}
  Blockers: {{{blockers}}}
  Action Items: {{{actionItems}}}
  `,
});

const summarizeOneOnOneFlow = ai.defineFlow(
  {
    name: 'summarizeOneOnOneFlow',
    inputSchema: SummarizeOneOnOneInputSchema,
    outputSchema: SummarizeOneOnOneOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
