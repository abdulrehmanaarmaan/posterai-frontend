'use client';

import {
  CheckCircle2,
  CircleAlert,
  LoaderCircle,
} from 'lucide-react';

import type {
  PosterStatus,
} from '@/types/poster';

interface GenerationStatusProps {
  status: PosterStatus;
  errorMessage?: string;
}

const statusConfig: Record<
  PosterStatus,
  {
    label: string;
    description: string;
  }
> = {
  generating: {
    label: 'Generating poster',
    description:
      'AI is preparing the layout and your poster is being rendered.',
  },

  completed: {
    label: 'Poster ready',
    description:
      'Your poster has been generated successfully.',
  },

  failed: {
    label: 'Generation failed',
    description:
      'The poster could not be generated.',
  },
};

export default function GenerationStatus({
  status,
  errorMessage,
}: GenerationStatusProps) {
  const config =
    statusConfig[status];

  if (status === 'completed') {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
        <CheckCircle2
          size={20}
          className="mt-0.5 shrink-0 text-emerald-600"
          aria-hidden="true"
        />

        <div>
          <p className="text-sm font-semibold text-emerald-900">
            {config.label}
          </p>

          <p className="mt-1 text-xs leading-5 text-emerald-700">
            {config.description}
          </p>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div
        role="alert"
        className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
      >
        <CircleAlert
          size={20}
          className="mt-0.5 shrink-0 text-red-600"
          aria-hidden="true"
        />

        <div>
          <p className="text-sm font-semibold text-red-900">
            {config.label}
          </p>

          <p className="mt-1 text-xs leading-5 text-red-700">
            {errorMessage ||
              config.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      aria-live="polite"
      className="flex items-start gap-3 rounded-xl border border-teal-200 bg-teal-50 p-4"
    >
      <LoaderCircle
        size={20}
        className="mt-0.5 shrink-0 animate-spin text-teal-700"
        aria-hidden="true"
      />

      <div>
        <p className="text-sm font-semibold text-teal-900">
          {config.label}
        </p>

        <p className="mt-1 text-xs leading-5 text-teal-700">
          {config.description}
        </p>
      </div>
    </div>
  );
}