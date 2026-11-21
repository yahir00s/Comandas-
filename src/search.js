// Consultas sobre el menú: búsqueda sin acentos, opciones de precio y extras.

import { menuData } from './data/menu.js';

const normalize = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export const categories = menuData.categories;
export const allItems = categories.flatMap((c) =>
  c.items.map((item) => ({ ...item, categoryId: c.id, category: c.name }))
);
export const itemById = (id) => allItems.find((i) => i.id === id);

export function searchItems(query) {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return allItems.filter((item) => {
    const text = normalize(`${item.name} ${item.description || ''} ${item.category}`);
    return words.every((w) => text.includes(w));
  });
}

// Cada opción es un botón de un toque: precio base, variante Litro o precio manual.
export function priceOptions(item) {
  if (item.priceVariable) return [{ key: 'manual', price: null, variant: null }];
  const options = [];
  if (item.price != null) options.push({ key: 'base', price: item.price, variant: null });
  for (const variant of item.variants || []) {
    options.push({ key: variant.name, price: variant.price, variant });
  }
  return options;
}

const EXTRAS_BY_CATEGORY = { pizzas: 'pizza', pastas: 'pasta', ensaladas: 'ensalada' };
export const extrasFor = (categoryId) => menuData.extras[EXTRAS_BY_CATEGORY[categoryId]] || [];
