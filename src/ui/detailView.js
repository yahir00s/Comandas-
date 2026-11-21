// Pantalla 2: una comanda abierta.

import { STATUS, label, lineTotal, comandaTotal } from '../comandas.js';
import { el, esc, money, timeLabel, ago } from './dom.js';

function line(l) {
  const extras = l.extras.length ? `<div class="line-extra">+ ${l.extras.map((e) => esc(e.name)).join(', ')}</div>` : '';
  const note = l.note ? `<div class="line-note">“${esc(l.note)}”</div>` : '';
  return `
    <article class="line">
      <div class="line-top">
        <div class="line-main">
          <b>${esc(l.name)}</b>${l.variant ? ` <span class="tag">${esc(l.variant)}</span>` : ''}
          ${extras}${note}
        </div>
        <b class="line-total">${money(lineTotal(l))}</b>
      </div>
      <div class="line-actions no-print">
        <div class="stepper">
          <button data-dec="${l.id}" aria-label="Quitar uno">−</button>
          <b>${l.qty}</b>
          <button data-inc="${l.id}" aria-label="Otra vez, uno más">+</button>
        </div>
        <button class="btn btn-ghost" data-edit="${l.id}">Nota / extras</button>
      </div>
      <div class="print-only">Cantidad: ${l.qty}</div>
    </article>`;
}

export function detailView(c, actions) {
  const root = el(`
    <div class="screen has-bar">
      <header class="topbar">
        <button class="icon-btn no-print" data-back aria-label="Volver a comandas">←</button>
        <div class="grow"><h1>${esc(label(c))}</h1><small>${timeLabel(c.createdAt)} · ${ago(c.createdAt)}</small></div>
      </header>
      <main class="content">
        ${c.note ? `<p class="note-box">${esc(c.note)}</p>` : ''}
        <div class="segmented no-print" role="group" aria-label="Estado">
          ${Object.entries(STATUS)
            .map(([key, text]) => `<button class="${c.status === key ? `on status-${key}` : ''}" data-status="${key}">${text}</button>`)
            .join('')}
        </div>
        <p class="print-only">Estado: ${STATUS[c.status]}</p>
        ${
          c.items.length
            ? `<div class="stack">${c.items.map(line).join('')}</div>`
            : `<p class="empty">Esta comanda está vacía.</p>`
        }
        <div class="secondary no-print">
          <button class="btn btn-ghost" data-print>Imprimir</button>
          <button class="btn btn-ghost danger" data-delete>Eliminar comanda</button>
        </div>
      </main>
      <footer class="bar no-print">
        <div class="bar-total"><small>Total</small><b>${money(comandaTotal(c))}</b></div>
        <button class="btn btn-primary grow" data-add>+ Agregar productos</button>
      </footer>
    </div>`);
  const on = (selector, handler) => root.querySelector(selector)?.addEventListener('click', handler);
  on('[data-back]', actions.onBack);
  on('[data-add]', actions.onAdd);
  on('[data-print]', actions.onPrint);
  on('[data-delete]', actions.onDelete);
  root.querySelectorAll('[data-status]').forEach((b) => (b.onclick = () => actions.onStatus(b.dataset.status)));
  root.querySelectorAll('[data-inc]').forEach((b) => (b.onclick = () => actions.onQty(b.dataset.inc, 1)));
  root.querySelectorAll('[data-dec]').forEach((b) => (b.onclick = () => actions.onQty(b.dataset.dec, -1)));
  root.querySelectorAll('[data-edit]').forEach((b) => (b.onclick = () => actions.onEdit(b.dataset.edit)));
  return root;
}
