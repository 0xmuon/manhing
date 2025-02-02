export interface Manga {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    }
  };
  chapters?: number;
  score?: number;
}

export interface MangaResponse {
  data: Manga[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
  };
} 