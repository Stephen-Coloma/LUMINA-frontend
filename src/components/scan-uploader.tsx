"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Upload, X, FileText, ImageIcon } from "lucide-react";
import { useCustomToast } from "@/hooks/useCustomToast";
import { MIN_SLICES } from "@/lib/utils";
import dicomToImage from "@/lib/dicom-parser";

interface ScanUploaderProps {
  scanType: "CT" | "PET";
  onFilesChange?: (files: File[]) => void;
}

export function ScanUploader({
  scanType,
  onFilesChange,
}: ScanUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { showToast } = useCustomToast();

  useEffect(() => {
    if (onFilesChange) {
      onFilesChange(files);
    }
  }, [files, onFilesChange, previewUrl]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).filter(
        (file) =>
          file.name.endsWith(".dcm")
      );

      if (newFiles.length >= MIN_SLICES) {
        handleNewFiles(newFiles);
      } else {
        showToast({
          title: "Not enouch slices",
          description: "Please upload at least 32 DICOM files.",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(
        (file) =>
          file.name.endsWith(".dcm")
      );

      if (newFiles.length >= MIN_SLICES) {
        handleNewFiles(newFiles);
      } else {
        showToast({
          title: "Not enouch slices",
          description: "Please upload at least 32 DICOM files.",
          variant: "destructive",
        });
      }
    }
  };

  const handleNewFiles = async (newFiles: File[]) => {
    setFiles(newFiles);

    // Create preview for the first image file
    if (newFiles.length >= MIN_SLICES) {
      const firstFile = newFiles[0];

      const formattedImage = await dicomToImage(firstFile);

      if (formattedImage.startsWith("data:image/")) {
          setPreviewUrl(formattedImage)
      } 
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
          isDragging
            ? "border-lumina-600 bg-lumina-50"
            : "border-black/25"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="relative">
          <input
            id={`${scanType.toLowerCase()}-scan-upload`}
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            onChange={handleFileChange}
            multiple
            accept=".dcm"
          />
          <div className="flex flex-col items-center justify-center space-y-2 text-center py-8">
            <div className="rounded-full bg-lumina-50 p-2">
              <Upload className="h-6 w-6 text-lumina-600" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">
                Drag & drop {scanType} scan files
              </p>
              <p className="text-xs text-black/60">
                or click to browse files
              </p>
            </div>
          </div>
        </div>
      </div>

      {previewUrl && (
        <>
          <h3 className="font-medium">First Slice Preview</h3>
          <div className="mt-4 rounded-lg border border-red-100 overflow-hidden">
            <div className="aspect-square w-full relative">
              <img
                src={previewUrl || "/placeholder.svg"}
                alt={`${scanType} scan preview`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </>
      )}

      {files.length >= MIN_SLICES && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Uploaded Files ({files.length})</p>
          <div className="max-h-80 overflow-y-auto rounded-lg border border-lumina-100">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b p-2 last:border-0"
              >
                <div className="flex space-x-2">
                  {file.type.startsWith("image/") ? (
                    <ImageIcon className="h-4 w-4 text-lumina-600" />
                  ) : (
                    <FileText className="h-4 w-4 text-lumina-600" />
                  )}
                  <span className="text-sm truncate max-w-[200px]">
                    {file.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
