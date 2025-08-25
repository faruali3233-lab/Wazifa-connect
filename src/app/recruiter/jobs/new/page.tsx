
"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

const jobSchema = z.object({
  title: z.string().min(5, "Job title must be at least 5 characters."),
  role: z.string().min(1, "Please select a role category."),
  city: z.string().min(2, "City is required."),
  country: z.string().default("KSA"),
  salaryMin: z.coerce.number().min(0, "Minimum salary must be positive."),
  salaryMax: z.coerce.number().min(0, "Maximum salary must be positive."),
  salaryCurrency: z.string().default("SAR"),
  shift: z.enum(["Day", "Night", "Rotational"]),
  quota: z.coerce.number().int().min(1, "Quota must be at least 1."),
  requirements: z.string().min(20, "Please provide detailed requirements."),
  benefits: z.array(z.string()),
  responsibilities: z.array(z.object({ value: z.string() })).optional(),
});

const benefitOptions = ["Visa", "Accommodation", "Transport", "Food", "Overtime"];
const roleCategories = ["Driver", "Construction", "Domestic Worker", "Hospitality", "Technician"];

export default function PostNewJobPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      role: "",
      city: "",
      salaryMin: 0,
      salaryMax: 0,
      shift: "Day",
      quota: 1,
      requirements: "",
      benefits: [],
      responsibilities: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "responsibilities",
  });

  const onSubmit = (values: z.infer<typeof jobSchema>) => {
    console.log(values);
    toast({
      title: "Job Posted Successfully!",
      description: `The job "${values.title}" is now live and visible to agents.`,
    });
    router.push('/recruiter/jobs');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Provide the essential details for your job opening.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem><FormLabel>Job Title</FormLabel><FormControl><Input placeholder="e.g., Heavy Duty Driver" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="role" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select a role category" /></SelectTrigger></FormControl>
                      <SelectContent>{roleCategories.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
              )} />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="e.g., Riyadh" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="quota" render={({ field }) => (
                    <FormItem><FormLabel>Hiring Quota</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormDescription>How many candidates do you need?</FormDescription><FormMessage /></FormItem>
                )} />
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Salary & Shift</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <FormField control={form.control} name="salaryMin" render={({ field }) => (
                        <FormItem><FormLabel>Minimum Salary</FormLabel><FormControl><Input type="number" placeholder="3000" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="salaryMax" render={({ field }) => (
                        <FormItem><FormLabel>Maximum Salary</FormLabel><FormControl><Input type="number" placeholder="4500" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="salaryCurrency" render={({ field }) => (
                         <FormItem>
                            <FormLabel>Currency</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="SAR">SAR</SelectItem>
                                    <SelectItem value="AED">AED</SelectItem>
                                    <SelectItem value="QAR">QAR</SelectItem>
                                </SelectContent>
                            </Select>
                             <FormMessage />
                         </FormItem>
                     )} />
                 </div>
                 <FormField control={form.control} name="shift" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Work Shift</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="Day">Day Shift</SelectItem>
                                <SelectItem value="Night">Night Shift</SelectItem>
                                <SelectItem value="Rotational">Rotational</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />
            </CardContent>
        </Card>

         <Card>
            <CardHeader>
                <CardTitle>Details & Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <FormField control={form.control} name="requirements" render={({ field }) => (
                    <FormItem><FormLabel>Requirements</FormLabel><FormControl><Textarea rows={5} placeholder="Describe the ideal candidate's experience, skills, and qualifications." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                 <FormField
                    control={form.control}
                    name="responsibilities"
                    render={() => (
                    <FormItem>
                        <FormLabel>Key Responsibilities (Optional)</FormLabel>
                        {fields.map((field, index) => (
                        <FormField
                            key={field.id}
                            control={form.control}
                            name={`responsibilities.${index}.value`}
                            render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                <div className="flex items-center gap-2">
                                    <Input {...field} placeholder={`Responsibility #${index + 1}`} />
                                    <Button type="button" variant="outline" size="icon" onClick={() => remove(index)}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={() => append({ value: "" })}>
                            Add Responsibility
                        </Button>
                    </FormItem>
                    )}
                />
                 <FormField control={form.control} name="benefits" render={() => (
                    <FormItem>
                        <FormLabel>Benefits</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {benefitOptions.map(item => (
                            <FormField
                            key={item}
                            control={form.control}
                            name="benefits"
                            render={({ field }) => (
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                    <Checkbox
                                    checked={field.value?.includes(item)}
                                    onCheckedChange={checked => {
                                        return checked
                                        ? field.onChange([...field.value, item])
                                        : field.onChange(field.value?.filter(value => value !== item))
                                    }}
                                    />
                                </FormControl>
                                <FormLabel className="font-normal">{item}</FormLabel>
                                </FormItem>
                            )}
                            />
                        ))}
                        </div>
                        <FormMessage />
                    </FormItem>
                )} />
            </CardContent>
         </Card>
        
        <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit">Post Job</Button>
        </div>
      </form>
    </Form>
  );
}
