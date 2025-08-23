
"use client";

import { useState, useEffect, type ReactNode, type Dispatch, type SetStateAction } from "react";
import { AuthContext, type AuthState, type User, type SeekerProfile, type RecruiterProfile, type Language } from "@/hooks/use-auth";
import { I18nProvider, useTranslation } from "./i18n-provider";
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
    const { t } = useTranslation();
    const [user, setUser] = useState<User | null>(null);
    const [seekerProfile, setSeekerProfile] = useState<SeekerProfile | null>(null);
    const [recruiterProfile, setRecruiterProfile] = useState<RecruiterProfile | null>(null);
    const [isProfileComplete, setProfileComplete] = useState(false);
    const [language, setLanguage] = useState<Language>(getInitialLanguage);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('app.lang', language);
            document.documentElement.lang = language;
            document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        }
    }, [language]);

    const handleSetLanguage = (newLang: Language) => {
        setLanguage(newLang);
        let message = '';
        let title = '';
        if (newLang === 'en') {
            message = 'Language changed to English.';
            title = 'Language Updated';
        }
        if (newLang === 'hi') {
            message = 'भाषा हिंदी में बदल गई।';
            title = 'भाषा बदली गई';
        }
        if (newLang === 'ar') {
            message = 'تم تغيير اللغة إلى العربية.';
            title = 'تم تحديث اللغة';
        }
        toast({
            title: title,
            description: message,
        });
    }

    const login = (userData: User) => {
        setUser(userData);
        setProfileComplete(false); // Reset on login
    };

    const logout = () => {
        setUser(null);
        setSeekerProfile(null);
        setRecruiterProfile(null);
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

    const value: AuthState = {
        user,
        seekerProfile,
        recruiterProfile,
        isProfileComplete,
        language,
        setLanguage: handleSetLanguage as Dispatch<SetStateAction<Language>>,
        login,
        logout,
        updateSeekerProfile,
        updateRecruiterProfile,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}


export function AuthProvider({ children }: AuthProviderProps) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    const handleStorageChange = () => {
        const storedLang = localStorage.getItem('app.lang');
        if (storedLang === 'en' || storedLang === 'ar' || storedLang === 'hi') {
            setLanguage(storedLang);
        }
    }
    window.addEventListener('storage', handleStorageChange);
    return () => {
        window.removeEventListener('storage', handleStorageChange);
    }
  }, []);

  return (
      <I18nProvider language={language}>
         <AuthProviderContent>
            {children}
         </AuthProviderContent>
      </I18nProvider>
  );
}
