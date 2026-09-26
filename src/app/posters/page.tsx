'use client';

import Link from 'next/link';

import {
  usePosters,
} from '@/hooks/usePosters';
import AuthenticationGuard from '@/components/auth/AuthenticationGuard';

export default function PostersPage() {
  const {
    posters,
    isLoading
  } = usePosters();

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        <p className="text-center text-sm text-slate-500">
          Loading poster history...
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <AuthenticationGuard>
      <div className="mb-8">
        <p className="text-sm font-semibold text-teal-700">
          Your posters
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Poster history
        </h1>
      </div>

      {!posters.length ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <p className="text-sm text-slate-500">
            You haven't generated any posters yet.
          </p>

          <Link
            href="/templates"
            className="mt-4 inline-flex rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white"
          >
            Browse templates
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posters.map((poster) => (
            <Link
              key={poster._id}
              href={`/posters/${poster._id}`}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              {poster.generatedImageUrl ? (
                <img
                  src={
                    poster.generatedImageUrl
                  }
                  alt={
                    poster.headline
                  }
                  className="aspect-[3/4] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[3/4] items-center justify-center bg-slate-100">
                  <span className="text-sm text-slate-500">
                    {poster.status}
                  </span>
                </div>
              )}

              <div className="p-4">
                <h2 className="font-semibold text-slate-900">
                  {poster.headline}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {poster.name}
                </p>

                <p className="mt-2 text-xs capitalize text-teal-700">
                  {poster.occasionType}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
      </AuthenticationGuard>
    </main>
  );
}