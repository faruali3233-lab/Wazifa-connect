
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const faqs = [
  {
    question: "How do I verify a sub-agent's receipt?",
    answer: "Navigate to the Payments & Compliance page. In the 'Receipts from Sub-Agents' section, find the pending receipt and click 'Review'. You can then Verify or Flag it."
  },
  {
    question: "What is a Wakala and why is it read-only?",
    answer: "A Wakala is a document uploaded by the Recruiter authorizing the visa process. It is provided to you as read-only for verification and to proceed with next steps."
  },
  {
    question: "How does uploading a ticket unlock the Final Payment?",
    answer: "When you upload the final ticket and travel documents for a candidate, our system triggers an event. This event notifies the job seeker that their travel is confirmed, which then unlocks the Final Payment step for them on their dashboard."
  }
];

export default function AgentHelpPage() {
    return (
        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Frequently Asked Questions</CardTitle>
                        <CardDescription>Find quick answers to common questions about the agent workflow.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, i) => (
                                <AccordionItem value={`item-${i}`} key={i}>
                                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                                    <AccordionContent>{faq.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
             <div className="md:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Contact Support</CardTitle>
                         <CardDescription>Can't find an answer? Open a ticket with our admin team.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-1">
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" placeholder="e.g., Payment issue for C-123" />
                        </div>
                         <div className="space-y-1">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" rows={5} placeholder="Describe your issue in detail..." />
                        </div>
                        <Button className="w-full">Submit Ticket</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

