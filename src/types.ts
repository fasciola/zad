export interface Resource {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  category: string;
  type: 'pdf' | 'audio' | 'video' | 'link' | 'article';
  url: string;
  coverUrl: string;
  isFeatured: boolean;
  createdAt: string;
  authorAr?: string;
  authorEn?: string;
  pages?: number;
  fileSize?: string;
}

export interface Message {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface Teacher {
  id: string;
  nameAr: string;
  nameEn: string;
  bioAr: string;
  bioEn: string;
  specialtyAr: string;
  specialtyEn: string;
  coursesAr: string[];
  coursesEn: string[];
  languagesAr: string[];
  languagesEn: string[];
  imageUrl: string;
}

export interface Program {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  category: 'quran' | 'sharia';
  detailsAr: string[];
  detailsEn: string[];
  imageUrl: string;
}

export interface WebsiteConfig {
  whatsappNumber: string;
  email: string;
  phone: string;
  heroTitleAr: string;
  heroTitleEn: string;
  heroSubtitleAr: string;
  heroSubtitleEn: string;
  aboutTextAr: string;
  aboutTextEn: string;
  visionAr: string;
  visionEn: string;
  missionAr: string;
  missionEn: string;
  goalsAr: string[];
  goalsEn: string[];
  valuesAr: string[];
  valuesEn: string[];
  regionsServedAr: string;
  regionsServedEn: string;
  facebookUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
}

export type Language = 'ar' | 'en';
