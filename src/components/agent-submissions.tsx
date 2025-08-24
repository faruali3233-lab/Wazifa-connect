
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const mockSubmissions = [
    { name: "Ravi Kumar", job: "Heavy Duty Driver", status: "Shortlisted", subAgent: "SA01" },
    { name: "Aarav Sharma", job: "Household Cook", status: "Submitted", subAgent: "SA02" },
    { name: "Vijay Singh", job: "Construction Painter", status: "Offer", subAgent: "SA01" },
]

export function AgentSubmissions() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Submissions Pipeline</CardTitle>
                <CardDescription>Track the status of candidates you and your sub-agents have submitted to recruiters.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Tabs defaultValue="submitted" className="w-full">
                    <TabsList>
                        <TabsTrigger value="submitted">Submitted</TabsTrigger>
                        <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
                        <TabsTrigger value="offer">Offer</TabsTrigger>
                        <TabsTrigger value="hired">Hired</TabsTrigger>
                    </TabsList>
                    <TabsContent value="submitted" className="mt-4">
                        <div className="space-y-2">
                        {mockSubmissions.filter(s => s.status === 'Submitted').map((sub, i) => (
                            <div key={i} className="flex items-center gap-4 p-2 rounded-lg border">
                                <Avatar><AvatarFallback>{sub.name.charAt(0)}</AvatarFallback></Avatar>
                                <div>
                                    <p className="font-semibold">{sub.name}</p>
                                    <p className="text-xs text-muted-foreground">{sub.job}</p>
                                </div>
                            </div>
                        ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="shortlisted" className="mt-4">
                         <div className="space-y-2">
                        {mockSubmissions.filter(s => s.status === 'Shortlisted').map((sub, i) => (
                            <div key={i} className="flex items-center gap-4 p-2 rounded-lg border">
                                <Avatar><AvatarFallback>{sub.name.charAt(0)}</AvatarFallback></Avatar>
                                <div>
                                    <p className="font-semibold">{sub.name}</p>
                                    <p className="text-xs text-muted-foreground">{sub.job}</p>
                                </div>
                            </div>
                        ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="offer" className="mt-4">
                         <div className="space-y-2">
                        {mockSubmissions.filter(s => s.status === 'Offer').map((sub, i) => (
                            <div key={i} className="flex items-center gap-4 p-2 rounded-lg border">
                                <Avatar><AvatarFallback>{sub.name.charAt(0)}</AvatarFallback></Avatar>
                                <div>
                                    <p className="font-semibold">{sub.name}</p>
                                    <p className="text-xs text-muted-foreground">{sub.job}</p>
                                </div>
                            </div>
                        ))}
                        </div>
                    </TabsContent>
                     <TabsContent value="hired" className="mt-4">
                        <p className="text-sm text-muted-foreground text-center py-4">No candidates hired yet.</p>
                     </TabsContent>
                 </Tabs>
            </CardContent>
        </Card>
    );
}
