
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAuth, type RecruiterProfile } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadCloud } from "lucide-react";
import { useTranslation } from "./i18n-provider";

const profileSchema = z.object({
  yourName: z.string().min(2, "Your name is required."),
  yourEmail: z.string().email("Please enter a valid email address."),
  yourCountry: z.string().min(1, "Please select your country."),
  yourCity: z.string().min(2, "Your city is required."),
  companyName: z.string().optional(),
  companyWebsite: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
  companyDescription: z.string().optional(),
  profilePhoto: z.any().optional(),
});

export function RecruiterProfileForm() {
  const { updateRecruiterProfile } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      yourName: "",
      yourEmail: "",
      yourCountry: "",
      yourCity: "",
      companyName: "",
      companyWebsite: "",
      companyDescription: "",
      profilePhoto: undefined,
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        form.setValue("profilePhoto", file);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    const profileData: RecruiterProfile = {
      ...values,
      companyName: values.companyName || "",
      companyWebsite: values.companyWebsite || "",
      companyDescription: values.companyDescription || "",
      profilePhotoUrl: photoPreview || "",
    };
    
    updateRecruiterProfile(profileData);
    toast({
      title: t('recruiter_profile_toast_saved_title'),
      description: t('recruiter_profile_toast_saved_description'),
    });
    router.push('/recruiter/dashboard');
  };
  
  const calculateProgress = () => {
    const values = form.watch();
    let progress = 0;
    const totalFields = 4; // required fields
    let filledFields = 0;
    if (values.yourName) filledFields++;
    if (values.yourEmail) filledFields++;
    if (values.yourCountry) filledFields++;
    if (values.yourCity) filledFields++;

    progress = (filledFields / totalFields) * 100;
    
    // Add bonus for optional fields
    if (values.companyName) progress = Math.min(100, progress + 5);
    if (values.companyWebsite) progress = Math.min(100, progress + 5);
    if (values.companyDescription) progress = Math.min(100, progress + 5);
    if (values.profilePhoto) progress = Math.min(100, progress + 10);
    
    return Math.round(progress);
  };
  
  const progress = calculateProgress();

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{t('recruiter_profile_title')}</CardTitle>
        <CardDescription>{t('recruiter_profile_subtitle')}</CardDescription>
        <div className="flex items-center gap-4 pt-4">
            <Progress value={progress} className="w-full" />
            <span className="font-semibold text-primary">{progress}%</span>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            <div className="flex justify-center">
              <FormField control={form.control} name="profilePhoto" render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormLabel htmlFor="photo-upload" className="cursor-pointer">
                      <Avatar className="h-32 w-32">
                        <AvatarImage src={photoPreview || undefined} alt="Profile photo preview" />
                        <AvatarFallback className="bg-muted">
                           <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <UploadCloud className="h-8 w-8" />
                            <span>{t('recruiter_profile_upload_photo')}</span>
                           </div>
                        </AvatarFallback>
                      </Avatar>
                    </FormLabel>
                    <FormControl>
                       <Input id="photo-upload" type="file" className="hidden" accept=".jpg,.png" onChange={handlePhotoChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
              )} />
            </div>
            
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField control={form.control} name="yourName" render={({ field }) => (
                    <FormItem><FormLabel>{t('recruiter_profile_name_label')}</FormLabel><FormControl><Input placeholder={t('recruiter_profile_name_placeholder')} {...field} value={field.value || ''} /></FormControl><FormMessage /></FormItem>
                )} />
                 <FormField control={form.control} name="yourEmail" render={({ field }) => (
                    <FormItem><FormLabel>{t('recruiter_profile_email_label')}</FormLabel><FormControl><Input type="email" placeholder={t('recruiter_profile_email_placeholder')} {...field} value={field.value || ''} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="yourCountry" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('recruiter_profile_country_label')}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || ''} defaultValue="">
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('recruiter_profile_country_placeholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="in">India</SelectItem>
                        <SelectItem value="sa">Saudi Arabia</SelectItem>
                        <SelectItem value="ae">UAE</SelectItem>
                        <SelectItem value="qa">Qatar</SelectItem>
                        <SelectItem value="om">Oman</SelectItem>
                        <SelectItem value="kw">Kuwait</SelectItem>
                        <SelectItem value="bh">Bahrain</SelectItem>
                        <SelectItem value="other">{t('recruiter_profile_country_option_other')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="yourCity" render={({ field }) => (
                    <FormItem><FormLabel>{t('recruiter_profile_city_label')}</FormLabel><FormControl><Input placeholder={t('recruiter_profile_city_placeholder')} {...field} value={field.value || ''} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="companyName" render={({ field }) => (
                    <FormItem><FormLabel>{t('recruiter_profile_company_name_label')}</FormLabel><FormControl><Input placeholder={t('recruiter_profile_company_name_placeholder')} {...field} value={field.value || ''} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="companyWebsite" render={({ field }) => (
                    <FormItem><FormLabel>{t('recruiter_profile_company_website_label')}</FormLabel><FormControl><Input type="url" placeholder={t('recruiter_profile_company_website_placeholder')} {...field} value={field.value || ''} /></FormControl><FormMessage /></FormItem>
                )} />
             </div>
             
             <FormField control={form.control} name="companyDescription" render={({ field }) => (
                <FormItem><FormLabel>{t('recruiter_profile_note_label')}</FormLabel><FormControl><Textarea rows={5} placeholder={t('recruiter_profile_note_placeholder')} {...field} value={field.value || ''} /></FormControl><FormMessage /></FormItem>
             )} />
            
            <Button type="submit" className="w-full md:w-auto">{t('recruiter_profile_save_button')}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
