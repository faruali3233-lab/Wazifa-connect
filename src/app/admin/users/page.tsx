
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminUsersRoot() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/admin/users/job-seekers');
    }, [router]);

    return null;
}
