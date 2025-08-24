
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
      name: z.string().describe('The name of the job seeker'),
      desiredJobTitle: z.string().describe('The job title the user is looking for'),
      locationPreferences: z.string().describe('The preferred locations for the job'),
      experienceYears: z.number().describe('Years of experience'),
    }).describe('Basic profile information of the job seeker'),
    skills: z.array(z.string()).describe('List of skills possessed by the job seeker'),
    experience: z.array(z.string()).describe('List of previous job titles or experiences'),
    education: z.array(z.string()).describe('List of educational qualifications'),
    preferences: z.string().describe('Any additional preferences specified by the job seeker (e.g., religion, age)'),
    resumeUrl: z.string().describe('URL of the resume uploaded by the job seeker. Can be empty.'),
  }).describe('Complete profile information of the job seeker'),
});

export type JobRecommendationsInput = z.infer<typeof JobRecommendationsInputSchema>;

const JobRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      jobTitle: z.string().describe('The title of the recommended job'),
      company: z.string().describe('The company offering the job'),
      location: z.string().describe('The location of the job'),
      description: z.string().describe('A brief, compelling one-paragraph description of the job and why it is a good fit for the candidate.'),
      url: z.string().describe('A plausible but fake URL to the job posting. Do not use real company names.'),
    })
  ).describe('List of 4 to 6 job recommendations'),
});

export type JobRecommendationsOutput = z.infer<typeof JobRecommendationsOutputSchema>;

export async function getJobRecommendations(input: JobRecommendationsInput): Promise<JobRecommendationsOutput> {
  return jobRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'jobRecommendationsPrompt',
  input: {schema: JobRecommendationsInputSchema},
  output: {schema: JobRecommendationsOutputSchema},
  prompt: `You are an AI job recommendation engine for GulfHired, a platform connecting Indian workers with jobs in the Gulf region. Your goal is to generate a list of 4-6 highly relevant job recommendations based on the job seeker's profile. Make the jobs sound plausible and attractive for the Gulf market.

Job Seeker Profile:
- Name: {{profile.basics.name}}
- Desired Role: {{profile.basics.desiredJobTitle}}
- Experience Level: {{profile.basics.experienceYears}} years
- Preferred Locations: {{profile.basics.locationPreferences}}
- Skills: {{#each profile.skills}}- {{this}} {{/each}}
- Past Experience: {{#each profile.experience}}- {{this}} {{/each}}
- Education: {{#each profile.education}}- {{this}} {{/each}}
- Other Preferences: {{profile.preferences}}

Based on this, generate a list of job recommendations. For each job, provide a compelling title, a plausible company name (do not use real, well-known company names), location, and a short, engaging description highlighting why it's a good match. Ensure the location is within the Gulf region (e.g., Dubai, Riyadh, Doha, Abu Dhabi). Create a fake but realistic URL for each job posting.`,
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
