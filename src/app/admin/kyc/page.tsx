
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { UserDirectory } from "@/components/user-directory";

export default function KycCompliancePage() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Job Seeker KYC Queue</CardTitle>
                    <CardDescription>Review and process pending Aadhaar verifications for job seekers.</CardDescription>
                </CardHeader>
                <CardContent>
                    <UserDirectory showKycQueue={true} />
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Agent & Recruiter Verification</CardTitle>
                    <CardDescription>View and manage verification status for agents and recruiters.</CardDescription>
                </CardHeader>
                <CardContent>
                     <p className="text-sm text-muted-foreground">Agent and recruiter verification management will be available here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
