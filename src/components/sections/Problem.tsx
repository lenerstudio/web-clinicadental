import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Utensils, Ghost, Wallet } from 'lucide-react';
import { useIntersection } from '../../hooks/useIntersection';

const Problem: React.FC = () => {
  const [ref, isVisible] = useIntersection();

  const painPoints = [
    {
      icon: <Camera size={28} color="#1a5cff" />,
      title: 'Vergüenza al sonreír',
      description: 'Evitas las fotos y te tapas la boca al reír por la falta de piezas dentales.',
      bg: 'rgba(26,92,255,0.06)',
      border: 'rgba(26,92,255,0.12)',
    },
    {
      icon: <Utensils size={28} color="#1a5cff" />,
      title: 'Dificultad para comer',
      description: 'Ya no disfrutas de tus platos favoritos por el dolor o la falta de fuerza al masticar.',
      bg: 'rgba(26,92,255,0.06)',
      border: 'rgba(26,92,255,0.12)',
    },
    {
      icon: <Ghost size={28} color="#1a5cff" />,
      title: 'Miedo al dentista',
      description: 'Has pospuesto el tratamiento por malas experiencias pasadas o temor al dolor.',
      bg: 'rgba(26,92,255,0.06)',
      border: 'rgba(26,92,255,0.12)',
    },
    {
      icon: <Wallet size={28} color="#1a5cff" />,
      title: 'Precios inalcanzables',
      description: 'Crees que un tratamiento de calidad está fuera de tu presupuesto actual.',
      bg: 'rgba(26,92,255,0.06)',
      border: 'rgba(26,92,255,0.12)',
    },
  ];

  return (
    <section id="problema" ref={ref} className="section-responsive" style={{ background: '#ffffff', padding: '5rem 0' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: '#1a5cff' }}>
            IDENTIFICATE
          </p>
          <h2 className="font-extrabold mb-6" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#111827', lineHeight: 1.2 }}>
            ¿Te reconoces en alguna de estas situaciones?
          </h2>
          <p className="text-lg mx-auto" style={{ color: '#6b7280', maxWidth: '560px', lineHeight: 1.7 }}>
            Perder un diente no es solo un problema estético; afecta a tu salud, tu confianza y tu calidad de vida diaria.
          </p>
        </motion.div>

        <div className="problem-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="problem-card group p-8 rounded-2xl transition-all duration-300 cursor-default"
              style={{ background: point.bg, border: `1.5px solid ${point.border}` }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 40px rgba(26,92,255,0.1)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: 'white', border: '1px solid rgba(26,92,255,0.15)' }}>
                {point.icon}
              </div>
              <h3 className="font-bold text-lg mb-3" style={{ color: '#111827' }}>{point.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{point.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-lg font-bold italic" style={{ color: '#1a5cff' }}>
            "No tienes por qué seguir así. Tenemos la solución definitiva para ti." →
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Problem;
