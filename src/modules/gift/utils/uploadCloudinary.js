import axios from "axios";

export const uploadCloudinary = async ({ file, onUploadProgress }) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
  return axios({
    method: "POST",
    url: process.env.REACT_APP_CLOUDINARY_UPLOAD_URL,
    data,
    headers: {
      "Content-Type": file.type,
    },
    onUploadProgress: (progressEvent) => {
      onUploadProgress?.(
        Math.round((progressEvent.loaded * 100) / progressEvent.total)
      );
    },
  });
};

export default uploadCloudinary;
