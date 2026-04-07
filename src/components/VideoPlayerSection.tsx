import { useEffect, useRef, useState } from 'react';
import { usePlayerStore } from '../store/playerStore';

const formatTime = (seconds: number) => {
  if (seconds === undefined || seconds === null || isNaN(seconds)) return "00:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

interface Subtitle {
  id: number;
  start: number;
  end: number;
  text: string;
  speaker?: string;
}

const parseVttTime = (timeStr: string) => {
  if (!timeStr) return 0;
  const parts = timeStr.trim().split(':');
  if (parts.length === 3) {
    return parseFloat(parts[0]) * 3600 + parseFloat(parts[1]) * 60 + parseFloat(parts[2]);
  }
  return parseFloat(parts[0]) * 60 + parseFloat(parts[1]);
};

export default function VideoPlayerSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const currentTrack = usePlayerStore(state => state.currentTrack);
  const isPlaying = usePlayerStore(state => state.isPlaying);
  const togglePlay = usePlayerStore(state => state.togglePlay);
  const setTime = usePlayerStore(state => state.setTime);
  const setDuration = usePlayerStore(state => state.setDuration);
  const currentTime = usePlayerStore(state => state.currentTime);
  const duration = usePlayerStore(state => state.duration);

  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);

  // Fetch and parse subtitles safely handling carriage returns
  useEffect(() => {
    if (currentTrack?.subsUrl) {
      fetch(currentTrack.subsUrl)
        .then(res => res.text())
        .then(text => {
          const blocks = text.trim().split(/\r?\n\r?\n/);
          const subs: Subtitle[] = [];
          let idCount = 0;
          
          blocks.forEach(block => {
            const lines = block.split(/\r?\n/);
            const timeLineIndex = lines.findIndex(l => l.includes('-->'));
            if (timeLineIndex !== -1) {
              const timeLine = lines[timeLineIndex];
              const parts = timeLine.split('-->');
              const startStr = parts[0].trim().split(' ')[0];
              const endStr = parts[1].trim().split(' ')[0];
              
              const start = parseVttTime(startStr);
              const end = parseVttTime(endStr);
              
              let rawText = lines.slice(timeLineIndex + 1).join(' ').trim();
              let speaker: string | undefined = undefined;

              // Check WebVTT <v Speaker>
              const vMatch = rawText.match(/<v\s+([^>]+)>(.*?)<\/v>/i) || rawText.match(/<v\s+([^>]+)>(.*)/i);
              if (vMatch) {
                speaker = vMatch[1].trim();
                rawText = vMatch[2].trim();
              } else {
                // Check [Speaker]: or [Speaker]
                const bracketMatch = rawText.match(/^\[([^\]]+)\]:?\s*(.*)/);
                if (bracketMatch) {
                  speaker = bracketMatch[1].trim();
                  rawText = bracketMatch[2].trim();
                } else {
                  // Check Speaker: text
                  const colonMatch = rawText.match(/^([A-Za-zÀ-ÿ0-9 ]{2,20}):\s*(.*)/);
                  if (colonMatch) {
                    speaker = colonMatch[1].trim();
                    rawText = colonMatch[2].trim();
                  }
                }
              }

              let textContent = rawText.replace(/<[^>]+>/g, '').trim();

              if (textContent && textContent !== '&nbsp;') {
                const lastSub = subs[subs.length - 1];
                
                // Simple dedup for roll-up captions
                if (lastSub && textContent.startsWith(lastSub.text) && lastSub.speaker === speaker) {
                   lastSub.end = end;
                   lastSub.text = textContent;
                } else if (lastSub && lastSub.text.startsWith(textContent) && lastSub.speaker === speaker) {
                   // Skip if it's a prefix of existing
                } else if (textContent !== lastSub?.text) {
                   subs.push({
                     id: idCount++,
                     start,
                     end,
                     text: textContent,
                     speaker
                   });
                }
              }
            }
          });
          setSubtitles(subs);
        })
        .catch(console.error);
    } else {
      setSubtitles([]);
    }
  }, [currentTrack?.subsUrl]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(console.error);
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack?.videoUrl]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const seekTo = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setTime(time);
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  
  // Auto-scroll logic for active subtitle would sit here potentially
  // Finding active sub:
  // Using findIndex reversed or standard allows mapping
  const activeSubIndex = subtitles.findIndex(sub => currentTime >= sub.start && currentTime <= sub.end);

  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-0 border-b border-outline-variant/10">
      {/* Video Player Area */}
      <div className="md:col-span-8 p-8 flex flex-col justify-center bg-surface-container-lowest">
        <div className="w-full aspect-video bg-black rounded-lg border border-white/10 flex items-center justify-center relative overflow-hidden group">
          {currentTrack?.videoUrl ? (
            <video 
              ref={videoRef}
              key={currentTrack.videoUrl}
              className="w-full h-full object-cover"
              onClick={togglePlay}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => usePlayerStore.getState().setPlaying(false)}
              onError={(e) => {
                const videoTarget = e.target as HTMLVideoElement;
                console.error("Video Error Details:", {
                  error: videoTarget.error,
                  networkState: videoTarget.networkState,
                  readyState: videoTarget.readyState,
                  currentSrc: videoTarget.currentSrc
                });
              }}
              playsInline
              preload="metadata"
              crossOrigin="anonymous"
            >
              <source src={currentTrack.videoUrl} type="video/mp4" />
              {currentTrack.subsUrl && <track kind="captions" src={currentTrack.subsUrl} srcLang="es" default />}
            </video>
          ) : (
            <div className="cursor-pointer" onClick={() => { if (currentTrack) togglePlay(); }}>
              <div className="text-white/40 font-mono text-sm tracking-widest uppercase text-center">
                NO SOURCE LOADED<br />
                <span className="text-[10px] opacity-60">SELECT A SESSION BELOW</span>
              </div>
            </div>
          )}

          {!isPlaying && currentTrack?.videoUrl && (
            <button 
              onClick={togglePlay}
              className="w-20 h-20 bg-surface-container-highest/80 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-[0_8px_16px_rgba(0,0,0,0.5)] hover:bg-primary hover:text-on-primary hover:scale-105 transition-all absolute"
            >
              <span className="material-symbols-outlined text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>play_arrow</span>
            </button>
          )}

          {/* Player Controls */}
          <div className="absolute left-0 bottom-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div 
              className="w-full h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer relative"
              onClick={(e) => {
                if (videoRef.current && duration > 0) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newTime = (clickX / rect.width) * duration;
                  seekTo(newTime);
                }
              }}
            >
              <div 
                className="absolute left-0 top-0 h-full bg-primary shadow-[0_0_8px_rgba(0,230,57,0.5)] transition-all duration-100"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-xs font-mono text-white/70">
              <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-sm cursor-pointer hover:text-white">volume_up</span>
                <span className="material-symbols-outlined text-sm cursor-pointer hover:text-white">settings</span>
                <span className="material-symbols-outlined text-sm cursor-pointer hover:text-white">fullscreen</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Script / Subtitles Area */}
      <div className="md:col-span-4 bg-surface-container-low border-l border-outline-variant/10 relative min-h-[400px] md:min-h-0">
        <div className="absolute inset-0 p-8 flex flex-col">
          <div className="flex items-center justify-between mb-6 pb-4 shrink-0 border-b border-outline-variant/10">
            <h3 className="font-headline text-xl font-bold uppercase tracking-widest text-primary">Transcript</h3>
            <span className="material-symbols-outlined text-on-surface-variant">description</span>
          </div>
          
          <div className="flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar flex-1 font-mono text-sm scroll-smooth pb-4">
          {subtitles.length > 0 ? (
            subtitles.map((sub, index) => {
              const isActive = (currentTime >= sub.start && currentTime <= sub.end) || activeSubIndex === index;
              const isPast = currentTime > sub.end;

              return (
                <div 
                  key={sub.id} 
                  className={`flex gap-4 cursor-pointer transition-colors ${
                    isActive 
                      ? 'text-on-surface bg-primary/10 p-3 rounded-r border-l-2 border-primary -ml-3' 
                      : isPast
                        ? 'text-on-surface-variant/50 hover:text-on-surface-variant'
                        : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  onClick={() => seekTo(sub.start)}
                >
                  <span className={`${isActive ? 'text-primary font-bold' : 'text-primary/60'} min-w-[50px] shrink-0`}>
                    {formatTime(sub.start)}
                  </span>
                  <div className="flex-1">
                    {sub.speaker && (
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary mb-1 border border-primary/20">
                        {sub.speaker}
                      </span>
                    )}
                    <p className={`${sub.speaker ? "mt-0.5" : ""} font-medium`}>{sub.text}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-on-surface-variant/50 text-center mt-10">
              {currentTrack ? "Cargando transcripción..." : "Selecciona una sesión para ver la transcripción"}
            </div>
          )}
        </div>
        </div>
      </div>
    </section>
  );
}
