"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Upload, X, FileText, Check, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCustomToast } from "@/hooks/useCustomToast";

interface ScanUploaderProps {
  scanType: "CT" | "PET";
  onFilesChange?: (files: File[]) => void;
  onImageUrlChange?: (url: string) => void;
}

export function ScanUploader({
  scanType,
  onFilesChange,
  onImageUrlChange,
}: ScanUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { showToast } = useCustomToast();

  useEffect(() => {
    if (onFilesChange) {
      onFilesChange(files);
    }

    // Clean up object URLs when component unmounts or files change
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
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
          file.type.startsWith("image/") ||
          file.name.endsWith(".dcm") ||
          file.name.endsWith(".nii") ||
          file.name.endsWith(".nii.gz")
      );

      if (newFiles.length > 0) {
        handleNewFiles(newFiles);
      } else {
        showToast({
          title: "Invalid file type",
          description: "Please upload image files or DICOM/NIfTI files.",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(
        (file) =>
          file.type.startsWith("image/") ||
          file.name.endsWith(".dcm") ||
          file.name.endsWith(".nii") ||
          file.name.endsWith(".nii.gz")
      );

      if (newFiles.length > 0) {
        handleNewFiles(newFiles);
      } else {
        showToast({
          title: "Invalid file type",
          description: "Please upload image files or DICOM/NIfTI files.",
          variant: "destructive",
        });
      }
    }
  };

  const handleNewFiles = (newFiles: File[]) => {
    setFiles(newFiles);

    // Create preview for the first image file
    if (newFiles.length > 0) {
      newFiles.forEach((file, index) => {
        if (file.type.startsWith("image/")) {
          const url = URL.createObjectURL(file);
          if (index === 0) {
            setPreviewUrl(url);
          }
          if (onImageUrlChange) {
            onImageUrlChange(url);
          }
        } else {
          // For non-image files like DICOM, use a placeholder
          const placeholderUrl = `/placeholder.svg?height=400&width=400&query=${scanType}%20scan%20preview%20${
            index + 1
          }`;
          if (index === 0) {
            setPreviewUrl(placeholderUrl);
          }
          if (onImageUrlChange) {
            onImageUrlChange(placeholderUrl);
          }
        }
      });

      // Automatically confirm upload after a short delay
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        showToast({
          title: "Upload successful",
          description: `${newFiles.length} ${scanType} scan files have been uploaded.`,
        });
      }, 1000);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = prev.filter((_, i) => i !== index);

      if (newFiles.length === 0) {
        setPreviewUrl(null);
        if (onImageUrlChange) {
          onImageUrlChange("");
        }
      } else if (index === 0 && newFiles[0].type.startsWith("image/")) {
        // Update preview if first file was removed
        const url = URL.createObjectURL(newFiles[0]);
        setPreviewUrl(url);
        if (onImageUrlChange) {
          onImageUrlChange(url);
        }
      }

      return newFiles;
    });
  };

  const confirmUpload = () => {
    if (files.length === 0) {
      showToast({
        title: "No files selected",
        description: "Please select files to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      showToast({
        title: "Upload successful",
        description: `${files.length} ${scanType} scan files have been uploaded.`,
      });
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div
        className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
          isDragging
            ? "border-lumina-600 bg-lumina-50"
            : "border-muted-foreground/25"
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
            accept="image/*,.dcm,.nii,.nii.gz"
          />
          <div className="flex flex-col items-center justify-center space-y-2 text-center py-8">
            <div className="rounded-full bg-lumina-50 p-2">
              <Upload className="h-6 w-6 text-lumina-600" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">
                Drag & drop {scanType} scan files
              </p>
              <p className="text-xs text-muted-foreground">
                or click to browse files
              </p>
            </div>
          </div>
        </div>
      </div>

      {previewUrl && (
        <div className="mt-4 rounded-lg border border-lumina-100 overflow-hidden">
          <div className="aspect-square w-full relative">
            <img
              src={previewUrl || "/placeholder.svg"}
              alt={`${scanType} scan preview`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Uploaded Files ({files.length})</p>
          <div className="max-h-40 overflow-y-auto rounded-lg border border-lumina-100">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b p-2 last:border-0"
              >
                <div className="flex items-center space-x-2">
                  {file.type.startsWith("image/") ? (
                    <ImageIcon className="h-4 w-4 text-lumina-600" />
                  ) : (
                    <FileText className="h-4 w-4 text-lumina-600" />
                  )}
                  <span className="text-sm truncate max-w-[200px]">
                    {file.name}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove file</span>
                </Button>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button
              size="sm"
              className="gap-1 bg-lumina-600 hover:bg-lumina-700"
              onClick={confirmUpload}
              disabled={isUploading}
            >
              <Check className="h-4 w-4" />
              {isUploading ? "Uploading..." : "Confirm Upload"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
