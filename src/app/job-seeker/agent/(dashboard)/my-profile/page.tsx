
"use client";

import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import CopyButton from "@/components/copy-button";
import { format } from 'date-fns';

const InfoRow = ({ label, value }: { label: string, value: React.ReactNode }) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className="text-sm text-foreground">{value || "N/A"}</div>
    </div>
);

export default function AgentMyProfilePage() {
    const { agentProfile } = useAuth();
    const router = useRouter();

    if (!agentProfile) {
        return (
            <div className="space-y-6">
                <Card><CardHeader><Skeleton className="h-8 w-1/2" /></CardHeader><CardContent><Skeleton className="h-48 w-full" /></CardContent></Card>
                <Card><CardHeader><Skeleton className="h-8 w-1/2" /></CardHeader><CardContent><Skeleton className="h-32 w-full" /></CardContent></Card>
            </div>
        );
    }
    
    const agentId = "AG-48291357";
    const subAgentReferralCode = "REF-AG4829-Xy2Z";

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>My Profile</CardTitle>
                        <CardDescription>This is your verified information and unique identifiers.</CardDescription>
                    </div>
                    <Button onClick={() => router.push('/job-seeker/agent/profile')}>Edit Profile</Button>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1 flex flex-col items-center text-center">
                        <Avatar className="h-32 w-32 mb-4">
                            <AvatarImage src={agentProfile.profilePhotoUrl} />
                            <AvatarFallback>{agentProfile.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h2 className="text-xl font-bold">{agentProfile.name}</h2>
                        <p className="text-muted-foreground">{agentProfile.email}</p>
                        <Badge variant="default" className="mt-2 text-base bg-green-100 text-green-800">
                            KYC: Verified
                        </Badge>
                    </div>
                    <div className="md:col-span-2">
                        <h3 className="font-semibold text-lg mb-2 border-b pb-2">Identity & Business Information</h3>
                        <InfoRow label="Full Name" value={agentProfile.fullName} />
                        <InfoRow label="Email Address" value={agentProfile.email} />
                        <InfoRow label="Phone Number" value={`${agentProfile.countryCode} ${agentProfile.phone}`} />
                        <InfoRow label="Agency Name" value={agentProfile.agencyName} />
                        <InfoRow label="Agency Address" value={agentProfile.agencyAddress} />
                        <InfoRow label="License Number" value={agentProfile.licenseNumber || "Not Provided"} />
                        <InfoRow label="GST Number" value={agentProfile.gstNumber || "Not Provided"} />
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader><CardTitle>Unique Identifiers</CardTitle></CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b">
                        <p className="text-sm font-medium text-muted-foreground">Agent Unique ID</p>
                        <div className="flex items-center gap-2">
                           <Badge variant="outline">{agentId}</Badge>
                           <CopyButton textToCopy={agentId} />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3">
                        <p className="text-sm font-medium text-muted-foreground">Sub-Agent Referral Code</p>
                        <div className="flex items-center gap-2">
                           <Badge variant="outline">{subAgentReferralCode}</Badge>
                           <CopyButton textToCopy={subAgentReferralCode} />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

