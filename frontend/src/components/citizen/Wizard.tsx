"use client";

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence } from 'framer-motion';

import Step1BasicInfo from './Step1BasicInfo';
import Step2Category from './Step2Category';
import Step3Media from './Step3Media';
import Step4Audio from './Step4Audio';
import Step4Location from './Step4Location';
import Step5Review from './Step5Review';
import Step6Success from './Step6Success';
import ProgressStepper from './ProgressStepper';

const complaintSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  priority: z.enum(['Low', 'Medium', 'High']),
  images: z.array(z.any()).optional(),
  audio: z.any().optional(),
  location: z.object({ lat: z.number(), lng: z.number() }).optional(),
});

type ComplaintForm = z.infer<typeof complaintSchema>;

const Wizard = () => {
  const methods = useForm<ComplaintForm>({
    resolver: zodResolver(complaintSchema),
    mode: 'onTouched',
    defaultValues: {
      images: [],
    }
  });

  const [step, setStep] = useState(0);

  const steps = [
    <Step1BasicInfo key="step1" />,
    <Step2Category key="step2" />,
    <Step3Media key="step3" />,
    <Step4Audio key="step4" />,
    <Step4Location key="step5" />,
    <Step5Review key="step6" />,
    <Step6Success key="step7" />
  ];

  const stepTitles = [
    "Basic Info",
    "Category",
    "Photos",
    "Voice Note",
    "Location",
    "Review",
    "Success"
  ];

  const isLast = step === steps.length - 2;
  const isSuccess = step === steps.length - 1;

  const handleNext = async () => {
    let fieldsToValidate: Array<keyof ComplaintForm> = [];
    if (step === 0) fieldsToValidate = ['title', 'description'];
    if (step === 1) fieldsToValidate = ['category', 'priority'];
    if (step === 2) fieldsToValidate = ['images'];
    if (step === 3) fieldsToValidate = ['audio'];
    if (step === 4) fieldsToValidate = ['location'];

    const isStepValid = await methods.trigger(fieldsToValidate);
    
    if (isStepValid) {
      if (step < steps.length - 1) {
        setStep(step + 1);
      }
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-3xl mx-auto">
        {!isSuccess && (
          <div className="mb-8">
            <ProgressStepper currentStep={step} steps={stepTitles.slice(0, 6)} />
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
          <AnimatePresence mode="wait">
            {steps[step]}
          </AnimatePresence>

          {!isSuccess && (
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 0}
                className={`px-6 py-2.5 rounded-xl font-medium transition-colors ${
                  step === 0
                    ? 'opacity-0 cursor-default'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'
                }`}
              >
                Back
              </button>
              
              <button
                type="button"
                onClick={isLast ? methods.handleSubmit(() => setStep(step + 1)) : handleNext}
                className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-sm transition-colors"
              >
                {isLast ? 'Submit Complaint' : 'Continue'}
              </button>
            </div>
          )}
        </div>
      </div>
    </FormProvider>
  );
};

export default Wizard;
