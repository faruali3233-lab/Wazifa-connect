
"use client";

import { createContext, useContext, type Dispatch, type SetStateAction } from 'react';
import type { JobRecommendationsInput } from '@/ai/flows/job-recommendations';

export type UserRole = "jobSeeker" | "recruiter";

export type Language = 'en' | 'ar';

export interface User {
  phone: string;
  countryCode: string;
  role: UserRole;
}

export type SeekerProfile = JobRecommendationsInput['profile'];

export interface RecruiterProfile {
  companyName: string;
  companyWebsite: string;
  companyDescription: string;
  yourName: string;
  yourCountry: string;
  yourCity: string;
  yourEmail: string;
  profilePhotoUrl: string;
}

export interface AuthState {
  user: User | null;
  seekerProfile: SeekerProfile | null;
  recruiterProfile: RecruiterProfile | null;
  isProfileComplete: boolean;
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
  login: (user: User) => void;
  logout: () => void;
  updateSeekerProfile: (profile: SeekerProfile) => void;
  updateRecruiterProfile: (profile: RecruiterProfile) => void;
}

export const AuthContext = createContext<AuthState | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
