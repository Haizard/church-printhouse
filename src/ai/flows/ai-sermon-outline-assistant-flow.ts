'use server';
/**
 * @fileOverview An AI assistant for generating sermon outlines or discussion points.
 *
 * - aiSermonOutlineAssistant - A function that handles the generation of sermon outlines.
 * - AiSermonOutlineAssistantInput - The input type for the aiSermonOutlineAssistant function.
 * - AiSermonOutlineAssistantOutput - The return type for the aiSermonOutlineAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiSermonOutlineAssistantInputSchema = z
  .object({
    scripturePassage: z
      .string()
      .optional()
      .describe('An optional scripture passage (e.g., "John 3:16-17", "Psalm 23")'),
    thematicKeywords: z
      .array(z.string())
      .optional()
      .describe('Optional thematic keywords (e.g., ["love", "forgiveness", "community"])'),
  })
  .refine(
    data => data.scripturePassage !== undefined || (data.thematicKeywords && data.thematicKeywords.length > 0),
    'Either a scripture passage or at least one thematic keyword must be provided.'
  );

export type AiSermonOutlineAssistantInput = z.infer<typeof AiSermonOutlineAssistantInputSchema>;

const AiSermonOutlineAssistantOutputSchema = z.object({
  title: z.string().describe('A suggested title for the sermon or discussion.'),
  introduction: z.string().describe('A brief introduction to the sermon or discussion.'),
  mainPoints: z
    .array(
      z.object({
        heading: z.string().describe('The heading for a main point.'),
        details: z.string().describe('Detailed explanation or discussion points for the main point.'),
      })
    )
    .describe('A list of main points for the sermon or discussion.'),
  conclusion: z.string().describe('A concluding remark or call to action for the sermon or discussion.'),
});

export type AiSermonOutlineAssistantOutput = z.infer<typeof AiSermonOutlineAssistantOutputSchema>;

export async function aiSermonOutlineAssistant(
  input: AiSermonOutlineAssistantInput
): Promise<AiSermonOutlineAssistantOutput> {
  return aiSermonOutlineAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSermonOutlineAssistantPrompt',
  input: { schema: AiSermonOutlineAssistantInputSchema },
  output: { schema: AiSermonOutlineAssistantOutputSchema },
  prompt: `You are an AI assistant designed to help church administrators prepare sermon outlines and discussion points.
Your goal is to provide a comprehensive and structured outline based on the input provided.

If a scripture passage is provided, focus the outline primarily on that passage.
If thematic keywords are provided, use them as the central themes for the outline.
If both are provided, integrate the keywords into the discussion of the scripture passage.

The outline should be well-organized, insightful, and suitable for a sermon or group discussion.
Provide a clear title, introduction, several main points with details, and a conclusion.

Here is the input:
{{#if scripturePassage}}
Scripture Passage: {{{scripturePassage}}}
{{/if}}

{{#if thematicKeywords}}
Thematic Keywords: {{#each thematicKeywords}} - {{{this}}}{{/each}}
{{/if}}

Please generate a sermon or discussion outline in the specified JSON format.`,
});

const aiSermonOutlineAssistantFlow = ai.defineFlow(
  {
    name: 'aiSermonOutlineAssistantFlow',
    inputSchema: AiSermonOutlineAssistantInputSchema,
    outputSchema: AiSermonOutlineAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate sermon outline.');
    }
    return output;
  }
);
