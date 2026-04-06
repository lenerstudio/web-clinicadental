import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Search,
  Download,
  Trash2,
  MessageSquare,
  Clock,
  CheckCircle,
  TrendingUp,
  LogIn,
  LogOut,
  ChevronDown,
  Eye,
} from 'lucide-react';
import { useLeads } from '../hooks/useLeads';
import { exportLeadsToCSV } from '../utils/exportCSV';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const { leads, loading, updateLeadStatus, updateLeadNotes, deleteLead, refreshLeads, isGoogleSheetsEnabled } = useLeads();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Contraseña incorrecta');
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'todos' || lead.estado === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStats = () => ({
    total: leads.length,
    nuevos: leads.filter(l => l.estado === 'nuevo').length,
    convertidos: leads.filter(l => l.estado === 'convertido').length,
    tasa: leads.length > 0 ? (leads.filter(l => l.estado === 'convertido').length / leads.length * 100).toFixed(1) : '0',
  });

  const stats = getStats();

  const statusLabels: Record<string, string> = {
    todos: 'Todos',
    nuevo: 'Nuevo',
    contactado: 'Contactado',
    en_seguimiento: 'Seguimiento',
    convertido: 'Convertido',
    descartado: 'Descartado',
  };

  const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
    nuevo: { bg: '#eff6ff', text: '#2563eb', dot: '#3b82f6' },
    contactado: { bg: '#f5f3ff', text: '#7c3aed', dot: '#8b5cf6' },
    en_seguimiento: { bg: '#fff7ed', text: '#c2410c', dot: '#f97316' },
    convertido: { bg: '#f0fdf4', text: '#16a34a', dot: '#22c55e' },
    descartado: { bg: '#fef2f2', text: '#dc2626', dot: '#ef4444' },
  };

  // ── LOGIN SCREEN ──
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
      }}>
        {/* Subtle grid pattern */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(40px) saturate(1.5)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '24px',
            padding: '3rem 2.5rem',
            width: '100%', maxWidth: '420px',
            boxShadow: '0 40px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          {/* Mac-style traffic lights */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
          </div>

          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '16px',
              background: 'linear-gradient(135deg, #1a5cff, #0d3db5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1rem',
              boxShadow: '0 8px 24px rgba(26,92,255,0.4)',
            }}>
              <LogIn size={28} color="white" />
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
              Panel de Control
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
              Acceso restringido · Clínica Sonrisa Real
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Contraseña
              </label>
              <input
                type="password"
                placeholder="Introduce tu contraseña..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%', padding: '14px 16px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1.5px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px', color: '#ffffff',
                  fontSize: '0.95rem', outline: 'none',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(26,92,255,0.6)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
            <button
              type="submit"
              style={{
                width: '100%', padding: '14px',
                background: 'linear-gradient(135deg, #1a5cff, #0d3db5)',
                color: 'white', border: 'none', borderRadius: '12px',
                fontSize: '0.95rem', fontWeight: 800, cursor: 'pointer',
                fontFamily: 'Inter, system-ui, sans-serif',
                boxShadow: '0 6px 20px rgba(26,92,255,0.35)',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
              onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Iniciar Sesión
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)', marginTop: '2rem' }}>
            Clínica Dental Sonrisa Real © 2026
          </p>
        </motion.div>
      </div>
    );
  }

  // ── DASHBOARD ──
  const statCards = [
    { label: 'Leads Totales', val: stats.total, icon: <Users size={20} />, gradient: 'linear-gradient(135deg, #1a5cff, #3b82f6)' },
    { label: 'Nuevos', val: stats.nuevos, icon: <Clock size={20} />, gradient: 'linear-gradient(135deg, #f59e0b, #f97316)' },
    { label: 'Convertidos', val: stats.convertidos, icon: <CheckCircle size={20} />, gradient: 'linear-gradient(135deg, #10b981, #059669)' },
    { label: 'Conversión', val: `${stats.tasa}%`, icon: <TrendingUp size={20} />, gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f7', // macOS Sonoma-style light grey
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    }}>

      {/* ── TOP BAR (mac-style) ── */}
      <div style={{
        background: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(20px) saturate(1.8)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{
          maxWidth: '1400px', margin: '0 auto',
          padding: '0 2rem', height: '56px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Left */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #1a5cff, #0d3db5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg viewBox="0 0 24 24" fill="white" style={{ width: '18px', height: '18px' }}>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z"/>
              </svg>
            </div>
            <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1d1d1f', letterSpacing: '-0.01em' }}>
              Sonrisa<span style={{ color: '#1a5cff' }}>Real</span>
              <span style={{ color: '#86868b', fontWeight: 500, marginLeft: '8px' }}>CRM</span>
            </span>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Connection status */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '5px 12px', borderRadius: '8px',
              background: isGoogleSheetsEnabled ? 'rgba(34,197,94,0.08)' : 'rgba(249,115,22,0.08)',
              border: `1px solid ${isGoogleSheetsEnabled ? 'rgba(34,197,94,0.2)' : 'rgba(249,115,22,0.2)'}`,
            }}>
              <div style={{
                width: 7, height: 7, borderRadius: '50%',
                background: isGoogleSheetsEnabled ? '#22c55e' : '#f97316',
              }} />
              <span style={{ fontSize: '0.7rem', fontWeight: 600, color: isGoogleSheetsEnabled ? '#16a34a' : '#c2410c' }}>
                {isGoogleSheetsEnabled ? 'Google Sheets' : 'Local'}
              </span>
            </div>
            {/* Refresh */}
            <button
              onClick={() => refreshLeads()}
              disabled={loading}
              style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                padding: '7px 10px', borderRadius: '8px',
                background: '#ffffff', border: '1px solid rgba(0,0,0,0.1)',
                color: '#86868b', fontSize: '0.8rem', fontWeight: 600,
                cursor: loading ? 'wait' : 'pointer', fontFamily: 'inherit',
                transition: 'background 0.15s',
                opacity: loading ? 0.5 : 1,
              }}
              title="Refrescar datos"
            >
              <svg style={{ width: 14, height: 14, animation: loading ? 'spin 1s linear infinite' : 'none' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 11-6.219-8.56"/><polyline points="21 3 21 12 12 12"/></svg>
            </button>
            <button
              onClick={() => exportLeadsToCSV(leads)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '7px 14px', borderRadius: '8px',
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.1)',
                color: '#1d1d1f', fontSize: '0.8rem', fontWeight: 600,
                cursor: 'pointer', fontFamily: 'inherit',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f7')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#ffffff')}
            >
              <Download size={14} /> Exportar
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '7px 14px', borderRadius: '8px',
                background: 'transparent', border: '1px solid rgba(0,0,0,0.08)',
                color: '#86868b', fontSize: '0.8rem', fontWeight: 600,
                cursor: 'pointer', fontFamily: 'inherit',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ff3b30')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#86868b')}
            >
              <LogOut size={14} /> Salir
            </button>
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>

        {/* Title */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1d1d1f', letterSpacing: '-0.02em', marginBottom: '4px' }}>
            Gestión de Pacientes
          </h1>
          <p style={{ color: '#86868b', fontSize: '0.9rem' }}>
            Seguimiento de leads para implantes dentales · {leads.length} registros
          </p>
        </div>

        {/* ── STAT CARDS ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {statCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '1.25rem 1.5rem',
                border: '1px solid rgba(0,0,0,0.04)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
                  {card.label}
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1d1d1f', letterSpacing: '-0.03em' }}>
                  {card.val}
                </div>
              </div>
              <div style={{
                width: '40px', height: '40px', borderRadius: '12px',
                background: card.gradient,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white',
              }}>
                {card.icon}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── SEARCH + FILTERS ── */}
        <div style={{
          background: '#ffffff', borderRadius: '16px',
          padding: '1rem 1.25rem', marginBottom: '1rem',
          border: '1px solid rgba(0,0,0,0.04)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap',
        }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: '1 1 240px', minWidth: '200px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#86868b' }} />
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%', padding: '10px 12px 10px 36px',
                background: '#f5f5f7', border: '1px solid transparent',
                borderRadius: '10px', fontSize: '0.85rem', color: '#1d1d1f',
                outline: 'none', fontFamily: 'inherit',
                transition: 'border-color 0.15s, background 0.15s',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#1a5cff'; e.currentTarget.style.background = '#ffffff'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.background = '#f5f5f7'; }}
            />
          </div>

          {/* Filter pills */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {Object.entries(statusLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilterStatus(key)}
                style={{
                  padding: '7px 14px', borderRadius: '8px',
                  fontSize: '0.75rem', fontWeight: 600,
                  fontFamily: 'inherit', cursor: 'pointer',
                  transition: 'all 0.15s',
                  background: filterStatus === key ? '#1a5cff' : '#f5f5f7',
                  color: filterStatus === key ? '#ffffff' : '#86868b',
                  border: filterStatus === key ? '1px solid #1a5cff' : '1px solid transparent',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── TABLE ── */}
        <div style={{
          background: '#ffffff', borderRadius: '16px',
          border: '1px solid rgba(0,0,0,0.04)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          overflow: 'hidden',
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  {['Paciente', 'Consulta', 'Estado', 'Notas', ''].map((col, i) => (
                    <th key={i} style={{
                      padding: '12px 1.25rem',
                      fontSize: '0.7rem', fontWeight: 600, color: '#86868b',
                      textTransform: 'uppercase', letterSpacing: '0.06em',
                      background: '#fafafa',
                    }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredLeads.map((lead) => {
                    const sc = statusColors[lead.estado] || statusColors.nuevo;
                    return (
                      <motion.tr
                        key={lead.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                          borderBottom: '1px solid rgba(0,0,0,0.04)',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#fafafa')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        {/* Patient */}
                        <td style={{ padding: '14px 1.25rem' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1d1d1f', marginBottom: '2px' }}>
                            {lead.nombre}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#86868b' }}>
                            <Clock size={11} />
                            {new Date(lead.timestamp).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                            <span style={{ margin: '0 4px', color: '#d1d5db' }}>·</span>
                            {lead.telefono}
                          </div>
                        </td>

                        {/* Consulta */}
                        <td style={{ padding: '14px 1.25rem' }}>
                          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1d1d1f' }}>{lead.consulta}</div>
                          <div style={{ fontSize: '0.75rem', color: '#86868b', marginTop: '2px' }}>{lead.email}</div>
                        </td>

                        {/* Status */}
                        <td style={{ padding: '14px 1.25rem' }}>
                          <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                            <select
                              value={lead.estado}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                              style={{
                                appearance: 'none',
                                padding: '6px 28px 6px 20px',
                                borderRadius: '8px',
                                fontSize: '0.75rem', fontWeight: 700,
                                fontFamily: 'inherit', cursor: 'pointer',
                                border: 'none', outline: 'none',
                                background: sc.bg, color: sc.text,
                                textTransform: 'uppercase',
                                letterSpacing: '0.04em',
                              }}
                            >
                              <option value="nuevo">Nuevo</option>
                              <option value="contactado">Contactado</option>
                              <option value="en_seguimiento">Seguimiento</option>
                              <option value="convertido">Convertido</option>
                              <option value="descartado">Descartado</option>
                            </select>
                            {/* Dot indicator */}
                            <div style={{
                              position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)',
                              width: '6px', height: '6px', borderRadius: '50%', background: sc.dot,
                            }} />
                            <ChevronDown size={12} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', color: sc.text, pointerEvents: 'none' }} />
                          </div>
                        </td>

                        {/* Notes */}
                        <td style={{ padding: '14px 1.25rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <MessageSquare size={13} style={{ color: '#d1d5db', flexShrink: 0 }} />
                            <input
                              type="text"
                              placeholder="Añadir nota..."
                              value={lead.notas}
                              onChange={(e) => updateLeadNotes(lead.id, e.target.value)}
                              style={{
                                width: '100%', border: 'none', background: 'transparent',
                                fontSize: '0.82rem', color: '#1d1d1f', outline: 'none',
                                fontFamily: 'inherit', padding: '4px 0',
                                borderBottom: '1px solid transparent',
                                transition: 'border-color 0.15s',
                              }}
                              onFocus={(e) => (e.currentTarget.style.borderBottom = '1px solid #1a5cff')}
                              onBlur={(e) => (e.currentTarget.style.borderBottom = '1px solid transparent')}
                            />
                          </div>
                        </td>

                        {/* Actions */}
                        <td style={{ padding: '14px 1.25rem', textAlign: 'right' }}>
                          <button
                            onClick={() => { if (confirm('¿Eliminar este lead?')) deleteLead(lead.id); }}
                            style={{
                              padding: '6px', borderRadius: '8px',
                              background: 'transparent', border: 'none',
                              color: '#d1d5db', cursor: 'pointer',
                              transition: 'color 0.15s, background 0.15s',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = '#ff3b30'; e.currentTarget.style.background = '#fef2f2'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = '#d1d5db'; e.currentTarget.style.background = 'transparent'; }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
                {filteredLeads.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{
                      padding: '4rem 1.5rem', textAlign: 'center',
                      color: '#86868b', fontSize: '0.9rem', fontStyle: 'italic',
                    }}>
                      <Eye size={32} style={{ margin: '0 auto 1rem', color: '#d1d5db' }} />
                      No se encontraron leads con estos criterios.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table footer */}
          <div style={{
            padding: '12px 1.25rem',
            borderTop: '1px solid rgba(0,0,0,0.04)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: '#fafafa',
          }}>
            <span style={{ fontSize: '0.75rem', color: '#86868b' }}>
              Mostrando {filteredLeads.length} de {leads.length} leads
            </span>
            <span style={{ fontSize: '0.7rem', color: '#d1d5db' }}>
              Datos almacenados localmente
            </span>
          </div>
        </div>
      </div>

      {/* Responsive overrides for mobile */}
      <style>{`
        @media (max-width: 767px) {
          div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Admin;
