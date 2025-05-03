// data/models/NasaApiResponse.ts
export interface MediaModel {
    version: string;
    href: string;
    items: NasaApiItem[];
    metadata?: {
      total_hits: number;
    };
    links?: NasaApiLink[];
  }
  
  export interface NasaApiItem {
    href: string;
    data: NasaApiItemData[];
    links?: NasaApiItemLink[];
  }
  
  export interface NasaApiItemData {
    center: string;
    title: string;
    keywords?: string[];
    nasa_id: string;
    media_type: 'image' | 'video' | 'audio';
    date_created: string;
    description?: string;
    location?: string;
    photographer?: string;
    secondary_creator?: string;
  }
  
  export interface NasaApiItemLink {
    href: string;
    rel: string;
    render?: 'image' | 'video';
  }
  
  export interface NasaApiLink {
    rel: string; 
    prompt: string;
    href: string;
  }