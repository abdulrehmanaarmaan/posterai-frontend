'use client';

interface PhotoUploaderProps {
  photos: File[];
  onChange: (files: File[]) => void;
  error?: string;
  disabled?: boolean;
}

const MAX_PHOTOS = 3;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
];

export default function PhotoUploader({
  photos,
  onChange,
  error,
  disabled = false,
}: PhotoUploaderProps) {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFiles = Array.from(
      event.target.files ?? [],
    );

    if (!selectedFiles.length) {
      return;
    }

    const validFiles = selectedFiles
      .filter((file) =>
        ALLOWED_TYPES.includes(file.type),
      )
      .filter(
        (file) =>
          file.size <= MAX_FILE_SIZE,
      )
      .slice(0, MAX_PHOTOS);

    onChange(validFiles);

    /*
     * Reset the input value so the user can
     * select the same file again later if needed.
     */
    event.target.value = '';
  };

  return (
    <div>
      <label
        htmlFor="poster-photos"
        className="mb-2 block text-sm font-semibold text-slate-800"
      >
        Photos
      </label>

      <input
        id="poster-photos"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        disabled={disabled}
        onChange={handleChange}
        className={[
          'block w-full rounded-xl border bg-white p-3 text-sm',
          error
            ? 'border-red-500'
            : 'border-slate-300',
        ].join(' ')}
      />

      <p className="mt-2 text-xs text-slate-500">
        Upload 1–3 JPG, PNG, or WebP images.
        Maximum 5 MB per image.
      </p>

      {photos.length > 0 && (
        <p className="mt-2 text-sm text-slate-600">
          {photos.length} photo
          {photos.length > 1 ? 's' : ''}{' '}
          selected
        </p>
      )}

      {error && (
        <p className="mt-2 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}