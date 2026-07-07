"use client";

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import ImageUploader from './ImageUploader';

export default function Step3Media() {
  const { control } = useFormContext();

  return (
    <div>
      <Controller
        name="images"
        control={control}
        render={({ field: { onChange, value } }) => (
          <ImageUploader 
            images={value || []} 
            onImagesChange={onChange} 
          />
        )}
      />
    </div>
  );
}
