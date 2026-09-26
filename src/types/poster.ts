export type PosterStatus =
  | 'generating'
  | 'completed'
  | 'failed';

export interface PosterPhoto {
  url: string;
  publicId?: string;
}

export interface Poster {
  _id: string;
  userId: string;
  templateId: string;

  name: string;
  designation: string;
  party: string;

  union: string;
  thana: string;
  district: string;

  occasionType: string;
  headline: string;

  photos: PosterPhoto[];

  generatedImageUrl?: string;
  generatedImagePublicId?: string;

  status: PosterStatus;

  generationAttempts: number;
  maxGenerationAttempts: number;

  layoutConfig?: Record<string, unknown>;

  errorMessage?: string;

  createdAt: string;
  updatedAt: string;
}

export interface UploadedPhoto {
  url: string;
  publicId: string;
  width: number;
  height: number;
}

export interface CreatePosterPayload {
  templateId: string;
  name: string;
  designation: string;
  party: string;
  union: string;
  thana: string;
  district: string;
  occasionType: string;
  headline: string;
  photos: PosterPhoto[];
}