'use client';

import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';

import type { Poster } from '@/types/poster';

export interface UploadedPhoto {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
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

  photos: {
    url: string;
    publicId?: string;
  }[];
}

export function usePosters() {
  const queryClient = useQueryClient();

  /*
   * =========================================================
   * 1. GET POSTER HISTORY
   *
   * GET /api/posters/me
   * =========================================================
   */

  const postersQuery = useQuery({
    queryKey: ['posters'],

    queryFn: async (): Promise<Poster[]> => {
      return apiClient.get<Poster[]>(
        '/posters/me',
      );
    },
  });

  /*
   * =========================================================
   * 2. GET SINGLE POSTER
   *
   * GET /api/posters/:id
   * =========================================================
   */

  const getPoster = async (
    posterId: string,
  ): Promise<Poster> => {
    return apiClient.get<Poster>(
      `/posters/${posterId}`,
    );
  };

  /*
   * =========================================================
   * 3. UPLOAD PHOTOS
   *
   * POST /api/upload
   * =========================================================
   */

  const uploadMutation =
    useMutation({
      mutationKey: [
        'poster',
        'upload',
      ],

      mutationFn: async (
        files: File[],
      ): Promise<UploadedPhoto[]> => {
        if (files.length < 1) {
          throw new Error(
            'Please select at least one photo.',
          );
        }

        if (files.length > 3) {
          throw new Error(
            'You can upload a maximum of 3 photos.',
          );
        }

        const formData = new FormData();

        files.forEach((file) => {
          if (!(file instanceof File)) {
            throw new Error(
              'Invalid photo file.',
            );
          }

          formData.append(
            'photos',
            file,
            file.name,
          );
        });

        return apiClient.postFormData<
          UploadedPhoto[]
        >(
          '/upload',
          formData,
        );
      },
    });

  /*
   * =========================================================
   * 4. CREATE / GENERATE POSTER
   *
   * POST /api/posters
   * =========================================================
   */

  const createPosterMutation =
    useMutation({
      mutationKey: [
        'poster',
        'create',
      ],

      mutationFn: async (
        payload: CreatePosterPayload,
      ): Promise<Poster> => {
        return apiClient.post<Poster>(
          '/posters',
          payload,
        );
      },

      onSuccess: (poster) => {
        queryClient.setQueryData(
          ['poster', poster._id],
          poster,
        );

        queryClient.invalidateQueries({
          queryKey: ['posters'],
        });
      },
    });

  /*
   * =========================================================
   * 5. REGENERATE POSTER
   *
   * POST /api/posters/:id/regenerate
   * =========================================================
   */

  const regenerateMutation =
    useMutation({
      mutationKey: [
        'poster',
        'regenerate',
      ],

      mutationFn: async (
        posterId: string,
      ): Promise<Poster> => {
        return apiClient.post<Poster>(
          `/posters/${posterId}/regenerate`,
        );
      },

      onSuccess: (poster) => {
        queryClient.setQueryData(
          ['poster', poster._id],
          poster,
        );

        queryClient.invalidateQueries({
          queryKey: ['posters'],
        });
      },
    });

  /*
   * =========================================================
   * 6. DELETE POSTER
   *
   * DELETE /api/posters/:id
   * =========================================================
   */

  const deleteMutation =
    useMutation({
      mutationKey: [
        'poster',
        'delete',
      ],

      mutationFn: async (
        posterId: string,
      ): Promise<null> => {
        return apiClient.delete<null>(
          `/posters/${posterId}`,
        );
      },

      onSuccess: (_data, posterId) => {
        queryClient.removeQueries({
          queryKey: [
            'poster',
            posterId,
          ],
        });

        queryClient.invalidateQueries({
          queryKey: ['posters'],
        });
      },
    });

  /*
   * =========================================================
   * PUBLIC API
   * =========================================================
   */

  return {
    /*
     * Poster history
     */

    posters:
      postersQuery.data ?? [],

    isLoading:
      postersQuery.isLoading,

    isError:
      postersQuery.isError,

    error:
      postersQuery.error,

    refetchPosters:
      postersQuery.refetch,

    /*
     * Single poster
     */

    getPoster,

    /*
     * Upload
     */

    uploadPhotos:
      uploadMutation.mutateAsync,

    isUploadingPhotos:
      uploadMutation.isPending,

    uploadError:
      uploadMutation.error,

    resetUpload:
      uploadMutation.reset,

    /*
     * Create poster
     */

    createPoster:
      createPosterMutation.mutateAsync,

    isCreatingPoster:
      createPosterMutation.isPending,

    createPosterError:
      createPosterMutation.error,

    resetCreatePoster:
      createPosterMutation.reset,

    /*
     * Regenerate
     */

    regeneratePoster:
      regenerateMutation.mutateAsync,

    isRegenerating:
      regenerateMutation.isPending,

    regenerateError:
      regenerateMutation.error,

    resetRegenerate:
      regenerateMutation.reset,

    /*
     * Delete
     */

    deletePoster:
      deleteMutation.mutateAsync,

    isDeleting:
      deleteMutation.isPending,

    deleteError:
      deleteMutation.error,

    resetDelete:
      deleteMutation.reset,
  };
}