"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAuth, type SeekerProfile } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const profileSchema = z.object({
  desiredJobTitle: z.string().min(2, "Job title is required."),
  locationPreferences: z.string().min(2, "Location is required."),
  experienceYears: z.coerce.number().min(0, "Experience can't be negative."),
  skills: z.string().min(2, "Please list some skills."),
  experience: z.string().min(2, "Please list past experience."),
  education: z.string().min(2, "Please list your education."),
  preferences: z.string().optional(),
  resumeUrl: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
});

export function JobSeekerProfileForm() {
  const { updateSeekerProfile } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      desiredJobTitle: "",
      locationPreferences: "",
      experienceYears: 0,
      skills: "",
      experience: "",
      education: "",
      preferences: "",
      resumeUrl: "",
    },
  });

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    const profileData: SeekerProfile = {
      basics: {
        desiredJobTitle: values.desiredJobTitle,
        locationPreferences: values.locationPreferences,
        experienceYears: values.experienceYears,
      },
      skills: values.skills.split(',').map(s => s.trim()),
      experience: values.experience.split(',').map(s => s.trim()),
      education: values.education.split(',').map(s => s.trim()),
      preferences: values.preferences || "",
      resumeUrl: values.resumeUrl || "",
    };
    
    updateSeekerProfile(profileData);
    toast({
      title: "Profile Saved!",
      description: "You will now be redirected to your dashboard.",
    });
    router.push('/job-seeker/dashboard');
  };
  
  const progress = Object.values(form.watch()).filter(Boolean).length / Object.keys(form.getValues()).length * 100;

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Profile</CardTitle>
        <CardDescription>Fill out the details below to find your perfect job match.</CardDescription>
        <div className="flex items-center gap-4 pt-4">
            <Progress value={progress} className="w-full" />
            <span className="font-semibold text-primary">{Math.round(progress)}%</span>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField control={form.control} name="desiredJobTitle" render={({ field }) => (
                    <FormItem><FormLabel>Desired Job Title</FormLabel><FormControl><Input placeholder="e.g., Software Engineer" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="locationPreferences" render={({ field }) => (
                    <FormItem><FormLabel>Location Preferences</FormLabel><FormControl><Input placeholder="e.g., Mumbai, Remote" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="experienceYears" render={({ field }) => (
                    <FormItem><FormLabel>Years of Experience</FormLabel><FormControl><Input type="number" placeholder="e.g., 5" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="resumeUrl" render={({ field }) => (
                  <FormItem><FormLabel>Resume URL (Optional)</FormLabel><FormControl><Input placeholder="https://linkedin.com/in/your-profile" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
             </div>
             
             <FormField control={form.control} name="skills" render={({ field }) => (
                <FormItem><FormLabel>Skills (comma-separated)</FormLabel><FormControl><Textarea placeholder="e.g., React, Node.js, Python" {...field} /></FormControl><FormMessage /></FormItem>
             )} />
             <FormField control={form.control} name="experience" render={({ field }) => (
                <FormItem><FormLabel>Past Experience (comma-separated job titles)</FormLabel><FormControl><Textarea placeholder="e.g., Junior Developer, Intern" {...field} /></FormControl><FormMessage /></FormItem>
             )} />
             <FormField control={form.control} name="education" render={({ field }) => (
                <FormItem><FormLabel>Education (comma-separated qualifications)</FormLabel><FormControl><Textarea placeholder="e.g., B.Tech in Computer Science" {...field} /></FormControl><FormMessage /></FormItem>
             )} />
             <FormField control={form.control} name="preferences" render={({ field }) => (
                <FormItem><FormLabel>Other Preferences (Optional)</FormLabel><FormControl><Textarea placeholder="e.g., Looking for startups, interested in fintech" {...field} /></FormControl><FormMessage /></FormItem>
             )} />
            
            <Button type="submit" className="w-full md:w-auto">Save & Continue to Dashboard</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
