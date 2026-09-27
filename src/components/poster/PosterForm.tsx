"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import PhotoUploader from "@/components/poster/PhotoUploader";

import { posterSchema, type PosterFormValues } from "@/schemas/poster.schema";

import { OCCASIONS } from "@/constants/occasions";
import { useTemplates } from "@/hooks/useTemplates";
import { usePosters } from "@/hooks/usePosters";

interface PosterFormProps {
  templateId: string;
}

export default function PosterForm({ templateId }: PosterFormProps) {
  const router = useRouter();

  const { templates, isLoading: templatesLoading } = useTemplates();

  const { uploadPhotos, createPoster, isUploadingPhotos, isCreatingPoster } =
    usePosters();

  /*
   * Convert backend templates into the shape
   * required by the template select.
   */
  const templateOptions = useMemo(
    () =>
      templates.map((template) => ({
        value: template._id,
        label: template.title,
      })),
    [templates],
  );

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PosterFormValues>({
    resolver: zodResolver(posterSchema),

    defaultValues: {
      templateId: "",
      name: "",
      designation: "",
      partyOrOrganization: "",
      unionOrThana: "",
      district: "",
      occasion: "",
      headline: "",
      photos: [],
    },
  });

  /*
   * The template list is fetched asynchronously.
   *
   * Therefore, do not depend only on defaultValues.
   * Once the templates have loaded, verify that the
   * template from the URL exists and explicitly set it
   * in React Hook Form.
   */
  useEffect(() => {
    if (!templateId || templates.length === 0) {
      return;
    }

    const selectedTemplate = templates.find(
      (template) => template._id === templateId,
    );

    if (!selectedTemplate) {
      return;
    }

    setValue("templateId", selectedTemplate._id, {
      shouldValidate: true,
      shouldDirty: false,
    });
  }, [templateId, templates, setValue]);

  const onSubmit = async (values: PosterFormValues) => {
    try {
      /*
       * Backend requires 1–3 photos.
       */
      if (values.photos.length < 1) {
        throw new Error("Please upload at least one photo.");
      }

      if (values.photos.length > 3) {
        throw new Error("You can upload a maximum of 3 photos.");
      }

      /*
       * Step 1:
       * Upload actual File objects.
       */
      const uploadedPhotos = await uploadPhotos(values.photos);

      /*
       * Step 2:
       * Create the poster.
       */
      const poster = await createPoster({
        templateId: values.templateId,

        name: values.name,

        designation: values.designation,

        party: values.partyOrOrganization,

        /*
         * Current MVP form has one combined
         * Union / Thana field.
         *
         * Backend currently expects both fields.
         */
        union: values.unionOrThana,

        thana: values.unionOrThana,

        district: values.district,

        occasionType: values.occasion,

        headline: values.headline,

        photos: uploadedPhotos.map((photo) => ({
          url: photo.url,
          publicId: photo.publicId,
        })),
      });

      /*
       * Backend generation is synchronous:
       *
       * upload photos
       * → Gemini
       * → Puppeteer
       * → Cloudinary
       * → MongoDB
       *
       * Therefore, a successful response already
       * contains the generated poster.
       */
      router.push(`/posters/${poster._id}`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to generate poster.";

      console.error("Poster generation failed:", message);

      /*
       * Replace this with your preferred toast
       * or SweetAlert implementation.
       */
    }
  };

  const isGenerating = isSubmitting || isUploadingPhotos || isCreatingPoster;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      {/* Template */}
      <section>
        <div className="mb-5">
          <h2 className="text-lg font-semibold">Poster template</h2>

          <p className="mt-1 text-sm text-slate-600">
            Choose the base design for your poster.
          </p>
        </div>

        <Controller
          name="templateId"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <label
                htmlFor="templateId"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Template
              </label>

              <select
                id="templateId"
                name={field.name}
                ref={field.ref}
                value={field.value ?? ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={templatesLoading || templateOptions.length === 0}
                className={[
                  "block min-h-11 w-full rounded-lg border bg-white px-3.5 py-2.5",
                  "text-sm text-slate-900 outline-none",
                  "focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20",
                  "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500",
                  fieldState.error ? "border-red-500" : "border-slate-300",
                ].join(" ")}
              >
                <option value="">
                  {templatesLoading
                    ? "Loading templates..."
                    : "Select a template"}
                </option>

                {templateOptions.map((template) => (
                  <option key={template.value} value={template.value}>
                    {template.label}
                  </option>
                ))}
              </select>

              {fieldState.error?.message && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />

        {!templatesLoading && templateOptions.length === 0 && (
          <p className="mt-2 text-sm text-amber-600">
            No poster templates are currently available. Please try again later.
          </p>
        )}
      </section>

      {/* Personal / organization information */}
      <section className="border-t pt-8">
        <div className="mb-5">
          <h2 className="text-lg font-semibold">Poster information</h2>

          <p className="mt-1 text-sm text-slate-600">
            Enter the information that should appear on the poster.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Name"
            placeholder="Full name"
            {...register("name")}
            error={errors.name?.message}
          />

          <Input
            label="Designation / পদবি"
            placeholder="e.g. General Secretary"
            {...register("designation")}
            error={errors.designation?.message}
          />

          <Input
            label="Party / Organization"
            placeholder="Party or organization name"
            {...register("partyOrOrganization")}
            error={errors.partyOrOrganization?.message}
          />

          <Input
            label="Union / Thana"
            placeholder="Union or thana"
            {...register("unionOrThana")}
            error={errors.unionOrThana?.message}
          />

          <Input
            label="District"
            placeholder="District"
            {...register("district")}
            error={errors.district?.message}
          />

          <div>
            <label
              htmlFor="occasion"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Occasion
            </label>

            <select
              id="occasion"
              {...register("occasion")}
              className={[
                "block min-h-11 w-full rounded-lg border bg-white px-3.5 py-2.5",
                "text-sm text-slate-900 outline-none",
                "focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20",
                errors.occasion ? "border-red-500" : "border-slate-300",
              ].join(" ")}
            >
              <option value="" disabled>
                Select an occasion
              </option>

              {OCCASIONS.map((occasion) => (
                <option key={occasion.value} value={occasion.value}>
                  {occasion.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {errors.occasion?.message && (
          <p className="mt-1.5 text-xs font-medium text-red-600">
            {errors.occasion.message}
          </p>
        )}
      </section>

      {/* Headline */}
      <section className="border-t pt-8">
        <div className="mb-5">
          <h2 className="text-lg font-semibold">Bangla headline</h2>

          <p className="mt-1 text-sm text-slate-600">
            Enter the exact headline you want rendered on the final poster.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="headline" className="block text-sm font-medium">
            Headline
          </label>

          <textarea
            id="headline"
            rows={4}
            placeholder="বাংলা শিরোনাম লিখুন"
            {...register("headline")}
            className={[
              "block w-full resize-y rounded-lg border bg-white px-3.5 py-3",
              "text-base leading-7 text-slate-900 outline-none",
              "placeholder:text-slate-400",
              "focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20",
              errors.headline ? "border-red-500" : "border-slate-300",
            ].join(" ")}
          />

          {errors.headline?.message && (
            <p className="text-xs font-medium text-red-600">
              {errors.headline.message}
            </p>
          )}
        </div>
      </section>

      {/* Photos */}
      <section className="border-t pt-8">
        <Controller
          name="photos"
          control={control}
          render={({ field, fieldState }) => (
            <PhotoUploader
              photos={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />
      </section>

      {/* Submit */}
      <section className="border-t pt-8">
        <div className="flex flex-col gap-4 rounded-xl bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {isGenerating
                ? "Generating your poster..."
                : "Ready to generate?"}
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              {isGenerating
                ? "Your photos are being uploaded and your poster is being generated."
                : "Your photos and poster information will be processed to generate the final design."}
            </p>
          </div>

          <Button
            type="submit"
            loading={isGenerating}
            disabled={isGenerating}
            className="w-full sm:w-auto"
          >
            {isGenerating ? "Generating..." : "Generate Poster"}
          </Button>
        </div>
      </section>
    </form>
  );
}
