'use client';

import Link from 'next/link';

import PosterCard from '@/components/poster/PosterCard';
import Spinner from '@/components/ui/Spinner';
import { usePosters } from '@/hooks/usePosters';


export default function PosterHistoryGrid() {
  const {
    posters,
    isLoading,
    isError,
    error,
  } = usePosters();

  if (isLoading) {
    return (
      <div className="flex min-h-72 items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-600">
          <Spinner size="lg" />

          <p className="text-sm">
            Loading your posters...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        role="alert"
        className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center"
      >
        <h3 className="font-semibold text-red-900">
          Unable to load your posters
        </h3>

        <p className="mt-2 text-sm text-red-700">
          {error instanceof Error
            ? error.message
            : 'Please try again later.'}
        </p>
      </div>
    );
  }

  if (!posters.length) {
    return (
      <div className="rounded-2xl border bg-white px-6 py-16 text-center">
        <h3 className="text-lg font-semibold">
          No posters yet
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
          Create your first poster and it
          will appear here for future
          download and regeneration.
        </p>

        <Link
          href="/create-poster"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-800"
        >
          Create your first poster
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {posters.map((poster) => (
        <PosterCard
          key={poster._id}
          poster={poster}
        />
      ))}
    </div>
  );
}