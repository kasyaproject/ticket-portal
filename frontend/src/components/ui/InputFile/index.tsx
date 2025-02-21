import { cn } from "@/utils/cn";
import { Input } from "@heroui/react";
import Image from "next/image";
import { ChangeEvent, useEffect, useId, useRef, useState } from "react";
import { CiSaveUp2 } from "react-icons/ci";

interface PropsType {
  name: string;
  className?: string;
  isDropable?: boolean;
}

const InputFile = (props: PropsType) => {
  const { name, className, isDropable = false } = props;
  const [uploadedImg, setUploadedImg] = useState<File | null>(null);
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

    setUploadedImg(e.dataTransfer?.files?.[0] || null);
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

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      setUploadedImg(files[0]);
    }
  };

  return (
    <label
      ref={drop}
      htmlFor={`dropzone-file-${dropZoneId}`}
      className={cn(
        "flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100",
        className,
      )}
    >
      {uploadedImg ? (
        <div className="flex flex-col items-center justify-center p-5">
          <div className="w-1/2 mb-2">
            <Image
              fill
              src={URL.createObjectURL(uploadedImg)}
              alt="image"
              className="!relative"
            />
          </div>

          <p className="text-sm font-semibold text-center text-gray-500">
            {uploadedImg.name}
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-5">
          <CiSaveUp2 className="w-10 h-10 mb-2 text-gray-400" />

          <p className="text-sm font-semibold text-center text-gray-500">
            {isDropable
              ? "Drag and drop or click to upload file here!"
              : "Click to upload file here!"}
          </p>
        </div>
      )}
      <Input
        name={name}
        type="file"
        className="hidden"
        accept="image/*"
        id={`dropzone-file-${dropZoneId}`}
        onChange={handleOnChange}
      />
    </label>
  );
};
export default InputFile;
