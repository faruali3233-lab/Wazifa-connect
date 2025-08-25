
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CheckCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockReceipts = [
    { from: 'SA-01', candidate: 'Aisha Begum', amount: '₹10,000', purpose: 'Service Fee', status: 'Pending' },
    { from: 'SA-02', candidate: 'Sunita Singh', amount: '₹5,000', purpose: 'Medical', status: 'Verified' }
];

const mockSeekerPayments = [
    { candidate: 'Ravi Kumar', job: 'Heavy Duty Driver', stage: 'Interest Fee', status: 'Paid' },
    { candidate: 'Manoj Verma', job: 'Construction Painter', stage: 'Phase-1', status: 'Paid' },
    { candidate: 'Aisha Begum', job: 'Household Cook', stage: 'Interest Fee', status: 'Pending' },
];

export default function AgentPaymentsPage() {
    return (
        <Tabs defaultValue="receipts">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Payments & Compliance</h1>
                    <p className="text-muted-foreground">Verify sub-agent receipts and track seeker payment statuses.</p>
                </div>
                <TabsList>
                    <TabsTrigger value="receipts">Sub-Agent Receipts</TabsTrigger>
                    <TabsTrigger value="seeker_payments">Seeker Payments</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="receipts">
                <Card>
                    <CardHeader>
                        <CardTitle>Receipts from Sub-Agents</CardTitle>
                        <CardDescription>Verify payments uploaded by your sub-agents.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {mockReceipts.map((receipt, index) => (
                             <Card key={index} className="p-4">
                                 <div className="flex flex-wrap items-center justify-between gap-4">
                                     <div>
                                        <p className="font-semibold">{receipt.candidate} <span className="font-normal text-muted-foreground">via {receipt.from}</span></p>
                                        <p className="text-sm text-muted-foreground">{receipt.purpose}</p>
                                     </div>
                                     <div className="flex items-center gap-4">
                                        <p className="text-lg font-bold">{receipt.amount}</p>
                                         <Badge variant={receipt.status === 'Verified' ? 'default' : 'secondary'} className="gap-1">
                                            {receipt.status === 'Verified' ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                                            {receipt.status}
                                         </Badge>
                                        <Button variant="outline" size="sm">View</Button>
                                        {receipt.status === 'Pending' && <Button size="sm">Verify</Button>}
                                     </div>
                                 </div>
                             </Card>
                        ))}
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="seeker_payments">
                 <Card>
                    <CardHeader>
                        <CardTitle>Seeker Payments to Admin (Read-Only)</CardTitle>
                        <CardDescription>Track the status of mandatory payments made by your candidates to the platform.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         {mockSeekerPayments.map((payment, index) => (
                             <Card key={index} className="p-4">
                                 <div className="flex flex-wrap items-center justify-between gap-4">
                                     <div>
                                        <p className="font-semibold">{payment.candidate}</p>
                                        <p className="text-sm text-muted-foreground">{payment.job}</p>
                                     </div>
                                     <div className="flex items-center gap-4">
                                        <p className="text-sm font-medium">{payment.stage}</p>
                                         <Badge variant={payment.status === 'Paid' ? 'default' : 'destructive'} className="gap-1">
                                            {payment.status === 'Paid' ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                                            {payment.status}
                                         </Badge>
                                     </div>
                                 </div>
                             </Card>
                        ))}
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}

    