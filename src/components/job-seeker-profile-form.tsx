"use client";

import { useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UploadCloud } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Checkbox } from "./ui/checkbox";
import { useTranslation } from "./i18n-provider";

const profileSchema = z.object({
  yourFullName: z.string().min(2, "Full name is required.").max(80, "Full name is too long."),
  profession: z.string().min(1, "Profession is required."),
  otherProfession: z.string().optional(),
  educationExperience: z.string().optional(),
  religion: z.string().min(1, "Religion is required."),
  age: z.coerce.number().min(18, "Must be at least 18.").max(60, "Must be 60 or younger."),
  gulfExperience: z.enum(["experienced", "fresher"], { required_error: "Please select your experience level." }),
  yearsInGulf: z.coerce.number().min(0).max(30).optional(),
  countriesWorked: z.array(z.string()).optional(),
  profilePhoto: z.any().refine(files => files?.length > 0, "Profile photo is required."),
  passport: z.any().refine(files => files?.length > 0, "Passport is required."),
  fullPhoto: z.any().optional(),
  workVideo: z.any().optional(),
}).refine(data => {
  if (data.gulfExperience === "experienced") {
    return data.yearsInGulf !== undefined && data.yearsInGulf >= 0 && (data.countriesWorked?.length ?? 0) > 0;
  }
  return true;
}, {
  message: "Years in Gulf and countries worked are required for experienced candidates.",
  path: ["yearsInGulf"],
}).refine(data => {
    if (data.profession === 'Other') {
        return data.otherProfession && data.otherProfession.length > 0;
    }
    return true;
}, {
    message: "Please specify your profession.",
    path: ["otherProfession"],
});


const gulfCountries = ["Saudi Arabia", "UAE", "Qatar", "Oman", "Kuwait", "Bahrain"];

const professions = {
    "Driving Jobs": [
        "Light Vehicle Driver (Car / Taxi / Pick-up)",
        "Heavy Vehicle Driver (Truck / Trailer / Bus)",
        "Delivery Driver (Bike / Van)",
        "Personal Driver / Chauffeur",
    ],
    "Domestic & Household Work": [
        "House Helper / Maid",
        "Nanny / Babysitter",
        "Cook / Kitchen Helper",
        "Elderly Caregiver",
        "Cleaner (Home / Office)",
        "Gardener",
    ],
    "General Labor & Helper Jobs": [
        "Construction Laborer",
        "Warehouse Helper / Loader / Packer",
        "Office Boy",
        "Factory Worker / Machine Helper",
        "Supermarket Helper / Shelf Stacker",
        "Painter",
        "Carpenter Assistant",
        "Plumber Helper",
        "Mason / Tile Worker",
        "Electrician Helper",
        "AC Technician Helper",
        "Waiter / Restaurant Helper",
        "Kitchen Staff (Dishwasher, Assistant Cook)",
        "Tea Boy / Coffee Server",
        "Security Guard",
    ],
};

export function JobSeekerProfileForm() {
  const { updateSeekerProfile } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      yourFullName: "",
      profession: "",
      otherProfession: "",
      educationExperience: "",
      religion: "",
      age: 18,
      gulfExperience: undefined,
      yearsInGulf: 0,
      countriesWorked: [],
      profilePhoto: undefined,
      passport: undefined,
      fullPhoto: undefined,
      workVideo: undefined,
    },
  });

  const watchGulfExperience = form.watch("gulfExperience");
  const watchProfession = form.watch("profession");

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
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

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    const desiredJobTitle = values.profession === 'Other' ? values.otherProfession : values.profession;
    
    const profileData: SeekerProfile = {
       basics: {
        desiredJobTitle: desiredJobTitle || "Worker",
        locationPreferences: "Gulf Region",
        experienceYears: values.age - 18, // Placeholder logic
      },
      skills: [desiredJobTitle || ""],
      experience: values.educationExperience?.split('|').map(s => s.trim()) || [],
      education: values.educationExperience?.split('|').map(s => s.trim()) || [],
      preferences: `Religion: ${values.religion}, Age: ${values.age}`,
      resumeUrl: "", // This would come from passport/doc upload in reality
    };
    
    updateSeekerProfile(profileData);
    toast({
      title: t('jobSeeker_profile_toast_saved_title'),
      description: t('jobSeeker_profile_toast_saved_description'),
    });
    router.push('/job-seeker/dashboard');
  };
  
    const calculateProgress = () => {
        const values = form.watch();
        let progress = 0;
        if (values.yourFullName) progress += 10;
        if (values.profession) progress += 15;
        if (values.religion) progress += 10;
        if (values.age) progress += 10;
        if (values.gulfExperience) {
            progress += 5; // Base for selection
            if(values.gulfExperience === 'experienced' && values.yearsInGulf && values.countriesWorked && values.countriesWorked.length > 0) {
                 progress += 10; // Conditional part
            } else if (values.gulfExperience === 'fresher') {
                progress += 10;
            }
        }
        if (values.profilePhoto) progress += 20;
        if (values.passport) progress += 10;
        if (values.fullPhoto) progress += 5;
        if (values.workVideo) progress += 5;
        
        return Math.min(100, progress);
    };
  
  const progress = calculateProgress();

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{t('jobSeeker_profile_title')}</CardTitle>
        <CardDescription>{t('jobSeeker_profile_subtitle')}</CardDescription>
        <div className="flex items-center gap-4 pt-4">
            <Progress value={progress} className="w-full" />
            <span className="font-semibold text-primary">{Math.round(progress)}%</span>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                {/* Row 1 */}
                <FormField control={form.control} name="profilePhoto" render={({ field }) => (
                  <FormItem className="md:col-span-2 flex flex-col items-center">
                    <FormLabel htmlFor="photo-upload" className="cursor-pointer">
                      {t('jobSeeker_profile_photo_label')} <span className="text-primary">*</span>
                       <Avatar className="h-32 w-32 mt-2">
                        <AvatarImage src={photoPreview || undefined} alt="Profile photo preview" />
                        <AvatarFallback className="bg-muted">
                           <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <UploadCloud className="h-8 w-8" />
                            <span>{t('jobSeeker_profile_upload_button')}</span>
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

                {/* Row 2 */}
                <FormField control={form.control} name="yourFullName" render={({ field }) => (
                    <FormItem><FormLabel>{t('jobSeeker_profile_name_label')} <span className="text-primary">*</span></FormLabel><FormControl><Input placeholder={t('jobSeeker_profile_name_placeholder')} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="profession" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('jobSeeker_profile_profession_label')} <span className="text-primary">*</span></FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder={t('jobSeeker_profile_profession_placeholder')} /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(professions).map(([group, options]) => (
                            <SelectGroup key={group}>
                                <FormLabel className="px-2 text-xs text-muted-foreground">{t(group as any)}</FormLabel>
                                {options.map(option => <SelectItem key={option} value={option}>{t(option.replace(/[^a-zA-Z0-9]/g, '') as any, option)}</SelectItem>)}
                            </SelectGroup>
                        ))}
                        <SelectGroup>
                           <SelectItem value="Other">{t('jobSeeker_profile_profession_other')}</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Conditional Other Profession */}
                {watchProfession === 'Other' && (
                    <FormField control={form.control} name="otherProfession" render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('jobSeeker_profile_other_profession_label')} <span className="text-primary">*</span></FormLabel>
                            <FormControl><Input placeholder={t('jobSeeker_profile_other_profession_placeholder')} {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                )}

                <FormField control={form.control} name="religion" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('jobSeeker_profile_religion_label')} <span className="text-primary">*</span></FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder={t('jobSeeker_profile_religion_placeholder')} /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="islam">{t('jobSeeker_profile_religion_islam')}</SelectItem>
                        <SelectItem value="hinduism">{t('jobSeeker_profile_religion_hinduism')}</SelectItem>
                        <SelectItem value="christianity">{t('jobSeeker_profile_religion_christianity')}</SelectItem>
                        <SelectItem value="sikhism">{t('jobSeeker_profile_religion_sikhism')}</SelectItem>
                        <SelectItem value="buddhism">{t('jobSeeker_profile_religion_buddhism')}</SelectItem>
                        <SelectItem value="jainism">{t('jobSeeker_profile_religion_jainism')}</SelectItem>
                        <SelectItem value="other">{t('jobSeeker_profile_religion_other')}</SelectItem>
                        <SelectItem value="prefer_not_to_say">{t('jobSeeker_profile_religion_prefer_not_to_say')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Row 3 */}
                <FormField control={form.control} name="age" render={({ field }) => (
                    <FormItem><FormLabel>{t('jobSeeker_profile_age_label')} <span className="text-primary">*</span></FormLabel><FormControl><Input type="number" placeholder={t('jobSeeker_profile_age_placeholder')} {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="gulfExperience" render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel>{t('jobSeeker_profile_gulf_experience_label')} <span className="text-primary">*</span></FormLabel>
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl><RadioGroupItem value="experienced" /></FormControl>
                                    <FormLabel className="font-normal">{t('jobSeeker_profile_gulf_experience_experienced')}</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl><RadioGroupItem value="fresher" /></FormControl>
                                    <FormLabel className="font-normal">{t('jobSeeker_profile_gulf_experience_fresher')}</FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                {/* Conditional Row */}
                {watchGulfExperience === 'experienced' && (
                    <>
                        <FormField control={form.control} name="yearsInGulf" render={({ field }) => (
                            <FormItem><FormLabel>{t('jobSeeker_profile_years_in_gulf_label')}</FormLabel><FormControl><Input type="number" placeholder={t('jobSeeker_profile_years_in_gulf_placeholder')} {...field} value={field.value || ""} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="countriesWorked" render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('jobSeeker_profile_countries_worked_label')}</FormLabel>
                                <div className="grid grid-cols-2 gap-2">
                                {gulfCountries.map((country) => (
                                    <FormField key={country} control={form.control} name="countriesWorked" render={({ field }) => {
                                        return (
                                            <FormItem key={country} className="flex flex-row items-start space-x-3 space-y-0">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(country)}
                                                        onCheckedChange={(checked) => {
                                                            return checked
                                                                ? field.onChange([...(field.value || []), country])
                                                                : field.onChange(field.value?.filter((value) => value !== country))
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className="text-sm font-normal">{country}</FormLabel>
                                            </FormItem>
                                        )
                                    }}/>
                                ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                         )} />
                    </>
                )}

                {/* Row 4 */}
                 <div className="md:col-span-2">
                    <FormField control={form.control} name="educationExperience" render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('jobSeeker_profile_education_label')}</FormLabel>
                            <FormControl><Textarea rows={3} placeholder={t('jobSeeker_profile_education_placeholder')} {...field} /></FormControl>
                             <CardDescription className="text-xs">{t('jobSeeker_profile_education_helper')}</CardDescription>
                            <FormMessage />
                        </FormItem>
                     )} />
                 </div>
                 
                 {/* Row 5 - File Uploads */}
                 <FormField control={form.control} name="passport" render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t('jobSeeker_profile_passport_label')} <span className="text-primary">*</span></FormLabel>
                        <FormControl>
                            <Input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => field.onChange(e.target.files)} />
                        </FormControl>
                        <CardDescription className="text-xs">{t('jobSeeker_profile_passport_helper')}</CardDescription>
                        <FormMessage />
                    </FormItem>
                 )} />

                 <FormField control={form.control} name="fullPhoto" render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t('jobSeeker_profile_full_photo_label')}</FormLabel>
                        <FormControl>
                            <Input type="file" accept=".jpg,.jpeg,.png" onChange={(e) => field.onChange(e.target.files)} />
                        </FormControl>
                        <CardDescription className="text-xs">{t('jobSeeker_profile_full_photo_helper')}</CardDescription>
                        <FormMessage />
                    </FormItem>
                 )} />
                 
                 <div className="md:col-span-2">
                    <FormField control={form.control} name="workVideo" render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('jobSeeker_profile_work_video_label')}</FormLabel>
                            <FormControl>
                                <Input type="file" accept=".mp4,.mov,.webm" onChange={(e) => field.onChange(e.target.files)} />
                            </FormControl>
                            <CardDescription className="text-xs">{t('jobSeeker_profile_work_video_helper')}</CardDescription>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
            </div>

            <div className="md:col-span-2 text-xs text-muted-foreground">
                {t('jobSeeker_profile_privacy_note_part1')}{' '}
                <Link href="#" target="_blank" className="underline">{t('terms')}</Link> & <Link href="#" target="_blank" className="underline">{t('privacy')}</Link>.
            </div>
            
            <div className="flex gap-4">
                <Button type="submit" size="lg" className="rounded-xl">{t('jobSeeker_profile_save_button')}</Button>
                <Button type="button" variant="outline" size="lg" className="rounded-xl">{t('jobSeeker_profile_draft_button')}</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
