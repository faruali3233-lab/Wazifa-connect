
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAuth, type SubAgentProfile } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CalendarIcon, UploadCloud, ShieldCheck, UserCheck } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Checkbox } from "./ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const subAgentProfileSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  profilePhoto: z.any().refine((files) => files?.length > 0, "Profile photo is required."),
  email: z.string().email("A valid email is required.").optional().or(z.literal('')),
  dob: z.date().optional(),
  governmentId: z.any().refine((files) => files?.length > 0, "Government ID is required."),
  agentReferralLink: z.string().min(5, "Agent referral link/code is required."),
  agentLoginId: z.string().min(3, "Agent Login ID is required."),
  signedAgreement: z.any().optional(),
  complianceCheckbox: z.boolean().refine((val) => val === true, "You must confirm you work for the parent agent."),
  digitalSignature: z.string().min(2, "Please type your full name as a digital signature."),
});

export function SubAgentProfileForm() {
  const { user, updateSubAgentProfile } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [verifiedAgent, setVerifiedAgent] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const form = useForm<z.infer<typeof subAgentProfileSchema>>({
    resolver: zodResolver(subAgentProfileSchema),
    defaultValues: {
      fullName: "",
      email: "",
      agentReferralLink: "",
      agentLoginId: "",
      complianceCheckbox: false,
      digitalSignature: ""
    },
  });
  
  const handleVerifyAgent = async () => {
    const referralLink = form.getValues("agentReferralLink");
    const agentId = form.getValues("agentLoginId");
    if(!referralLink || !agentId) {
        form.setError("agentReferralLink", { message: "Both referral and agent ID are required to verify." });
        return;
    }

    setIsVerifying(true);
    // In a real app, this would be an API call.
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Mock response
    if (referralLink === "AGENT123" && agentId === "AGENT_ID") {
      setVerifiedAgent("Verified Agent Name");
      toast({ title: "Agent Verified!", description: "You are now linked to Verified Agent Name." });
    } else {
      form.setError("agentReferralLink", { message: "Invalid referral link or agent ID." });
    }
    setIsVerifying(false);
  }

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

  const onSubmit = (values: z.infer<typeof subAgentProfileSchema>) => {
    if (!verifiedAgent) {
        toast({ variant: "destructive", title: "Agent Not Verified", description: "Please verify the parent agent's details before submitting." });
        return;
    }
    
    const profileData: SubAgentProfile = {
      ...values,
      phone: user?.phone || '',
      countryCode: user?.countryCode || '',
      profilePhotoUrl: photoPreview || "",
      governmentIdUrl: "file_provided",
      signedAgreementUrl: values.signedAgreement ? "file_provided" : "",
      parentAgentName: verifiedAgent
    };
    
    updateSubAgentProfile(profileData);
    toast({
      title: "Sub Agent Profile Saved!",
      description: "You can now access your sub-agent dashboard.",
    });
    router.push('/job-seeker/sub-agent-dashboard');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Sub Agent Profile</CardTitle>
        <CardDescription>Provide these details to link with your parent agent and get verified.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
            
            <div className="space-y-6">
                <h3 className="text-lg font-medium border-b pb-2">Basic Identity</h3>
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
                            <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" placeholder="your@email.com" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                     <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <Input disabled value={`${user?.countryCode} ${user?.phone}`} />
                        <FormDescription>Auto-filled from your login information.</FormDescription>
                    </FormItem>
                     <FormField control={form.control} name="dob" render={({ field }) => (
                        <FormItem className="flex flex-col"><FormLabel>Date of Birth</FormLabel>
                            <Popover><PopoverTrigger asChild>
                                <FormControl>
                                <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                    {field.value ? format(field.value, "PPP") : (<span>Pick a date</span>)}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                                </FormControl>
                            </PopoverTrigger><PopoverContent className="w-auto p-0" align="start">
                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1950-01-01")} initialFocus />
                            </PopoverContent></Popover><FormMessage />
                        </FormItem>
                    )} />
                     <FormField control={form.control} name="governmentId" render={({ field }) => (
                        <FormItem className="md:col-span-2"><FormLabel>Government ID Upload <span className="text-destructive">*</span></FormLabel><FormControl><Input type="file" onChange={(e) => field.onChange(e.target.files)} /></FormControl><FormDescription>Aadhar, Passport, Emirates ID, etc.</FormDescription><FormMessage /></FormItem>
                     )} />
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-lg font-medium border-b pb-2">Agent Linkage</h3>
                <Alert>
                    <AlertTitle>Action Required</AlertTitle>
                    <AlertDescription>
                        You must link to an existing, verified agent on our platform to proceed. Your account may be removed if the parent agent does not confirm your linkage within 7 days.
                    </AlertDescription>
                </Alert>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <FormField control={form.control} name="agentReferralLink" render={({ field }) => (
                        <FormItem><FormLabel>Agent Referral Link/Code <span className="text-destructive">*</span></FormLabel><FormControl><Input placeholder="Enter code from your agent" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="agentLoginId" render={({ field }) => (
                        <FormItem><FormLabel>Agent Login ID <span className="text-destructive">*</span></FormLabel><FormControl><Input placeholder="Enter agent's login ID" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                <div className="flex items-center gap-4">
                     <Button type="button" variant="outline" onClick={handleVerifyAgent} disabled={isVerifying}>
                        {isVerifying ? "Verifying..." : "Verify Agent"}
                     </Button>
                     {verifiedAgent && (
                        <div className="flex items-center gap-2 text-green-600 font-medium">
                            <ShieldCheck className="h-5 w-5" />
                            <span>Linked to: {verifiedAgent}</span>
                        </div>
                     )}
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-lg font-medium border-b pb-2">Verification & Compliance</h3>
                 <FormField control={form.control} name="signedAgreement" render={({ field }) => (
                    <FormItem><FormLabel>Upload Signed Agreement (Optional)</FormLabel><FormControl><Input type="file" onChange={(e) => field.onChange(e.target.files)} /></FormControl><FormDescription>Upload the agreement provided by your parent agent.</FormDescription><FormMessage /></FormItem>
                 )} />
                 <FormField control={form.control} name="complianceCheckbox" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={!verifiedAgent} /></FormControl>
                        <div className="space-y-1 leading-none">
                        <FormLabel>Confirmation <span className="text-destructive">*</span></FormLabel>
                        <FormDescription>I confirm that I am authorized to work as a Sub Agent under {verifiedAgent || '[Verified Agent Name]'}.</FormDescription>
                        <FormMessage />
                        </div>
                    </FormItem>
                 )} />
                 <FormField control={form.control} name="digitalSignature" render={({ field }) => (
                    <FormItem><FormLabel>Digital Signature <span className="text-destructive">*</span></FormLabel><FormControl><Input placeholder="Type your full name to sign" {...field} /></FormControl><FormDescription>By typing your name, you consent to our terms.</FormDescription><FormMessage /></FormItem>
                )} />
            </div>

            <Button type="submit" size="lg" disabled={!verifiedAgent}>Save Profile and Continue</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
