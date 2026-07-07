"use client";

import React from 'react';
import { useFormContext } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { PaperAirplaneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import type { ComplaintForm } from './Wizard';

const MapPicker = dynamic(() => import('./MapPicker'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[#F3F4F6] animate-pulse flex items-center justify-center">
      <span className="text-[14px] text-[#9CA3AF] font-medium">Loading map…</span>
    </div>
  ),
});

export default function Step4Location() {
  const { setValue, watch } = useFormContext<ComplaintForm>();
  const latitude = watch('latitude');
  const longitude = watch('longitude');

  const handleGPS = () => {
    if (typeof window === 'undefined') return;
    navigator.geolocation?.getCurrentPosition(
      ({ coords }) => {
        const { latitude: lat, longitude: lng } = coords;
        setValue('latitude', lat, { shouldValidate: true });
        setValue('longitude', lng, { shouldValidate: true });
        setValue('location', { lat, lng }, { shouldValidate: true });
        setValue('address', `GPS (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
      },
      () => {
        // Fallback
        setValue('latitude', 28.6139, { shouldValidate: true });
        setValue('longitude', 77.209, { shouldValidate: true });
        setValue('location', { lat: 28.6139, lng: 77.209 }, { shouldValidate: true });
        setValue('address', 'New Delhi (mock)');
      }
    );
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-[22px] font-bold text-[#111827]">Pin Your Location</h2>
        <p className="text-[15px] text-[#6B7280] mt-1">
          Accurate location helps route your complaint correctly.
        </p>
      </div>

      {/* Map container */}
      <div className="rounded-[16px] overflow-hidden border border-[#E5E7EB] shadow-sm h-[280px] relative z-0">
        <MapPicker
          latitude={latitude}
          longitude={longitude}
          onChange={(lat, lng) => {
            setValue('latitude', lat, { shouldValidate: true });
            setValue('longitude', lng, { shouldValidate: true });
            setValue('location', { lat, lng }, { shouldValidate: true });
            setValue('address', `Selected (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
          }}
        />
      </div>

      {/* GPS button */}
      <button
        type="button"
        onClick={handleGPS}
        className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-[16px] border border-[#D1D5DB] bg-white hover:bg-[#EEF2FF] hover:border-[#4F46E5] text-[#4F46E5] font-semibold text-[15px] transition-all shadow-sm"
      >
        <PaperAirplaneIcon className="w-5 h-5" />
        Use My GPS Location
      </button>

      {/* Coordinate badge */}
      {latitude != null && longitude != null && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-[12px] bg-[#F0FDF4] border border-[#BBF7D0]">
          <MapPinIcon className="w-4 h-4 text-[#10B981]" />
          <span className="text-[13px] font-semibold text-[#065F46]">
            {latitude.toFixed(5)}, {longitude.toFixed(5)}
          </span>
        </div>
      )}
    </div>
  );
}
