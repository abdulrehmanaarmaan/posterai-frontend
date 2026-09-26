'use client';

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import type {
  Poster,
} from '@/types/poster';

import type {
  PosterFormValues,
} from '@/schemas/poster.schema';

import {
  apiClient,
} from '@/lib/api-client';

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

  photos: {
    url: string;
    publicId?: string;
  }[];
}

export function usePosterGeneration() {
  const queryClient =
    useQueryClient();

  const mutation =
    useMutation({
      mutationKey: [
        'poster',
        'generate',
      ],

      mutationFn: async (
        values: CreatePosterPayload,
      ): Promise<Poster> => {
        return apiClient.post<Poster>(
          '/posters',
          values,
        );
      },

      onSuccess: (poster) => {
        /*
         * Cache the newly generated poster
         * so the detail page can use it immediately.
         */
        queryClient.setQueryData(
          [
            'poster',
            poster._id,
          ],
          poster,
        );

        /*
         * Refresh poster history because
         * a new poster has been created.
         */
        queryClient.invalidateQueries({
          queryKey: ['posters'],
        });
      },
    });

  return {
    generatePoster:
      mutation.mutateAsync,

    data:
      mutation.data,

    error:
      mutation.error,

    isGenerating:
      mutation.isPending,

    isSuccess:
      mutation.isSuccess,

    isError:
      mutation.isError,

    reset:
      mutation.reset,
  };
}