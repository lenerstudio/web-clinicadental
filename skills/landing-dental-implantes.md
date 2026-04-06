---
name: landing-dental-implantes

description: >
  Usa esta skill cuando necesites generar el prompt profesional completo para crear
  una landing page de alta conversión para clínicas dentales especializadas en implantes,
  usando React + Vite + TypeScript. Activa cuando el usuario mencione: landing dental,
  implantes dentales, captación de pacientes, SMMA dental, landing page clínica, o
  cualquier combinación de desarrollo frontend + sector salud dental. Incluye arquitectura
  de componentes, sistema CRM básico de leads, SEO on-page, validación de formularios
  con Zod, y panel de administración protegido. Úsala también cuando el usuario pida
  un prompt para un desarrollador freelance en el sector dental o sanitario.
author: lenerstudio.com
version: 1.0.0
stack: React 18 + Vite 5 + TypeScript (strict)
sector: Salud dental / SMMA
objetivo: Captación de leads — pacientes para implantes dentales
---

# Landing Page — Clínica Dental / Implantes Dentales

## Contexto de uso

Este prompt está diseñado para ser usado directamente en Claude, GPT-4o, Gemini 1.5 Pro
o cualquier LLM con capacidad de generación de código. También es compatible con agentes
en Cursor o Windsurf para aplicación directa sobre el proyecto.

**Antes de lanzar el prompt, personaliza estos placeholders:**
- `[NOMBRE_CLINICA]` → Clinica Dental
- `[CIUDAD]` → Mexico
- `[TELEFONO]` → 34624432245
- `[EMAIL_ADMIN]` → [EMAIL_ADDRESS]

---

## Prompt principal

```
# PROMPT: Landing Page — Clínica Dental / Implantes Dentales
## Stack: React + Vite + TypeScript

---

## ROL Y CONTEXTO

Actúas como un equipo multidisciplinar de alto nivel compuesto por:
- Senior Frontend Engineer (React + Vite + TypeScript)
- Experto en diseño UI/UX con enfoque en conversión (CRO)
- Especialista en SEO on-page y Core Web Vitals
- Experto en marketing digital para el sector salud/dental
- Estratega de captación de leads (SMMA)

El objetivo es construir una landing page de alto rendimiento orientada a la captación
de pacientes para una clínica dental especializada en implantes dentales. Esta landing
es parte de una estrategia SMMA (Social Media Marketing Agency) y debe maximizar la
tasa de conversión (CVR).

---

## OBJETIVO PRINCIPAL

Crear el código completo de una landing page en React + Vite + TypeScript que:
1. Capture leads cualificados (nombre, teléfono, email, consulta de interés)
2. Genere confianza y autoridad médica desde el primer scroll
3. Reduzca la fricción de contacto al máximo
4. Esté 100% optimizada para SEO on-page y rendimiento (Core Web Vitals)
5. Sea responsive-first (mobile > tablet > desktop)
6. Integre un sistema básico de seguimiento de leads

---

## ESTRUCTURA DE SECCIONES (en orden de aparición)

### 1. HERO SECTION
- Headline principal orientado al pain point: miedo, precio, o estética dental
  Ejemplo: "Recupera tu sonrisa con implantes dentales de por vida — sin dolor, sin esperas"
- Subheadline con propuesta de valor clara (garantía, financiación, tecnología)
- CTA principal: botón "Solicita tu valoración gratuita" → abre formulario lead inline o modal
- Elemento de urgencia/escasez: "Solo 5 valoraciones gratuitas esta semana"
- Imagen hero: foto clínica moderna o sonrisa real (placeholder con alt text optimizado para SEO)
- Trust badges: Google ⭐⭐⭐⭐⭐, Nº de implantes realizados, Años de experiencia

### 2. PROBLEMA / IDENTIFICACIÓN
- Sección emocional: "¿Te reconoces en alguna de estas situaciones?"
- Lista de pain points visuales (iconos + texto corto):
  · Vergüenza al sonreír en fotos
  · Dificultad para comer ciertos alimentos
  · Implantes anteriores que fallaron
  · Miedo al dentista o al dolor
  · Precios que parecen inalcanzables
- Transición empática hacia la solución

### 3. SOLUCIÓN / SERVICIOS
- Título: "Nuestro tratamiento de implantes, paso a paso"
- Timeline visual o cards con las etapas:
  1. Valoración gratuita y radiografía panorámica
  2. Plan personalizado y presupuesto sin sorpresas
  3. Colocación del implante (1 sesión, sedación consciente disponible)
  4. Corona definitiva y resultado final
- Para cada etapa: icono, título, descripción corta (2 líneas máx)
- Badge de diferenciación: "Tecnología de guía quirúrgica 3D"

### 4. SOCIAL PROOF — TESTIMONIOS
- Mínimo 3 testimonios reales (o placeholders con nombre, foto avatar, y texto)
- Formato: foto circular + nombre + ciudad + texto + valoración ⭐⭐⭐⭐⭐
- Indicar tratamiento recibido (implante unitario, all-on-4, etc.)
- Vídeo testimonial embed placeholder (YouTube/Vimeo iframe con lazy loading)

### 5. LEAD FORM PRINCIPAL (CTA CENTRAL)
- Título: "Solicita tu valoración GRATUITA ahora"
- Campos del formulario:
  · Nombre completo (required)
  · Teléfono (required, validación ES +34)
  · Email (required, validación RFC)
  · Motivo de consulta (select: Implante unitario / Implantes múltiples / All-on-4 / Revisión / Otro)
  · Checkbox RGPD: "He leído y acepto la Política de Privacidad" (required)
- CTA del botón: "Quiero mi valoración gratuita →"
- Micro-copy bajo el botón: "Sin compromiso. Te llamamos en menos de 24h."
- Manejo de estados: idle → loading → success → error
- Al submit exitoso: mostrar mensaje de confirmación inline con próximos pasos

### 6. GARANTÍAS Y TRUST SIGNALS
- Grid de 4 bloques con iconos SVG:
  · Garantía de 10 años en implantes
  · Financiación desde 0% TAE
  · Clínica acreditada (ISO / Colegios Médicos)
  · +500 pacientes tratados este año
- Logos de marcas de implantes usadas (Nobel Biocare, Straumann — placeholders)

### 7. FAQ — PREGUNTAS FRECUENTES
- Acordeón (Accordion) con 6-8 preguntas clave:
  · ¿Cuánto cuesta un implante dental?
  · ¿Es doloroso el proceso?
  · ¿Cuánto tiempo dura el tratamiento completo?
  · ¿Tengo que tener hueso suficiente?
  · ¿Los implantes son para siempre?
  · ¿Qué pasa si tengo miedo al dentista?
  · ¿Ofrecen financiación?
  · ¿Qué pasa si el implante falla?
- Cada respuesta: 3-4 líneas, tono cercano y profesional
- Schema Markup FAQPage en JSON-LD (dentro del <head> o inyectado en el componente)

### 8. FOOTER
- Nombre de la clínica, dirección, teléfono, email
- Links: Política de Privacidad | Aviso Legal | Cookies
- Iconos redes sociales (Instagram, Facebook, Google Maps)
- Copyright

---

## SISTEMA DE CAPTACIÓN Y SEGUIMIENTO DE LEADS

### Almacenamiento local (MVP sin backend)
- Al hacer submit, guardar lead en localStorage con estructura:

interface Lead {
  id: string;           // uuid generado con crypto.randomUUID()
  timestamp: string;    // ISO 8601
  nombre: string;
  telefono: string;
  email: string;
  consulta: string;
  estado: 'nuevo' | 'contactado' | 'en_seguimiento' | 'convertido' | 'descartado';
  notas: string;
}

### Panel CRM básico (ruta /admin protegida con password simple)
- Tabla de leads con columnas: fecha, nombre, teléfono, email, consulta, estado
- Filtro por estado y búsqueda por nombre/email
- Cambio de estado inline (select por fila)
- Campo de notas editable por lead
- Botón "Exportar CSV" (todos los leads o filtrados)
- Contador de leads por estado (cards métricas en la parte superior)

### Integraciones opcionales (comentadas en el código, listas para activar)
- EmailJS: envío de email de notificación al admin al recibir lead
- Meta Pixel (fbq): evento Lead al submit exitoso
- Google Analytics 4 (gtag): evento generate_lead al submit

---

## REQUISITOS TÉCNICOS

### Stack obligatorio
- React 18 + Vite 5 + TypeScript (strict mode)
- CSS Modules o Tailwind CSS (elige el más adecuado para performance)
- React Hook Form + Zod para validación del formulario
- React Router v6 (para ruta /admin)
- Framer Motion para animaciones de entrada (intersection observer based)

### Rendimiento (Core Web Vitals)
- Lazy loading en imágenes y sección de vídeo (loading="lazy" + Suspense)
- Fuentes con font-display: swap y preload del subset usado
- Code splitting por ruta (/admin separado del bundle principal)
- Sin bloqueo de render en scripts de terceros (defer/async)
- Tamaño de bundle principal < 150KB gzipped (excluyendo imágenes)

### SEO On-Page
- Componente SEOHead con react-helmet-async:
  · <title> optimizado (60 chars max)
  · <meta name="description"> (155 chars max)
  · Open Graph (og:title, og:description, og:image, og:url)
  · Twitter Card
  · Canonical URL
- Jerarquía de headings correcta: H1 único → H2 por sección → H3 en subsecciones
- Alt text descriptivo en todas las imágenes
- Schema Markup JSON-LD:
  · LocalBusiness (clínica dental)
  · FAQPage
  · MedicalBusiness (si aplica)
- Sitemap.xml y robots.txt comentados como referencia

### Accesibilidad (WCAG 2.1 AA)
- Contraste de color mínimo 4.5:1
- Focus visible en todos los elementos interactivos
- aria-label en iconos sin texto
- role="alert" en mensajes de error del formulario
- Navegación por teclado funcional

### Estructura de archivos
src/
├── assets/
│   └── images/          # Placeholders SVG optimizados
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Problem.tsx
│   │   ├── Solution.tsx
│   │   ├── Testimonials.tsx
│   │   ├── LeadForm.tsx
│   │   ├── TrustSignals.tsx
│   │   └── FAQ.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Modal.tsx
│       ├── Accordion.tsx
│       └── Badge.tsx
├── hooks/
│   ├── useLeads.ts      # CRUD leads en localStorage
│   └── useIntersection.ts
├── pages/
│   ├── Landing.tsx
│   └── Admin.tsx
├── types/
│   └── lead.ts
├── utils/
│   ├── exportCSV.ts
│   └── validators.ts
├── App.tsx
└── main.tsx

---

## DISEÑO UI/UX

### Paleta de colores
Primary:     #1A5CFF  (azul confianza médica)
Primary Dark:#0D3DB5
Accent:      #00C48C  (verde salud/éxito)
Neutral 900: #111827
Neutral 600: #4B5563
Neutral 100: #F3F4F6
White:       #FFFFFF
Error:       #EF4444

### Tipografía
- Heading: 'Inter' — weights 600, 700
- Body: 'Inter' — weights 400, 500
- Tamaños base: 16px body, escala modular 1.25

### Principios de diseño
- Espacio en blanco generoso (sección padding: 80px vertical desktop / 48px mobile)
- CTAs visibles above the fold y cada 2 secciones
- Sticky header con CTA "Llamar ahora" en mobile
- Scroll suave entre secciones (scroll-behavior: smooth)
- Animaciones sutiles: fade-in-up al entrar en viewport (duración 400ms, sin movimiento > 20px)

---

## TONO Y COPYWRITING

- Cercano pero profesional (tuteo en español)
- Orientado al beneficio, no a la característica técnica
- Palabras clave objetivo (integrar de forma natural):
  "implantes dentales", "implante dental precio", "clínica dental implantes",
  "implante dental sin dolor", "implantes dentales financiación",
  "[CIUDAD] implantes dentales" (reemplazar con ciudad real)
- Evitar jerga médica excesiva; priorizar comprensión y confianza
- Urgencia real y ética (no falsa escasez)

---

## ENTREGABLES ESPERADOS

1. Código fuente completo y funcional (todos los archivos listados en la estructura)
2. Componentes 100% tipados en TypeScript (sin `any`)
3. Formulario con validación completa y manejo de estados
4. Panel /admin funcional con datos de localStorage
5. Comentarios en el código explicando decisiones técnicas clave
6. README.md con:
   - Instrucciones de instalación (npm install && npm run dev)
   - Variables de entorno necesarias (EmailJS, GA4, Meta Pixel)
   - Cómo personalizar colores, textos y logo
   - Checklist de lanzamiento pre-producción

---

## INSTRUCCIONES FINALES PARA EL LLM

- Genera el código archivo por archivo, empezando por:
  main.tsx → App.tsx → tipos → hooks → componentes UI → secciones → páginas
- Cada archivo debe estar completo, sin usar "// ... resto del código"
- Si necesitas hacer suposiciones de diseño, indícalas brevemente antes del bloque de código
- Prioriza la conversión sobre la estética: cada decisión de diseño debe justificarse en CRO
```

---

## Instrucciones de uso por entorno

### En Claude (claude.ai)
Pega el bloque del prompt en una sola sesión larga.
Si el contexto se corta, continúa con: `"Continúa desde el archivo [X]"`.

### En Cursor / Windsurf
1. Crea un proyecto nuevo con `npm create vite@latest . -- --template react-ts`
2. Abre el chat del agente y pega el prompt completo
3. El agente aplicará los archivos directamente sobre el workspace

### En GPT-4o
Usa el modo de Project + Canvas para mantener el código editable entre turnos.

---

## Checklist de personalización pre-lanzamiento

- [ ] Reemplazar `[NOMBRE_CLINICA]` en todos los archivos
- [ ] Reemplazar `[CIUDAD]` en copy y meta tags SEO
- [ ] Añadir teléfono real en Header sticky mobile y Footer
- [ ] Subir fotos reales de la clínica (reemplazar placeholders SVG)
- [ ] Configurar EmailJS con el email del admin
- [ ] Activar Meta Pixel ID real
- [ ] Activar Google Analytics 4 con el Measurement ID real
- [ ] Verificar contraste de color con herramienta WCAG
- [ ] Testear formulario en mobile (iOS Safari + Android Chrome)
- [ ] Validar Schema Markup con Google Rich Results Test
- [ ] Configurar Google Search Console y enviar sitemap

---

## Dependencias del proyecto

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.26.0",
    "react-hook-form": "^7.52.0",
    "zod": "^3.23.0",
    "@hookform/resolvers": "^3.9.0",
    "framer-motion": "^11.3.0",
    "react-helmet-async": "^2.0.4"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "typescript": "^5.5.0",
    "vite": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

---

*Skill creada por lenerstudio.com — Freelance Web Development*
*Versión 1.0.0 — Abril 2026*
