
import { SiteContent } from './types';

const getFutureDate = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
};

export const INITIAL_CONTENT: SiteContent = {
  leaderInfo: {
    name: "Dr. Arjun Vardhan",
    designation: "Member of Parliament",
    partyName: "Progressive Unity Party",
    partySymbol: "https://images.unsplash.com/photo-1540339832862-47459984513e?auto=format&fit=crop&q=80&w=100&h=100",
    visionTagline: "Empowering Every Voice, Building a Brighter Tomorrow.",
    bio: "Dr. Arjun Vardhan is a dedicated public servant with over two decades of experience in community development and policy making.",
    fullBio: "Dr. Arjun Vardhan's journey began in the humble streets of the Rayagada district. After completing his higher education at top-tier international universities, he returned to his roots to address the systemic issues plaguing rural development.",
    officeAddress: "124, Parliament House, New Delhi, India",
    email: "contact@arjunvardhan.org",
    phone: "+91 98765 43210",
    heroImageUrl: "https://images.unsplash.com/photo-1541873676947-9c61867d8f07?auto=format&fit=crop&q=80&w=1920",
    aboutImageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
    profileImageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
    constituencyImageUrl: "https://images.unsplash.com/photo-1524492459426-14fe305546b3?auto=format&fit=crop&q=80&w=1920",
    socials: {
      twitter: "https://twitter.com",
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com"
    }
  },
  coreValues: [
    { title: "Transparency", description: "Open governance with accessible data for every citizen.", icon: "Shield" },
    { title: "Inclusivity", description: "Policies that leave no one behind, regardless of background.", icon: "Users" },
    { title: "Innovation", description: "Leveraging technology to solve age-old infrastructure problems.", icon: "TrendingUp" }
  ],
  visionMission: [
    { title: "Modern Education", desc: "Upgrading every government school with digital labs and world-class curriculum by 2026." },
    { title: "Healthcare for All", desc: "A primary health center within 5km of every household in the constituency." },
    { title: "Farmer Prosperity", desc: "Ensuring 100% MSP implementation and establishing 5 new cold-storage hubs." },
    { title: "Youth Employment", desc: "Creating 50,000 local jobs through the new Industrial Corridor initiative." }
  ],
  achievements: [
    { id: '1', year: '2023', title: "Green Highway Project", description: "Inaugurated the 150km eco-friendly highway connecting major trade hubs.", category: 'Infrastructure' },
    { id: '2', year: '2022', title: "Global Excellence Award", description: "Recognized for 'Best Urban Poverty Alleviation Model' at the UN Summit.", category: 'Health' },
    { id: '3', year: '2021', title: "Agri-Tech Revolution", description: "Introduced drone-based irrigation systems to 500+ villages.", category: 'Agriculture' },
    { id: '4', year: '2020', title: "Digital Literacy Drive", description: "Reached 1 Million students through the 'Tablet-for-Tots' program.", category: 'Education' }
  ],
  stats: [
    { label: "Population Served", value: "2.4", suffix: "M" },
    { label: "Literacy Rate", value: "88", suffix: "%" },
    { label: "Electrified Villages", value: "100", suffix: "%" },
    { label: "Healthcare Hubs", value: "45", prefix: "+" }
  ],
  news: [
    { id: 'n1', date: 'Oct 24, 2023', title: "Dr. Vardhan addresses the Youth Conclave on AI in Governance", source: "The National Daily", link: "#", imageUrl: "https://images.unsplash.com/photo-1475721027187-4024733924f7?auto=format&fit=crop&q=80&w=800", eventDate: getFutureDate(5) },
    { id: 'n2', date: 'Oct 20, 2023', title: "New Multispecialty Hospital approved for the Western District", source: "State Gazette", link: "#", imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800", eventDate: getFutureDate(12) },
    { id: 'n3', date: 'Oct 15, 2023', title: "Record 95% Crop Insurance payout achieved this season", source: "Farm World", link: "#", imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800" }
  ],
  gallery: [
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600"
  ],
  volunteers: []
};
