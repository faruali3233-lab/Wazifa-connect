
"use client";

import { createContext, useContext, type Dispatch, type SetStateAction } from 'react';

export type UserRole = "jobSeeker" | "recruiter" | "agent" | "subAgent" | "unselected" | "admin";

export type Language = 'en' | 'ar' | 'hi';

export type KycStatus = "pending" | "approved" | "rejected" | "not_started";

export interface User {
  id: string;
  phone: string;
  countryCode: string;
  // Role will be set after the initial login/registration
  role: UserRole;
}

export interface SeekerProfile {
  basics: {
    name: string;
    desiredJobTitle: string;
    locationPreferences: string;
    experienceYears: number;
  };
  skills: string[];
  experience: string[];
  education: string[];
  preferences: string;
  resumeUrl: string; // Used to store passport/ID upload status
  kycStatus?: KycStatus;
  aadhaarLast4?: string;
  kycSubmissionDate?: string;
  kycRejectionReason?: string;
}

export interface RecruiterProfile {
  yourName: string;
  yourEmail: string;
  yourCountry: string;
  yourCity: string;
  companyName: string;
  companyWebsite: string;
  companyDescription: string;
  profilePhotoUrl: string;
}

export interface AgentProfile {
    name: string;
    email: string;
    phone: string;
    countryCode: string;
    agencyName?: string;
    agencyAddress?: string;
    profilePhotoUrl: string;
    governmentIdUrl: string;
    referralCode: string;
    uniqueAgentId: string;
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
  name: string; // For dashboard display
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
