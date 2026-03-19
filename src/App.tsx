import HeroSection from './components/HeroSection';
import VideoPlayerSection from './components/VideoPlayerSection';
import NowPlayingSection from './components/NowPlayingSection';
import ConsoleSection from './components/ConsoleSection';
import HardwareManifest from './components/HardwareManifest';
import type { Track } from './store/playerStore';

const INITIAL_TRACKS: Track[] = [
  {
    id: "track-1",
    number: "01",
    title: "VALVE PREAMPS",
    subtitle: "Warmth Obsession Session",
    duration: "00:54:12",
    peak: "-4.2dB",
    trackType: "Mono Track",
    activeBoxIndex: 8,
    videoUrl: "/EP1-Test/NVIDIA RTX 4060 Ti rendimiento de RTX 3070 pero a precio igual, decepción para todos.mp4",
    subsUrl: "/EP1-Test/captions.vtt"
  },
  {
    id: "track-2",
    number: "02",
    title: "DRUM MACHINES",
    subtitle: "808 vs The World",
    duration: "01:12:05",
    peak: "-12.0dB",
    trackType: "Stereo Bus",
    activeBoxIndex: 2
  },
  {
    id: "track-3",
    number: "03",
    title: "STUDIO ACOUSTICS",
    subtitle: "Diffusion Myths",
    duration: "00:48:30",
    peak: "-6.5dB",
    trackType: "Mono Track",
    activeBoxIndex: 5
  }
];

function App() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <VideoPlayerSection />
      <NowPlayingSection />
      <ConsoleSection tracks={INITIAL_TRACKS} />
      <HardwareManifest />
    </main>
  );
}

export default App;
