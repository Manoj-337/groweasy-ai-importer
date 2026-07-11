"use client";

import { ChangeEvent } from "react";
import api from "@/services/api";
import { UploadResponse } from "@/types/csv";

interface Props {
  onUpload: (data: UploadResponse) => void;
}

export default function UploadArea({ onUpload }: Props) {
  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {
      const response = await api.post<UploadResponse>(
        "/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onUpload(response.data);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div className="border-2 border-dashed rounded-lg p-10 text-center">
      <input
        type="file"
        accept=".csv"
        onChange={handleUpload}
      />
    </div>
  );
}