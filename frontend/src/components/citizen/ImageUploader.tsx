"use client";

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ImageUploaderProps {
  images: File[];
  onImagesChange: (images: File[]) => void;
}

export default function ImageUploader({ images, onImagesChange }: ImageUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onImagesChange([...images, ...acceptedFiles]);
    },
    [images, onImagesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
  });

  const removeImage = (index: number) => {
    const next = [...images];
    next.splice(index, 1);
    onImagesChange(next);
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        {...getRootProps()}
        className={`w-full flex items-center justify-center gap-2 py-4 px-5 rounded-[16px] border-2 border-dashed transition-all cursor-pointer font-semibold text-[15px] ${
          isDragActive
            ? 'border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]'
            : 'border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#4F46E5] hover:text-[#4F46E5]'
        }`}
      >
        <input {...getInputProps()} />
        <PhotoIcon className="w-5 h-5" />
        <span>{isDragActive ? 'Drop here…' : 'Photo Upload'}</span>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((file, idx) => {
            const url = URL.createObjectURL(file);
            return (
              <div
                key={idx}
                className="relative group aspect-square rounded-xl overflow-hidden border border-[#E5E7EB] shadow-sm"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`preview-${idx}`}
                  className="w-full h-full object-cover"
                  onLoad={() => URL.revokeObjectURL(url)}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(idx);
                  }}
                  className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <XMarkIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
