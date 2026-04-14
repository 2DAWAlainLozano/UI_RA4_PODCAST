import { ExternalLink } from 'lucide-react';
import AuditReportButton from './AuditReportButton';

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/20 pt-16 pb-8 px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-primary/20 flex items-center justify-center rounded-sm border border-primary/30">
              <span className="font-headline font-black text-primary text-sm">MC</span>
            </div>
            <span className="font-headline font-black text-xl tracking-tighter">MIC CHECK</span>
          </div>
          <p className="text-on-surface-variant text-sm max-w-sm leading-relaxed mb-6">
            La plataforma definitiva para el análisis técnico de audio y la cultura del podcasting profesional. Diseñado para audiófilos y creadores de contenido.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all active:scale-95" aria-label="Github">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all active:scale-95" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all active:scale-95" aria-label="Youtube">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2 60.11 60.11 0 0 1 15 0 2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2 60.11 60.11 0 0 1-15 0 2 2 0 0 1-2-2z"/><path d="m10 15 5-3-5-3z"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-headline font-bold text-xs uppercase tracking-[0.2em] mb-6 text-primary">Navegación</h4>
          <ul className="flex flex-col gap-4">
            <li><a href="#episodes" className="text-sm text-on-surface-variant hover:text-white transition-colors">Episodios Recientes</a></li>
            <li><a href="#gear" className="text-sm text-on-surface-variant hover:text-white transition-colors">Archivo de Hardware</a></li>
            <li><a href="#about" className="text-sm text-on-surface-variant hover:text-white transition-colors">Sobre el Estudio</a></li>
            <li><a href="#contact" className="text-sm text-on-surface-variant hover:text-white transition-colors">Contacto Directo</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline font-bold text-xs uppercase tracking-[0.2em] mb-6 text-primary">Legal</h4>
          <ul className="flex flex-col gap-4">
            <li><a href="#" className="text-sm text-on-surface-variant hover:text-white transition-colors">Privacidad</a></li>
            <li><a href="#" className="text-sm text-on-surface-variant hover:text-white transition-colors">Términos de Uso</a></li>
            <li><a href="#" className="text-sm text-on-surface-variant hover:text-white transition-colors flex items-center gap-2">Accesibilidad <ExternalLink size={12} /></a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-mono text-[10px] text-on-surface-variant tracking-widest uppercase">
          © 2026 MIC CHECK AUDIO LABS. ALL SIGNAL PATHS RESERVED.
        </p>
        <div className="flex items-center gap-6">
          <AuditReportButton />
          <span className="font-mono text-[10px] text-primary/60 tracking-widest uppercase">V2.2.0 AA COMPLIANT</span>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
            <span className="font-mono text-[9px] text-on-surface-variant">SYSTEMS NOMINAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
