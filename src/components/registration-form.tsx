
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from 'next/link';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth, type UserRole } from "@/hooks/use-auth";
import { ALL_COUNTRY_CODES } from "@/lib/constants";
import { useTranslation } from "./i18n-provider";

const formSchema = z.object({
  userId: z.string().min(3, "User ID must be at least 3 characters."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  countryCode: z.string().nonempty("Country code is required."),
  phone: z.string().min(5, "Phone number is too short.").max(15, "Phone number is too long."),
  otp: z.string().length(6, "OTP must be 6 digits."),
});

export function RegistrationForm() {
  const router = useRouter();
  const { login } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [otpSent, setOtpSent] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      password: "",
      countryCode: "+91",
      phone: "",
      otp: "",
    },
  });

  const handleRequestOtp = async () => {
    const phoneValid = await form.trigger(["countryCode", "phone"]);
    if (!phoneValid) return;

    setOtpSent(true);
    toast({
      title: t('login_toast_otpSent_title'),
      description: t('login_toast_otpSent_description'),
    });
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const selectedCountry = ALL_COUNTRY_CODES.find(c => c.value === values.countryCode);
    if (!selectedCountry) return;

    const initialRole: UserRole = selectedCountry.role === 'recruiter' ? 'recruiter' : 'unselected';

    login({
        id: values.userId,
        phone: values.phone,
        countryCode: values.countryCode,
    }, initialRole);
    
    toast({
      title: t('register_toast_success_title'),
      description: t('register_toast_success_description'),
    });
    
    // Redirect to the appropriate starting page
    const homePath = selectedCountry.role === "jobSeeker" ? "/job-seeker/home" : "/recruiter/welcome";
    router.push(homePath);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{t('register_title')}</CardTitle>
        <CardDescription>{t('register_subtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem><FormLabel>{t('register_userId_label')}</FormLabel><FormControl><Input placeholder={t('register_userId_placeholder')} {...field} /></FormControl><FormMessage /></FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem><FormLabel>{t('register_password_label')}</FormLabel><FormControl><Input type="password" placeholder="********" {...field} /></FormControl><FormMessage /></FormItem>
                )}
            />
            
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="countryCode"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>{t('login_countryCode')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder={t('login_countryCode')} /></SelectTrigger></FormControl>
                      <SelectContent>{ALL_COUNTRY_CODES.map(country => (<SelectItem key={country.value} value={country.value}>{country.label}</SelectItem>))}</SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>{t('login_phone')}</FormLabel>
                    <FormControl><Input placeholder="9876543210" {...field} /></FormControl>
                  </FormItem>
                )}
              />
            </div>
             <CardDescription className="text-xs px-1">{t('login_role_route_info')}</CardDescription>

            {otpSent && (
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('login_otp')}</FormLabel>
                    <FormControl><Input placeholder="_ _ _ _ _ _" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            {!otpSent ? (
                <Button type="button" onClick={handleRequestOtp} className="w-full">
                    {t('login_requestOtp')}
                </Button>
            ) : (
                <Button type="submit" className="w-full">
                    {t('register_button')}
                </Button>
            )}
          </form>
        </Form>
      </CardContent>
       <CardFooter className="flex-col gap-2 text-center">
            <p className="text-sm text-muted-foreground">
                {t('register_login_prompt')} <Link href="/" className="underline text-primary">{t('register_login_link')}</Link>
            </p>
      </CardFooter>
    </Card>
  );
}
