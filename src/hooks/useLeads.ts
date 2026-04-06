import { useState, useEffect } from 'react';
import type { Lead } from '../types/lead';

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const storedLeads = localStorage.getItem('clinic_leads');
    if (storedLeads) {
      setLeads(JSON.parse(storedLeads));
    }
  }, []);

  const saveLead = async (leadData: Omit<Lead, 'id' | 'timestamp' | 'estado' | 'notas'>) => {
    // Simulating API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newLead: Lead = {
          ...leadData,
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          estado: 'nuevo',
          notas: '',
        };

        const updatedLeads = [newLead, ...leads];
        setLeads(updatedLeads);
        localStorage.setItem('clinic_leads', JSON.stringify(updatedLeads));
        resolve();
      }, 500);
    });
  };

  const updateLeadStatus = (id: string, estado: Lead['estado']) => {
    const updatedLeads = leads.map((lead) =>
      lead.id === id ? { ...lead, estado } : lead
    );
    setLeads(updatedLeads);
    localStorage.setItem('clinic_leads', JSON.stringify(updatedLeads));
  };

  const updateLeadNotes = (id: string, notas: string) => {
    const updatedLeads = leads.map((lead) =>
      lead.id === id ? { ...lead, notas } : lead
    );
    setLeads(updatedLeads);
    localStorage.setItem('clinic_leads', JSON.stringify(updatedLeads));
  };

  const deleteLead = (id: string) => {
    const updatedLeads = leads.filter((lead) => lead.id !== id);
    setLeads(updatedLeads);
    localStorage.setItem('clinic_leads', JSON.stringify(updatedLeads));
  };

  return { leads, saveLead, updateLeadStatus, updateLeadNotes, deleteLead };
};
