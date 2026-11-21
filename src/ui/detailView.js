// Pantalla 2: una comanda abierta.

import { label, pendingCount } from '../comandas.js';
import { el, esc, timeLabel, ago } from './dom.js';

function line(l) {
  const extras = l.extras.length ? `<div class="line-extra">+ ${l.extras.map((e) => esc(e.name)).join(', ')}</div>` : '';
  const note = l.note ? `<div class="line-note">“${esc(l.note)}”</div>` : '';
  return `
    <article class="line ${l.served ? 'served' : ''}">
      <div class="line-main">
        <b>${esc(l.name)}</b>${l.variant ? ` <span class="tag">${esc(l.variant)}</span>` : ''}
        ${extras}${note}
      </div>
      <div class="line-actions">
        <div class="stepper">
          <button data-dec="${l.id}" aria-label="Quitar uno">−</button>
          <b>${l.qty}</b>
          <button data-inc="${l.id}" aria-label="Otra vez, uno más">+</button>
        </div>
        <button class="btn btn-ghost" data-edit="${l.id}">Nota / extras</button>
      </div>
      <button class="serve-btn ${l.served ? 'on' : ''}" data-serve="${l.id}" aria-pressed="${l.served}">
        ${l.served ? '✓ Ya está en la mesa' : 'Ya lo llevé a la mesa'}
      </button>
    </article>`;
}

export function detailView(c, actions) {
  const pending = pendingCount(c);
  const items = [...c.items].sort((a, b) => Boolean(a.served) - Boolean(b.served));
  const summary = !c.items.length
    ? ''
    : pending
      ? `<div class="bar-total"><small>Por llevar</small><b>${pending}</b></div>`
      : `<div class="bar-total"><small>Estado</small><b class="ok">Todo en mesa</b></div>`;
  const root = el(`
    <div class="screen has-bar">
      <header class="topbar">
        <button class="icon-btn" data-back aria-label="Volver a comandas">←</button>
        <div class="grow"><h1>${esc(label(c))}</h1><small>${timeLabel(c.createdAt)} · ${ago(c.createdAt)}</small></div>
      </header>
      <main class="content">
        ${c.note ? `<p class="note-box">${esc(c.note)}</p>` : ''}
        ${
          items.length
            ? `<div class="stack">${items.map(line).join('')}</div>`
            : `<p class="empty">Esta comanda está vacía.</p>`
        }
        <div class="secondary">
          ${pending ? '<button class="btn btn-ghost" data-serve-all>Todo llevado a la mesa</button>' : ''}
          <button class="btn btn-ghost danger" data-delete>Eliminar comanda</button>
        </div>
      </main>
      <footer class="bar">
        ${summary}
        <button class="btn btn-primary grow" data-add>+ Agregar productos</button>
      </footer>
    </div>`);
  const on = (selector, handler) => root.querySelector(selector)?.addEventListener('click', handler);
  on('[data-back]', actions.onBack);
  on('[data-add]', actions.onAdd);
  on('[data-delete]', actions.onDelete);
  on('[data-serve-all]', actions.onServeAll);
  root.querySelectorAll('[data-serve]').forEach((b) => (b.onclick = () => actions.onServe(b.dataset.serve)));
  root.querySelectorAll('[data-inc]').forEach((b) => (b.onclick = () => actions.onQty(b.dataset.inc, 1)));
  root.querySelectorAll('[data-dec]').forEach((b) => (b.onclick = () => actions.onQty(b.dataset.dec, -1)));
  root.querySelectorAll('[data-edit]').forEach((b) => (b.onclick = () => actions.onEdit(b.dataset.edit)));
  return root;
}
