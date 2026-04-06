import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, PlayCircle } from 'lucide-react';
import { useIntersection } from '../../hooks/useIntersection';

const Testimonials: React.FC = () => {
  const [ref, isVisible] = useIntersection();

  const testimonials = [
    {
      name: 'Carmen García',
      location: 'Madrid',
      treatment: 'All-on-4 completo',
      text: 'Llevaba años ocultando mi sonrisa. En tan solo unos días recuperé no solo mis dientes, sino mis ganas de salir a comer con amigos. El trato fue inmejorable y sin dolor.',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?u=carmen_garcia_dental',
    },
    {
      name: 'Juan Antonio Ruiz',
      location: 'Móstoles',
      treatment: 'Implante unitario',
      text: 'Excelente servicio. Me explicaron cada paso con detalle y la financiación a medida me permitió hacerme el tratamiento que necesitaba. Lo recomiendo totalmente.',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?u=juan_antonio_dental',
    },
    {
      name: 'Elena Martínez',
      location: 'Alcobendas',
      treatment: 'Implantes múltiples',
      text: 'Me daba pánico el dentista, pero la sedación consciente cambió mi experiencia por completo. No me enteré de nada y el resultado final ha superado mis expectativas.',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?u=elena_martinez_dental',
    },
  ];

  return (
    <section id="testimonios" ref={ref} style={{ background: '#f9fafb', padding: '5rem 0', overflow: 'hidden' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Quote size={48} color="#1a5cff" style={{ opacity: 0.15, margin: '0 auto 1rem' }} />
          <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: '#1a5cff' }}>TESTIMONIOS REALES</p>
          <h2 className="font-extrabold mb-6" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#111827' }}>
            Pacientes que recuperaron su sonrisa
          </h2>
          <p style={{ color: '#6b7280', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Descubre por qué cientos de madileños confían en nosotros para tratar sus implantes cada año.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-3xl relative"
              style={{ background: 'white', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid #f3f4f6' }}
            >
              {/* Quote mark decoration */}
              <div className="absolute top-6 right-6 text-6xl font-black leading-none" style={{ color: '#f0f4ff', fontFamily: 'Georgia, serif' }}>"</div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={18} color="#00c48c" fill="#00c48c" />
                ))}
              </div>

              <p className="italic leading-relaxed mb-8" style={{ color: '#374151', fontSize: '0.95rem', lineHeight: 1.75 }}>
                "{t.text}"
              </p>

              <div className="flex items-center gap-4" style={{ borderTop: '1px solid #f3f4f6', paddingTop: '1.5rem' }}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                  style={{ border: '2px solid #eff6ff' }}
                />
                <div>
                  <div className="font-bold" style={{ color: '#111827', fontSize: '0.95rem' }}>{t.name}</div>
                  <div className="text-xs font-bold uppercase tracking-wider" style={{ color: '#1a5cff' }}>{t.treatment}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video testimonial placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative rounded-3xl overflow-hidden cursor-pointer group"
          style={{ aspectRatio: '16/7', background: 'linear-gradient(135deg, #0d3db5, #1a5cff)' }}
        >
          <img
            src="/clinic-interior.png"
            alt="Vista interior de la Clínica Dental Sonrisa Real en Madrid"
            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
              style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', border: '2px solid rgba(255,255,255,0.3)' }}
            >
              <PlayCircle size={48} color="white" />
            </div>
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>Ver testimonio en vídeo</p>
            <p className="font-bold text-center px-4" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', maxWidth: '600px' }}>
              "Fue la mejor decisión que he tomado en años"
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
