
"use client";

import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import CopyButton from "@/components/copy-button";

const InfoRow = ({ label, value }: { label: string, value: React.ReactNode }) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className="text-sm text-foreground">{value || "N/A"}</div>
    </div>
);

const kycVariant = (status: string | undefined) => {
    switch (status) {
        case "Verified": return "default";
        case "Pending": return "secondary";
        case "Rejected": return "destructive";
        default: return "outline";
    }
}

export default function MyProfilePage() {
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
    
    // Mocked data as it's not in the profile form yet
    const agentUniqueId = "AG-48291357";
    const subAgentReferralCode = "REF-AG4829-Xy2Z";

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>My Profile</CardTitle>
                        <CardDescription>This is your verified agent information and referral codes.</CardDescription>
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
                        <Badge variant={kycVariant(agentProfile.kycStatus)} className="mt-2 text-base">
                            KYC: {agentProfile.kycStatus}
                        </Badge>
                    </div>
                    <div className="md:col-span-2">
                        <h3 className="font-semibold text-lg mb-2 border-b pb-2">Identity Information</h3>
                        <InfoRow label="Full Name" value={agentProfile.fullName} />
                        <InfoRow label="Email Address" value={agentProfile.email} />
                        <InfoRow label="Phone Number" value={`${agentProfile.countryCode} ${agentProfile.phone}`} />
                        <InfoRow label="Date of Birth / Incorporation" value={agentProfile.dob ? format(agentProfile.dob, "PPP") : "N/A"} />
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><CardTitle>Business / Agency Info</CardTitle></CardHeader>
                    <CardContent>
                        <InfoRow label="Agency Type" value={agentProfile.agencyType} />
                        <InfoRow label="Office Address" value={agentProfile.officeAddress} />
                        <InfoRow label="License Number" value={agentProfile.licenseNumber} />
                        <InfoRow label="Years of Experience" value={agentProfile.yearsOfExperience} />
                        <InfoRow label="Regions of Operation" value={agentProfile.regions.join(', ')} />
                        <InfoRow label="Languages Spoken" value={agentProfile.languages?.join(', ') || "N/A"} />
                        <InfoRow label="Candidate Pool Size" value={agentProfile.candidatePoolSize} />
                         <InfoRow label="GST/VAT Number" value={agentProfile.gstNumber} />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle>Unique Identifiers</CardTitle></CardHeader>
                    <CardContent>
                        <InfoRow label="Agent Unique ID" value={<Badge variant="outline">{agentUniqueId}</Badge>} />
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b">
                            <p className="text-sm font-medium text-muted-foreground">Sub Agent Referral Code</p>
                            <div className="flex items-center gap-2">
                               <Badge variant="outline">{subAgentReferralCode}</Badge>
                               <CopyButton textToCopy={subAgentReferralCode} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
