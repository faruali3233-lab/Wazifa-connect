
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UploadCloud, ShieldCheck } from "lucide-react";
import { Alert, AlertTitle } from "./ui/alert";

const agentProfileSchema = z.object({
  name: z.string().min(2, "Full name is required."),
  email: z.string().email("A valid email is required."),
  profilePhoto: z.any().refine((files) => files?.length > 0, "Profile photo is required."),
  agencyName: z.string().optional(),
  agencyAddress: z.string().optional(),
  governmentId: z.any().refine((files) => files?.length > 0, "Government ID is required."),
});

export function AgentProfileForm() {
  const { user, updateAgentProfile } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof agentProfileSchema>>({
    resolver: zodResolver(agentProfileSchema),
    defaultValues: {
      name: "",
      email: "",
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
      governmentIdUrl: "file_provided",
      referralCode: `REF-${user?.id.toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      uniqueAgentId: `AG-${Math.floor(10000000 + Math.random() * 90000000)}`
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
        <CardDescription>This information will be verified and used to identify you on the platform.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
            
            <div className="space-y-6">
                <h3 className="text-lg font-medium border-b pb-2">Basic Information</h3>
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
                        <FormField control={form.control} name="name" render={({ field }) => (
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
                     <FormField control={form.control} name="governmentId" render={({ field }) => (
                        <FormItem><FormLabel>Government ID Upload <span className="text-destructive">*</span></FormLabel><FormControl><Input type="file" onChange={(e) => field.onChange(e.target.files)} /></FormControl><FormDescription>Aadhar, Passport, etc.</FormDescription><FormMessage /></FormItem>
                     )} />
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-lg font-medium border-b pb-2">Agency Information (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <FormField control={form.control} name="agencyName" render={({ field }) => (
                        <FormItem><FormLabel>Agency Name</FormLabel><FormControl><Input placeholder="Your agency's name" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="agencyAddress" render={({ field }) => (
                        <FormItem><FormLabel>Agency Office Address</FormLabel><FormControl><Textarea placeholder="Your agency's full address" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
            </div>

            <Alert>
              <ShieldCheck className="h-4 w-4" />
              <AlertTitle>Your Information is Secure</AlertTitle>
              <AlertDescription>
                Your personal and agency information is encrypted and used only for verification purposes. It will not be shared without your consent.
              </AlertDescription>
            </Alert>

            <Button type="submit" size="lg">Save Profile and Continue</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
