export interface ProjectItem {
  id: string;
  title: string;
  clientOrLocation: string;
  category: 'industrial' | 'retrofitting' | 'residential' | 'waterproofing';
  categoryLabel: string;
  challenge: string;
  solution: string;
  techniques: string[];
  ageOrScale?: string;
  image: string;
  stats?: { label: string; value: string }[];
  highlight?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  features: string[];
  specs: { label: string; value: string }[];
  category: 'engineering' | 'retrofitting' | 'waterproofing' | 'finishing';
}

export interface RetrofittingTech {
  id: string;
  name: string;
  fullName: string;
  description: string;
  application: string;
  durability: string;
  keyBenefit: string;
  techSpecs: string[];
}

export interface ClientPartner {
  name: string;
  sector: string;
  description: string;
  badge?: string;
}

export interface ProjectEstimateInput {
  projectType: string;
  areaSqFt: number;
  buildingAge: string;
  specializedReqs: string[];
  contactPhone: string;
  contactName: string;
}
