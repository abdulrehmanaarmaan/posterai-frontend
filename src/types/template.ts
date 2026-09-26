export type TemplateOccasion =
  | 'election'
  | 'campaign'
  | 'meeting'
  | 'rally'
  | 'celebration'
  | 'awareness'
  | 'general';

export interface Template {
  _id: string;

  title: string;

  occasionType: TemplateOccasion;

  thumbnailUrl: string;

  previewUrl: string;

  isActive: boolean;

  createdAt?: string;

  updatedAt?: string;
}