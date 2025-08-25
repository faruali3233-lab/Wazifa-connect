
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, CheckCircle, Clock } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const mockPayments = [
    { candidate: 'Ravi Kumar', job: 'Heavy Duty Driver', stage: 'Selected', payments: [
        { from: 'Ravi Kumar', to: 'SA-001', amount: '₹5,000', purpose: 'Medical', status: 'Verified' }
    ]},
    { candidate: 'Aisha Begum', job: 'Household Cook', stage: 'Selected', payments: [
         { from: 'Aisha Begum', to: 'SA-002', amount: '₹10,000', purpose: 'Service Fee', status: 'Pending' }
    ]}
];

export default function AdminPaymentsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Payments & Compliance</CardTitle>
                <CardDescription>Verify payment receipts and manage financial compliance across all roles.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="all">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <TabsList>
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="pending">Pending Verification</TabsTrigger>
                            <TabsTrigger value="verified">Verified</TabsTrigger>
                            <TabsTrigger value="flagged">Flagged</TabsTrigger>
                            <TabsTrigger value="disputes">Disputes</TabsTrigger>
                        </TabsList>
                        <div className="ml-auto flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">Role <ChevronDown className="ml-2 h-4 w-4" /></Button>
                                </DropdownMenuTrigger>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">Purpose <ChevronDown className="ml-2 h-4 w-4" /></Button>
                                </DropdownMenuTrigger>
                            </DropdownMenu>
                        </div>
                    </div>
                    <TabsContent value="all">
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {mockPayments.map((payment, index) => (
                                <Card key={index}>
                                    <CardHeader className="flex flex-row items-center gap-4">
                                        <Avatar className="h-12 w-12"><AvatarFallback>{payment.candidate.charAt(0)}</AvatarFallback></Avatar>
                                        <div>
                                            <p className="font-semibold">{payment.candidate}</p>
                                            <p className="text-sm text-muted-foreground">{payment.job}</p>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        {payment.payments.map((line, pIndex) => (
                                            <div key={pIndex} className="text-sm p-3 rounded-md border bg-muted/20">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-medium">{line.purpose}</span>
                                                    <span className="font-bold text-primary">{line.amount}</span>
                                                </div>
                                                <div className="flex justify-between items-center mt-1 text-muted-foreground">
                                                     <span>{line.from} → {line.to}</span>
                                                     <Badge variant={line.status === 'Verified' ? 'default' : 'secondary'} className="gap-1">
                                                        {line.status === 'Verified' ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                                                        {line.status}
                                                     </Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
