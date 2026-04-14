
export default function HeroSection() {
  const letters = ['M', 'I', 'C', 'C', 'H', 'E', 'C', 'K'];
  const positions = ['20%', '45%', '30%', '60%', '15%', '50%', '35%', '70%'];

  return (
    <section className="w-full bg-surface-container-lowest py-20 px-8 border-b border-outline-variant/10" aria-labelledby="hero-title">
      <h1 id="hero-title" className="sr-only">Mic Check Podcast - Studio Interface</h1>
      
      <div className="max-w-6xl mx-auto flex justify-center items-end h-64 overflow-x-auto no-scrollbar gap-8 md:gap-14" role="img" aria-label="Logo de Mic Check formado por faders de consola de audio">
        {letters.map((letter, index) => (
          <div key={index} className={`flex flex-col items-center group h-full justify-end ${index === 3 ? 'ml-8' : ''}`}>
            <div className="w-1.5 h-full fader-track relative">
              <div 
                className="absolute left-1/2 -track-x-1/2 w-12 h-16 fader-handle flex items-center justify-center"
                style={{ bottom: positions[index], transform: 'translateX(-50%)' }}
              >
                <span className="font-headline font-black text-xl text-white/90" aria-hidden="true">{letter}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center" aria-hidden="true">
        <p className="font-label text-xs tracking-[0.6em] text-on-surface-variant uppercase">El Podcast</p>
      </div>
    </section>
  );
}
