
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilePlus } from "lucide-react";

export default function RecruiterDocumentsPage() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Documents</CardTitle>
                    <CardDescription>Manage Wakalas and other important document templates.</CardDescription>
                </div>
                 <Button>
                    <FilePlus className="mr-2 h-4 w-4" />
                    Upload Template
                </Button>
            </CardHeader>
            <CardContent>
                <div className="text-center text-muted-foreground py-12">
                    <p>Your document store and templates will be managed here.</p>
                </div>
            </CardContent>
        </Card>
    );
}
