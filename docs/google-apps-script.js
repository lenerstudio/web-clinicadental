/**
 * Google Apps Script — API para Leads de Clínica Dental
 * 
 * INSTRUCCIONES:
 * 1. Abre tu Google Sheet
 * 2. Ve a Extensiones → Apps Script
 * 3. Pega TODO este código (reemplazando lo que haya)
 * 4. Guarda y despliega como App Web
 */

const SHEET_NAME = 'Leads';

// ── Helper: Obtener o crear la hoja ──
function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['id', 'nombre', 'telefono', 'email', 'consulta', 'estado', 'notas', 'timestamp']);
  }
  return sheet;
}

// ── GET: Leer todos los leads ──
function doGet(e) {
  try {
    const sheet = getSheet();
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    const leads = data.slice(1).map(row => {
      const obj = {};
      headers.forEach((header, i) => {
        obj[header] = row[i];
      });
      return obj;
    }).filter(lead => lead.id); // Filtrar filas vacías
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, data: leads }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── POST: Crear, actualizar, o eliminar un lead ──
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const action = body.action;
    
    switch (action) {
      case 'create':
        return createLead(body.data);
      case 'update':
        return updateLead(body.data);
      case 'delete':
        return deleteLead(body.id);
      default:
        return jsonResponse({ success: false, error: 'Acción no reconocida' });
    }
  } catch (error) {
    return jsonResponse({ success: false, error: error.message });
  }
}

// ── Crear un nuevo lead ──
function createLead(data) {
  const sheet = getSheet();
  const id = Utilities.getUuid();
  const timestamp = new Date().toISOString();
  
  sheet.appendRow([
    id,
    data.nombre || '',
    data.telefono || '',
    data.email || '',
    data.consulta || '',
    data.estado || 'nuevo',
    data.notas || '',
    timestamp
  ]);
  
  return jsonResponse({ 
    success: true, 
    data: { id, ...data, estado: 'nuevo', notas: '', timestamp } 
  });
}

// ── Actualizar un lead existente ──
function updateLead(data) {
  const sheet = getSheet();
  const rows = sheet.getDataRange().getValues();
  
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === data.id) {
      // Actualizar solo los campos proporcionados
      if (data.estado !== undefined) sheet.getRange(i + 1, 6).setValue(data.estado);
      if (data.notas !== undefined) sheet.getRange(i + 1, 7).setValue(data.notas);
      if (data.nombre !== undefined) sheet.getRange(i + 1, 2).setValue(data.nombre);
      if (data.telefono !== undefined) sheet.getRange(i + 1, 3).setValue(data.telefono);
      if (data.email !== undefined) sheet.getRange(i + 1, 4).setValue(data.email);
      if (data.consulta !== undefined) sheet.getRange(i + 1, 5).setValue(data.consulta);
      
      return jsonResponse({ success: true, data: { ...data } });
    }
  }
  
  return jsonResponse({ success: false, error: 'Lead no encontrado' });
}

// ── Eliminar un lead ──
function deleteLead(id) {
  const sheet = getSheet();
  const rows = sheet.getDataRange().getValues();
  
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === id) {
      sheet.deleteRow(i + 1);
      return jsonResponse({ success: true });
    }
  }
  
  return jsonResponse({ success: false, error: 'Lead no encontrado' });
}

// ── Helper: Respuesta JSON ──
function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
