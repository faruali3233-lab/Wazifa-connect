'use server';

/**
 * @fileOverview Provides AI-powered personalized job recommendations for job seekers.
 *
 * - getJobRecommendations - A function that returns job recommendations based on user profile and preferences.
 * - JobRecommendationsInput - The input type for the getJobRecommendations function.
 * - JobRecommendationsOutput - The return type for the getJobRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const JobRecommendationsInputSchema = z.object({
  profile: z.object({
    basics: z.object({
      desiredJobTitle: z.string().describe('The job title the user is looking for'),
      locationPreferences: z.string().describe('The preferred locations for the job'),
      experienceYears: z.number().describe('Years of experience'),
    }).describe('Basic profile information of the job seeker'),
    skills: z.array(z.string()).describe('List of skills possessed by the job seeker'),
    experience: z.array(z.string()).describe('List of previous job titles'),
    education: z.array(z.string()).describe('List of educational qualifications'),
    preferences: z.string().describe('Any additional preferences specified by the job seeker'),
    resumeUrl: z.string().describe('URL of the resume uploaded by the job seeker'),
  }).describe('Complete profile information of the job seeker'),
});

export type JobRecommendationsInput = z.infer<typeof JobRecommendationsInputSchema>;

const JobRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      jobTitle: z.string().describe('The title of the recommended job'),
      company: z.string().describe('The company offering the job'),
      location: z.string().describe('The location of the job'),
      description: z.string().describe('A brief description of the job'),
      url: z.string().describe('URL to the job posting'),
    })
  ).describe('List of job recommendations'),
});

export type JobRecommendationsOutput = z.infer<typeof JobRecommendationsOutputSchema>;

export async function getJobRecommendations(input: JobRecommendationsInput): Promise<JobRecommendationsOutput> {
  return jobRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'jobRecommendationsPrompt',
  input: {schema: JobRecommendationsInputSchema},
  output: {schema: JobRecommendationsOutputSchema},
  prompt: `You are an AI job recommendation engine. Given the job seeker's profile and preferences, you will generate a list of job recommendations.

Job Seeker Profile:
{{profile}}`,
});

const jobRecommendationsFlow = ai.defineFlow(
  {
    name: 'jobRecommendationsFlow',
    inputSchema: JobRecommendationsInputSchema,
    outputSchema: JobRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
