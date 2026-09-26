import { z } from 'zod';

export const posterSchema = z.object({
  templateId: z
    .string()
    .min(
      1,
      'Please select a poster template.',
    ),

  name: z
    .string()
    .trim()
    .min(
      2,
      'Name must be at least 2 characters.',
    )
    .max(
      80,
      'Name cannot exceed 80 characters.',
    ),

  designation: z
    .string()
    .trim()
    .min(
      2,
      'Designation is required.',
    )
    .max(
      100,
      'Designation cannot exceed 100 characters.',
    ),

  partyOrOrganization: z
    .string()
    .trim()
    .min(
      2,
      'Party / organization is required.',
    )
    .max(
      120,
      'Party / organization cannot exceed 120 characters.',
    ),

  unionOrThana: z
    .string()
    .trim()
    .min(
      2,
      'Union / thana is required.',
    )
    .max(
      100,
      'Union / thana cannot exceed 100 characters.',
    ),

  district: z
    .string()
    .trim()
    .min(
      2,
      'District is required.',
    )
    .max(
      100,
      'District cannot exceed 100 characters.',
    ),

  occasion: z
    .string()
    .trim()
    .min(
      1,
      'Please select an occasion.',
    )
    .max(
      100,
      'Occasion cannot exceed 100 characters.',
    ),

  headline: z
    .string()
    .trim()
    .min(
      2,
      'Headline is required.',
    )
    .max(
      200,
      'Headline cannot exceed 200 characters.',
    ),

  photos: z
    .array(z.instanceof(File))
    .min(
      1,
      'Please upload at least one photo.',
    )
    .max(
      3,
      'You can upload a maximum of 3 photos.',
    ),
});

export type PosterFormValues =
  z.infer<typeof posterSchema>;