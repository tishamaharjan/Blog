import { useRef, useState } from "react";
import Button from "./Button";

type ImageUploadVariant = "circle" | "rectangle";

type ImageUploadProps = {
  variant?: ImageUploadVariant;
  value?: File | null;
  onChange?: (file: File | null) => void;
  accept?: string;
  disabled?: boolean;
  existingImageUrl?: string | null;
};

const ImageUpload = ({
  variant = "rectangle",
  value = null,
  onChange,
  accept = "image/*",
  disabled = false,
  existingImageUrl = null,
}: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleUploadClick = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    onChange?.(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);
    onChange?.(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (disabled) return;
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    handleFile(file);
  };

  const imagePreview = preview || (value ? URL.createObjectURL(value) : null) || existingImageUrl;

  return (
    <div className="flex flex-col items-center gap-3">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        disabled={disabled}
        hidden
      />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          overflow-hidden
          border-2
          border-dashed
          border-[var(--color-border)]
          bg-[var(--color-background-secondary)]
          transition ${
            isDragging
              ? "border-[var(--color-secondary)] bg-[var(--color-secondary)]/10"
              : "border-[var(--color-border)] bg-[var(--color-background-secondary)]"
          }
          ${variant === "circle" ? "h-32 w-32 rounded-full" : "h-80 w-full rounded-lg"}
        `}
      >
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Selected image"
            className="h-full w-full object-cover"
          />
        ) : (
          <button
            type="button"
            onClick={handleUploadClick}
            disabled={disabled}
            className="flex h-full w-full flex-col items-center justify-center gap-1 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          >
            <span className="text-3xl">+</span>
            <span className="text-sm">Upload image</span>
          </button>
        )}
      </div>

      {imagePreview && (
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={handleUploadClick}
          disabled={disabled}
        >
          Change Image
        </Button>
      )}
    </div>
  );
};

export default ImageUpload;
