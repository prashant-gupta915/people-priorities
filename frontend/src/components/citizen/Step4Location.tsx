"use client";

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaLocationArrow } from 'react-icons/fa';
import dynamic from 'next/dynamic';

// Dynamically import the map component so it doesn't break SSR
const MapPicker = dynamic(() => import('./MapPicker'), { ssr: false, loading: () => <div className="h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-xl flex items-center justify-center text-gray-500">Loading Map...</div> });

export default function Step4Location() {
  const { setValue, watch, formState: { errors } } = useFormContext();
  const latitude = watch('latitude');
  const longitude = watch('longitude');

  const handleCurrentLocation = () => {
    // Mocking Geolocation API for the sake of the UI
    setValue('latitude', 51.505, { shouldValidate: true });
    setValue('longitude', -0.09, { shouldValidate: true });
    setValue('address', 'Mock Current Location, City Center', { shouldValidate: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Location Details</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Pinpoint the exact location of the issue on the map.
        </p>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleCurrentLocation}
          className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          <FaLocationArrow />
          <span>Use Current Location</span>
        </button>
      </div>

      <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm relative z-0">
        <MapPicker 
          latitude={latitude} 
          longitude={longitude} 
          onChange={(lat, lng) => {
            setValue('latitude', lat, { shouldValidate: true });
            setValue('longitude', lng, { shouldValidate: true });
            setValue('address', `Selected Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
          }} 
        />
      </div>

      {(errors.latitude || errors.longitude) && (
        <p className="mt-1 text-sm text-red-500">Please select a location on the map.</p>
      )}

      {latitude && longitude && (
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex items-start space-x-3">
          <FaMapMarkerAlt className="text-blue-500 mt-1" />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Selected Coordinates</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{latitude.toFixed(6)}, {longitude.toFixed(6)}</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
