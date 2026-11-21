// Pantalla 3: agregar productos. Búsqueda arriba, categorías en bloques, precio de un toque.

import { label, unitCount, countOf } from '../comandas.js';
import { categories, itemById, searchItems, portionOptions } from '../search.js';
import { loadFrecuentes } from '../store.js';
import { el, esc, optionLabel } from './dom.js';

const GROUPS = { bebidas: 'Bebidas', comida: 'Comida' };

function frecuentes() {
  return Object.entries(loadFrecuentes())
    .sort(([, a], [, b]) => b.n - a.n || b.t - a.t)
    .map(([key]) => {
      const [itemId, optKey] = key.split('|');
      const item = itemById(itemId);
      const option = item && portionOptions(item).find((o) => o.key === optKey);
      return option && { item, option };
    })
    .filter(Boolean)
    .slice(0, 8);
}

export function addView(c, state, actions) {
  const category = categories.find((x) => x.id === state.category);
  let query = state.query;

  const inComanda = (item) => {
    const found = portionOptions(item)
      .map((o) => ({ o, n: countOf(c, item.id, o.key) }))
      .filter(({ n }) => n);
    if (!found.length) return '<p class="added-info">Sin agregar</p>';
    const detail = found.map(({ o, n }) => (item.variants?.length ? `${n} ${o.variant ? o.variant.name.toLowerCase() : 'vaso'}` : n));
    return `<p class="added-info yes">✓ En la comanda: ${detail.join(' · ')}</p>`;
  };

  const product = (item, showCategory) => `
    <article class="product">
      <div class="product-info">
        <b>${esc(item.name)}</b>
        ${item.description ? `<small>${esc(item.description)}</small>` : ''}
        ${showCategory ? `<small class="muted">${esc(item.category)}</small>` : ''}
        ${inComanda(item)}
      </div>
      <div class="product-btns">
        ${portionOptions(item)
          .map((o) => `<button class="price-btn" data-item="${item.id}" data-opt="${o.key}"><span class="lbl">${esc(optionLabel(o, item))}</span></button>`)
          .join('')}
      </div>
    </article>`;

  const home = () => {
    const favs = frecuentes();
    const chips = favs.length
      ? `<section><h2 class="section-title">Frecuentes</h2><div class="chips">${favs
          .map(
            ({ item, option }) =>
              `<button class="chip-btn" data-item="${item.id}" data-opt="${option.key}">${esc(item.name)}${
                option.variant ? ` · ${esc(option.variant.name)}` : ''
              }</button>`
          )
          .join('')}</div></section>`
      : '';
    const groups = Object.entries(GROUPS)
      .map(
        ([group, title]) => `<section><h2 class="section-title">${title}</h2><div class="grid">${categories
          .filter((x) => x.group === group)
          .map(
            (x) => `<button class="tile tile-${group}" data-cat="${x.id}"><b>${esc(x.name)}</b><small>${x.items.length} productos</small></button>`
          )
          .join('')}</div></section>`
      )
      .join('');
    return chips + groups;
  };

  const body = () => {
    if (query.trim()) {
      const found = searchItems(query);
      return found.length
        ? `<div class="stack">${found.map((i) => product(i, true)).join('')}</div>`
        : `<p class="empty">No encontré “${esc(query.trim())}”.</p>`;
    }
    if (category) {
      return `<div class="stack">${category.items.map((i) => product({ ...i, categoryId: category.id }, false)).join('')}</div>`;
    }
    return home();
  };

  const units = unitCount(c);
  const root = el(`
    <div class="screen has-bar">
      <header class="topbar">
        <button class="icon-btn" data-back aria-label="Volver">←</button>
        <div class="grow"><h1>${esc(category ? category.name : 'Agregar productos')}</h1><small>${esc(label(c))}</small></div>
      </header>
      <div class="searchbar">
        <input type="search" placeholder="Buscar producto…" value="${esc(query)}" autocomplete="off" enterkeyhint="search" aria-label="Buscar producto">
      </div>
      <main class="content" data-body></main>
      <footer class="bar">
        <button class="btn btn-primary btn-block" data-done>Ver comanda${units ? ` · ${units}` : ''}</button>
      </footer>
    </div>`);

  const container = root.querySelector('[data-body]');
  const fill = () => (container.innerHTML = body());
  fill();

  root.querySelector('[data-back]').onclick = actions.onBack;
  root.querySelector('[data-done]').onclick = actions.onDone;
  root.querySelector('input').oninput = (e) => {
    query = e.target.value;
    actions.onQuery(query);
    fill();
  };
  container.onclick = (e) => {
    const cat = e.target.closest('[data-cat]');
    if (cat) return actions.onCategory(cat.dataset.cat);
    const btn = e.target.closest('[data-item]');
    if (!btn) return;
    const item = itemById(btn.dataset.item);
    actions.onAdd(item, portionOptions(item).find((o) => o.key === btn.dataset.opt));
  };
  return root;
}
