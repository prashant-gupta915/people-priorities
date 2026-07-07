"use client";

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import ImageUploader from './ImageUploader';
import VoiceRecorder from './VoiceRecorder';
import type { ComplaintForm } from './Wizard';

export default function Step1BasicInfo() {
  const { register, control, formState: { errors } } = useFormContext<ComplaintForm>();

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-[22px] font-bold text-[#111827]">Describe the Issue</h2>
        <p className="text-[15px] text-[#6B7280] mt-1">
          Provide details, or upload a voice note / photo.
        </p>
      </div>

      {/* Large description textarea */}
      <div>
        <textarea
          id="description"
          rows={6}
          placeholder="Describe the problem in detail..."
          className={`block w-full rounded-[16px] border px-5 py-4 bg-white text-[#111827] text-[15px] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] transition-colors resize-none ${
            errors.description ? 'border-red-400' : 'border-[#E5E7EB]'
          }`}
          {...register('description')}
        />
        {errors.description && (
          <p className="mt-1.5 text-[13px] font-semibold text-red-500">
            {errors.description.message as string}
          </p>
        )}
      </div>

      {/* Voice + Photo side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Controller
          name="audio"
          control={control}
          render={({ field: { onChange, value } }) => (
            <VoiceRecorder initialAudio={value ?? null} onAudioRecorded={onChange} />
          )}
        />
        <Controller
          name="images"
          control={control}
          render={({ field: { onChange, value } }) => (
            <ImageUploader images={value ?? []} onImagesChange={onChange} />
          )}
        />
      </div>
    </div>
  );
}
