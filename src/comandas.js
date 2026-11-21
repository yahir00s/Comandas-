// Estado y reglas de las comandas.

import { loadComandas, saveComandas, clearComandas } from './store.js';

let comandas = [];
const save = () => saveComandas(comandas);
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const findLine = (c, lineId) => c.items.find((l) => l.id === lineId);

export const initComandas = () => { comandas = loadComandas(); };
export const getComandas = () => comandas;
export const getComanda = (id) => comandas.find((c) => c.id === id);

export const label = (c) => (/^\d+$/.test(c.name) ? `Mesa ${c.name}` : c.name);
export const unitCount = (c) => c.items.reduce((s, l) => s + l.qty, 0);
// Piezas que todavía no se llevan a la mesa.
export const pendingCount = (c) => c.items.filter((l) => !l.served).reduce((s, l) => s + l.qty, 0);
export const countOf = (c, itemId, optKey) =>
  c.items
    .filter((l) => l.itemId === itemId && (l.variant || 'base') === optKey)
    .reduce((s, l) => s + l.qty, 0);

export function createComanda(name, note = '') {
  const comanda = { id: uid(), name, note, createdAt: new Date().toISOString(), items: [] };
  comandas.push(comanda);
  save();
  return comanda.id;
}

export function addLine(comandaId, item, option) {
  const c = getComanda(comandaId);
  const variant = option.variant?.name ?? null;
  const same = c.items.find((l) => l.itemId === item.id && l.variant === variant && !l.note && !l.extras.length);
  if (same) {
    same.qty += 1;
    same.served = false;
  } else {
    c.items.push({ id: uid(), itemId: item.id, name: item.name, variant, qty: 1, note: '', extras: [], served: false });
  }
  save();
}

export function changeQty(comandaId, lineId, delta) {
  const c = getComanda(comandaId);
  const line = findLine(c, lineId);
  line.qty += delta;
  if (delta > 0) line.served = false;
  if (line.qty < 1) c.items = c.items.filter((l) => l !== line);
  save();
}

export function updateLine(comandaId, lineId, patch) {
  const c = getComanda(comandaId);
  const line = findLine(c, lineId);
  if (patch.qty > line.qty) line.served = false;
  Object.assign(line, patch);
  save();
}

export function removeLine(comandaId, lineId) {
  const c = getComanda(comandaId);
  c.items = c.items.filter((l) => l.id !== lineId);
  save();
}

export function toggleServed(comandaId, lineId) {
  const line = findLine(getComanda(comandaId), lineId);
  line.served = !line.served;
  save();
}

export function serveAll(comandaId) {
  getComanda(comandaId).items.forEach((l) => { l.served = true; });
  save();
}

export function deleteComanda(id) {
  comandas = comandas.filter((c) => c.id !== id);
  save();
}

export function deleteAll() {
  comandas = [];
  clearComandas();
}
