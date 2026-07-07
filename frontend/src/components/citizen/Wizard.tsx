"use client";

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';

import Step2Category from './Step2Category';
import Step1BasicInfo from './Step1BasicInfo';
import Step4Location from './Step4Location';
import Step5Review from './Step5Review';
import Step6Success from './Step6Success';
import ProgressStepper from './ProgressStepper';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

// Schema — title is auto-derived from description so we make it optional at the Zod level
// and set it programmatically before submit
const complaintSchema = z.object({
  title: z.string().optional(),
  description: z.string().min(10, 'Please describe the issue in at least 10 characters'),
  category: z.string().min(1, 'Please select a category'),
  priority: z.enum(['Low', 'Medium', 'High']).optional(),
  images: z.array(z.any()).optional(),
  audio: z.any().optional(),
  location: z.object({ lat: z.number(), lng: z.number() }).optional(),
  // flat fields from MapPicker (latitude/longitude used internally)
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  address: z.string().optional(),
});

export type ComplaintForm = z.infer<typeof complaintSchema>;

// Step index → fields to validate before advancing
const STEP_FIELDS: Array<Array<keyof ComplaintForm>> = [
  ['category'],
  ['description'],
  [], // location optional
  [], // review — no extra validation
];

const STEP_TITLES = ['Category', 'Describe', 'Location', 'Review'];

export default function Wizard() {
  const methods = useForm<ComplaintForm>({
    resolver: zodResolver(complaintSchema),
    mode: 'onTouched',
    defaultValues: {
      images: [],
      priority: 'Medium',
    },
  });

  const [step, setStep] = useState(0);

  const STEPS = [
    <Step2Category key="cat" />,
    <Step1BasicInfo key="info" />,
    <Step4Location key="loc" />,
    <Step5Review key="rev" />,
    <Step6Success key="ok" />,
  ];

  const isReview = step === STEPS.length - 2; // last real step = review
  const isSuccess = step === STEPS.length - 1;

  const advance = async () => {
    const fields = STEP_FIELDS[step] ?? [];
    const valid = fields.length === 0 || (await methods.trigger(fields));
    if (valid && step < STEPS.length - 1) setStep(step + 1);
  };

  const handleSubmit = methods.handleSubmit((data) => {
    // auto-set title from description
    if (!data.title) {
      methods.setValue('title', data.description.slice(0, 60));
    }
    setStep(step + 1);
  });

  return (
    <FormProvider {...methods}>
      <div className="w-full">
        {/* Stepper — hidden on success */}
        {!isSuccess && (
          <ProgressStepper currentStep={step} steps={STEP_TITLES} />
        )}

        {/* Card */}
        <div className="bg-white rounded-[24px] shadow-sm border border-[#E5E7EB] overflow-hidden">
          <div className="p-8 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                {STEPS[step]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer buttons */}
          {!isSuccess && (
            <div className="flex items-center justify-between px-8 md:px-10 pb-8 pt-2">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className={`px-6 py-3 rounded-full text-[15px] font-semibold border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F9FAFB] transition ${
                  step === 0 ? 'invisible' : ''
                }`}
              >
                Back
              </button>

              <button
                type="button"
                onClick={isReview ? handleSubmit : advance}
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white text-[15px] font-semibold hover:opacity-90 transition shadow-sm"
              >
                {isReview ? 'Submit Complaint' : (
                  <>
                    Continue
                    <ArrowRightIcon className="w-4 h-4" strokeWidth={2.5} />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </FormProvider>
  );
}
