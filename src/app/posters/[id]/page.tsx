'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import {
  usePoster,
} from '@/hooks/usePoster';

import PosterPreview from '@/components/poster/PosterPreview';
import PosterActions from '@/components/poster/PosterActions';

export default function PosterDetailPage() {
  const params =
    useParams<{
      id: string;
    }>();

  const {
    data: poster,
    isLoading,
    isError,
    error,
  } = usePoster(params.id);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <p className="text-center text-sm text-slate-500">
          Loading poster...
        </p>
      </main>
    );
  }

  if (isError || !poster) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
          {error?.message ??
            'Poster not found.'}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Link
        href="/posters"
        className="text-sm font-medium text-teal-700"
      >
        ← Back to history
      </Link>

      <div className="mt-6">
        <PosterPreview
          poster={poster}
        />

        <PosterActions
          poster={poster}
        />
      </div>
    </main>
  );
}