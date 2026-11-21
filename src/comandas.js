// Estado y reglas de las comandas.

import { loadComandas, saveComandas, clearComandas } from './store.js';

export const STATUS = { pendiente: 'Pendiente', entregada: 'Entregada', pagada: 'Pagada' };

let comandas = [];
const save = () => saveComandas(comandas);
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

export const initComandas = () => { comandas = loadComandas(); };
export const getComandas = () => comandas;
export const getComanda = (id) => comandas.find((c) => c.id === id);

export const label = (c) => (/^\d+$/.test(c.name) ? `Mesa ${c.name}` : c.name);
export const lineTotal = (l) => (l.price + l.extras.reduce((s, e) => s + e.price, 0)) * l.qty;
export const comandaTotal = (c) => c.items.reduce((s, l) => s + lineTotal(l), 0);
export const unitCount = (c) => c.items.reduce((s, l) => s + l.qty, 0);
export const countOf = (c, itemId, optKey) =>
  c.items
    .filter((l) => l.itemId === itemId && (l.variant || 'base') === optKey)
    .reduce((s, l) => s + l.qty, 0);

export function createComanda(name, note = '') {
  const comanda = { id: uid(), name, note, status: 'pendiente', createdAt: new Date().toISOString(), items: [] };
  comandas.push(comanda);
  save();
  return comanda.id;
}

export function addLine(comandaId, item, option, manualPrice = null) {
  const c = getComanda(comandaId);
  const price = manualPrice ?? option.price;
  const variant = option.variant?.name ?? null;
  const same = c.items.find(
    (l) => l.itemId === item.id && l.variant === variant && l.price === price && !l.note && !l.extras.length
  );
  if (same) same.qty += 1;
  else c.items.push({ id: uid(), itemId: item.id, name: item.name, variant, price, qty: 1, note: '', extras: [] });
  save();
}

export function changeQty(comandaId, lineId, delta) {
  const c = getComanda(comandaId);
  const line = c.items.find((l) => l.id === lineId);
  line.qty += delta;
  if (line.qty < 1) c.items = c.items.filter((l) => l !== line);
  save();
}

export function updateLine(comandaId, lineId, patch) {
  Object.assign(getComanda(comandaId).items.find((l) => l.id === lineId), patch);
  save();
}

export function removeLine(comandaId, lineId) {
  const c = getComanda(comandaId);
  c.items = c.items.filter((l) => l.id !== lineId);
  save();
}

export function setStatus(comandaId, status) {
  getComanda(comandaId).status = status;
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
