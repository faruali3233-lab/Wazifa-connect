
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function RecruiterDocumentsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>Manage Wakalas and other important documents.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center text-muted-foreground py-12">
                    <p>Your document store and templates will be managed here.</p>
                </div>
            </CardContent>
        </Card>
    );
}
