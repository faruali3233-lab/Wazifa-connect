
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdminUsersPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
                <p>A searchable and filterable list of all users (job seekers, agents, sub-agents, recruiters) will be displayed here.</p>
            </CardContent>
        </Card>
    );
}
