export interface Feature {
  title: string;
  description: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
}

export interface EventItem {
  id: number;
  title: string;
  date: string;
  description: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}