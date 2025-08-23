
"use client";

import { createContext, useContext } from 'react';
import type { JobRecommendationsInput } from '@/ai/flows/job-recommendations';

export type UserRole = "jobSeeker" | "recruiter";

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
}

export interface AuthState {
  user: User | null;
  seekerProfile: SeekerProfile | null;
  recruiterProfile: RecruiterProfile | null;
  isProfileComplete: boolean;
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
