"use client";

import { useState, type ReactNode } from "react";
import { AuthContext, type AuthState, type User, type SeekerProfile, type RecruiterProfile } from "@/hooks/use-auth";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [seekerProfile, setSeekerProfile] = useState<SeekerProfile | null>(null);
  const [recruiterProfile, setRecruiterProfile] = useState<RecruiterProfile | null>(null);
  const [isProfileComplete, setProfileComplete] = useState(false);

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
    login,
    logout,
    updateSeekerProfile,
    updateRecruiterProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
