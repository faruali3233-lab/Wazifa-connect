
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function RecruiterReportsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>Analyze your hiring funnel and agent performance.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center text-muted-foreground py-12">
                    <p>Your custom reports and analytics dashboards will be here.</p>
                </div>
            </CardContent>
        </Card>
    );
}
