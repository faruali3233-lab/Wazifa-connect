
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
      jobId: z.string().describe("A unique identifier for the job, e.g., 'j_123'"),
      title: z.string().describe('The title of the recommended job'),
      companyLogo: z.string().url().describe('A URL to a plausible but fake company logo. Use a placeholder like https://placehold.co/100x100.png'),
      companyMasked: z.string().describe('The plausible but fake name of the company offering the job. Do not use real company names.'),
      location: z.object({
        city: z.string().describe('The city where the job is located.'),
        country: z.string().describe('The country where the job is located (e.g., UAE, KSA).'),
      }),
      salary: z.object({
        min: z.number().describe('The minimum monthly salary.'),
        max: z.number().describe('The maximum monthly salary.'),
        currency: z.string().describe('The currency of the salary (e.g., AED, SAR).'),
        type: z.string().default('monthly').describe('The salary period.'),
        visible: z.boolean().default(true).describe('Whether the salary is visible.'),
      }),
      shift: z.enum(['Day', 'Night', 'Rotational']).describe('The work shift.'),
      benefits: z.array(z.string()).describe('A list of benefits provided, like "Visa", "Accommodation", "Transport".'),
      postedAt: z.string().describe("The ISO 8601 timestamp of when the job was posted."),
      urgency: z.enum(['normal', 'urgent', 'closing_soon']).describe('The urgency level of the job posting.'),
      match: z.object({
        score: z.number().int().min(0).max(100).describe('A match score from 0 to 100.'),
        reasons: z.array(z.string()).describe('Top 2-3 reasons why this job is a good match for the candidate.'),
      }),
      applied: z.boolean().default(false),
      saved: z.boolean().default(false),
      description: z.string().describe('A brief, compelling one-paragraph description of the job and why it is a good fit for the candidate.'),
      url: z.string().describe('A plausible but fake URL to the job posting.'),
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

Based on this, generate a list of job recommendations. For each job, provide all the fields specified in the output schema. Ensure the location is within the Gulf region (e.g., Dubai, Riyadh, Doha, Abu Dhabi). Create a fake but realistic URL for each job posting. The company name should be plausible but not a real, well-known company. The company logo should be a placeholder URL from placehold.co. Set a realistic match score and provide compelling reasons for the match.`,
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
