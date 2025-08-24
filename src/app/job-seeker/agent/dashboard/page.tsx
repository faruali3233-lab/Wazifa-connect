
"use client";

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Briefcase, Users, UserCheck, ShieldCheck } from 'lucide-react';
import { RecruiterJobs } from '@/components/recruiter-jobs';
import { AgentSubmissions } from '@/components/agent-submissions';


export default function AgentDashboard() {
  const { agentProfile } = useAuth();
  const router = useRouter();

  const calculateProgress = () => {
    if (!agentProfile) return 10;
    let score = 0;
    if (agentProfile.fullName) score += 10;
    if (agentProfile.profilePhotoUrl) score += 10;
    if (agentProfile.officeAddress) score += 10;
    if (agentProfile.licenseNumber) score += 10;
    if (agentProfile.agencyType) score += 10;
    if (agentProfile.yearsOfExperience) score += 10;
    if (agentProfile.regions?.length > 0) score += 10;
    if (agentProfile.governmentIdUrl) score += 10;
    if (agentProfile.agencyType === 'company' && agentProfile.businessLicenseUrl) score += 10;
    if (agentProfile.terms) score += 10;
    return Math.min(100, score);
  };
  
  const progress = calculateProgress();


  return (
    <div className="space-y-6">
       
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Candidates</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">58</div>
            <p className="text-xs text-muted-foreground">Managed by you and your sub-agents</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Open Jobs</CardTitle>
            <Briefcase className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
             <p className="text-xs text-muted-foreground">Requirements from recruiters</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Candidates Submitted</CardTitle>
            <UserCheck className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">+5 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Hired (Last 30d)</CardTitle>
            <ShieldCheck className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Successful placements</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <RecruiterJobs />
            <AgentSubmissions />
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
               <Avatar className="h-16 w-16">
                  <AvatarImage src={agentProfile?.profilePhotoUrl} />
                  <AvatarFallback>{agentProfile?.name?.charAt(0) || 'A'}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{agentProfile?.name}</CardTitle>
                <CardDescription>
                  <span className="font-semibold text-green-600">Verified Agent</span>
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Progress value={progress} className="w-full" />
                <span className="font-bold text-primary">{progress}%</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {progress === 100 
                  ? "Your profile is complete." 
                  : "Complete your profile to build more trust."}
              </p>
              <Button variant="outline" className="w-full" onClick={() => router.push('/job-seeker/agent/profile')}>
                {progress === 100 ? 'Edit Profile' : 'Complete Profile'}
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">Payments & Compliance</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              <p>Payment receipts uploaded by your sub-agents will appear here for verification.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
