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

// Una línea ya llevada a la mesa nunca vuelve a pendiente: lo nuevo va en otra línea.
const sameOrder = (a, b) =>
  a.itemId === b.itemId && a.variant === b.variant && (a.note || '') === (b.note || '') &&
  (a.extras || []).map((x) => x.id).sort().join() === (b.extras || []).map((x) => x.id).sort().join();

const addPending = (c, line, fields) => {
  const next = { ...line, id: uid(), served: false, ...fields };
  const pending = c.items.find((l) => !l.served && sameOrder(l, next));
  if (pending) pending.qty += next.qty;
  else c.items.splice(c.items.indexOf(line) + 1, 0, next);
};

export function addLine(comandaId, item, option) {
  const c = getComanda(comandaId);
  const variant = option.variant?.name ?? null;
  const same = c.items.find(
    (l) => !l.served && l.itemId === item.id && l.variant === variant && !l.note && !l.extras.length,
  );
  if (same) same.qty += 1;
  else c.items.push({ id: uid(), itemId: item.id, name: item.name, variant, qty: 1, note: '', extras: [], served: false });
  save();
}

export function changeQty(comandaId, lineId, delta) {
  const c = getComanda(comandaId);
  const line = findLine(c, lineId);
  if (delta > 0 && line.served) addPending(c, line, { qty: delta });
  else line.qty += delta;
  if (line.qty < 1) c.items = c.items.filter((l) => l !== line);
  save();
}

export function updateLine(comandaId, lineId, patch) {
  const c = getComanda(comandaId);
  const line = findLine(c, lineId);
  if (line.served && patch.qty > line.qty) {
    addPending(c, line, { ...patch, qty: patch.qty - line.qty });
  } else {
    Object.assign(line, patch);
  }
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
