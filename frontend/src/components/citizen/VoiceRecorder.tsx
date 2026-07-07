"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MicrophoneIcon, StopIcon, PlayIcon, PauseIcon, TrashIcon } from '@heroicons/react/24/outline';

interface VoiceRecorderProps {
  onAudioRecorded: (file: File | null) => void;
  initialAudio?: File | null;
}

export default function VoiceRecorder({ onAudioRecorded, initialAudio }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (initialAudio) {
      const url = URL.createObjectURL(initialAudio);
      setAudioUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [initialAudio]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        const file = new File([audioBlob], 'recording.webm', { type: 'audio/webm' });
        onAudioRecorded(file);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => setRecordingTime((p) => p + 1), 1000);
    } catch {
      alert('Microphone access is required to record audio.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      mediaRecorder.current.stream.getTracks().forEach((t) => t.stop());
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const deleteRecording = () => {
    setAudioUrl(null);
    onAudioRecorded(null);
    setRecordingTime(0);
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  if (audioUrl) {
    return (
      <div className="flex items-center justify-between px-4 py-3.5 rounded-[16px] border border-[#E5E7EB] bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlayback}
            className="w-8 h-8 flex items-center justify-center bg-[#EEF2FF] text-[#4F46E5] rounded-full hover:bg-[#E0E7FF] transition"
          >
            {isPlaying ? <PauseIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4" />}
          </button>
          <span className="text-[14px] font-semibold text-[#111827]">Voice note recorded</span>
        </div>
        <button
          type="button"
          onClick={deleteRecording}
          className="p-1.5 text-[#9CA3AF] hover:text-red-500 hover:bg-red-50 rounded-full transition"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
        <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} className="hidden" />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={isRecording ? stopRecording : startRecording}
      className={`w-full flex items-center justify-center gap-2 py-4 px-5 rounded-[16px] border-2 border-dashed transition-all font-semibold text-[15px] ${
        isRecording
          ? 'border-red-400 bg-red-50 text-red-600 animate-pulse'
          : 'border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#4F46E5] hover:text-[#4F46E5]'
      }`}
    >
      {isRecording ? (
        <>
          <StopIcon className="w-5 h-5" />
          <span>Stop · {formatTime(recordingTime)}</span>
        </>
      ) : (
        <>
          <MicrophoneIcon className="w-5 h-5" />
          <span>Voice Upload</span>
        </>
      )}
    </button>
  );
}
