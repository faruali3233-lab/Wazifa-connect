
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAuth, type AgentProfile } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, UploadCloud } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const hasFile = (v: any) => (v instanceof FileList && v.length > 0) || v instanceof File;

const agentProfileSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  profilePhoto: z.any().refine(hasFile, "Profile photo is required."),
  email: z.string().email("A valid email is required."),
  dob: z.date().optional(),
  officeAddress: z.string().min(5, "Office address is required."),
  licenseNumber: z.string().min(3, "License number is required."),
  agencyType: z.enum(["individual", "company"], { required_error: "Please select an agency type." }),
  yearsOfExperience: z.enum(["<1", "1-3", "3-5", "5+"], { required_error: "Please select years of experience." }),
  regions: z.array(z.string()).refine((value) => value.length > 0, { message: "Select at least one region." }),
  governmentId: z.any().refine(hasFile, "Government ID is required."),
  businessLicense: z.any().optional(),
  gstNumber: z.string().optional(),
  languages: z.array(z.string()).optional(),
  candidatePoolSize: z.enum(["0-50", "50-200", "200+"]).optional(),
  terms: z.boolean().refine((val) => val === true, "You must agree to the terms."),
}).refine((data) => {
    if (data.agencyType === "company") {
        return hasFile(data.businessLicense);
    }
    return true;
}, {
    message: "Business license is required for registered companies.",
    path: ["businessLicense"],
});

const regionsOfOperation = ["Saudi Arabia", "UAE", "Qatar", "Oman", "Kuwait", "Bahrain"];
const languageOptions = ["English", "Hindi", "Arabic", "Malayalam", "Tamil", "Bengali"];

export default function AgentProfileForm() {
  const { user, updateAgentProfile } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof agentProfileSchema>>({
    resolver: zodResolver(agentProfileSchema),
    defaultValues: {
      fullName: "",
      email: "",
      officeAddress: "",
      licenseNumber: "",
      regions: [],
      languages: [],
      terms: false,
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>, fieldChange: (files: FileList | null) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        form.setError("profilePhoto", { message: "File must be under 5MB" });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      fieldChange(e.target.files);
    }
  };

  const onSubmit = (values: z.infer<typeof agentProfileSchema>) => {
    const profileData: AgentProfile = {
      fullName: values.fullName,
      email: values.email,
      phone: user?.phone || '',
      countryCode: user?.countryCode || '',
      profilePhotoUrl: photoPreview || "",
      governmentIdUrl: "file_provided", // Placeholder for actual upload logic
      businessLicenseUrl: hasFile(values.businessLicense) ? "file_provided" : undefined,
      name: values.fullName,
      kycStatus: 'Pending',
      dob: values.dob,
      officeAddress: values.officeAddress,
      licenseNumber: values.licenseNumber,
      agencyType: values.agencyType,
      yearsOfExperience: values.yearsOfExperience,
      regions: values.regions,
      gstNumber: values.gstNumber,
      languages: values.languages,
      candidatePoolSize: values.candidatePoolSize,
      terms: values.terms,
    };
    
    updateAgentProfile(profileData);
    toast({
      title: "Agent Profile Saved!",
      description: "You can now access your agent dashboard.",
    });
    router.push('/job-seeker/agent/dashboard');
  };

  const watchAgencyType = form.watch("agencyType");

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Agent Profile</CardTitle>
        <CardDescription>This information is required to verify your agency and allow you to work with recruiters.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
            
            <div className="space-y-6">
              <h3 className="text-lg font-medium border-b pb-2">Basic Identity</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 items-start">
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
                         <Input id="photo-upload" type="file" className="hidden" accept=".jpg,.jpeg,.png" onChange={(e) => handlePhotoChange(e, field.onChange)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="space-y-6 md:col-span-2">
                      <FormField control={form.control} name="fullName" render={({ field }) => (
                          <FormItem><FormLabel>Full Name / Agency Name <span className="text-destructive">*</span></FormLabel><FormControl><Input placeholder="Enter your full name or agency name" {...field} /></FormControl><FormMessage /></FormItem>
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
                      <FormItem className="flex flex-col"><FormLabel>Date of Birth / Incorporation Date</FormLabel>
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
              </div>
            </div>
            
            <div className="space-y-6">
                <h3 className="text-lg font-medium border-b pb-2">Professional Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <FormField control={form.control} name="agencyType" render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Agency Type <span className="text-destructive">*</span></FormLabel>
                             <FormControl>
                                <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4">
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl><RadioGroupItem value="individual" /></FormControl>
                                        <FormLabel className="font-normal">Individual</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl><RadioGroupItem value="company" /></FormControl>
                                        <FormLabel className="font-normal">Registered Company</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                     )} />
                     <FormField control={form.control} name="yearsOfExperience" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience <span className="text-destructive">*</span></FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select years of experience" /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="<1">&lt;1 Year</SelectItem>
                            <SelectItem value="1-3">1 - 3 Years</SelectItem>
                            <SelectItem value="3-5">3 - 5 Years</SelectItem>
                            <SelectItem value="5+">5+ Years</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="officeAddress" render={({ field }) => (
                       <FormItem className="md:col-span-2">
                           <FormLabel>Office Address <span className="text-destructive">*</span></FormLabel>
                           <FormControl><Textarea placeholder="Enter your full office address" {...field} /></FormControl>
                           <FormMessage />
                       </FormItem>
                    )} />
                    <FormItem className="md:col-span-2">
                        <FormLabel>Regions of Operation <span className="text-destructive">*</span></FormLabel>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {regionsOfOperation.map((region) => (
                                <FormField
                                    key={region}
                                    control={form.control}
                                    name="regions"
                                    render={({ field }) => (
                                    <FormItem
                                        key={region}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                        <FormControl>
                                        <Checkbox
                                            checked={field.value?.includes(region)}
                                            onCheckedChange={(checked) => {
                                            const currentRegions = field.value ?? [];
                                            return checked
                                                ? field.onChange([...currentRegions, region])
                                                : field.onChange(
                                                    currentRegions.filter(
                                                    (value: string) => value !== region
                                                    )
                                                );
                                            }}
                                        />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        {region}
                                        </FormLabel>
                                    </FormItem>
                                    )}
                                />
                            ))}
                        </div>
                        <FormField control={form.control} name="regions" render={() => ( <FormMessage /> )}/>
                    </FormItem>

                    <FormItem className="md:col-span-2">
                        <FormLabel>Languages Spoken</FormLabel>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {languageOptions.map((lang) => (
                                <FormField
                                    key={lang}
                                    control={form.control}
                                    name="languages"
                                    render={({ field }) => (
                                    <FormItem
                                        key={lang}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                        <FormControl>
                                        <Checkbox
                                            checked={field.value?.includes(lang)}
                                            onCheckedChange={(checked) => {
                                            const currentLanguages = field.value ?? [];
                                            return checked
                                                ? field.onChange([...currentLanguages, lang])
                                                : field.onChange(
                                                    currentLanguages.filter(
                                                    (value: string) => value !== lang
                                                    )
                                                );
                                            }}
                                        />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        {lang}
                                        </FormLabel>
                                    </FormItem>
                                    )}
                                />
                            ))}
                        </div>
                        <FormField control={form.control} name="languages" render={() => ( <FormMessage /> )}/>
                    </FormItem>

                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-lg font-medium border-b pb-2">Documents & Verification</h3>
                <Alert>
                    <AlertTitle>Secure Upload</AlertTitle>
                    <AlertDescription>
                        Your documents are stored securely and only shared with verified recruiters upon request.
                    </AlertDescription>
                </Alert>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                     <FormField control={form.control} name="licenseNumber" render={({ field }) => (
                        <FormItem><FormLabel>Recruitment License Number <span className="text-destructive">*</span></FormLabel><FormControl><Input placeholder="Enter your license number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="governmentId" render={({ field }) => (
                        <FormItem><FormLabel>Owner's Government ID <span className="text-destructive">*</span></FormLabel><FormControl><Input type="file" onChange={(e) => field.onChange(e.target.files)} /></FormControl><FormDescription>Passport, Aadhar, etc.</FormDescription><FormMessage /></FormItem>
                     )} />
                    {watchAgencyType === 'company' && (
                        <>
                             <FormField control={form.control} name="businessLicense" render={({ field }) => (
                                <FormItem><FormLabel>Business License Scan <span className="text-destructive">*</span></FormLabel><FormControl><Input type="file" onChange={(e) => field.onChange(e.target.files)} /></FormControl><FormDescription>Company registration document.</FormDescription><FormMessage /></FormItem>
                             )} />
                             <FormField control={form.control} name="gstNumber" render={({ field }) => (
                                <FormItem><FormLabel>GST Number (Optional)</FormLabel><FormControl><Input placeholder="Enter GST number" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </>
                    )}
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-lg font-medium border-b pb-2">Agreement</h3>
                 <FormField control={form.control} name="terms" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(v === true)} /></FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>I agree to the <Button variant="link" type="button" className="p-0 h-auto">Terms and Conditions</Button> of GulfHired.<span className="text-destructive">*</span></FormLabel>
                            <FormDescription>By checking this box, you confirm that all information is accurate and agree to our platform policies.</FormDescription>
                            <FormMessage />
                        </div>
                    </FormItem>
                 )} />
            </div>

            <Button type="submit" size="lg">Save Profile</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

    