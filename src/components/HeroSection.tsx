
export default function HeroSection() {
  return (
    <section className="w-full bg-surface-container-lowest py-20 px-8 border-b border-outline-variant/10">
      <div className="max-w-6xl mx-auto flex justify-center items-end h-64 overflow-x-auto no-scrollbar gap-8 md:gap-14">
        <div className="flex flex-col items-center group h-full justify-end">
          <div className="w-1.5 h-full fader-track relative">
            <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-12 h-16 fader-handle flex items-center justify-center">
              <span className="font-headline font-black text-xl text-white/90">M</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center group h-full justify-end">
          <div className="w-1.5 h-full fader-track relative">
            <div className="absolute bottom-[45%] left-1/2 -translate-x-1/2 w-12 h-16 fader-handle flex items-center justify-center">
              <span className="font-headline font-black text-xl text-white/90">I</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center group h-full justify-end">
          <div className="w-1.5 h-full fader-track relative">
            <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-12 h-16 fader-handle flex items-center justify-center">
              <span className="font-headline font-black text-xl text-white/90">C</span>
            </div>
          </div>
        </div>
        <div className="w-8"></div>
        <div className="flex flex-col items-center group h-full justify-end">
          <div className="w-1.5 h-full fader-track relative">
            <div className="absolute bottom-[60%] left-1/2 -translate-x-1/2 w-12 h-16 fader-handle flex items-center justify-center">
              <span className="font-headline font-black text-xl text-white/90">C</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center group h-full justify-end">
          <div className="w-1.5 h-full fader-track relative">
            <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-12 h-16 fader-handle flex items-center justify-center">
              <span className="font-headline font-black text-xl text-white/90">H</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center group h-full justify-end">
          <div className="w-1.5 h-full fader-track relative">
            <div className="absolute bottom-[50%] left-1/2 -translate-x-1/2 w-12 h-16 fader-handle flex items-center justify-center">
              <span className="font-headline font-black text-xl text-white/90">E</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center group h-full justify-end">
          <div className="w-1.5 h-full fader-track relative">
            <div className="absolute bottom-[35%] left-1/2 -translate-x-1/2 w-12 h-16 fader-handle flex items-center justify-center">
              <span className="font-headline font-black text-xl text-white/90">C</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center group h-full justify-end">
          <div className="w-1.5 h-full fader-track relative">
            <div className="absolute bottom-[70%] left-1/2 -translate-x-1/2 w-12 h-16 fader-handle flex items-center justify-center">
              <span className="font-headline font-black text-xl text-white/90">K</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 text-center">
        <p className="font-label text-xs tracking-[0.6em] text-on-surface-variant uppercase">El Podcast</p>
      </div>
    </section>
  );
}
