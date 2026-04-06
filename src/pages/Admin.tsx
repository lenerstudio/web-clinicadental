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
  LogIn
} from 'lucide-react';
import { useLeads } from '../hooks/useLeads';
import { exportLeadsToCSV } from '../utils/exportCSV';
import Button from '../components/ui/Button';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const { leads, updateLeadStatus, updateLeadNotes, deleteLead } = useLeads();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple password for MVP
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

  const getStats = () => {
    return {
      total: leads.length,
      nuevos: leads.filter(l => l.estado === 'nuevo').length,
      convertidos: leads.filter(l => l.estado === 'convertido').length,
      tasa: leads.length > 0 ? (leads.filter(l => l.estado === 'convertido').length / leads.length * 100).toFixed(1) : 0
    };
  };

  const stats = getStats();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <LogIn size={32} />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900">Panel de Control</h1>
            <p className="text-neutral-500">Acceso restringido para administración.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-neutral-900 mb-2">Contraseña de acceso</label>
              <input 
                type="password" 
                className="w-full p-4 bg-neutral-100 border-2 border-transparent rounded-xl focus:border-primary focus:bg-white transition-all outline-none"
                placeholder="Introduce password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" size="full">
              Iniciar Sesión
            </Button>
          </form>
          <p className="text-center text-xs text-neutral-400 mt-6 italic">
            Clínica Dental Sonrisa Real &copy; 2026 Admin Panel
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 flex items-center gap-3">
              <TrendingUp className="text-primary" />
              Gestión de Pacientes (CRM)
            </h1>
            <p className="text-neutral-500">Seguimiento de leads para implantes dentales.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button variant="outline" size="sm" onClick={() => exportLeadsToCSV(leads)}>
              <Download size={18} className="mr-2" /> Exportar CSV
            </Button>
            <Button variant="danger" size="sm" onClick={() => setIsAuthenticated(false)}>
              Salir
            </Button>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Leads Totales', val: stats.total, icon: <Users />, color: 'primary' },
            { label: 'Nuevos (Pendientes)', val: stats.nuevos, icon: <Clock />, color: 'accent' },
            { label: 'Tratamientos Cerrados', val: stats.convertidos, icon: <CheckCircle />, color: 'success' },
            { label: 'Tasa Conversión', val: `${stats.tasa}%`, icon: <TrendingUp />, color: 'primary' }
          ].map((card, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex items-center justify-between"
            >
              <div>
                 <div className="text-neutral-500 text-sm font-bold mb-1 uppercase tracking-wider">{card.label}</div>
                 <div className="text-3xl font-extrabold text-neutral-900">{card.val}</div>
              </div>
              <div className={`p-4 bg-primary/5 text-primary rounded-xl`}>
                 {card.icon}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters/Search */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-100 mb-8 flex flex-col md:flex-row gap-6 items-center">
           <div className="relative flex-grow w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
              <input 
                type="text" 
                placeholder="Buscar por nombre o email..."
                className="w-full pl-12 pr-4 py-3 bg-neutral-50 border-2 border-transparent rounded-xl focus:border-primary transition-all outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <div className="flex gap-2 w-full md:w-auto">
              {['todos', 'nuevo', 'contactado', 'en_seguimiento', 'convertido', 'descartado'].map(s => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all whitespace-nowrap ${
                    filterStatus === s ? 'bg-primary text-white shadow-lg' : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                  }`}
                >
                  {s}
                </button>
              ))}
           </div>
        </div>

        {/* Lead Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-100 italic">
                  <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-widest">Paciente / Fecha</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-widest">Consulta / Contacto</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-widest">Estado</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-widest">Notas</th>
                  <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-widest text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                <AnimatePresence>
                  {filteredLeads.map((lead) => (
                    <motion.tr 
                      key={lead.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-neutral-50 transition-colors"
                    >
                      <td className="px-6 py-6">
                        <div className="font-bold text-neutral-900">{lead.nombre}</div>
                        <div className="text-xs text-neutral-500 flex items-center gap-1 mt-1">
                          <Clock size={12} /> {new Date(lead.timestamp).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="text-sm font-semibold text-primary">{lead.consulta}</div>
                        <div className="text-xs text-neutral-500 mt-1">{lead.telefono} | {lead.email}</div>
                      </td>
                      <td className="px-6 py-6">
                        <select
                          value={lead.estado}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                          className={`text-xs font-bold px-3 py-2 rounded-lg outline-none border border-transparent focus:border-primary leading-tight uppercase ${
                            lead.estado === 'nuevo' ? 'bg-accent/10 text-accent-dark' : 
                            lead.estado === 'convertido' ? 'bg-emerald-100 text-emerald-600' :
                            lead.estado === 'descartado' ? 'bg-red-100 text-red-600' :
                            'bg-neutral-100 text-neutral-600'
                          }`}
                        >
                          <option value="nuevo">NUEVO</option>
                          <option value="contactado">CONTACTADO</option>
                          <option value="en_seguimiento">SEGUIMIENTO</option>
                          <option value="convertido">CONVERTIDO</option>
                          <option value="descartado">DESCARTADO</option>
                        </select>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-2">
                           <MessageSquare size={14} className="text-neutral-400 shrink-0" />
                           <input 
                             type="text" 
                             className="text-xs w-full bg-transparent border-b border-transparent hover:border-neutral-200 focus:border-primary focus:outline-none py-1"
                             placeholder="Añadir nota..."
                             value={lead.notas}
                             onChange={(e) => updateLeadNotes(lead.id, e.target.value)}
                           />
                        </div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <button 
                          onClick={() => { if(confirm('¿Seguro?')) deleteLead(lead.id) }} 
                          className="p-2 text-neutral-400 hover:text-error transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
                {filteredLeads.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center text-neutral-400 italic">
                       No se encontraron leads con estos criterios.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
