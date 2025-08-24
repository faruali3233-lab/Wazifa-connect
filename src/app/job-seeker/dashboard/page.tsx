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
import { FileText, Star, BrainCircuit, AlertTriangle } from 'lucide-react';

export default function JobSeekerDashboard() {
  const { user, seekerProfile, isProfileComplete } = useAuth();
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<JobRecommendationsOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only fetch recommendations if the profile is complete
    if (isProfileComplete && seekerProfile) {
      setLoading(true);
      getJobRecommendations({ profile: seekerProfile })
        .then(setRecommendations)
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
        setLoading(false);
    }
  }, [isProfileComplete, seekerProfile]);

  if (!user) {
    // This should be handled by the layout, but as a fallback
    return <div className="container mx-auto p-8"><Skeleton className="h-64 w-full" /></div>;
  }

  // A simple way to calculate a more realistic progress
  const calculateProgress = () => {
    if (!seekerProfile) return 10;
    let score = 0;
    if (seekerProfile.basics.desiredJobTitle) score += 20;
    if (seekerProfile.skills.length > 0) score += 20;
    if (seekerProfile.experience.length > 0) score += 20;
    if (seekerProfile.education.length > 0) score += 20;
    if (seekerProfile.resumeUrl) score += 20; // Using resumeUrl to check for passport/docs
    return score;
  };

  const progress = calculateProgress();

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Welcome, {seekerProfile?.basics.desiredJobTitle.split(' ')[0] || 'Job Seeker'}!</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Recommendations or Profile Completion Prompt */}
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
        </div>

        {/* Sidebar Widgets */}
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
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              <p>Your applied jobs will appear here.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Star /> Saved Jobs</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              <p>Your saved jobs will appear here.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
