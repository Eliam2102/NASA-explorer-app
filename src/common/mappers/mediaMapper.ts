import { MediaItem } from "../../domain/entidades/media/mediaItem";

interface MediaApiItem {
  data: Array<{
    nasa_id: string;
    title: string;
    description?: string;
    media_type: string;
    date_created: string;
    center?: string;
    keywords?: string[];
  }>;
  links?: Array<{
    href: string;
  }>;
  href: string;
}

// Mapea un solo item de la API a la entidad del dominio
export function mapMediaApiItemToEntity(item: MediaApiItem): MediaItem {
  const data = item.data[0];
  const link = item.links?.[0];

  return {
    id: data.nasa_id,
    title: data.title,
    description: data.description ?? '',
    mediaType: data.media_type as 'image' | 'video',
    date: data.date_created,
    thumbnailUrl: link?.href ?? '',
    originalUrl: item.href,
    center: data.center,
    keywords: data.keywords,
  };
}

// Mapea una lista completa de items
export function mapMediaApiListToEntityList(items: MediaApiItem[]): MediaItem[] {
  return items.map(mapMediaApiItemToEntity);
}