
"use client";

import { useState, useEffect, type ReactNode, type Dispatch, type SetStateAction } from "react";
import { AuthContext, type AuthState, type User, type SeekerProfile, type RecruiterProfile, type SubAgentProfile, type Language, type UserRole } from "@/hooks/use-auth";
import { I18nProvider } from "./i18n-provider";
import { useToast } from "@/hooks/use-toast";

interface AuthProviderProps {
  children: ReactNode;
}

const getInitialLanguage = (): Language => {
    if (typeof window !== 'undefined') {
        const storedLang = localStorage.getItem('app.lang');
        if (storedLang === 'en' || storedLang === 'ar' || storedLang === 'hi') {
            return storedLang;
        }
    }
    return 'en';
};

function AuthProviderContent({ children }: { children: ReactNode }) {
    const { toast } = useToast();
    const [user, setUser] = useState<User | null>(null);
    const [seekerProfile, setSeekerProfile] = useState<SeekerProfile | null>(null);
    const [recruiterProfile, setRecruiterProfile] = useState<RecruiterProfile | null>(null);
    const [subAgentProfile, setSubAgentProfile] = useState<SubAgentProfile | null>(null);
    const [isProfileComplete, setProfileComplete] = useState(false);
    
    const [language, setLanguage] = useState<Language>('en');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        setLanguage(getInitialLanguage());
    }, []);

    useEffect(() => {
        if (isClient) {
            localStorage.setItem('app.lang', language);
            document.documentElement.lang = language;
            document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        }
    }, [language, isClient]);

    const handleSetLanguage = (newLang: Language) => {
        setLanguage(newLang);
        // Toast logic can be improved to use translation keys
    }

    const login = (userData: User, role: UserRole = 'unselected') => {
        if (userData.id === 'jobseeker' && userData.password === 'password') {
            const mockUser: User = { ...userData, role: 'jobSeeker' };
            const mockProfile: SeekerProfile = {
                basics: { name: 'Ravi Kumar', desiredJobTitle: 'Heavy Duty Driver', locationPreferences: 'Dubai', experienceYears: 5 },
                skills: ['Driving', 'Logistics'],
                experience: ['5 years as truck driver'],
                education: ['High School Diploma'],
                preferences: 'Likes working day shifts',
                resumeUrl: 'placeholder.pdf',
            };
            setUser(mockUser);
            setSeekerProfile(mockProfile);
            setProfileComplete(true);
        } else {
            setUser({ ...userData, role });
            setProfileComplete(false); // Reset on login
        }
    };
    
    const setUserRole = (role: UserRole) => {
        setUser(currentUser => currentUser ? { ...currentUser, role } : null);
    }

    const logout = () => {
        setUser(null);
        setSeekerProfile(null);
        setRecruiterProfile(null);
        setSubAgentProfile(null);
        setProfileComplete(false);
    };

    const updateSeekerProfile = (profile: SeekerProfile) => {
        setSeekerProfile(profile);
        setProfileComplete(true);
    };

    const updateRecruiterProfile = (profile: RecruiterProfile) => {
        setRecruiterProfile(profile);
        setProfileComplete(true);
    };

    const updateSubAgentProfile = (profile: SubAgentProfile) => {
        setSubAgentProfile(profile);
        setProfileComplete(true);
    };

    const value: AuthState = {
        user,
        seekerProfile,
        recruiterProfile,
        subAgentProfile,
        isProfileComplete,
        language,
        setLanguage: handleSetLanguage as Dispatch<SetStateAction<Language>>,
        setUserRole,
        login,
        logout,
        updateSeekerProfile,
        updateRecruiterProfile,
        updateSubAgentProfile,
    };

    if (!isClient) {
        return null;
    }

    return (
        <AuthContext.Provider value={value}>
            <I18nProvider language={language}>
                {children}
            </I18nProvider>
        </AuthContext.Provider>
    );
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
     <AuthProviderContent>
        {children}
     </AuthProviderContent>
  );
}
