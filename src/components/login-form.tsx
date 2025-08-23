"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth, type UserRole } from "@/hooks/use-auth";
import { ALL_COUNTRY_CODES, GULF_CODES } from "@/lib/constants";

const formSchema = z.object({
  countryCode: z.string().nonempty("Country code is required."),
  phone: z.string().min(5, "Phone number is too short.").max(15, "Phone number is too long."),
  otp: z.string().length(6, "OTP must be 6 digits."),
});

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const { toast } = useToast();
  const [otpSent, setOtpSent] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      countryCode: "+91",
      phone: "",
      otp: "",
    },
  });

  const handleRequestOtp = () => {
    // In a real app, you'd call an API here.
    setOtpSent(true);
    toast({
      title: "OTP Sent",
      description: "An OTP has been sent to your phone number.",
    });
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const selectedCountry = ALL_COUNTRY_CODES.find(c => c.value === values.countryCode);

    if (!selectedCountry) {
        toast({
            variant: "destructive",
            title: "Unsupported Region",
            description: "Currently supporting India (+91) and Gulf region phone codes.",
        });
        return;
    }

    const role: UserRole = selectedCountry.role;
    
    login({
        phone: values.phone,
        countryCode: values.countryCode,
        role,
    });
    
    toast({
      title: "Login Successful",
      description: `Welcome! You are being redirected as a ${role === 'jobSeeker' ? 'Job Seeker' : 'Recruiter'}.`,
    });

    if (role === "jobSeeker") {
      router.push("/job-seeker/home");
    } else if (role === "recruiter") {
      router.push("/recruiter/home");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome to GulfHired</CardTitle>
        <CardDescription>Enter your phone number to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="countryCode"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>Code</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Code" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ALL_COUNTRY_CODES.map(country => (
                            <SelectItem key={country.value} value={country.value}>{country.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="9876543210" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {otpSent && (
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OTP</FormLabel>
                    <FormControl>
                      <Input placeholder="_ _ _ _ _ _" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            {!otpSent ? (
                <Button type="button" onClick={handleRequestOtp} className="w-full">
                    Request OTP
                </Button>
            ) : (
                <Button type="submit" className="w-full">
                    Verify & Continue
                </Button>
            )}

            <p className="px-2 text-center text-sm text-muted-foreground">
              You’ll be routed to Job Seeker (India) or Recruiter (Gulf) automatically.
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
