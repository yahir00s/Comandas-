// Comanda management logic

import { loadComandas, saveComandas, addRecentItem } from './store.js';

let comandas = [];
let currentComandaId = null;

export function initComandas() {
  comandas = loadComandas();
}

export function getComandas() {
  return comandas;
}

export function getCurrentComandaId() {
  return currentComandaId;
}

export function setCurrentComandaId(id) {
  currentComandaId = id;
}

export function createComanda(tableNumber, note = '') {
  const id = Date.now().toString();
  const comanda = {
    id,
    tableNumber,
    note,
    items: [],
    createdAt: new Date().toISOString(),
    status: 'pendiente', // pendiente, entregada, pagada
    total: 0
  };
  comandas.push(comanda);
  saveComandas(comandas);
  return id;
}

export function getComanda(id) {
  return comandas.find(c => c.id === id);
}

export function addItemToComanda(comandaId, menuItem, quantity = 1, note = '', extras = [], customPrice = null) {
  const comanda = getComanda(comandaId);
  if (!comanda) return;

  const itemId = Date.now().toString() + Math.random();
  const basePrice = customPrice !== null ? customPrice : (menuItem.price || 0);
  const extrasTotal = extras.reduce((sum, extra) => sum + extra.price, 0);
  const itemTotal = (basePrice + extrasTotal) * quantity;

  const item = {
    id: itemId,
    menuItemId: menuItem.id,
    name: menuItem.name,
    basePrice,
    quantity,
    note,
    extras,
    variant: menuItem.selectedVariant || null,
    total: itemTotal,
    addedAt: new Date().toISOString()
  };

  comanda.items.push(item);
  updateComandaTotal(comandaId);
  saveComandas(comandas);
  addRecentItem(menuItem.id);
}

export function incrementItemQuantity(comandaId, itemId) {
  const comanda = getComanda(comandaId);
  if (!comanda) return;

  const item = comanda.items.find(i => i.id === itemId);
  if (item) {
    item.quantity++;
    const extrasTotal = item.extras.reduce((sum, extra) => sum + extra.price, 0);
    item.total = (item.basePrice + extrasTotal) * item.quantity;
    updateComandaTotal(comandaId);
    saveComandas(comandas);
  }
}

export function removeItemFromComanda(comandaId, itemId) {
  const comanda = getComanda(comandaId);
  if (!comanda) return;

  comanda.items = comanda.items.filter(i => i.id !== itemId);
  updateComandaTotal(comandaId);
  saveComandas(comandas);
}

export function updateComandaStatus(comandaId, status) {
  const comanda = getComanda(comandaId);
  if (!comanda) return;

  comanda.status = status;
  saveComandas(comandas);
}

export function deleteComanda(id) {
  comandas = comandas.filter(c => c.id !== id);
  saveComandas(comandas);
  if (currentComandaId === id) {
    currentComandaId = null;
  }
}

export function updateComandaTotal(comandaId) {
  const comanda = getComanda(comandaId);
  if (!comanda) return;

  comanda.total = comanda.items.reduce((sum, item) => sum + item.total, 0);
}
