
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AgentSubmissionsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Submissions / Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
                <p>A Kanban board view of your candidate submission pipeline (Submitted, Shortlisted, Hired, etc.) will be available here.</p>
            </CardContent>
        </Card>
    );
}
