# Configuración de Google Sheets como Base de Datos

## Paso 1: Crear la Hoja de Cálculo

1. Ve a [Google Sheets](https://sheets.google.com) y crea una nueva hoja.
2. Renombra la primera hoja (pestaña inferior) a exactamente: **`Leads`**
3. En la **fila 1**, escribe estos encabezados exactos (una por celda, de A1 a H1):

| A1 | B1 | C1 | D1 | E1 | F1 | G1 | H1 |
|---|---|---|---|---|---|---|---|
| id | nombre | telefono | email | consulta | estado | notas | timestamp |

4. Copia el **ID de la hoja** de la URL. Ejemplo:
   ```
   https://docs.google.com/spreadsheets/d/1ABC123xyz.../edit
                                         ^^^^^^^^^^^^
                                         Este es el ID
   ```

## Paso 2: Crear el Apps Script (API)

1. En tu Google Sheet, ve a **Extensiones → Apps Script**
2. Borra todo el código existente y pega el contenido del archivo `google-apps-script.js` que está en esta carpeta.
3. Haz clic en **Guardar** (icono de disquete).

## Paso 3: Desplegar como Web App

1. En Apps Script, haz clic en **Implementar → Nueva implementación**
2. En tipo, selecciona **App web**
3. Configura:
   - **Descripción**: API Leads Clínica
   - **Ejecutar como**: Yo mismo
   - **Quién tiene acceso**: **Cualquier persona**
4. Haz clic en **Implementar**
5. **Autoriza** el script cuando te lo pida (es tu propia cuenta)
6. Copia la **URL de la aplicación web** que te da. Se ve así:
   ```
   https://script.google.com/macros/s/AKfycb...largo.../exec
   ```

## Paso 4: Configurar en tu proyecto

1. Abre el archivo `.env` en la raíz de tu proyecto
2. Pega la URL:
   ```
   VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/TU_ID_AQUI/exec
   ```
3. Reinicia el servidor de desarrollo (`npm run dev`)

## ¡Listo!

- Los leads del formulario se guardarán automáticamente en tu Google Sheet
- El panel `/admin` leerá los datos desde Google Sheets
- Puedes ver y editar los datos directamente en Google Sheets
- Si la API falla, los datos se guardan en localStorage como respaldo

## Notas importantes

- Si haces cambios al Apps Script, debes crear una **Nueva implementación** (no editar la existente)
- La URL cambia con cada nueva implementación
- Los datos son accesibles solo por quien tenga el enlace de la hoja
