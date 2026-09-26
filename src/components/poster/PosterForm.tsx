"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import {
  useForm,
  Controller,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import PhotoUploader from "@/components/poster/PhotoUploader";

import {
  posterSchema,
  type PosterFormValues,
} from "@/schemas/poster.schema";

import { OCCASIONS } from "@/constants/occasions";
import { useTemplates } from "@/hooks/useTemplates";
import { usePosters } from "@/hooks/usePosters";

interface PosterFormProps {
  templateId: string;
}

export default function PosterForm({
  templateId,
}: PosterFormProps) {
  const router = useRouter();

  const {
    templates,
    isLoading: templatesLoading,
  } = useTemplates();

  const {
    uploadPhotos,
    createPoster,
    isUploadingPhotos,
    isCreatingPoster,
  } = usePosters();

  /*
   * Convert backend templates into the shape
   * required by the Select component.
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
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<PosterFormValues>({
    resolver: zodResolver(posterSchema),

    defaultValues: {
      templateId: templateId ?? "",
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
   * URL:
   *
   * /create-poster?templateId=abc123
   *
   * Once the templates have loaded, make sure the
   * URL template ID actually exists in the template
   * library and then set it as the selected value.
   */
  useEffect(() => {
    if (!templateId || templates.length === 0) {
      return;
    }

    const templateExists = templates.some(
      (template) => template._id === templateId,
    );

    if (templateExists) {
      setValue(
        "templateId",
        templateId,
        {
          shouldValidate: true,
          shouldDirty: false,
        },
      );
    }
  }, [
    templateId,
    templates,
    setValue,
  ]);

  const onSubmit = async (
    values: PosterFormValues,
  ) => {
    try {
      /*
       * Backend requires 1–3 photos.
       */
      if (values.photos.length < 1) {
        throw new Error(
          "Please upload at least one photo.",
        );
      }

      if (values.photos.length > 3) {
        throw new Error(
          "You can upload a maximum of 3 photos.",
        );
      }

      /*
       * Step 1:
       * Upload actual File objects.
       */
      const uploadedPhotos =
        await uploadPhotos(values.photos);

      /*
       * Step 2:
       * Create the poster.
       *
       * Property names here must match the
       * backend createPosterSchema.
       */
      const poster =
        await createPoster({
          templateId:
            values.templateId,

          name:
            values.name,

          designation:
            values.designation,

          party:
            values.partyOrOrganization,

          /*
           * Current backend expects separate
           * union and thana fields.
           *
           * Current MVP form has one combined
           * Union / Thana input, so we store
           * the same value in both fields.
           */
          union:
            values.unionOrThana,

          thana:
            values.unionOrThana,

          district:
            values.district,

          occasionType:
            values.occasion,

          headline:
            values.headline,

          photos:
            uploadedPhotos.map(
              (photo) => ({
                url: photo.url,
                publicId:
                  photo.publicId,
              }),
            ),
        });

      /*
       * Backend generation is currently
       * synchronous:
       *
       * upload photos
       * → Gemini
       * → Puppeteer
       * → Cloudinary
       * → MongoDB
       *
       * Therefore the returned poster is
       * already completed when successful.
       */
      router.push(
        `/posters/${poster._id}`,
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to generate poster.";

      console.error(
        "Poster generation failed:",
        message,
      );

      /*
       * Replace with your preferred toast
       * or SweetAlert implementation.
       */
      // await Swal.fire({
      //   icon: "error",
      //   title: "Generation failed",
      //   text: message,
      // });
    }
  };

  const isGenerating =
    isSubmitting ||
    isUploadingPhotos ||
    isCreatingPoster;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
      noValidate
    >
      {/* Template */}
      <section>
        <div className="mb-5">
          <h2 className="text-lg font-semibold">
            Poster template
          </h2>

          <p className="mt-1 text-sm text-slate-600">
            Choose the base design for your poster.
          </p>
        </div>

        {/*
         * Controller is intentionally used here
         * instead of register().
         *
         * This makes the selected template a
         * controlled value and guarantees that
         * setValue() updates the Select.
         */}
        <Controller
          name="templateId"
          control={control}
          render={({
            field,
            fieldState,
          }) => (
            <Select
              label="Template"
              options={[
                {
                  value: "",
                  label: templatesLoading
                    ? "Loading templates..."
                    : "Select a template",
                },
                ...templateOptions,
              ]}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              disabled={
                templatesLoading ||
                templateOptions.length === 0
              }
              error={
                fieldState.error?.message
              }
            />
          )}
        />

        {!templatesLoading &&
          templateOptions.length === 0 && (
            <p className="mt-2 text-sm text-amber-600">
              No poster templates are currently
              available. Please try again later.
            </p>
          )}
      </section>

      {/* Personal / organization information */}
      <section className="border-t pt-8">
        <div className="mb-5">
          <h2 className="text-lg font-semibold">
            Poster information
          </h2>

          <p className="mt-1 text-sm text-slate-600">
            Enter the information that should appear
            on the poster.
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
            error={
              errors.designation?.message
            }
          />

          <Input
            label="Party / Organization"
            placeholder="Party or organization name"
            {...register(
              "partyOrOrganization",
            )}
            error={
              errors.partyOrOrganization
                ?.message
            }
          />

          <Input
            label="Union / Thana"
            placeholder="Union or thana"
            {...register("unionOrThana")}
            error={
              errors.unionOrThana?.message
            }
          />

          <Input
            label="District"
            placeholder="District"
            {...register("district")}
            error={
              errors.district?.message
            }
          />

          <Select
            label="Occasion"
            options={OCCASIONS}
            {...register("occasion")}
            error={
              errors.occasion?.message
            }
          />
        </div>
      </section>

      {/* Headline */}
      <section className="border-t pt-8">
        <div className="mb-5">
          <h2 className="text-lg font-semibold">
            Bangla headline
          </h2>

          <p className="mt-1 text-sm text-slate-600">
            Enter the exact headline you want rendered
            on the final poster.
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="headline"
            className="block text-sm font-medium"
          >
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
              errors.headline
                ? "border-red-500"
                : "border-slate-300",
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
          render={({
            field,
            fieldState,
          }) => (
            <PhotoUploader
              photos={field.value}
              onChange={field.onChange}
              error={
                fieldState.error?.message
              }
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
            {isGenerating
              ? "Generating..."
              : "Generate Poster"}
          </Button>
        </div>
      </section>
    </form>
  );
}