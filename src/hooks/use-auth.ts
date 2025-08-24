
"use client";

import { createContext, useContext, type Dispatch, type SetStateAction } from 'react';
import type { JobRecommendationsInput } from '@/ai/flows/job-recommendations';

export type UserRole = "jobSeeker" | "recruiter" | "agent" | "subAgent";

export type Language = 'en' | 'ar' | 'hi';

export interface User {
  id: string;
  phone: string;
  countryCode: string;
  // Role will be set after the initial login/registration
  role: UserRole | 'unselected';
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

// TODO: Define Agent and SubAgent profile structures
export interface AgentProfile {
  name: string;
  // Add other agent-specific fields
}

export interface SubAgentProfile {
  name: string;
  // Add other sub-agent-specific fields
}


export interface AuthState {
  user: User | null;
  seekerProfile: SeekerProfile | null;
  recruiterProfile: RecruiterProfile | null;
  agentProfile: AgentProfile | null;
  subAgentProfile: SubAgentProfile | null;
  isProfileComplete: boolean;
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
  setUserRole: (role: UserRole) => void;
  login: (user: Omit<User, 'role'>) => void;
  logout: () => void;
  updateSeekerProfile: (profile: SeekerProfile) => void;
  updateRecruiterProfile: (profile: RecruiterProfile) => void;
  updateAgentProfile: (profile: AgentProfile) => void;
  updateSubAgentProfile: (profile: SubAgentProfile) => void;
}

export const AuthContext = createContext<AuthState | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
