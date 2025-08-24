
"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Check, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CopyButtonProps {
    textToCopy: string;
}

export default function CopyButton({ textToCopy }: CopyButtonProps) {
    const [isCopied, setIsCopied] = useState(false);
    const { toast } = useToast();

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            setIsCopied(true);
            toast({ title: "Copied!", description: "The referral code has been copied to your clipboard." });
            setTimeout(() => setIsCopied(false), 2000);
        }).catch(err => {
            toast({ variant: "destructive", title: "Failed to copy", description: "Could not copy text to clipboard." });
        });
    };

    return (
        <Button variant="ghost" size="icon" onClick={handleCopy}>
            {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            <span className="sr-only">Copy</span>
        </Button>
    );
}
