import { useState, useRef } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const liveRegionRef = useRef<HTMLDivElement>(null);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio.';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El formato del email no es válido.';
    }
    if (!formData.message.trim()) newErrors.message = 'El mensaje no puede estar vacío.';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setStatus('sending');
      // Simulate API call
      setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      }, 1500);
    }
  };

  return (
    <section id="contact" className="p-8 mt-20" aria-labelledby="contact-title">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <p className="font-headline text-xs font-bold uppercase tracking-[0.4em] text-on-surface-variant mb-2">Connect with us</p>
          <h2 id="contact-title" className="font-headline text-4xl font-black uppercase tracking-tighter">Direct Signal Path</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-surface-container-low p-10 border border-outline-variant/10 shadow-2xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -mr-16 -mt-16 rounded-full blur-3xl"></div>
          
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="font-headline font-bold text-lg mb-4 text-primary">Información de Contacto</h3>
              <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
                ¿Tienes una propuesta técnica o quieres participar en el podcast? Envíanos un mensaje directo a nuestra consola.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary border border-primary/20">
                    <span className="material-symbols-outlined text-sm">mail</span>
                  </div>
                  <span className="font-mono text-xs">studio@miccheck.labs</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary border border-primary/20">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                  </div>
                  <span className="font-mono text-xs">Audio District, Barcelona</span>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-8 border-t border-outline-variant/10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary/80">Support Online</span>
              </div>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-mono">Response Time: &lt; 24h</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div role="status" aria-live="polite" className="sr-only">
              {status === 'success' && 'Formulario enviado con éxito. Gracias por contactar.'}
              {Object.keys(errors).length > 0 && `El formulario tiene ${Object.keys(errors).length} errores.`}
            </div>

            <div>
              <label htmlFor="name" className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">Nombre Completo</label>
              <input 
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full bg-surface-container-lowest border ${errors.name ? 'border-error' : 'border-outline-variant/30'} px-4 py-3 font-mono text-sm focus:outline-none focus:border-primary transition-colors`}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                required
              />
              {errors.name && <p id="name-error" className="text-error text-[10px] mt-1 font-medium">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">Email de Contacto</label>
              <input 
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full bg-surface-container-lowest border ${errors.email ? 'border-error' : 'border-outline-variant/30'} px-4 py-3 font-mono text-sm focus:outline-none focus:border-primary transition-colors`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                required
              />
              {errors.email && <p id="email-error" className="text-error text-[10px] mt-1 font-medium">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">Mensaje / Input</label>
              <textarea 
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full bg-surface-container-lowest border ${errors.message ? 'border-error' : 'border-outline-variant/30'} px-4 py-3 font-mono text-sm focus:outline-none focus:border-primary transition-colors resize-none`}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                required
              />
              {errors.message && <p id="message-error" className="text-error text-[10px] mt-1 font-medium">{errors.message}</p>}
            </div>

            <button 
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-primary text-on-primary font-headline font-bold py-4 uppercase tracking-[0.2em] hover:bg-primary-fixed-dim transition-all disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {status === 'sending' ? (
                <>
                  <div className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin"></div>
                  TRANSMITIENDO...
                </>
              ) : status === 'success' ? (
                'RECIBIDO OK'
              ) : (
                'ENVIAR SEÑAL'
              )}
            </button>
            
            {status === 'success' && (
              <div aria-live="polite" className="p-4 bg-primary/10 border border-primary/20 text-primary text-xs font-mono text-center">
                SEÑAL RECIBIDA. Nos pondremos en contacto pronto.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
