import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Accordion from '../ui/Accordion';

const FAQ: React.FC = () => {
  const faqData = [
    {
      title: "¿Cuánto cuesta un implante dental hoy?",
      content: "El precio medio oscila entre 800€ y 1.200€ por pieza completa (implante + corona), pero dependerá del tipo de hueso y solución protésica. Ofrecemos presupuestos cerrados y sin sorpresas tras la valoración inicial."
    },
    {
      title: "¿Es dolorosa la intervención?",
      content: "No. Durante la cirugía de colocación del implante utilizamos anestesia local y, si el paciente lo requiere, sedación consciente. Tras la intervención, el postoperatorio suele ser muy llevadero con medicación antiinflamatoria."
    },
    {
      title: "¿Cuánto tiempo dura el tratamiento?",
      content: "La colocación del implante suele realizarse en menos de una hora. La integración del implante con el hueso (osteointegración) tarda entre 3 y 5 meses, tras lo cual se coloca la corona definitiva sobre el mismo."
    },
    {
      title: "¿Qué pasa si no tengo suficiente hueso?",
      content: "No es un problema insalvable. Disponemos de técnicas micro-crecentales y de injerto óseo (bio-materiales) para recuperar la anchura y altura necesarias para que el implante sea estable y duradero."
    },
    {
      title: "¿Los implantes son para siempre?",
      content: "Si se cuidan como si fueran dientes naturales, con una higiene adecuada y revisiones periódicas, un implante de calidad puede durar toda la vida. Los estudios clínicos avalan su durabilidad superior a 25-30 años."
    },
    {
      title: "¿Ofrecen financiación?",
      content: "Sí, disponemos de convenios con diversas entidades bancarias para ofrecer financiación sin intereses hasta en 24 meses y planes personalizados a largo plazo para tratamientos complejos."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.title,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.content
      }
    }))
  };

  return (
    <section id="faq" className="section-padding bg-neutral-50 relative overflow-hidden">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      
      {/* Visual background accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full -ml-32 -mb-32 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
             <HelpCircle className="text-primary opacity-20" size={56} />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-6">
            Resolvemos tus dudas principales
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            La información transparente es el primer paso para una decisión acertada sobre tu salud dental.
          </p>
        </div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
          <Accordion items={faqData} />
        </motion.div>

        <div className="mt-16 text-center">
           <p className="text-neutral-600 italic">
             ¿Tienes alguna otra duda? <a href="#lead-form" className="text-primary font-bold hover:underline">Escríbenos directamente</a> o llama al <a href="tel:+34912345678" className="text-primary font-bold hover:underline">912 345 678</a>.
           </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
