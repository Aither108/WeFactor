'use server';

import { askAssistant } from '@/ai/flows/assistant';

type State = { reply?: string; error?: string };

export async function ask(prevState: State, formData: FormData): Promise<State> {
  const message = (formData.get('message') as string) || '';
  if (!message.trim()) return { error: 'Please enter a question.' };
  try {
    const { reply } = await askAssistant({ message });
    return { reply };
  } catch (e) {
    return { error: 'Assistant failed. Try again.' };
  }
}


