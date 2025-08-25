
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdminPaymentsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Payments</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Queues for payment receipt verification and financial reporting will be managed from this page.</p>
            </CardContent>
        </Card>
    );
}
