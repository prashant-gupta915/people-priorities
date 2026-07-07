"use client";

import React, { useState, useRef, useEffect } from 'react';
import { FaMicrophone, FaStop, FaPlay, FaPause, FaTrash } from 'react-icons/fa';

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
      // eslint-disable-next-line
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
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
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

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone", error);
      alert("Microphone access is required to record audio.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      mediaRecorder.current.stream.getTracks().forEach((track) => track.stop());
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800">
      {!audioUrl ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="text-4xl">
            {isRecording ? (
              <button onClick={stopRecording} className="p-4 bg-red-100 text-red-600 rounded-full hover:bg-red-200 animate-pulse transition">
                <FaStop />
              </button>
            ) : (
              <button onClick={startRecording} className="p-4 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition">
                <FaMicrophone />
              </button>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            {isRecording ? `Recording... ${formatTime(recordingTime)}` : "Click to Record Voice Note"}
          </p>
        </div>
      ) : (
        <div className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
          <div className="flex items-center space-x-4">
            <button onClick={togglePlayback} className="p-3 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition">
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <span className="text-gray-700 dark:text-gray-300 font-medium">Recorded Audio</span>
          </div>
          <button onClick={deleteRecording} className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition">
            <FaTrash />
          </button>
          <audio 
            ref={audioRef} 
            src={audioUrl} 
            onEnded={() => setIsPlaying(false)}
            className="hidden" 
          />
        </div>
      )}
    </div>
  );
}
