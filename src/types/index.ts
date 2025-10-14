export interface Service {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  features: string[];
}

export interface PortfolioCategory {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  image: string;
  videoUrl?: string;
}

export interface Testimonial {
  id: string;
  text: string;
  name: string;
  position: string;
  company: string;
}

export interface Award {
  id: string;
  year: string;
  titleEn: string;
  titleAr: string;
  category: string;
  organization: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  studioAddress: string;
  workingHours: {
    weekdays: string;
    friday: string;
    emergency: string;
  };
}

export interface SocialMedia {
  instagram: string;
  facebook: string;
  tiktok: string;
}

export interface PersonalInfo {
  nameAr: string;
  nameEn: string;
  titleAr: string;
  titleEn: string;
  specialization: string;
  slogan: string;
  instagramFollowers: string;
  posts: string;
  visionAr: string;
  visionEn: string;
  closingStatementAr: string;
  closingStatementEn: string;
  heroImage: string;
  heroVideoUrl?: string;
}

export interface SiteData {
  personalInfo: PersonalInfo;
  services: Service[];
  portfolio: PortfolioCategory[];
  testimonials: Testimonial[];
  awards: Award[];
  contactInfo: ContactInfo;
  socialMedia: SocialMedia;
}