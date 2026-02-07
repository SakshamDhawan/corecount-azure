import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

import { getBaseURL } from "../utils/api.tsx";

type FormValues = {
  file: FileList;
};

const MediaManager = () => {
  const { register, handleSubmit } = useForm<FormValues>();

  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(`${getBaseURL()}/files`);
        const data = await response.json();
        setFiles(data.files);
      } catch (error) {
        console.error("Failed to fetch files", error);
      }
    };

    fetchFiles();
  }, []);

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);

    try {
      const response = await axios.post(`${getBaseURL()}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully", response.data);
    } catch (error) {
      console.error("Failed to upload file", error);
    }
  };

  return (
    <>
      <h2>Uploaded Files</h2>
      <ul>
        {files?.map((file, index) => (
          <li key={index}>
            {file.endsWith(".png") && <img src={`http://localhost:3003/uploads/${file}`} />}
            {file.endsWith(".mp4") && <video src={`http://localhost:3003/uploads/${file}`}></video>}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" {...register("file")} required />
        <button type="submit">Upload</button>
      </form>
    </>
  );
};

export default MediaManager;
