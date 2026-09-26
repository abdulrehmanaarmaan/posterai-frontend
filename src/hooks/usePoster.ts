'use client';

import {
  useQuery,
} from '@tanstack/react-query';

import {
  apiClient,
} from '@/lib/api-client';

import type {
  Poster,
} from '@/types/poster';

export const usePoster = (
  posterId: string
) => {
  return useQuery<Poster>({
    queryKey: [
      'posters',
      posterId,
    ],

    queryFn: () =>
      apiClient.get<Poster>(
        `/posters/${posterId}`
      ),

    enabled:
      Boolean(posterId),
  });
};