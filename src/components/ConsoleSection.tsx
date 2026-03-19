import { usePlayerStore } from '../store/playerStore';
import type { Track } from '../store/playerStore';

interface ConsoleSectionProps {
  tracks?: Track[];
}

export default function ConsoleSection({ tracks = [] }: ConsoleSectionProps) {
  const currentTrack = usePlayerStore(state => state.currentTrack);
  const setCurrentTrack = usePlayerStore(state => state.setCurrentTrack);
  return (
    <section className="p-8">
      <div className="mb-8">
        <h3 className="font-headline text-xs font-bold uppercase tracking-[0.4em] text-on-surface-variant mb-2">Central Console</h3>
        <h2 className="font-headline text-3xl font-black uppercase">Recent Sessions</h2>
      </div>
      {/* Console Unit */}
      <div className="console-bezel p-10 max-w-7xl mx-auto shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Digital LCD Screen */}
          <div className="lg:col-span-10 lcd-display p-6 rounded-sm min-h-[400px]">
            <div className="flex justify-between items-center border-b border-primary/20 pb-4 mb-6">
              <div className="flex items-center gap-6">
                <span className="lcd-glow text-primary font-mono text-xs tracking-widest uppercase">Multi-Track Mode</span>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                  <span className="lcd-glow text-primary font-mono text-xs">READY</span>
                </div>
              </div>
              <div className="lcd-glow text-primary font-mono text-xl tracking-tighter">02:44:12:00</div>
            </div>
            <div className="space-y-4">
              {tracks.map((track) => {
                const isPlaying = currentTrack?.id === track.id;
                return (
                  <div 
                    key={track.id} 
                    className={`grid grid-cols-12 gap-4 items-center group cursor-pointer p-2 transition-colors ${isPlaying ? 'bg-primary/10' : 'hover:bg-primary/5'}`}
                    onClick={() => setCurrentTrack(track)}
                  >
                    <div className="col-span-4">
                      <span className={`font-headline text-sm font-bold uppercase block ${isPlaying ? 'text-primary lcd-glow' : 'text-primary/60'}`}>
                        {track.number}: {track.title}
                      </span>
                      <span className={`text-[9px] font-mono uppercase ${isPlaying ? 'text-primary/80' : 'text-primary/40'}`}>
                        {track.subtitle}
                      </span>
                    </div>
                    <div className="col-span-5 flex flex-col gap-1">
                      <div className="flex gap-0.5 h-3">
                        {[...Array(track.activeBoxIndex)].map((_, i) => (
                          <div key={`lcd-${track.id}-1-${i}`} className={`flex-1 transition-colors ${isPlaying ? 'bg-primary/40' : 'bg-primary/20 group-hover:bg-primary/40'}`}></div>
                        ))}
                        <div className={`flex-1 ${isPlaying ? 'bg-primary' : 'bg-primary/80'}`}></div>
                        {[...Array(11 - track.activeBoxIndex)].map((_, i) => (
                          <div key={`lcd-${track.id}-2-${i}`} className={`flex-1 ${isPlaying ? 'bg-primary/40' : 'bg-primary/20'}`}></div>
                        ))}
                      </div>
                      <div className={`flex justify-between text-[8px] font-mono uppercase ${isPlaying ? 'text-primary/60' : 'text-primary/40'}`}>
                        <span>Peak {track.peak}</span>
                        <span>{track.trackType}</span>
                      </div>
                    </div>
                    <div className="col-span-2 text-right">
                      <span className={`font-mono text-xs ${isPlaying ? 'text-primary lcd-glow' : 'text-primary/60'}`}>
                        {track.duration}
                      </span>
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <span 
                        className={`material-symbols-outlined text-lg ${isPlaying ? 'text-primary' : 'text-primary/40'}`}
                        style={isPlaying ? { fontVariationSettings: "'FILL' 1" } : {}}
                      >
                        {isPlaying ? 'volume_up' : 'play_arrow'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Visualizer area at bottom of LCD */}
            <div className="mt-8 pt-8 border-t border-primary/10 grid grid-cols-24 gap-1 h-12 items-end">
              <div className="bg-primary/40 h-[20%]"></div><div className="bg-primary/40 h-[30%]"></div><div className="bg-primary/40 h-[60%]"></div><div className="bg-primary/40 h-[45%]"></div><div className="bg-primary/60 h-[80%]"></div><div className="bg-primary/80 h-[100%]"></div><div className="bg-primary/60 h-[70%]"></div><div className="bg-primary/40 h-[40%]"></div><div className="bg-primary/40 h-[30%]"></div><div className="bg-primary/40 h-[50%]"></div><div className="bg-primary/60 h-[75%]"></div><div className="bg-primary/40 h-[40%]"></div><div className="bg-primary/40 h-[20%]"></div><div className="bg-primary/40 h-[35%]"></div><div className="bg-primary/40 h-[60%]"></div><div className="bg-primary/80 h-[90%]"></div><div className="bg-primary/60 h-[50%]"></div><div className="bg-primary/40 h-[30%]"></div><div className="bg-primary/40 h-[25%]"></div><div className="bg-primary/40 h-[45%]"></div><div className="bg-primary/40 h-[65%]"></div><div className="bg-primary/40 h-[40%]"></div><div className="bg-primary/40 h-[20%]"></div><div className="bg-primary/40 h-[10%]"></div>
            </div>
          </div>
          {/* Console Controls Sidebar (Analog feel) */}
          <div className="lg:col-span-2 flex flex-col items-center gap-10">
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full knob-conic border-4 border-[#1c1b1b] shadow-2xl relative">
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-primary"></div>
              </div>
              <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Display Dim</span>
            </div>
            <div className="h-64 w-12 fader-track relative">
              <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-10 h-16 bg-surface-bright shadow-2xl border-t border-white/20 flex flex-col items-center justify-center cursor-ns-resize">
                <div className="w-full h-px bg-on-surface-variant/20 mb-1"></div>
                <div className="w-full h-px bg-on-surface-variant/20"></div>
              </div>
              <div className="absolute -right-8 top-0 bottom-0 flex flex-col justify-between py-2 text-[8px] font-mono text-on-surface-variant">
                <span>+12</span><span>+6</span><span>0</span><span>-6</span><span>-12</span><span>-24</span><span>-inf</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="w-10 h-10 bg-surface-container-highest border border-white/5 flex items-center justify-center text-[10px] font-bold text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all">S</button>
              <button className="w-10 h-10 bg-surface-container-highest border border-white/5 flex items-center justify-center text-[10px] font-bold text-on-surface-variant hover:bg-secondary hover:text-on-secondary transition-all">M</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
