import { MediaRepository } from "../../../domain/repository/media/mediaRepository";
import { MediaItem } from "../../../domain/entidades/media/mediaItem";
import { GetItemsMediaNasa } from "../../service/media/mediaService";
import { MediaSearchParams } from "../../../domain/entidades/media/mediaSearchParams";

export class MediaRepositoryImpl implements MediaRepository {
  private service = new GetItemsMediaNasa();

  async getMediaNasa(params: MediaSearchParams): Promise<MediaItem[]> {
    const response = await this.service.fetchItems(params);

    // Transformar MediaModel → MediaItem
    const items = response.collection?.items?.map((item: { data: any[]; links: any[]; href: any; }) => {
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
    }) ?? [];

    return items;
  }
}