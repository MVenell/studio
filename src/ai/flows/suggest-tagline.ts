// src/ai/flows/suggest-tagline.ts
'use server';

/**
 * @fileOverview A tagline suggestion AI agent.
 *
 * - suggestTagline - A function that handles the tagline suggestion process.
 * - SuggestTaglineInput - The input type for the suggestTagline function.
 * - SuggestTaglineOutput - The return type for the suggestTagline function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTaglineInputSchema = z.object({
  appDescription: z
    .string()
    .describe('A brief description of the web app for which a tagline is needed.'),
});
export type SuggestTaglineInput = z.infer<typeof SuggestTaglineInputSchema>;

const SuggestTaglineOutputSchema = z.object({
  tagline: z.string().describe('An AI-generated tagline suggestion for the web app.'),
});
export type SuggestTaglineOutput = z.infer<typeof SuggestTaglineOutputSchema>;

export async function suggestTagline(input: SuggestTaglineInput): Promise<SuggestTaglineOutput> {
  return suggestTaglineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTaglinePrompt',
  input: {schema: SuggestTaglineInputSchema},
  output: {schema: SuggestTaglineOutputSchema},
  prompt: `You are an expert copywriter specializing in creating taglines for web applications.

You will use the following description of the web app to generate a compelling and memorable tagline.

Description: {{{appDescription}}}

Tagline:`,
});

const suggestTaglineFlow = ai.defineFlow(
  {
    name: 'suggestTaglineFlow',
    inputSchema: SuggestTaglineInputSchema,
    outputSchema: SuggestTaglineOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
