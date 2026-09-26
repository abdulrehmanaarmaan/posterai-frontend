'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

import type {
  Template,
} from '@/types/template';

interface TemplateCardProps {
  template: Template;
}

export default function TemplateCard({
  template,
}: TemplateCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link
        href={`/create-poster?templateId=${template._id}`}
        className="block"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
          <Image
            src={
              template.thumbnailUrl ??
              template.previewUrl
            }
            alt={`${template.title} poster template`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />

          {!template.isActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60">
              <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-900">
                Unavailable
              </span>
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold text-slate-900">
                {template.title}
              </h3>

              <p className="mt-1 text-xs font-medium capitalize text-teal-700">
                {template.occasionType}
              </p>
            </div>

            {template.isActive && (
              <CheckCircle2
                size={18}
                className="shrink-0 text-teal-600"
                aria-label="Available"
              />
            )}
          </div>

          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
            Use template

            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}