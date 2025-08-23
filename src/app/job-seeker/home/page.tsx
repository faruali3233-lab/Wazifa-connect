"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function JobSeekerHomePage() {
  const { user, isProfileComplete } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isProfileComplete) {
      router.replace('/job-seeker/dashboard');
    }
  }, [isProfileComplete, router]);

  if (!user) return null;

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Find your next role in India
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Let's get your profile ready to stand out to top recruiters.
        </p>
      </div>

      <div className="mt-12 max-w-xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Profile Status</CardTitle>
            <CardDescription>
              {isProfileComplete 
                ? "Your profile is complete. You can now access your dashboard." 
                : "Complete your profile to unlock your dashboard and get job recommendations."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Progress value={isProfileComplete ? 100 : 20} className="w-full" />
              <span className="font-semibold text-primary">{isProfileComplete ? '100%' : '20%'}</span>
            </div>
            
            {isProfileComplete ? (
              <Button onClick={() => router.push('/job-seeker/dashboard')} className="w-full">
                Go to Dashboard <CheckCircle className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={() => router.push('/job-seeker/profile')} className="w-full">
                Complete Your Profile <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
