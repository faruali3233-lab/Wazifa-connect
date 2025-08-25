
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdminSettingsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Platform-wide policies, SLA configurations, and content templates will be managed here.</p>
            </CardContent>
        </Card>
    );
}
