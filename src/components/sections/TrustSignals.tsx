import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CalendarCheck, Award, Users } from 'lucide-react';

const TrustSignals: React.FC = () => {
  const signals = [
    {
      icon: <ShieldCheck size={32} color="#1a5cff" />,
      title: 'Garantía de 10 años',
      description: 'Certificado de calidad europea en todos nuestros implantes y prótesis.',
    },
    {
      icon: <CalendarCheck size={32} color="#1a5cff" />,
      title: 'Financiación 0%',
      description: 'Paga cómodamente mes a mes sin intereses hasta en 24 cuotas (sujeto a aprobación).',
    },
    {
      icon: <Award size={32} color="#1a5cff" />,
      title: 'Clínica Acreditada',
      description: 'Miembros del Colegio de Odontólogos y certificación ISO 9001.',
    },
    {
      icon: <Users size={32} color="#1a5cff" />,
      title: '+500 Pacientes / año',
      description: 'Tratados con éxito con una tasa de satisfacción del 99%.',
    },
  ];

  return (
    <section style={{ background: 'linear-gradient(135deg, #1a5cff 0%, #0d3db5 100%)', padding: '5rem 0' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="font-extrabold text-white mb-4" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
            Por qué más de 5.000 pacientes nos eligieron
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '500px', margin: '0 auto' }}>
            Más de dos décadas de excelencia en implantología avanzada nos avalan.
          </p>
        </div>

        <div className="trust-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {signals.map((signal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl text-center"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(255,255,255,0.15)' }}>
                {React.cloneElement(signal.icon, { color: 'white' })}
              </div>
              <h4 className="font-bold text-lg mb-3 text-white">{signal.title}</h4>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {signal.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Brand logos row */}
        <div className="pt-10" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
          <p className="text-center text-xs font-bold uppercase tracking-widest mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Trabajamos con las mejores marcas del sector
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10">
            {['Straumann', 'Nobel Biocare', 'Zimmer Biomet', 'MIS Implants'].map((brand) => (
              <span key={brand} className="text-lg font-black italic uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em' }}>
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
