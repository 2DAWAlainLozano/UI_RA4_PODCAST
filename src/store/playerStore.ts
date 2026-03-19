import { create } from 'zustand';

export interface Track {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  duration: string;
  peak: string;
  trackType: string;
  activeBoxIndex: number;
  videoUrl?: string;
  subsUrl?: string;
}

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  
  setCurrentTrack: (track: Track) => void;
  setPlaying: (isPlaying: boolean) => void;
  togglePlay: () => void;
  setTime: (time: number) => void;
  setDuration: (duration: number) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  
  setCurrentTrack: (track) => set({ currentTrack: track, currentTime: 0, isPlaying: true }),
  setPlaying: (isPlaying) => set({ isPlaying }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
}));
