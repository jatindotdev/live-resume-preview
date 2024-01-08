import type { LucideIcon } from 'lucide-react';

export interface ResumeData {
  name: string;
  initials: string;
  location: string;
  locationLink: string;
  about: string;
  summary: string;
  avatarUrl?: string;
  personalWebsiteUrl: string;
  contact: {
    email?: string;
    tel?: string;
    social: {
      name: string;
      url: string;
      icon: LucideIcon;
    }[];
  };
  education: {
    school: string;
    degree: string;
    start: string;
    end: string;
    link: string;
  }[];
  work: {
    company: string;
    link: string;
    badges: string[];
    title: string;
    logo: string;
    start: string;
    end: string;
    description: string | string[];
  }[];
  organisations: {
    name: string;
    link: string;
    badges: string[];
    title: string;
    logo: string;
    start: string;
    end: string;
    description: string | string[];
  }[];
  skillset: {
    label: string;
    skills: string[];
  }[];
  projects: {
    title: string;
    techStack: string[];
    description: string | string[];
    logo?: string;
    link?: {
      label: string;
      href: string;
    };
  }[];
}
