
export interface Achievement {
  id: string;
  year: string;
  title: string;
  description: string;
  category: 'Infrastructure' | 'Education' | 'Health' | 'Agriculture';
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  source: string;
  link: string;
  imageUrl: string;
  eventDate?: string; 
}

export interface Stat {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
}

export interface CoreValue {
  title: string;
  description: string;
  icon: string;
}

export interface VisionPoint {
  title: string;
  desc: string;
}

export interface VolunteerRegistration {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  date: string;
  appliedEvent?: string;
}

export interface SiteContent {
  leaderInfo: {
    name: string;
    designation: string;
    partyName: string;
    partySymbol: string;
    visionTagline: string;
    bio: string;
    fullBio: string;
    officeAddress: string;
    email: string;
    phone: string;
    heroImageUrl: string;
    aboutImageUrl: string;
    profileImageUrl: string;
    constituencyImageUrl: string;
    socials: {
      twitter: string;
      facebook: string;
      instagram: string;
      youtube: string;
    };
  };
  coreValues: CoreValue[];
  visionMission: VisionPoint[];
  achievements: Achievement[];
  stats: Stat[];
  news: NewsItem[];
  gallery: string[];
  volunteers: VolunteerRegistration[];
}
