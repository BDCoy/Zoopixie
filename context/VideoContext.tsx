import React, { createContext, useContext, useState } from 'react';

type VideoContextType = {
  videoUrl: string | null;
  setVideoUrl: (url: string | null) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  taskId: string | null;
  setTaskId: (id: string | null) => void;
};

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export function VideoProvider({ children }: { children: React.ReactNode }) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [taskId, setTaskId] = useState<string | null>(null);

  return (
    <VideoContext.Provider 
      value={{ 
        videoUrl, 
        setVideoUrl, 
        isGenerating, 
        setIsGenerating,
        error,
        setError,
        taskId,
        setTaskId
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export function useVideo() {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
}