export default function HardwareManifest() {
  return (
    <section className="p-8 bg-surface-container-lowest" aria-labelledby="gear-title">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <p className="font-headline text-xs font-bold uppercase tracking-[0.4em] text-on-surface-variant mb-2">Technical Spotlight</p>
          <h2 id="gear-title" className="font-headline text-3xl font-black uppercase">Hardware Manifest</h2>
        </div>
        <button className="font-label text-[10px] tracking-widest uppercase text-primary border-b border-primary/30 pb-1 focus:outline-none focus:border-primary">View Full Rack</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Card 01 */}
        <article className="relative aspect-[16/9] overflow-hidden group" aria-labelledby="gear-01-name">
          <img alt="Micrófono de estudio de gama alta Neumann U87 AI en su soporte amortiguador" className="w-full h-full object-cover filter grayscale brightness-50 group-hover:grayscale-0 transition-all duration-700" src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <div className="bg-surface-container/60 backdrop-blur-md p-6 border border-white/10 w-fit">
              <span className="font-label text-[8px] tracking-widest text-primary uppercase mb-1 block">GEAR OF THE MONTH</span>
              <h3 id="gear-01-name" className="font-headline text-2xl font-black uppercase mb-4">NEUMANN U87 AI</h3>
              <div className="flex gap-4" role="group" aria-label="Controles de micrófono">
                <div className="flex flex-col items-center gap-1">
                  <button className="w-8 h-8 rounded-full knob-conic border border-white/5 shadow-lg" aria-label="Patrón polar"></button>
                  <span className="text-[6px] font-label text-on-surface-variant" aria-hidden="true">POLAR</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <button className="w-8 h-8 rounded-full knob-conic border border-white/5 shadow-lg" aria-label="Atenuador Pad"></button>
                  <span className="text-[6px] font-label text-on-surface-variant" aria-hidden="true">PAD</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <button className="w-8 h-8 rounded-full knob-conic border border-white/5 shadow-lg" aria-label="Filtro de corte de bajos"></button>
                  <span className="text-[6px] font-label text-on-surface-variant" aria-hidden="true">CUT</span>
                </div>
              </div>
            </div>
          </div>
        </article>
        {/* Product Card 02 */}
        <article className="relative aspect-[16/9] overflow-hidden group" aria-labelledby="gear-02-name">
          <img alt="Compresor de audio analógico Universal Audio 1176 montado en rack" className="w-full h-full object-cover filter grayscale brightness-50 group-hover:grayscale-0 transition-all duration-700" src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <div className="bg-surface-container/60 backdrop-blur-md p-6 border border-white/10 w-fit">
              <span className="font-label text-[8px] tracking-widest text-tertiary uppercase mb-1 block">BENCH TEST</span>
              <h3 id="gear-02-name" className="font-headline text-2xl font-black uppercase mb-4">UNIVERSAL AUDIO 1176</h3>
              <div className="flex gap-4" role="group" aria-label="Controles de compresor">
                <div className="flex flex-col items-center gap-1">
                  <button className="w-8 h-8 rounded-full knob-conic border border-white/5 shadow-lg" aria-label="Tiempo de ataque"></button>
                  <span className="text-[6px] font-label text-on-surface-variant" aria-hidden="true">ATTACK</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <button className="w-8 h-8 rounded-full knob-conic border border-white/5 shadow-lg" aria-label="Tiempo de liberación"></button>
                  <span className="text-[6px] font-label text-on-surface-variant" aria-hidden="true">RELEASE</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <button className="w-8 h-8 rounded-full knob-conic border border-white/5 shadow-lg" aria-label="Relación de compresión"></button>
                  <span className="text-[6px] font-label text-on-surface-variant" aria-hidden="true">RATIO</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
