import { v2 as cloudinary } from "cloudinary";

import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} from "./env";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const toDataURL = (file: Express.Multer.File) => {
  const b64 = Buffer.from(file.buffer).toString("base64");
  const DataURL = `data:${file.mimetype};base64,${b64}`;

  return DataURL;
};

const getPublicIdFromFileUrl = (fileUrl: string) => {
  const fileNameUsingSubString = fileUrl.substring(
    fileUrl.lastIndexOf("/") + 1
  );

  const publicId = fileNameUsingSubString.substring(
    0,
    fileNameUsingSubString.lastIndexOf(".")
  );

  return publicId;
};

export default {
  // Function upload single foto
  async uploadSingle(file: Express.Multer.File) {
    const fileDataUrl = toDataURL(file);
    const result = await cloudinary.uploader.upload(fileDataUrl, {
      resource_type: "auto",
    });

    return result;
  },

  // function upload multiple foto
  async uploadMultiple(files: Express.Multer.File[]) {
    const uploadBatch = files.map((item) => {
      const result = this.uploadSingle(item);

      return result;
    });

    const result = await Promise.all(uploadBatch);

    return result;
  },

  // function remove/delete foto
  async remove(fileUrl: string) {
    const publicId = getPublicIdFromFileUrl(fileUrl);
    const result = await cloudinary.uploader.destroy(publicId);

    return result;
  },
};
