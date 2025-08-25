
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { getJobRecommendations, type JobRecommendationsOutput } from '@/ai/flows/job-recommendations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { JobCard } from '@/components/job-card';
import { FileText, Star, BrainCircuit, AlertTriangle, Briefcase, BarChart3, UserCheck, Mail, HandCoins, UserRoundCheck, ListTodo, MessageSquare, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const mockApplications = [
    { id: 1, jobTitle: "Heavy Duty Driver", company: "Al-Futtaim Logistics", stage: "Wakala" },
    { id: 2, jobTitle: "Construction Painter", company: "Emaar Properties", stage: "Medical" },
    { id: 3, jobTitle: "Household Cook", company: "Private Villa", stage: "Interested" },
];

const mockActionItems = [
    { id: 1, title: "Pay ₹200 interest fee for 'Household Cook'", description: "The recruiter is interested. Pay this non-refundable fee to proceed to the medical stage.", cta: "Pay Now", href: "/job-seeker/payments", status: 'required' },
    { id: 2, title: "Complete Medical Exam for 'Construction Painter'", description: "Due in 18 days.", cta: "Upload Report", href: "/job-seeker/documents", status: 'required' },
     { id: 3, title: "Wakala received for 'Heavy Duty Driver'", description: "Your Wakala has been uploaded by the recruiter. You can now proceed with Phase-1 payment.", cta: "Review & Pay", href: "/job-seeker/payments", status: 'info' },
];

const mockMessages = [
    { from: "Admin", message: "Platform update: new document upload features...", unread: false },
    { from: "Recruiter Request", message: "For 'Heavy Duty Driver': Please provide a copy of your previous visa...", unread: true, status: 'approved' },
    { from: "Agent Support", message: "Hi Ravi, I've received your documents, looks good.", unread: false }
]

export default function JobSeekerDashboard() {
  const { user, seekerProfile, isProfileComplete } = useAuth();
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<JobRecommendationsOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.id === 'jobseeker' && !seekerProfile) {
        const mockProfile = {
            basics: { name: 'Ravi Kumar', desiredJobTitle: 'Heavy Duty Driver', locationPreferences: 'Dubai', experienceYears: 5 },
            skills: ['Driving', 'Logistics'],
            experience: ['5 years as truck driver'],
            education: ['High School Diploma'],
            preferences: 'Likes working day shifts',
            resumeUrl: 'placeholder.pdf',
        };
        // @ts-ignore
        updateSeekerProfile(mockProfile);
    }
  }, [user]);

  useEffect(() => {
    setLoading(true);
    if (isProfileComplete && seekerProfile) {
      getJobRecommendations({ profile: seekerProfile })
        .then(setRecommendations)
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [isProfileComplete, seekerProfile, user, router]);

  const KpiCard = ({ title, value, icon, href }: { title: string, value: string, icon: React.ReactNode, href: string }) => (
      <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push(href)}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <div className="text-muted-foreground">{icon}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{value}</div>
          </CardContent>
        </Card>
  );

  return (
    <div className="space-y-8">
       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            <KpiCard title="Interested by Recruiters" value="1" icon={<UserRoundCheck />} href="/job-seeker/applications?filter=Interested" />
            <KpiCard title="Applications Sent" value="3" icon={<Briefcase />} href="/job-seeker/applications" />
            <KpiCard title="Interviews Scheduled" value="0" icon={<UserCheck />} href="/job-seeker/applications?filter=Interview" />
            <KpiCard title="Unread Messages" value="1" icon={<Mail />} href="/job-seeker/messages" />
            <KpiCard title="Payments Due" value="2" icon={<HandCoins />} href="/job-seeker/payments" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><ListTodo /> Action Center</CardTitle>
                <CardDescription>Your next steps to get hired. Complete these tasks to move forward.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                 {mockActionItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border bg-amber-50 border-amber-200">
                        <div>
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <Button onClick={() => router.push(item.href)}>{item.cta}</Button>
                    </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BrainCircuit /> AI-Powered Job Recommendations</CardTitle>
                <CardDescription>Jobs matched to your profile. <Button variant="link" className="p-0 h-auto" onClick={() => router.push('/job-seeker/profile')}>Update preferences</Button> for better results.</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                  </div>
                ) : recommendations && recommendations.recommendations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recommendations.recommendations.slice(0, 2).map((job, index) => (
                      <JobCard key={index} job={job} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No recommendations found at the moment.</p>
                  </div>
                )}
              </CardContent>
            </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">My Applications <Button variant="link" size="sm" className="p-0" onClick={() => router.push('/job-seeker/applications')}>View all</Button></CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {mockApplications.map(app => (
                    <div key={app.id} className="flex items-center gap-3 p-2 border rounded-md">
                        <div className="flex-1">
                            <p className="font-medium text-sm">{app.jobTitle}</p>
                            <p className="text-xs text-muted-foreground">{app.company}</p>
                        </div>
                        <Badge variant="secondary">{app.stage}</Badge>
                    </div>
                ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">Messages <Button variant="link" size="sm" className="p-0" onClick={() => router.push('/job-seeker/messages')}>View all</Button></CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockMessages.map((msg, i) => (
                 <div key={i} className="flex items-start gap-3 p-2 border-b last:border-0">
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                             <p className="font-medium text-sm">{msg.from}</p>
                             {msg.unread && <Badge variant="destructive" className="h-2 w-2 p-0 rounded-full" />}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{msg.message}</p>
                    </div>
                 </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
