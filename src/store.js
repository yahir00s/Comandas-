// Persistencia en localStorage.

const COMANDAS_KEY = 'gallo-comandas-v2';
const FRECUENTES_KEY = 'gallo-frecuentes-v2';

function read(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('No se pudo guardar', error);
  }
}

export const loadComandas = () => read(COMANDAS_KEY, []);
export const saveComandas = (list) => write(COMANDAS_KEY, list);
export const clearComandas = () => localStorage.removeItem(COMANDAS_KEY);

// Frecuentes: { "productoId|opcion": { n: veces, t: última vez } }
export const loadFrecuentes = () => read(FRECUENTES_KEY, {});

export function bumpFrecuente(key) {
  const data = loadFrecuentes();
  data[key] = { n: (data[key]?.n || 0) + 1, t: Date.now() };
  write(FRECUENTES_KEY, data);
}
