
import type { ReactNode } from 'react';
import { AuthProvider } from '@/components/auth-provider';
import AdminDashboardLayout from './_layout';


export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <AdminDashboardLayout>
                {children}
            </AdminDashboardLayout>
        </AuthProvider>
    );
}
