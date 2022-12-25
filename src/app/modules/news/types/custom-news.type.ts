import { NewsPreview } from "../interfaces/news-preview.interface";

export type CustomNews = Pick<NewsPreview, 'title' | 'description' | 'publishedDate'> & {
  titleImageRaw: string,
};
