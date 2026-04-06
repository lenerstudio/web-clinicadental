import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Problemas', id: 'problema' },
    { label: 'Solución', id: 'solucion' },
    { label: 'Testimonios', id: 'testimonios' },
    { label: 'FAQ', id: 'faq' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: -14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
  };

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000,
      transition: 'all 0.35s ease',
      background: isScrolled ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.1)',
      backdropFilter: isScrolled ? 'blur(20px) saturate(1.6)' : 'blur(6px)',
      boxShadow: isScrolled ? '0 2px 24px rgba(0,0,0,0.08)' : 'none',
      borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.1)',
    }}>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          maxWidth: '1280px', margin: '0 auto', padding: '0 1.25rem',
          height: isScrolled ? '60px' : '68px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'height 0.35s ease',
        }}
      >
        {/* Logo */}
        <motion.div
          variants={item}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <img
            src="/logo-clinica.png"
            alt="Clínica Dental - Logo"
            style={{
              height: isScrolled ? '45px' : '50px',
              width: 'auto',
              objectFit: 'contain',
              transition: 'height 0.35s ease, filter 0.35s ease',
              filter: isScrolled
                ? 'none'
                : 'drop-shadow(0 1px 6px rgba(0,0,0,0.35)) brightness(1.1)',
            }}
          />
        </motion.div>

        {/* Desktop nav */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {navLinks.map((link) => (
            <motion.button
              key={link.id}
              variants={item}
              onClick={() => scrollTo(link.id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontWeight: 600, fontSize: '0.9rem',
                color: isScrolled ? '#4b5563' : 'rgba(255,255,255,0.85)',
                fontFamily: 'Inter, system-ui, sans-serif',
                transition: 'color 0.25s', padding: '4px 0',
                textShadow: isScrolled ? 'none' : '0 1px 4px rgba(0,0,0,0.2)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#1a5cff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = isScrolled ? '#4b5563' : 'rgba(255,255,255,0.85)')}
            >
              {link.label}
            </motion.button>
          ))}
        </nav>

        {/* Desktop right side */}
        <motion.div className="desktop-right" variants={item} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="tel:+52912345678" style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            color: isScrolled ? '#111827' : 'rgba(255,255,255,0.9)',
            fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none',
            transition: 'color 0.3s',
            textShadow: isScrolled ? 'none' : '0 1px 4px rgba(0,0,0,0.2)',
          }}>
            <Phone size={16} /><span>912 345 678</span>
          </a>
          <motion.button
            onClick={() => scrollTo('lead-form')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '10px 22px',
              background: 'linear-gradient(135deg, #1a5cff, #0d3db5)',
              color: 'white', border: 'none', borderRadius: '10px',
              fontWeight: 800, fontSize: '0.875rem', cursor: 'pointer',
              fontFamily: 'Inter, system-ui, sans-serif',
              boxShadow: '0 4px 14px rgba(26,92,255,0.4)',
            }}
          >
            Cita Gratuita
          </motion.button>
        </motion.div>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
            color: isScrolled ? '#111827' : '#ffffff',
          }}
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'white', borderTop: '1px solid #f1f5f9', overflow: 'hidden',
              boxShadow: '0 16px 40px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ padding: '1.5rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontWeight: 700, fontSize: '1rem', color: '#111827',
                    fontFamily: 'Inter, system-ui, sans-serif', textAlign: 'left',
                    padding: '12px 0', borderBottom: '1px solid #f1f5f9',
                  }}
                >
                  {link.label}
                </button>
              ))}
              <a href="tel:+52912345678" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '14px', borderRadius: '12px', marginTop: '0.5rem',
                border: '2px solid #e2e8f0', color: '#111827', fontWeight: 700,
                textDecoration: 'none',
              }}>
                <Phone size={18} color="#1a5cff" /> 912 345 678
              </a>
              <button
                onClick={() => scrollTo('lead-form')}
                style={{
                  padding: '16px',
                  background: 'linear-gradient(135deg, #1a5cff, #0d3db5)',
                  color: 'white', border: 'none', borderRadius: '12px',
                  fontWeight: 800, fontSize: '1rem', cursor: 'pointer',
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                Solicitar cita gratuita
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
