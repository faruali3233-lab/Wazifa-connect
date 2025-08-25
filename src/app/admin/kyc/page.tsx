
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdminKycPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>KYC & Compliance</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Queues for reviewing and approving/rejecting KYC documents for all user roles will be managed from this page.</p>
            </CardContent>
        </Card>
    );
}
