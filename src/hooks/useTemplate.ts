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

export const useTemplate = (
  templateId: string
) => {
  return useQuery<Template>({
    queryKey: [
      'templates',
      templateId,
    ],

    queryFn: () =>
      apiClient.get<Template>(
        `/templates/${templateId}`
      ),

    enabled:
      Boolean(templateId),
  });
};