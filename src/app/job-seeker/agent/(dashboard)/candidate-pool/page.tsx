
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AgentCandidatePoolPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Candidate Pool</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Your managed candidates will be listed here. You will be able to filter, view profiles, and submit them to jobs.</p>
            </CardContent>
        </Card>
    );
}
