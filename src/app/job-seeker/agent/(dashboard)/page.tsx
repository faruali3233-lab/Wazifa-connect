
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This page just redirects to the main dashboard page.
export default function AgentDashboardRoot() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/job-seeker/agent/dashboard');
    }, [router]);

    return null; // Or a loading spinner
}
