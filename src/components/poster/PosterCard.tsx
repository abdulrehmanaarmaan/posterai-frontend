'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
  ArrowRight,
  Download,
} from 'lucide-react';

import type {
  Poster,
} from '@/types/poster';

interface PosterCardProps {
  poster: Poster;
}

export default function PosterCard({
  poster,
}: PosterCardProps) {
  const handleDownload = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (!poster.generatedImageUrl) {
      return;
    }

    const link =
      document.createElement('a');

    link.href =
      poster.generatedImageUrl;

    link.download = `poster-${poster._id}.png`;

    link.target = '_blank';

    link.rel = 'noreferrer';

    document.body.appendChild(link);

    link.click();

    link.remove();
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link
        href={`/posters/${poster._id}`}
        className="block"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
          {poster.generatedImageUrl ? (
            <Image
              src={poster.generatedImageUrl}
              alt={`Poster for ${poster.name}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-sm text-slate-500">
              No preview available
            </div>
          )}

          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold capitalize text-slate-700 shadow-sm">
            {poster.status}
          </span>
        </div>

        <div className="p-5">
          <h3 className="truncate text-base font-semibold text-slate-900">
            {poster.headline}
          </h3>

          <p className="mt-1 truncate text-sm text-slate-600">
            {poster.name}
          </p>

          <p className="mt-3 text-xs text-slate-500">
            {new Date(
              poster.createdAt,
            ).toLocaleDateString()}
          </p>

          <div className="mt-5 flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
              View poster
              <ArrowRight
                size={15}
                aria-hidden="true"
              />
            </span>

            {poster.generatedImageUrl &&
              poster.status ===
                'completed' && (
                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  aria-label="Download poster"
                >
                  <Download
                    size={16}
                    aria-hidden="true"
                  />
                </button>
              )}
          </div>
        </div>
      </Link>
    </article>
  );
}