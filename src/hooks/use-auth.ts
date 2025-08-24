
"use client";

import { createContext, useContext, type Dispatch, type SetStateAction } from 'react';
import type { JobRecommendationsInput } from '@/ai/flows/job-recommendations';

export type UserRole = "jobSeeker" | "recruiter" | "agent" | "subAgent" | "unselected";

export type Language = 'en' | 'ar' | 'hi';

export interface User {
  id: string;
  phone: string;
  countryCode: string;
  // Role will be set after the initial login/registration
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

export interface AgentProfile {
  fullName: string;
  profilePhotoUrl: string;
  phone: string;
  countryCode: string;
  email: string;
  dob?: Date;
  officeAddress: string;
  licenseNumber: string;
  agencyType: "individual" | "company";
  yearsOfExperience: string;
  regions: string[];
  governmentIdUrl: string; // URL after upload
  businessLicenseUrl?: string; // URL after upload
  gstNumber?: string;
  languages?: string[];
  candidatePoolSize?: "0-50" | "50-200" | "200+";
  terms: boolean;
}

export interface SubAgentProfile {
  fullName: string;
  profilePhotoUrl: string;
  phone: string;
  countryCode: string;
  email?: string;
  dob?: Date;
  governmentIdUrl: string; // URL after upload
  agentReferralLink: string;
  agentLoginId: string;
  parentAgentName: string;
  signedAgreementUrl?: string; // URL after upload
  complianceCheckbox: boolean;
  digitalSignature: string;
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
  login: (user: Omit<User, 'role'>, role?: UserRole) => void;
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
