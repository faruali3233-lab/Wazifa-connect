"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const profileSchema = z.object({
  companyName: z.string().min(2, "Company name is required."),
  companyWebsite: z.string().url("Please enter a valid website URL."),
  companyDescription: z.string().min(20, "Please provide a brief description of your company."),
});

export function RecruiterProfileForm() {
  const { updateRecruiterProfile } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      companyName: "",
      companyWebsite: "",
      companyDescription: "",
    },
  });

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    updateRecruiterProfile(values);
    toast({
      title: "Company Profile Saved!",
      description: "You can now access your recruiter dashboard.",
    });
    router.push('/recruiter/dashboard');
  };
  
  const progress = Object.values(form.watch()).filter(Boolean).length / Object.keys(form.getValues()).length * 100;

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Profile</CardTitle>
        <CardDescription>Provide your company details to start hiring.</CardDescription>
        <div className="flex items-center gap-4 pt-4">
            <Progress value={progress} className="w-full" />
            <span className="font-semibold text-primary">{Math.round(progress)}%</span>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField control={form.control} name="companyName" render={({ field }) => (
                    <FormItem><FormLabel>Company Name</FormLabel><FormControl><Input placeholder="e.g., Acme Corporation" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="companyWebsite" render={({ field }) => (
                    <FormItem><FormLabel>Company Website</FormLabel><FormControl><Input type="url" placeholder="https://acme.com" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
             </div>
             
             <FormField control={form.control} name="companyDescription" render={({ field }) => (
                <FormItem><FormLabel>Company Description</FormLabel><FormControl><Textarea rows={5} placeholder="Describe your company, its mission, and values." {...field} /></FormControl><FormMessage /></FormItem>
             )} />
            
            <Button type="submit" className="w-full md:w-auto">Save & Continue to Dashboard</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
