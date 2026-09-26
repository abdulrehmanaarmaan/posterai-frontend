import AuthenticationGuard from "@/components/auth/AuthenticationGuard";
import PosterForm from "@/components/poster/PosterForm";
import Link from "next/link";
import { Suspense } from "react";

const CreatePoster = async (
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>,
) => {
  const resolvedParams = await searchParams;

  const templateId = resolvedParams.templateId;

  return (
    <main className="min-h-screen bg-slate-50">
      <AuthenticationGuard>
        <section
          aria-labelledby="create-poster-heading"
          className="border-b bg-white"
        >
          <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-wider">
                  Poster generator
                </p>

                <h1
                  id="create-poster-heading"
                  className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
                >
                  Create a new poster
                </h1>

                <p className="mt-4 text-base leading-7 text-slate-600">
                  Provide your poster information, upload your photos, and
                  generate a professional poster layout.
                </p>
              </div>

              <Link
                href="/templates"
                className="inline-flex min-h-10 items-center justify-center rounded-lg border px-4 py-2 text-sm font-semibold"
              >
                Browse Templates
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            {/* Main form */}

            <Suspense
              fallback={
                <div className="rounded-xl border border-slate-200 bg-white p-6">
                  Loading poster form...
                </div>
              }
            >
              <div className="min-w-0 rounded-2xl border bg-white p-5 shadow-sm sm:p-8">
                <PosterForm templateId={templateId as string} />
              </div>
            </Suspense>

            {/* Guidance panel */}
            <aside
              aria-labelledby="poster-guidance-heading"
              className="h-fit rounded-2xl border bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-6"
            >
              <h2
                id="poster-guidance-heading"
                className="text-lg font-semibold"
              >
                Before you generate
              </h2>

              <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
                <li>Use a clear Bangla headline that fits the occasion.</li>

                <li>Upload high-quality photos with good lighting.</li>

                <li>
                  Keep names, designations, and organization information
                  accurate.
                </li>

                <li>
                  You can regenerate the poster if the initial layout needs
                  improvement.
                </li>
              </ul>
            </aside>
          </div>
        </section>
      </AuthenticationGuard>
    </main>
  );
};

export default CreatePoster;
