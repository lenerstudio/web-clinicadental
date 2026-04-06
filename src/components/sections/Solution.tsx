import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, Sparkles, Syringe, Crown } from 'lucide-react';
import { useIntersection } from '../../hooks/useIntersection';

const steps = [
  {
    icon: <ClipboardCheck size={28} color="white" />,
    num: '01',
    title: 'Valoración Gratuita',
    description: 'Analizamos tu caso con radiografía panorámica y diseñamos tu plan personalizado sin coste alguno.',
  },
  {
    icon: <Sparkles size={28} color="white" />,
    num: '02',
    title: 'Plan Personalizado',
    description: 'Recibirás un presupuesto cerrado con facilidades de pago desde el primer día. Sin sorpresas.',
  },
  {
    icon: <Syringe size={28} color="white" />,
    num: '03',
    title: 'Colocación en 1 Sesión',
    description: 'Usamos sedación consciente para que no sientas nada. Proceso rápido y seguro en manos expertas.',
  },
  {
    icon: <Crown size={28} color="white" />,
    num: '04',
    title: 'Tu Nueva Sonrisa',
    description: 'Resultado natural y funcional. Recuperas la estética y la fuerza de mordida de tus dientes naturales.',
  },
];

const Solution: React.FC = () => {
  const [ref, isVisible] = useIntersection();

  return (
    <section id="solucion" ref={ref} className="section-responsive" style={{ background: '#f8faff', padding: '5rem 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span style={{
            display: 'inline-block',
            padding: '6px 16px', borderRadius: '100px',
            background: 'rgba(26,92,255,0.08)',
            color: '#1a5cff', fontSize: '0.78rem', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            Nuestro Método Innovador
          </span>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 900, color: '#0f172a',
            margin: '0 0 1rem',
            letterSpacing: '-0.03em',
          }}>
            Tu tratamiento de implantes, paso a paso
          </h2>
          <p style={{ color: '#6b7280', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7, fontSize: '1.05rem' }}>
            Diseñamos cada etapa para que sea lo más cómoda y efectiva posible, utilizando tecnología de guía quirúrgica 3D.
          </p>
        </motion.div>

        <div className="solution-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.5rem',
        }}>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '2rem',
                border: '1.5px solid #e8edf5',
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'flex-start',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                transition: 'box-shadow 0.25s, transform 0.25s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(26,92,255,0.12)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
              }}
            >
              {/* Icon + num */}
              <div style={{ flexShrink: 0 }}>
                <div style={{
                  width: '56px', height: '56px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #1a5cff, #0d3db5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 6px 18px rgba(26,92,255,0.3)',
                  marginBottom: '8px',
                }}>
                  {step.icon}
                </div>
                <div style={{
                  fontSize: '0.7rem', fontWeight: 800,
                  color: '#d1d5db', letterSpacing: '0.06em',
                  textAlign: 'center',
                }}>
                  {step.num}
                </div>
              </div>

              {/* Text */}
              <div>
                <h3 style={{
                  fontSize: '1.15rem', fontWeight: 800,
                  color: '#0f172a', margin: '0 0 0.6rem',
                  letterSpacing: '-0.01em',
                }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: 1.7, margin: 0 }}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          style={{
            marginTop: '2.5rem',
            padding: '1.5rem 2rem',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(26,92,255,0.06), rgba(0,196,140,0.04))',
            border: '1.5px solid rgba(26,92,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
          }}
        >
          <div>
            <p style={{ fontWeight: 800, color: '#0f172a', margin: '0 0 4px', fontSize: '1.05rem' }}>
              🦷 Tecnología de guía quirúrgica 3D
            </p>
            <p style={{ color: '#6b7280', margin: 0, fontSize: '0.875rem' }}>
              Implantes con precisión milimétrica, menos tiempo en silla y recuperación más rápida.
            </p>
          </div>
          <motion.button
            onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '14px 28px',
              background: 'linear-gradient(135deg, #1a5cff, #0d3db5)',
              color: 'white', border: 'none', borderRadius: '12px',
              fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer',
              fontFamily: 'Inter, system-ui, sans-serif',
              boxShadow: '0 6px 20px rgba(26,92,255,0.3)',
              whiteSpace: 'nowrap',
            }}
          >
            Solicitar valoración gratuita →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Solution;
