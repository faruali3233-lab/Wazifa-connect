
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAuth, type AgentProfile } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UploadCloud, ShieldCheck } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import Link from "next/link";
import { Textarea } from "./ui/textarea";

const agentProfileSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  profilePhoto: z.any().refine((files) => files?.length > 0, "Profile photo is required."),
  agencyName: z.string().min(2, "Agency name is required."),
  agencyAddress: z.string().min(10, "A detailed agency address is required."),
  email: z.string().email("A valid email is required."),
  dob: z.string().optional(),
  licenseNumber: z.string().optional(),
  gstNumber: z.string().optional(),
  governmentId: z.any().refine((files) => files?.length > 0, "Government ID is required."),
  complianceCheckbox: z.boolean().refine((val) => val === true, "You must agree to the terms."),
  digitalSignature: z.string().min(2, "Please type your full name as a digital signature."),
});

export function AgentProfileForm() {
  const { user, updateAgentProfile } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof agentProfileSchema>>({
    resolver: zodResolver(agentProfileSchema),
    defaultValues: {
      fullName: "",
      email: "",
      agencyName: "",
      agencyAddress: "",
      licenseNumber: "",
      gstNumber: "",
      dob: "",
      profilePhoto: undefined,
      governmentId: undefined,
      complianceCheckbox: false,
      digitalSignature: ""
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        form.setError("profilePhoto", { message: "File must be under 5MB" });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        form.setValue("profilePhoto", e.target.files);
        form.clearErrors("profilePhoto");
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (values: z.infer<typeof agentProfileSchema>) => {
    const profileData: AgentProfile = {
      ...values,
      phone: user?.phone || '',
      countryCode: user?.countryCode || '',
      profilePhotoUrl: photoPreview || "",
      governmentIdUrl: "file_provided", // Placeholder
      name: values.fullName,
      dob: values.dob ? new Date(values.dob) : undefined,
    };
    
    updateAgentProfile(profileData);
    toast({
      title: "Agent Profile Saved!",
      description: "You can now access your agent dashboard.",
    });
    router.push('/job-seeker/agent/dashboard');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Agent Profile</CardTitle>
        <CardDescription>Provide these details to get verified and start managing candidates and jobs.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
            
            <div className="space-y-6">
                <h3 className="text-lg font-medium border-b pb-2">Your Identity & Agency</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 items-start">
                    <FormField control={form.control} name="profilePhoto" render={({ field }) => (
                      <FormItem className="flex flex-col items-center">
                        <FormLabel htmlFor="photo-upload" className="cursor-pointer">
                           Profile Photo <span className="text-destructive">*</span>
                           <Avatar className="h-32 w-32 mt-2">
                            <AvatarImage src={photoPreview || undefined} alt="Profile photo preview" />
                            <AvatarFallback className="bg-muted">
                               <div className="flex flex-col items-center justify-center text-muted-foreground">
                                <UploadCloud className="h-8 w-8" />
                                <span>Upload</span>
                               </div>
                            </AvatarFallback>
                          </Avatar>
                        </FormLabel>
                        <FormControl>
                           <Input id="photo-upload" type="file" className="hidden" accept=".jpg,.jpeg,.png" onChange={handlePhotoChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <div className="space-y-6">
                        <FormField control={form.control} name="fullName" render={({ field }) => (
                            <FormItem><FormLabel>Full Name <span className="text-destructive">*</span></FormLabel><FormControl><Input placeholder="Enter your full name" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem><FormLabel>Email Address <span className="text-destructive">*</span></FormLabel><FormControl><Input type="email" placeholder="your@email.com" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                     <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <Input disabled value={`${user?.countryCode} ${user?.phone}`} />
                        <FormDescription>Auto-filled from your login information.</FormDescription>
                    </FormItem>
                     <FormField control={form.control} name="dob" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input type="text" placeholder="YYYY-MM-DD" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="agencyName" render={({ field }) => (
                        <FormItem><FormLabel>Agency Name <span className="text-destructive">*</span></FormLabel><FormControl><Input placeholder="Your recruitment agency name" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="agencyAddress" render={({ field }) => (
                        <FormItem><FormLabel>Agency Address <span className="text-destructive">*</span></FormLabel><FormControl><Textarea rows={3} placeholder="Your full agency address" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    
                    <FormField control={form.control} name="licenseNumber" render={({ field }) => (
                        <FormItem><FormLabel>License Number</FormLabel><FormControl><Input placeholder="Enter agency license number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="gstNumber" render={({ field }) => (
                        <FormItem><FormLabel>GST Number</FormLabel><FormControl><Input placeholder="Enter GST number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />

                     <FormField control={form.control} name="governmentId" render={({ field }) => (
                        <FormItem className="md:col-span-2"><FormLabel>Government ID Upload <span className="text-destructive">*</span></FormLabel><FormControl><Input type="file" onChange={(e) => field.onChange(e.target.files)} /></FormControl><FormDescription>Trade License, Aadhar, Passport, etc.</FormDescription><FormMessage /></FormItem>
                     )} />
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-lg font-medium border-b pb-2">Verification & Compliance</h3>
                 <Alert>
                    <ShieldCheck className="h-4 w-4" />
                    <AlertTitle>Platform Agreement</AlertTitle>
                    <AlertDescription>
                        By submitting your profile, you agree to comply with GulfHired's fair recruitment policies and local labor laws. You are responsible for all candidates and sub-agents you onboard.
                    </AlertDescription>
                </Alert>

                 <FormField control={form.control} name="complianceCheckbox" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <div className="space-y-1 leading-none">
                        <FormLabel>Agreement <span className="text-destructive">*</span></FormLabel>
                        <FormDescription>I have read and agree to the <Link href="/terms" className="underline">Terms of Service</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.</FormDescription>
                        <FormMessage />
                        </div>
                    </FormItem>
                 )} />
                 <FormField control={form.control} name="digitalSignature" render={({ field }) => (
                    <FormItem><FormLabel>Digital Signature <span className="text-destructive">*</span></FormLabel><FormControl><Input placeholder="Type your full name to sign" {...field} /></FormControl><FormDescription>By typing your name, you are electronically signing this agreement.</FormDescription><FormMessage /></FormItem>
                )} />
            </div>

            <Button type="submit" size="lg">Submit for Verification</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
