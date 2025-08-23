
"use client";

import { useState, useEffect, type ReactNode } from "react";
import { AuthContext, type AuthState, type User, type SeekerProfile, type RecruiterProfile, type Language } from "@/hooks/use-auth";
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

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [seekerProfile, setSeekerProfile] = useState<SeekerProfile | null>(null);
  const [recruiterProfile, setRecruiterProfile] = useState<RecruiterProfile | null>(null);
  const [isProfileComplete, setProfileComplete] = useState(false);
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const { toast } = useToast();

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
    if (newLang === 'en') message = 'Language changed to English.';
    if (newLang === 'hi') message = 'भाषा अंग्रेज़ी में बदल गई।';
    if (newLang === 'ar') message = 'تم تغيير اللغة إلى العربية.';
    toast({
        title: 'Language Updated',
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
        <I18nProvider language={language}>
         {children}
        </I18nProvider>
      </AuthContext.Provider>
  );
}
