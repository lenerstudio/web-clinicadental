import type { Lead } from '../types/lead';

export const exportLeadsToCSV = (leads: Lead[]) => {
  if (leads.length === 0) return;

  const headers = ['Fecha', 'Nombre', 'Teléfono', 'Email', 'Consulta', 'Estado', 'Notas'];
  const rows = leads.map((lead) => [
      new Date(lead.timestamp).toLocaleString('es-ES'),
      lead.nombre,
      `="${lead.telefono}"`, // Force Excel to treat as text
      lead.email,
      lead.consulta,
      lead.estado,
      lead.notas.replace(/,/g, ' ') // Simple CSV escape
    ]);

  const csvContent = 
    "data:text/csv;charset=utf-8,\uFEFF" + 
    [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `leads_clinica_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
