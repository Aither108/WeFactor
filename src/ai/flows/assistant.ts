'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AssistantInputSchema = z.object({
  message: z.string().min(1).describe('User prompt to the AI assistant'),
});
export type AssistantInput = z.infer<typeof AssistantInputSchema>;

const AssistantOutputSchema = z.object({
  reply: z.string().describe('Assistant reply'),
});
export type AssistantOutput = z.infer<typeof AssistantOutputSchema>;

const assistantPrompt = ai.definePrompt({
  name: 'wefactorAssistantPrompt',
  input: { schema: AssistantInputSchema },
  output: { schema: AssistantOutputSchema },
  prompt: `You are Wefactor's helpful AI assistant. Be concise and practical.\n\nUser: {{{message}}}\nAssistant:`,
});

export async function askAssistant(input: AssistantInput): Promise<AssistantOutput> {
  const { output } = await assistantPrompt(input);
  return output!;
}


