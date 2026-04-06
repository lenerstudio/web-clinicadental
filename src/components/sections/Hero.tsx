import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2, Phone, ArrowRight, Clock } from 'lucide-react';

const Hero: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Text stagger animation
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' as const } },
  };
  const fadeRight = {
    hidden: { opacity: 0, x: 50, scale: 0.95 },
    show: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, ease: 'easeOut' as const, delay: 0.3 } },
  };

  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      {/* ── BACKGROUND IMAGE ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
      }}>
        <img
          src="/hero-bg.png"
          alt=""
          aria-hidden="true"
          style={{
            width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center',
            filter: 'brightness(0.35) saturate(0.8)',
          }}
        />
        {/* Gradient overlay — dark at top/left for text, lighter towards right for image */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(5,10,30,0.88) 0%, rgba(5,10,30,0.7) 45%, rgba(5,10,30,0.35) 100%)',
        }} />
        {/* Bottom gradient fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px',
          background: 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
        }} />
        {/* Subtle blue accent glow */}
        <div style={{
          position: 'absolute', top: '15%', left: '10%',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26,92,255,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── CONTENT ── */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', padding: '8rem 2rem 6rem', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

          {/* ── LEFT COLUMN — TEXT ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}
          >
            {/* Trust pill */}
            <motion.div
              variants={fadeUp}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '8px 18px', borderRadius: '100px',
                background: 'rgba(26,92,255,0.15)',
                border: '1px solid rgba(26,92,255,0.3)',
                color: '#93b4ff', fontSize: '0.8rem', fontWeight: 700,
                width: 'fit-content',
              }}
            >
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#fbbf24" color="#fbbf24" />)}
              </div>
              <span>Clínica nº1 en Implantes • Madrid</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} style={{
              fontSize: 'clamp(2.6rem, 4.5vw, 4.2rem)',
              fontWeight: 900, lineHeight: 1.08, margin: 0,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}>
              Recupera tu sonrisa<br />
              con implantes{' '}
              <span style={{
                color: '#60a5fa',
                fontStyle: 'italic',
              }}>de por vida</span>
            </motion.h1>

            {/* Sub */}
            <motion.p variants={fadeUp} style={{
              fontSize: '1.15rem', color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.75, margin: 0, maxWidth: '460px',
            }}>
              Vuelve a comer, reír y hablar con total seguridad.{' '}
              <strong style={{ color: '#ffffff' }}>Sin dolor, sin esperas</strong>{' '}
              y con financiación desde <strong style={{ color: '#ffffff' }}>0% TAE</strong>.
            </motion.p>

            {/* ── CTA BUTTONS ── */}
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <motion.button
                onClick={scrollToForm}
                whileHover={{ scale: 1.04, boxShadow: '0 16px 48px rgba(26,92,255,0.55)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  padding: '18px 34px',
                  background: 'linear-gradient(135deg, #1a5cff 0%, #3b82f6 100%)',
                  color: 'white', border: 'none', borderRadius: '14px',
                  fontSize: '1rem', fontWeight: 800, cursor: 'pointer',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  boxShadow: '0 8px 32px rgba(26,92,255,0.5)',
                  letterSpacing: '-0.01em', whiteSpace: 'nowrap',
                }}
              >
                Valoración gratuita
                <div style={{
                  width: '28px', height: '28px', borderRadius: '8px',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <ArrowRight size={16} color="white" />
                </div>
              </motion.button>

              <motion.a
                href="tel:+34912345678"
                whileHover={{ scale: 1.04, background: 'rgba(255,255,255,0.2)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '12px',
                  padding: '18px 28px',
                  background: 'rgba(255,255,255,0.08)',
                  color: '#ffffff', border: '1.5px solid rgba(255,255,255,0.25)',
                  borderRadius: '14px', fontSize: '1rem', fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif',
                  textDecoration: 'none',
                  backdropFilter: 'blur(8px)', whiteSpace: 'nowrap',
                }}
              >
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: '#00c48c',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Phone size={17} color="white" />
                </div>
                912 345 678
              </motion.a>
            </motion.div>

            {/* Urgency */}
            <motion.div variants={fadeUp} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '12px 18px', borderRadius: '12px', width: 'fit-content',
              background: 'rgba(239,68,68,0.12)',
              border: '1px solid rgba(239,68,68,0.25)',
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', animation: 'pulse 1.5s ease-in-out infinite', flexShrink: 0 }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fca5a5' }}>
                Solo 5 valoraciones gratuitas esta semana — Quedan 2
              </span>
              <Clock size={14} color="#fca5a5" style={{ flexShrink: 0 }} />
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(255,255,255,0.12)',
            }}>
              {[
                { num: '+5.000', label: 'Implantes realizados' },
                { num: '20 años', label: 'De experiencia clínica' },
                { num: '99%', label: 'Tasa de satisfacción' },
              ].map((stat, i) => (
                <div key={i}>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#93b4ff', letterSpacing: '-0.02em' }}>
                    {stat.num}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', fontWeight: 600, marginTop: '2px' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN — PATIENT IMAGE ── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate="show"
            style={{ position: 'relative' }}
          >
            {/* Decorative ring */}
            <div style={{
              position: 'absolute', top: '-20px', right: '-20px',
              width: '100%', height: '100%', borderRadius: '2.5rem',
              border: '2px dashed rgba(255,255,255,0.12)', zIndex: 0,
            }} />

            <div style={{
              position: 'relative', zIndex: 1, borderRadius: '2.5rem', overflow: 'hidden',
              aspectRatio: '4/5',
              boxShadow: '0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08)',
            }}>
              {!imgError ? (
                <img
                  src="/hero-patient.png"
                  alt="Paciente feliz tras implantes dentales en Clínica Sonrisa Real Madrid"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  loading="eager"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div style={{
                  width: '100%', height: '100%',
                  background: 'linear-gradient(135deg, rgba(26,92,255,0.2), rgba(0,196,140,0.1))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', fontStyle: 'italic' }}>
                    [Imagen paciente]
                  </span>
                </div>
              )}

              {/* Floating bottom badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                style={{
                  position: 'absolute', bottom: '20px', left: '16px', right: '16px',
                  background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(16px)',
                  borderRadius: '16px', padding: '14px 18px',
                  display: 'flex', alignItems: 'center', gap: '12px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                }}
              >
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: '#00c48c', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <CheckCircle2 size={24} color="white" />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#111827' }}>Garantía Oficial de 10 años</div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '2px' }}>Certificado de calidad europea en cada implante</div>
                </div>
              </motion.div>

              {/* Floating top-right Google badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, type: 'spring', stiffness: 200 }}
                style={{
                  position: 'absolute', top: '20px', right: '16px',
                  background: 'white', borderRadius: '12px',
                  padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                }}
              >
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />)}
                </div>
                <span style={{ fontWeight: 800, fontSize: '0.8rem', color: '#111827' }}>5.0</span>
                <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>Google</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
