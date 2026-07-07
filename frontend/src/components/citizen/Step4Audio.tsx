"use client";

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import VoiceRecorder from './VoiceRecorder';

export default function Step4Audio() {
  const { control } = useFormContext();

  return (
    <div>
      <Controller
        name="audio"
        control={control}
        render={({ field: { onChange, value } }) => (
          <VoiceRecorder 
            initialAudio={value} 
            onAudioRecorded={onChange} 
          />
        )}
      />
    </div>
  );
}
