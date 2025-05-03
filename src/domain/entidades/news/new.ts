// domain/entities/MediaItem.ts
export interface New {
    id: string;
    title: string;
    description: string;
    mediaType: 'image' | 'video' | 'audio';
    date: string;
    thumbnailUrl: string;
    originalUrl: string;
    center?: string;
    keywords?: string[];
}