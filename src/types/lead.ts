export interface Lead {
  id: string;           // uuid generado con crypto.randomUUID()
  timestamp: string;    // ISO 8601
  nombre: string;
  telefono: string;
  email: string;
  consulta: string;
  estado: 'nuevo' | 'contactado' | 'en_seguimiento' | 'convertido' | 'descartado';
  notas: string;
}
