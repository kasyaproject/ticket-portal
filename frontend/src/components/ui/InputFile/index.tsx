import { cn } from "@/utils/cn";
import { Button, Input, Spinner } from "@heroui/react";
import Image from "next/image";
import { ChangeEvent, useEffect, useId, useRef } from "react";
import { CiSaveUp2, CiTrash } from "react-icons/ci";

interface PropsType {
  className?: string;
  errorMessage?: string;
  isDropable?: boolean;
  isUploading?: boolean;
  isDeleting?: boolean;
  isInvalid?: boolean;
  label?: string;
  name: string;
  onUpload?: (files: FileList) => void;
  onDelete?: () => void;
  preview?: string;
}

const InputFile = (props: PropsType) => {
  const {
    className,
    errorMessage,
    isDropable = false,
    isInvalid,
    isUploading,
    isDeleting,
    label,
    name,
    onUpload,
    onDelete,
    preview,
  } = props;
  const drop = useRef<HTMLLabelElement>(null);
  const dropZoneId = useId();

  const handleDragOver = (e: DragEvent) => {
    if (isDropable) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer?.files;

    if (files && onUpload) {
      onUpload(files);
    }
  };

  useEffect(() => {
    const dropCurrent = drop.current;
    if (dropCurrent) {
      dropCurrent.addEventListener("dragover", handleDragOver);
      dropCurrent.addEventListener("drop", handleDrop);

      return () => {
        dropCurrent.removeEventListener("dragover", handleDragOver);
        dropCurrent.removeEventListener("drop", handleDrop);
      };
    }
  }, []);

  const handleOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;

    if (files && onUpload) {
      onUpload(files);
    }
  };

  return (
    <div>
      <p className="pl-2 mb-2 text-sm font-medium text-default-700">{label}</p>
      <label
        ref={drop}
        htmlFor={`dropzone-file-${dropZoneId}`}
        className={cn(
          "flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100",
          className,
          { "border-danger-500": isInvalid },
        )}
      >
        {/* Kondisi jika sudah ada file yang di upload/drop */}
        {preview && (
          <div className="relative flex flex-col items-center justify-center p-5">
            {/* Preview image */}
            <div className="w-1/2 mb-2">
              <Image fill src={preview} alt="image" className="!relative" />
            </div>

            {/* Button remove image */}
            <Button
              isIconOnly
              onPress={onDelete}
              disabled={isDeleting}
              className="absolute flex items-center justify-center rounded right-2 top-2 h-9 w-9 bg-danger-100"
            >
              {isDeleting ? (
                <Spinner size="sm" color="primary" />
              ) : (
                <CiTrash className="w-5 h-5 text-primary" />
              )}
            </Button>
          </div>
        )}

        {/* Kondisi sebelum ada file */}
        {!preview && !isUploading && (
          <div className="flex flex-col items-center justify-center p-5">
            <CiSaveUp2 className="w-10 h-10 mb-2 text-gray-400" />

            <p className="text-sm font-semibold text-center text-gray-500">
              {isDropable
                ? "Drag and drop or click to upload file here!"
                : "Click to upload file here!"}
            </p>
          </div>
        )}

        {/* Kondisi jika sedang upload */}
        {isUploading && (
          <div className="flex items-center justify-center p-5">
            <Spinner color="primary" size="sm" />
          </div>
        )}

        <Input
          name={name}
          type="file"
          className="hidden"
          accept="image/*"
          id={`dropzone-file-${dropZoneId}`}
          onChange={handleOnUpload}
          disabled={preview !== ""}
          onClick={(e) => {
            e.currentTarget.value = "";
            e.target.dispatchEvent(new Event("change", { bubbles: true }));
          }}
        />
      </label>

      {isInvalid && (
        <p className="p-1 text-xs text-danger-500">{errorMessage}</p>
      )}
    </div>
  );
};
export default InputFile;
