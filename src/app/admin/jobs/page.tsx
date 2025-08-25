
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdminJobsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Jobs Moderation</CardTitle>
            </CardHeader>
            <CardContent>
                <p>A list of job postings for approval, pausing, or editing will be managed here.</p>
            </CardContent>
        </Card>
    );
}
