'use client';

import {
  useQuery,
} from '@tanstack/react-query';

import {
  apiClient,
} from '@/lib/api-client';

import type {
  Template,
} from '@/types/template';

interface UseTemplatesResult {
  templates: Template[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export const useTemplates = (
  occasion?: string
): UseTemplatesResult => {
  const query = useQuery<Template[]>({
    queryKey: [
      'templates',
      occasion ?? '',
    ],

    queryFn: () => {
      const queryString =
        occasion
          ? `?occasionType=${encodeURIComponent(
              occasion
            )}`
          : '';

      return apiClient.get<Template[]>(
        `/templates${queryString}`
      );
    },
  });

  return {
    templates: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error:
      query.error instanceof Error
        ? query.error
        : null,
  };
};