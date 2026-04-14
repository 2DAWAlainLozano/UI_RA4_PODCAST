import { usePlayerStore } from '../store/playerStore';

export default function NowPlayingSection() {
  const currentTrack = usePlayerStore(state => state.currentTrack);
  const isPlaying = usePlayerStore(state => state.isPlaying);
  const togglePlay = usePlayerStore(state => state.togglePlay);
  const currentTime = usePlayerStore(state => state.currentTime);
  const duration = usePlayerStore(state => state.duration);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  
  let statusText = "Ready";
  let statusColor = "text-primary/60";
  let dotColor = "bg-primary/60 shadow-none";

  if (currentTrack) {
    if (isPlaying) {
      statusText = "Now Playing";
      statusColor = "text-primary";
      dotColor = "bg-primary shadow-[0_0_12px_rgba(0,230,57,0.5)] animate-pulse";
    } else {
      statusText = "Paused";
      statusColor = "text-orange-400"; // Assuming orange representation for pause
      dotColor = "bg-orange-400 shadow-none";
    }
  }


  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-0 border-b border-outline-variant/10" aria-labelledby="now-playing-title">
      <div className="md:col-span-8 p-8 flex flex-col justify-center">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-3 h-3 rounded-full ${dotColor}`} aria-hidden="true"></div>
          <h2 id="now-playing-status" className={`font-headline text-2xl font-bold uppercase tracking-widest ${statusColor}`}>
            <span className="sr-only">Estado: </span>{statusText}
          </h2>
        </div>
        <h3 id="now-playing-title" className="text-5xl font-black font-headline mb-6 uppercase tracking-tighter">
          {currentTrack ? `EP ${currentTrack.number}: ${currentTrack.title}` : "NO SESSION LOADED"}
        </h3>
        <div className="w-full h-1 bg-surface-container-highest mb-8 relative overflow-hidden" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100} aria-label="Progreso de reproducción">
          <div 
            className="absolute left-0 top-0 h-full bg-primary shadow-[0_0_8px_rgba(0,230,57,0.5)] transition-all duration-100"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={togglePlay}
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
            className="w-10 h-10 bg-surface-container-highest border border-white/10 rounded-[4px] flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.3)] hover:bg-primary hover:text-on-primary transition-all group"
          >
            <span className="material-symbols-outlined text-lg" style={{fontVariationSettings: "'FILL' 1"}} aria-hidden="true">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          <button className="bg-surface-container-highest px-6 py-2 border-t border-white/5 font-label text-[10px] tracking-widest uppercase hover:bg-secondary hover:text-on-secondary transition-all">LISTEN LIVE</button>
          <button className="bg-surface-container-low px-6 py-2 border border-outline-variant/30 font-label text-[10px] tracking-widest uppercase hover:bg-surface-variant transition-all">VIEW SIGNAL PATH</button>
        </div>
      </div>
      <div className="md:col-span-4 bg-surface-container-low p-8 flex flex-col justify-between border-l border-outline-variant/10" role="complementary" aria-label="Niveles de audio">
        <p className="font-label text-[10px] tracking-widest text-on-surface-variant uppercase mb-4">Master Bus Levels</p>
        <div className="flex flex-col gap-2" aria-label="Indicadores de nivel VU">
          {/* VU Meter L */}
          <div className="flex items-center gap-2">
            <span className="font-label text-[8px] text-on-surface-variant w-4" aria-hidden="true">L</span>
            <div className="flex-1 h-6 bg-surface-container-lowest flex gap-0.5 p-0.5" role="img" aria-label="Nivel de canal izquierdo">
              {[...Array(10)].map((_, i) => <div key={`primary-l-${i}`} className="flex-1 bg-primary"></div>)}
              {[...Array(2)].map((_, i) => <div key={`tertiary-l-${i}`} className="flex-1 bg-tertiary"></div>)}
              <div className="flex-1 bg-error opacity-40"></div>
              <div className="flex-1 bg-error opacity-20"></div>
            </div>
          </div>
          {/* VU Meter R */}
          <div className="flex items-center gap-2">
            <span className="font-label text-[8px] text-on-surface-variant w-4" aria-hidden="true">R</span>
            <div className="flex-1 h-6 bg-surface-container-lowest flex gap-0.5 p-0.5" role="img" aria-label="Nivel de canal derecho">
              {[...Array(9)].map((_, i) => <div key={`primary-r-${i}`} className="flex-1 bg-primary"></div>)}
              {[...Array(3)].map((_, i) => <div key={`tertiary-r-${i}`} className="flex-1 bg-tertiary"></div>)}
              <div className="flex-1 bg-error"></div>
              <div className="flex-1 bg-error opacity-20"></div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <div className="flex flex-col">
            <span className="font-label text-[8px] text-on-surface-variant uppercase">Bitrate</span>
            <span className="font-mono text-xs text-primary">24-BIT / 96KHZ</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="font-label text-[8px] text-on-surface-variant uppercase">Peak</span>
            <span className="font-mono text-xs text-error">-0.2 DB</span>
          </div>
        </div>
      </div>
    </section>
  );
}
