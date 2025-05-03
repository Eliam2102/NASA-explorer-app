// domain/entities/MediaItem.ts
export interface MediaItem {
    id: string;
    title: string;
    description: string;
    mediaType: 'image' | 'video' ;
    date: string;
    thumbnailUrl: string;
    originalUrl: string;
    center?: string;
    keywords?: string[];
}