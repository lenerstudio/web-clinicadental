import { useState, useEffect, useCallback, useRef } from 'react';
import type { Lead } from '../types/lead';

const SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL as string | undefined;
const LOCAL_KEY = 'clinic_leads';

/**
 * Helper to POST to Google Apps Script.
 * Apps Script redirects (302) on POST which causes CORS issues.
 * Solution: send POST via no-cors mode (fire-and-forget), then GET to confirm.
 * Alternative: use a form-style request via URL params.
 */
async function sheetsPost(data: Record<string, unknown>): Promise<boolean> {
  if (!SHEETS_URL) return false;

  try {
    // Build the URL with the action as a query param for Apps Script
    const url = new URL(SHEETS_URL);

    // Use fetch with redirect:follow and no custom headers to avoid CORS preflight
    const res = await fetch(SHEETS_URL, {
      method: 'POST',
      redirect: 'follow',
      body: JSON.stringify(data),
    });

    // Apps Script may redirect — if we get any response, consider it sent
    // Try to parse the response if possible
    try {
      const text = await res.text();
      const json = JSON.parse(text);
      return json.success === true;
    } catch {
      // If we can't parse (opaque response from redirect), assume success
      return true;
    }
  } catch (err) {
    console.warn('[Sheets POST] Error:', err);

    // Second attempt: use no-cors mode (fire-and-forget)
    try {
      await fetch(SHEETS_URL!, {
        method: 'POST',
        mode: 'no-cors',
        redirect: 'follow',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(data),
      });
      // no-cors gives opaque response — we can't read it, but the request was sent
      return true;
    } catch (err2) {
      console.error('[Sheets POST] Fallback also failed:', err2);
      return false;
    }
  }
}

async function sheetsGet(): Promise<Lead[] | null> {
  if (!SHEETS_URL) return null;

  try {
    const res = await fetch(SHEETS_URL, { redirect: 'follow' });
    const json = await res.json();

    if (json.success && Array.isArray(json.data)) {
      return json.data.map((row: Record<string, string>) => ({
        id: String(row.id || ''),
        nombre: String(row.nombre || ''),
        telefono: String(row.telefono || ''),
        email: String(row.email || ''),
        consulta: String(row.consulta || ''),
        estado: (row.estado || 'nuevo') as Lead['estado'],
        notas: String(row.notas || ''),
        timestamp: String(row.timestamp || new Date().toISOString()),
      }));
    }
    console.warn('[Sheets GET] Unexpected response:', json);
    return null;
  } catch (err) {
    console.warn('[Sheets GET] Error:', err);
    return null;
  }
}

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const debounceTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const isGoogleSheetsEnabled = !!SHEETS_URL;

  // ── localStorage helpers ──
  const getLocalLeads = (): Lead[] => {
    try {
      const stored = localStorage.getItem(LOCAL_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const saveLocalLeads = (data: Lead[]) => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
  };

  // ── FETCH ALL LEADS ──
  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!isGoogleSheetsEnabled) {
      setLeads(getLocalLeads());
      setLoading(false);
      return;
    }

    const data = await sheetsGet();
    if (data) {
      setLeads(data);
      saveLocalLeads(data); // Cache
    } else {
      setError('No se pudo conectar con Google Sheets');
      setLeads(getLocalLeads()); // Fallback
    }
    setLoading(false);
  }, [isGoogleSheetsEnabled]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // ── SAVE NEW LEAD ──
  const saveLead = async (leadData: Omit<Lead, 'id' | 'timestamp' | 'estado' | 'notas'>) => {
    // Always save locally first (optimistic)
    const newLead: Lead = {
      ...leadData,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      estado: 'nuevo',
      notas: '',
    };
    const updated = [newLead, ...leads];
    setLeads(updated);
    saveLocalLeads(updated);

    if (isGoogleSheetsEnabled) {
      const success = await sheetsPost({ action: 'create', data: leadData });
      if (success) {
        // Refetch after a small delay to let Google Sheets process
        setTimeout(() => fetchLeads(), 1500);
      }
    }
  };

  // ── UPDATE STATUS ──
  const updateLeadStatus = async (id: string, estado: Lead['estado']) => {
    // Optimistic update
    const updated = leads.map(l => l.id === id ? { ...l, estado } : l);
    setLeads(updated);
    saveLocalLeads(updated);

    if (isGoogleSheetsEnabled) {
      await sheetsPost({ action: 'update', data: { id, estado } });
    }
  };

  // ── UPDATE NOTES (debounced to avoid excessive API calls) ──
  const updateLeadNotes = (id: string, notas: string) => {
    // Optimistic update immediately
    const updated = leads.map(l => l.id === id ? { ...l, notas } : l);
    setLeads(updated);
    saveLocalLeads(updated);

    if (isGoogleSheetsEnabled) {
      // Debounce: wait 1.5s after last keystroke before sending to Sheets
      const existing = debounceTimers.current.get(id);
      if (existing) clearTimeout(existing);
      debounceTimers.current.set(id, setTimeout(async () => {
        await sheetsPost({ action: 'update', data: { id, notas } });
        debounceTimers.current.delete(id);
      }, 1500));
    }
  };

  // ── DELETE LEAD ──
  const deleteLead = async (id: string) => {
    const updated = leads.filter(l => l.id !== id);
    setLeads(updated);
    saveLocalLeads(updated);

    if (isGoogleSheetsEnabled) {
      await sheetsPost({ action: 'delete', id });
    }
  };

  return {
    leads,
    loading,
    error,
    saveLead,
    updateLeadStatus,
    updateLeadNotes,
    deleteLead,
    refreshLeads: fetchLeads,
    isGoogleSheetsEnabled,
  };
};
