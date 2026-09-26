'use client';

import Link from 'next/link';

import {
  usePosters,
} from '@/hooks/usePosters';

import type {
  Poster,
} from '@/types/poster';

interface PosterActionsProps {
  poster: Poster;
}

export default function PosterActions({
  poster,
}: PosterActionsProps) {
  const {
    regeneratePoster,
    isRegenerating,
  } = usePosters();

  if (
    poster.status !== 'completed'
  ) {
    return null;
  }

  const attemptsRemaining =
    Math.max(
      0,
      poster.maxGenerationAttempts -
        poster.generationAttempts
    );

  const handleRegenerate =
    async () => {
      await regeneratePoster(
        poster._id
      );
    };

  const handleDelete =
    async () => {
      const confirmed =
        window.confirm(
          'Delete this poster?'
        );

      if (!confirmed) {
        return;
      }
    };

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {poster.generatedImageUrl && (
        <a
          href={
            poster.generatedImageUrl
          }
          download
          target="_blank"
          rel="noreferrer"
          className="rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
        >
          Download PNG
        </a>
      )}

      {attemptsRemaining > 0 && (
        <button
          type="button"
          onClick={
            handleRegenerate
          }
          disabled={
            isRegenerating
          }
          className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-800 disabled:opacity-50"
        >
          {isRegenerating
            ? 'Regenerating...'
            : `Regenerate (${attemptsRemaining} left)`}
        </button>
      )}

      <button
        type="button"
        onClick={
          handleDelete
        }

        className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-700 disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}