export interface MediaSearchParams {
    query?: string;
    mediaType?: 'image' | 'video' ;
    yearStart?: string;
    yearEnd?: string;
    description?: string;
    title?: string;
    keywords?: string;
    center?: string;
    page?: number;
    pageSize?: number;
  }