"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, FileText } from "lucide-react";

import api from "@/services/api";

interface Props {
  setPreviewData: (data: any) => void;
}

export default function UploadCard({ setPreviewData }: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return;

      const file = acceptedFiles[0];
      setSelectedFile(file);

      const formData = new FormData();
      formData.append("file", file);

      try {
        setUploading(true);

        const response = await api.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setPreviewData(response.data);
      } catch (error) {
        console.error("Upload Error:", error);
        alert("Failed to upload CSV");
      } finally {
        setUploading(false);
      }
    },
    [setPreviewData]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        mt-10
        rounded-2xl
        border-2
        border-dashed
        p-12
        bg-white
        shadow-md
        cursor-pointer
        transition-all
        duration-300
        text-center

        ${
          isDragActive
            ? "border-blue-600 bg-blue-50 scale-[1.01]"
            : "border-gray-300 hover:border-blue-500 hover:shadow-lg"
        }
      `}
    >
      <input {...getInputProps()} />

      <UploadCloud
        size={60}
        className="mx-auto text-blue-600"
      />

      <h2 className="mt-6 text-3xl font-bold">
        Drag & Drop your CSV
      </h2>

      <p className="text-gray-500 mt-3">
        or click anywhere to browse
      </p>

      <p className="text-sm text-gray-400 mt-2">
        Supports CSV files only
      </p>

      {selectedFile && (
        <div className="mt-8 flex items-center justify-center gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
          <FileText className="text-green-600" />
          <span className="font-medium text-green-700">
            {selectedFile.name}
          </span>
        </div>
      )}

      {uploading && (
        <div className="mt-6">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent mx-auto"></div>

          <p className="mt-3 text-blue-600">
            Uploading CSV...
          </p>
        </div>
      )}
    </div>
  );
}