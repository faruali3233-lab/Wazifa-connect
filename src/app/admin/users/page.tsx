
import { UserDirectory } from "@/components/user-directory";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function UserManagementPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>User Directory</CardTitle>
                <CardDescription>View, manage, and verify all users on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
                <UserDirectory />
            </CardContent>
        </Card>
    );
}
