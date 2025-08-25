
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockReceipts = [
    { id: "R-001", subAgent: "Sanjay Patel (SA-01)", candidate: "Aisha Begum", amount: "₹10,000", purpose: "Service Fee", status: "Pending" }
];

export default function AgentPaymentsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Payments & Compliance</CardTitle>
                <CardDescription>Verify receipts from sub-agents and view the status of seeker-to-admin payments.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="receipts">
                    <TabsList>
                        <TabsTrigger value="receipts">Receipts from Sub-Agents</TabsTrigger>
                        <TabsTrigger value="seeker_payments">Seeker Payments</TabsTrigger>
                        <TabsTrigger value="commissions">Commissions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="receipts" className="mt-6">
                        <div className="border rounded-lg">
                           {mockReceipts.map(receipt => (
                               <div key={receipt.id} className="grid grid-cols-5 items-center p-4 border-b last:border-b-0">
                                   <div className="col-span-2">
                                        <p className="font-medium">{receipt.candidate}</p>
                                        <p className="text-sm text-muted-foreground">From: {receipt.subAgent}</p>
                                   </div>
                                    <div>
                                        <p className="font-semibold">{receipt.amount}</p>
                                        <p className="text-xs text-muted-foreground">{receipt.purpose}</p>
                                    </div>
                                    <div>
                                        <Badge variant={receipt.status === "Pending" ? "destructive" : "default"}>{receipt.status}</Badge>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button variant="outline" size="sm">View Receipt</Button>
                                        <Button size="sm">Verify</Button>
                                    </div>
                               </div>
                           ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
