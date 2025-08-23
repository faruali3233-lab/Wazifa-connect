"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { getJobRecommendations, type JobRecommendationsOutput } from '@/ai/flows/job-recommendations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { JobCard } from '@/components/job-card';
import { FileText, Star, BrainCircuit } from 'lucide-react';

export default function JobSeekerDashboard() {
  const { user, seekerProfile, isProfileComplete } = useAuth();
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<JobRecommendationsOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isProfileComplete) {
      router.replace('/job-seeker/home');
    } else if (seekerProfile) {
      getJobRecommendations({ profile: seekerProfile })
        .then(setRecommendations)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [isProfileComplete, seekerProfile, router]);

  if (!isProfileComplete || !user) {
    return <div className="container mx-auto p-8"><Skeleton className="h-64 w-full" /></div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Welcome, {seekerProfile?.basics.desiredJobTitle.split(' ')[0]}!</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Recommendations */}
        <div className="lg:col-span-2 space-y-8">
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
                <p>No recommendations found at the moment.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Profile Completeness</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={100} />
              <p className="text-sm text-muted-foreground">Your profile is ready to be seen by recruiters!</p>
              <Button variant="outline" className="w-full" onClick={() => router.push('/job-seeker/profile')}>Edit Profile</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FileText /> Application Status</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">You haven't applied to any jobs yet.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Star /> Saved Jobs</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">Your saved jobs will appear here.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
