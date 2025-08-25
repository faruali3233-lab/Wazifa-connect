
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HandCoins, CheckCircle, Clock, Lock } from "lucide-react";

const mockPayments = [
    { id: 1, title: "Interest Fee", amount: "₹200", currency: "INR", status: "Pending", job: "Household Cook", description: "Non-refundable fee to confirm your interest and unlock the medical stage." },
    { id: 2, title: "Phase-1 Payment", amount: "₹50,000", currency: "INR", status: "Pending", job: "Heavy Duty Driver", description: "Due after Wakala is received." },
    { id: 3, title: "Final Payment", amount: "₹70,000", currency: "INR", status: "Locked", job: "Heavy Duty Driver", description: "Unlocks after ticket and travel docs are uploaded by the agent." },
];

export default function JobSeekerPaymentsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HandCoins /> Payments
          </CardTitle>
          <CardDescription>
            Pay for required services like medical exams and document processing. All payments are secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockPayments.map(payment => (
              <Card key={payment.id} className={payment.status === "Locked" ? "bg-muted/50" : ""}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">{payment.title}</CardTitle>
                  <Badge variant={payment.status === "Paid" ? "default" : payment.status === "Pending" ? "destructive" : "secondary"} className="gap-1">
                    {payment.status === 'Paid' ? <CheckCircle className="h-4 w-4" /> : payment.status === 'Locked' ? <Lock className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                    {payment.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{payment.amount}</p>
                    <p className="text-sm text-muted-foreground">For Job: {payment.job}</p>
                     <p className="text-sm text-muted-foreground mt-1">{payment.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="link" className="p-0">What's included?</Button>
                  {payment.status === "Pending" ? (
                    <Button>Pay Now</Button>
                  ) : payment.status === "Paid" ? (
                    <Button variant="outline">View Receipt</Button>
                  ) : <Button disabled>Pay Now</Button>}
                </CardFooter>
              </Card>
            ))}
            {mockPayments.length === 0 && (
              <div className="text-center text-muted-foreground py-12">
                <p>No payments due. You’ll see fees here when required.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
