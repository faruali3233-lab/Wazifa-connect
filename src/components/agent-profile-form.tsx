
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "./ui/use-toast";

const agentProfileSchema = z.object({
  name: z.string().min(2, "Name is required."),
  // Add more fields as needed for the agent's profile
});

export function AgentProfileForm() {
  const { updateAgentProfile } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof agentProfileSchema>>({
    resolver: zodResolver(agentProfileSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof agentProfileSchema>) => {
    updateAgentProfile(values);
    toast({
      title: "Agent Profile Saved!",
      description: "You can now access your agent dashboard.",
    });
    router.push('/job-seeker/agent-dashboard');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Agent Profile</CardTitle>
        <CardDescription>Provide your details to get started as an Agent.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Add more form fields here */}
            <Button type="submit">Save and Continue</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
