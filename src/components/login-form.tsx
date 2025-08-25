
"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth, type UserRole } from "@/hooks/use-auth";
import { useTranslation } from "./i18n-provider";
import Link from "next/link";
import { ALL_COUNTRY_CODES } from "@/lib/constants";

const formSchema = z.object({
  userId: z.string().min(1, "User ID is required."),
  password: z.string().min(1, "Password is required."),
});

// Mock user data for demonstration
const MOCK_USERS: { [key: string]: { password?: string, role: UserRole, phone: string, countryCode: string } } = {
  'jobseeker': { password: 'password', role: 'unselected', phone: '9876543210', countryCode: '+91' },
  'recruiter': { password: 'password', role: 'recruiter', phone: '501234567', countryCode: '+971' },
  'agent': { password: 'password', role: 'agent', phone: '9876543211', countryCode: '+91' },
  'subagent': { password: 'password', role: 'subAgent', phone: '9876543212', countryCode: '+91' },
  'admin': { password: 'password', role: 'admin', phone: '000000000', countryCode: '+1' },
};


export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const user = MOCK_USERS[values.userId.toLowerCase()];

    if (user && user.password === values.password) {
        login({
            id: values.userId,
            phone: user.phone,
            countryCode: user.countryCode,
        }, user.role);
        
        toast({
          title: t('login_toast_success_title'),
          description: t(user.role === 'recruiter' ? 'login_toast_success_description_recruiter' : 'login_toast_success_description_jobSeeker'),
        });

    } else {
        toast({
            variant: "destructive",
            title: t('login_toast_error_invalid_title'),
            description: t('login_toast_error_invalid_description'),
        });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{t('login_welcome')}</CardTitle>
        <CardDescription>{t('login_continue')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('login_userId_label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('login_userId_placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('login_password_label')}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full">
                {t('login_button')}
            </Button>
          </form>
        </Form>
      </CardContent>
       <CardFooter className="flex flex-col gap-4">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              {t('login_register_separator')}
            </span>
          </div>
        </div>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/register">
            {t('login_register_button')}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
