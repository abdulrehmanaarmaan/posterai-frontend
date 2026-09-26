import Image from 'next/image';

import type {
  Poster,
} from '@/types/poster';

interface PosterPreviewProps {
  poster: Poster;
}

export default function PosterPreview({
  poster,
}: PosterPreviewProps) {
  if (
    poster.status !== 'completed' ||
    !poster.generatedImageUrl
  ) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
        <p className="font-semibold text-slate-800">
          {poster.status === 'failed'
            ? 'Poster generation failed.'
            : 'Poster is being generated...'}
        </p>

        {poster.errorMessage && (
          <p className="mt-2 text-sm text-red-600">
            {poster.errorMessage}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <Image
        src={
          poster.generatedImageUrl
        }
        alt="Generated political poster"
        width={1200}
        height={1600}
        className="h-auto w-full"
        priority
      />
    </div>
  );
}