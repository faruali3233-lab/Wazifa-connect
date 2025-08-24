
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This page just redirects to the main dashboard page.
export default function SubAgentDashboardRoot() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/job-seeker/sub-agent/dashboard');
    }, [router]);

    return null; // Or a loading spinner
}
