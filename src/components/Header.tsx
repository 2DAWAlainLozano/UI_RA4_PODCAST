import { Mic2, Radio, Settings, Mail } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full bg-surface-container-lowest border-b border-outline-variant/10 px-8 py-4 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-sm">
          <Mic2 className="text-on-primary w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <span className="font-headline font-black text-lg tracking-tighter leading-none">MIC CHECK</span>
          <span className="font-label text-[8px] tracking-[0.3em] text-primary uppercase">Studio Interface</span>
        </div>
      </div>

      <nav aria-label="Navegación principal">
        <ul className="flex items-center gap-8">
          <li>
            <a href="#episodes" className="font-label text-[10px] tracking-widest text-on-surface-variant hover:text-primary transition-colors uppercase">
              Episodios
            </a>
          </li>
          <li>
            <a href="#gear" className="font-label text-[10px] tracking-widest text-on-surface-variant hover:text-primary transition-colors uppercase">
              Equipamiento
            </a>
          </li>
          <li>
            <a href="#contact" className="font-label text-[10px] tracking-widest text-on-surface-variant hover:text-primary transition-colors uppercase">
              Contacto
            </a>
          </li>
          <li className="ml-4">
            <button 
              aria-label="Configuración"
              className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
            >
              <Settings size={18} />
            </button>
          </li>
        </ul>
      </nav>
      
      <div className="hidden md:flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full border border-outline-variant/20">
          <span className="w-2 h-2 bg-error rounded-full animate-pulse"></span>
          <span className="font-mono text-[9px] text-on-surface-variant">LIVE LINK ACTIVE</span>
        </div>
      </div>
    </header>
  );
}
