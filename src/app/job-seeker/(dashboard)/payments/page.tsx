
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HandCoins, CheckCircle, Clock } from "lucide-react";

const mockPayments = [
    { id: 1, title: "Medical Examination Fee", amount: "₹5,000", currency: "INR", status: "Pending" },
    { id: 2, title: "Document Processing Fee", amount: "₹2,500", currency: "INR", status: "Pending" },
    { id: 3, title: "Service Fee (Phase 1)", amount: "₹10,000", currency: "INR", status: "Paid" },
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
              <Card key={payment.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">{payment.title}</CardTitle>
                  <Badge variant={payment.status === "Paid" ? "default" : "secondary"} className="gap-1">
                    {payment.status === 'Paid' ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                    {payment.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{payment.amount}</p>
                    <p className="text-sm text-muted-foreground">Due for Job Application #JOB-001</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="link" className="p-0">What's included?</Button>
                  {payment.status === "Pending" ? (
                    <Button>Pay Now</Button>
                  ) : (
                    <Button variant="outline">View Receipt</Button>
                  )}
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
