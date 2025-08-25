
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function JobSeekerRoot() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/job-seeker/dashboard');
    }, [router]);

    return null; // Or a loading spinner
}
