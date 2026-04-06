import { z } from 'zod';

export const leadSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  telefono: z.string().regex(/^[0-9+ ]{9,15}$/, 'Introduce un teléfono válido'),
  email: z.string().email('Email no válido'),
  consulta: z.enum(['Implante unitario', 'Implantes múltiples', 'All-on-4', 'Revisión', 'Otro'] as const, {
    message: 'Selecciona un motivo de consulta',
  }),
  politicaPrivacidad: z.boolean().refine((val) => val === true, 'Debes aceptar la política de privacidad'),
});

export type LeadFormData = z.infer<typeof leadSchema>;
