import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2, Phone, Star } from 'lucide-react';
import { leadSchema, type LeadFormData } from '../../utils/validators';
import { useLeads } from '../../hooks/useLeads';

const LeadForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { saveLead } = useLeads();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormData>({ resolver: zodResolver(leadSchema) });

  const onSubmit = async (data: LeadFormData) => {
    setStatus('loading');
    try {
      const { politicaPrivacidad: _, ...leadData } = data;
      await saveLead(leadData);
      setStatus('success');
      reset();
      setTimeout(() => setStatus('idle'), 6000);
    } catch {
      setStatus('error');
    }
  };

  const inputClass = (hasError: boolean) => ({
    width: '100%',
    padding: '14px 16px',
    background: '#f9fafb',
    border: `2px solid ${hasError ? 'rgba(239,68,68,0.5)' : '#e5e7eb'}`,
    borderRadius: '12px',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s, background 0.2s',
    fontFamily: 'Inter, system-ui, sans-serif',
    color: '#111827',
  });

  return (
    <section id="lead-form" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f0f4ff 100%)', padding: '5rem 0' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="form-layout grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Benefits + Social Proof */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: '#1a5cff' }}>VALORACIÓN GRATUITA</p>
            <h2 className="font-extrabold mb-6" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#111827', lineHeight: 1.2 }}>
              Solicita tu valoración <span style={{ color: '#1a5cff', fontStyle: 'italic' }}>GRATUITA</span> ahora
            </h2>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: '#6b7280' }}>
              Estás a un paso de recuperar tu sonrisa. Déjanos tus datos y uno de nuestros especialistas te contactará en{' '}
              <strong style={{ color: '#111827' }}>menos de 24 horas</strong>.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                'Valoración digital 3D sin coste',
                'Radiografía panorámica incluida',
                'Plan de tratamiento personalizado',
                'Presupuesto cerrado, sin sorpresas',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-semibold" style={{ color: '#374151' }}>
                  <CheckCircle2 size={22} color="#00c48c" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Image with overlay */}
            <div className="relative rounded-2xl overflow-hidden" style={{ height: '220px' }}>
              <img
                src="/hero-patient.png"
                alt="Paciente satisfecha tras tratamiento dental en Clínica Sonrisa Real"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(17,24,39,0.7) 0%, transparent 60%)' }} />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex gap-1 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} color="#FFD700" fill="#FFD700" />)}
                </div>
                <p className="text-white font-bold text-sm">"El mejor servicio dental que he recibido"</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>— María López, Madrid · Implante All-on-4</p>
              </div>
            </div>

            {/* Direct call CTA */}
            <a
              href="tel:+34912345678"
              className="mt-6 flex items-center gap-4 p-4 rounded-2xl transition-all hover:scale-105"
              style={{ background: 'white', border: '2px solid #e5e7eb', textDecoration: 'none', display: 'flex' }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: '#1a5cff' }}>
                <Phone size={22} color="white" />
              </div>
              <div>
                <div className="font-bold" style={{ color: '#111827' }}>O llámanos directamente</div>
                <div className="font-black text-lg" style={{ color: '#1a5cff' }}>912 345 678</div>
              </div>
              <div className="ml-auto text-xs font-bold" style={{ color: '#6b7280' }}>Lun–Vie<br />9:00–20:00</div>
            </a>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 md:p-10 rounded-3xl"
            style={{ background: 'white', boxShadow: '0 20px 60px rgba(26,92,255,0.12)', border: '1px solid rgba(26,92,255,0.08)' }}
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-10"
                >
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(0,196,140,0.1)' }}>
                    <CheckCircle2 size={48} color="#00c48c" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: '#111827' }}>¡Solicitud recibida!</h3>
                  <p className="leading-relaxed mb-8" style={{ color: '#6b7280' }}>
                    Uno de nuestros coordinadores clínicos te llamará en menos de 24 horas laborables desde nuestro número oficial.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="font-bold underline text-sm"
                    style={{ color: '#1a5cff' }}
                  >
                    Enviar otra consulta
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit(onSubmit)}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                >
                  <div>
                    <p className="font-bold mb-1" style={{ color: '#111827', fontSize: '1.1rem' }}>Solicita tu cita gratuita</p>
                    <p className="text-sm" style={{ color: '#9ca3af' }}>Rellena el formulario y te contactamos en 24h.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: '#374151' }}>Nombre completo *</label>
                    <input {...register('nombre')} type="text" placeholder="Ej: David García Ruiz" style={inputClass(!!errors.nombre)} />
                    {errors.nombre && <p className="text-xs font-bold mt-1" style={{ color: '#ef4444' }} role="alert">{errors.nombre.message}</p>}
                  </div>

                  <div className="form-fields-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: '#374151' }}>Teléfono *</label>
                      <input {...register('telefono')} type="tel" placeholder="+34 600 000 000" style={inputClass(!!errors.telefono)} />
                      {errors.telefono && <p className="text-xs font-bold mt-1" style={{ color: '#ef4444' }} role="alert">{errors.telefono.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: '#374151' }}>Email *</label>
                      <input {...register('email')} type="email" placeholder="tu@email.com" style={inputClass(!!errors.email)} />
                      {errors.email && <p className="text-xs font-bold mt-1" style={{ color: '#ef4444' }} role="alert">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: '#374151' }}>Motivo de consulta *</label>
                    <select {...register('consulta')} style={{ ...inputClass(!!errors.consulta), appearance: 'none', cursor: 'pointer' }}>
                      <option value="">Selecciona una opción...</option>
                      <option value="Implante unitario">Implante unitario (una pieza)</option>
                      <option value="Implantes múltiples">Implantes múltiples (varias piezas)</option>
                      <option value="All-on-4">All-on-4 / All-on-6 (boca completa)</option>
                      <option value="Revisión">Revisión de implantes actuales</option>
                      <option value="Otro">Otro / Consulta personalizada</option>
                    </select>
                    {errors.consulta && <p className="text-xs font-bold mt-1" style={{ color: '#ef4444' }} role="alert">{errors.consulta.message}</p>}
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input {...register('politicaPrivacidad')} type="checkbox" style={{ marginTop: '2px', width: '18px', height: '18px', accentColor: '#1a5cff', cursor: 'pointer' }} />
                    <span className="text-xs leading-relaxed" style={{ color: '#9ca3af' }}>
                      He leído y acepto la{' '}
                      <a href="#" style={{ color: '#1a5cff', fontWeight: 700, textDecoration: 'underline' }}>Política de Privacidad</a>.
                      Mis datos serán tratados para gestionar la cita solicitada.
                    </span>
                  </label>
                  {errors.politicaPrivacidad && <p className="text-xs font-bold" style={{ color: '#ef4444' }} role="alert">{errors.politicaPrivacidad.message}</p>}

                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      background: status === 'loading' ? '#6b7280' : 'linear-gradient(135deg, #1a5cff, #0d3db5)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '16px 24px',
                      fontSize: '1rem',
                      fontWeight: 700,
                      cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      width: '100%',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      boxShadow: '0 8px 24px rgba(26,92,255,0.35)',
                    }}
                  >
                    {status === 'loading' ? (
                      <Loader2 size={22} style={{ animation: 'spin 1s linear infinite' }} />
                    ) : (
                      <><Send size={18} /> Quiero mi valoración gratuita</>
                    )}
                  </motion.button>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.08)', color: '#ef4444' }}>
                      <AlertCircle size={18} />
                      <span className="text-sm font-bold">Error al enviar. Por favor, llama directamente.</span>
                    </div>
                  )}

                  <p className="text-center text-xs" style={{ color: '#9ca3af' }}>
                    Sin compromiso · Te llamamos en menos de 24h · Información 100% confidencial
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
