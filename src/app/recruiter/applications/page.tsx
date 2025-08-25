
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function RecruiterApplicationsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Applications Pipeline</CardTitle>
                <CardDescription>Manage all candidates who have applied to your jobs.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center text-muted-foreground py-12">
                    <p>A Kanban board and table view of your application pipeline will be here.</p>
                </div>
            </CardContent>
        </Card>
    );
}
