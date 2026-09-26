import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section aria-labelledby="hero-heading" className="border-b">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider">
              AI Political Poster Maker
            </p>

            <h1
              id="hero-heading"
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Create professional political posters in minutes.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Create campaign and event posters using customizable templates,
              your own photos, and AI-assisted layouts.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/create-poster"
                className="inline-flex min-h-11 items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold"
              >
                Create a Poster
              </Link>

              <Link
                href="/templates"
                className="inline-flex min-h-11 items-center justify-center rounded-lg border px-6 py-3 text-sm font-semibold"
              >
                Browse Templates
              </Link>
            </div>
          </div>

          <div
            role="img"
            aria-label="Poster preview"
            className="min-h-100 rounded-2xl border bg-slate-50"
          >
            {/* Hero poster preview */}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section aria-labelledby="how-it-works-heading" className="border-b">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider">
              Simple workflow
            </p>

            <h2
              id="how-it-works-heading"
              className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              From idea to poster in three steps.
            </h2>
          </div>

          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            <li className="rounded-xl border p-6">
              <span className="text-sm font-semibold">01</span>

              <h3 className="mt-4 text-lg font-semibold">Choose a template</h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Select a design based on your occasion and preferred visual
                style.
              </p>
            </li>

            <li className="rounded-xl border p-6">
              <span className="text-sm font-semibold">02</span>

              <h3 className="mt-4 text-lg font-semibold">
                Add your information
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Provide your name, organization, location, headline, and photos.
              </p>
            </li>

            <li className="rounded-xl border p-6">
              <span className="text-sm font-semibold">03</span>

              <h3 className="mt-4 text-lg font-semibold">
                Generate and download
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Generate your poster, review it, regenerate if needed, and
                download the final image.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* Occasion / Template Preview */}
      <section aria-labelledby="templates-heading" className="border-b">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider">
                Template library
              </p>

              <h2
                id="templates-heading"
                className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Start with a professional design.
              </h2>
            </div>

            <Link href="/templates" className="text-sm font-semibold">
              View all templates
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Template preview cards */}
          </div>
        </div>
      </section>

      {/* Features */}
      <section aria-labelledby="features-heading">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider">
              Built for speed
            </p>

            <h2
              id="features-heading"
              className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Everything needed for the MVP.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-xl border p-6">
              <h3 className="font-semibold">AI-assisted layouts</h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Generate layout recommendations while keeping final text
                rendering deterministic.
              </p>
            </article>

            <article className="rounded-xl border p-6">
              <h3 className="font-semibold">High-resolution export</h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Produce print-ready poster images suitable for digital sharing.
              </p>
            </article>

            <article className="rounded-xl border p-6">
              <h3 className="font-semibold">Poster history</h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Keep generated posters organized and accessible from your
                account.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-labelledby="cta-heading" className="border-t">
        <div className="mx-auto w-full max-w-4xl px-4 py-16 text-center sm:px-6 md:py-20">
          <h2
            id="cta-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Ready to create your poster?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Choose a template and start creating your poster.
          </p>

          <Link
            href="/create-poster"
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold"
          >
            Start Creating
          </Link>
        </div>
      </section>
    </main>
  );
}
