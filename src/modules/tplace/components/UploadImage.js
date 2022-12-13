import { Upload, Image } from "antd";
import { useEffect, useState } from "react";
import uploadCloudinary from "../utils/uploadCloudinary";

function UploadImage({ src, onChange, ...restProps }) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();

  useEffect(() => {
    if (typeof src === "string") {
      setFile(src);
    }
  }, [src]);

  const handleUpload = async ({ file, onSuccess }) => {
    try {
      setLoading(true);
      const response = await uploadCloudinary({
        file: file,
      });

      console.log("response", response);

      const url = response.data.url;
      onSuccess?.(response.statusText, file);
      onChange?.(file);
      setFile(url);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const onRemove = () => {
    setFile(undefined);
    onChange?.(undefined);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {loading && "Loading"}
      {!loading && file && (
        <Image
          src={file}
          width={100}
          height={100}
          style={{ objectFit: "cover" }}
          preview={false}
        />
      )}
      <Upload
        onChange={onChange}
        customRequest={handleUpload}
        onRemove={onRemove}
        maxCount={20}
        className="flex items-center"
        multiple={false}
        listType="picture-card"
        showUploadList={false}
        {...restProps}
      >
        Upload Image
      </Upload>
    </div>
  );
}

export default UploadImage;
