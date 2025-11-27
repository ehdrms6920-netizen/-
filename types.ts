export type Category = 'all' | 'exhibition' | 'branding' | 'installation' | 'research' | 'photography' | 'director' | 'art';

export interface Project {
  id: string;
  title: string;
  category: Category | string; // allowing string to handle select value easily, though technically constrained
  caption: string;
  location: string;
  year: string;
  image: string | null;
}