
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { useEffect } from "react";

const kycVariant = (status: string | undefined) => {
    switch (status) {
        case "approved": return "default";
        case "pending": return "secondary";
        case "rejected": return "destructive";
        default: return "outline";
    }
}

const kycIcon = (status: string | undefined) => {
    switch (status) {
        case "approved": return <CheckCircle className="h-16 w-16 text-green-500" />;
        case "pending": return <Clock className="h-16 w-16 text-yellow-500" />;
        case "rejected": return <AlertCircle className="h-16 w-16 text-destructive" />;
        default: return <Clock className="h-16 w-16 text-muted-foreground" />;
    }
}

export default function JobSeekerReviewPage() {
    const { seekerProfile, isProfileComplete } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (seekerProfile?.kycStatus === 'approved') {
            const timer = setTimeout(() => {
                router.push('/job-seeker/dashboard');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [seekerProfile, router]);


    if (!isProfileComplete || !seekerProfile) {
        return (
             <div className="container mx-auto py-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <Card className="w-full max-w-lg text-center p-8">
                     <Skeleton className="h-16 w-16 rounded-full mx-auto mb-6" />
                     <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
                     <Skeleton className="h-4 w-full mx-auto mb-6" />
                     <Skeleton className="h-10 w-32 mx-auto" />
                </Card>
            </div>
        );
    }

    const { kycStatus, aadhaarLast4, kycSubmissionDate, kycRejectionReason } = seekerProfile;

    const titles: Record<string, string> = {
        pending: "Profile Under Review",
        approved: "Verification Complete!",
        rejected: "Verification Rejected",
    }

     const descriptions: Record<string, string> = {
        pending: "We're verifying your identity and documents. Verification typically completes within 24–48 hours. You’ll get a notification once approved.",
        approved: "Your dashboard is now unlocked. You will be redirected shortly.",
        rejected: `Reason: ${kycRejectionReason || 'Please review your uploaded documents and details.'} Please update your profile and resubmit.`,
    }

    return (
        <div className="container mx-auto py-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <Card className="w-full max-w-lg text-center p-8">
                <CardHeader className="items-center">
                    <div className="mb-6">{kycIcon(kycStatus)}</div>
                    <CardTitle className="text-3xl">{titles[kycStatus || 'pending']}</CardTitle>
                    <CardDescription className="text-base mt-2">
                        {descriptions[kycStatus || 'pending']}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-sm text-muted-foreground space-y-2">
                        <p>Aadhaar Number ending in: <span className="font-mono text-foreground">{aadhaarLast4}</span></p>
                        <p>Submitted On: <span className="font-semibold text-foreground">{kycSubmissionDate ? format(new Date(kycSubmissionDate), "PPPp") : 'N/A'}</span></p>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                     <Badge variant={kycVariant(kycStatus)} className="text-lg px-4 py-1">{kycStatus?.toUpperCase()}</Badge>
                     <Button onClick={() => router.push('/job-seeker/profile')}>
                        {kycStatus === 'rejected' ? 'Fix & Resubmit' : 'Edit Profile'}
                     </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
