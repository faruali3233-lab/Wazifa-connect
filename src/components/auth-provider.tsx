
"use client";

import { useState, type ReactNode } from "react";
import { AuthContext, type AuthState, type User, type SeekerProfile, type RecruiterProfile, type Language } from "@/hooks/use-auth";
import { I18nProvider } from "./i18n-provider";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [seekerProfile, setSeekerProfile] = useState<SeekerProfile | null>(null);
  const [recruiterProfile, setRecruiterProfile] = useState<RecruiterProfile | null>(null);
  const [isProfileComplete, setProfileComplete] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

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
    setLanguage,
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
