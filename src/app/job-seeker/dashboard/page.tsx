
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { getJobRecommendations, type JobRecommendationsOutput } from '@/ai/flows/job-recommendations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { JobCard } from '@/components/job-card';
import { FileText, Star, BrainCircuit, AlertTriangle, Briefcase, BarChart3, UserCheck, Mail } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

const chartData = [
  { stage: "Applied", value: 12, fill: "var(--color-applied)" },
  { stage: "Viewed", value: 8, fill: "var(--color-viewed)" },
  { stage: "Interview", value: 4, fill: "var(--color-interview)" },
  { stage: "Offer", value: 1, fill: "var(--color-offer)" },
];

const chartConfig = {
  value: {
    label: "Applications",
  },
  applied: {
    label: "Applied",
    color: "hsl(var(--chart-1))",
  },
  viewed: {
    label: "Viewed",
    color: "hsl(var(--chart-2))",
  },
  interview: {
    label: "Interview",
    color: "hsl(var(--chart-3))",
  },
  offer: {
    label: "Offer",
    color: "hsl(var(--chart-4))",
  },
} satisfies import("@/components/ui/chart").ChartConfig


export default function JobSeekerDashboard() {
  const { user, seekerProfile, isProfileComplete } = useAuth();
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<JobRecommendationsOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user === null) {
      router.replace('/');
      return;
    }
    if (isProfileComplete && seekerProfile) {
      setLoading(true);
      getJobRecommendations({ profile: seekerProfile })
        .then(setRecommendations)
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
        setLoading(false);
    }
  }, [isProfileComplete, seekerProfile, user, router]);

  const calculateProgress = () => {
    if (!seekerProfile) return 10;
    let score = 0;
    if (seekerProfile.basics.desiredJobTitle) score += 20;
    if (seekerProfile.skills.length > 0) score += 20;
    if (seekerProfile.experience.length > 0) score += 20;
    if (seekerProfile.education.length > 0) score += 20;
    if (seekerProfile.resumeUrl) score += 20;
    return score;
  };

  const progress = calculateProgress();

  if (loading) {
    return <div className="container mx-auto p-8"><Skeleton className="h-screen w-full" /></div>;
  }
  
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Welcome, {seekerProfile?.basics.name.split(' ')[0] || 'Job Seeker'}!</h1>
      
       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Interviews Scheduled</CardTitle>
            <UserCheck className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">+1 since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Applications Sent</CardTitle>
            <Briefcase className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
             <p className="text-xs text-muted-foreground">3 submitted this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Viewed by 5 recruiters</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <Mail className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">From a recruiter in UAE</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {isProfileComplete ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BrainCircuit /> AI-Powered Job Recommendations</CardTitle>
                <CardDescription>Jobs matched to your profile and preferences.</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                  </div>
                ) : recommendations && recommendations.recommendations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recommendations.recommendations.map((job, index) => (
                      <JobCard key={index} job={job} />
                    ))}
                  </div>
                ) : (
                  <p>No recommendations found at the moment. Try updating your profile with more details.</p>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="border-primary border-2">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                        <AlertTriangle /> Complete Your Profile to Get Job Matches
                    </CardTitle>
                    <CardDescription>
                        Your profile is only {progress}% complete. Recruiters are looking for candidates with complete profiles. Finish yours to start receiving job recommendations.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button size="lg" onClick={() => router.push('/job-seeker/profile')}>
                        Go to Profile
                    </Button>
                </CardContent>
            </Card>
          )}
           <Card>
            <CardHeader>
              <CardTitle>Vacancy Stats</CardTitle>
              <CardDescription>Your application funnel for the last 30 days.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="stage" tickLine={false} tickMargin={10} axisLine={false} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter>
                 <p className="text-xs text-muted-foreground">Your shortlist rate is higher than average.</p>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Profile Completeness</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Progress value={progress} className="w-full" />
                <span className="font-bold text-primary">{progress}%</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {progress === 100 
                  ? "Your profile is ready to be seen by recruiters!" 
                  : "Complete your profile to increase your visibility."}
              </p>
              <Button variant="outline" className="w-full" onClick={() => router.push('/job-seeker/profile')}>
                {progress === 100 ? 'Edit Profile' : 'Complete Profile'}
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FileText /> Application Status</CardTitle>
            </Header>
            <CardContent className="text-center text-muted-foreground">
              <p>Your applied jobs will appear here.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

    