// Pantalla 1: lista de comandas.

import { STATUS, label, comandaTotal, unitCount } from '../comandas.js';
import { el, esc, money, timeLabel, ago } from './dom.js';

function card(c) {
  const units = unitCount(c);
  return `
    <button class="card status-${c.status}" data-open="${c.id}">
      <div class="card-top">
        <b class="card-name">${esc(label(c))}</b>
        <span class="chip status-chip status-${c.status}">${STATUS[c.status]}</span>
      </div>
      ${c.note ? `<div class="card-note">${esc(c.note)}</div>` : ''}
      <div class="card-bottom">
        <span class="muted">${units} ${units === 1 ? 'producto' : 'productos'} · ${timeLabel(c.createdAt)} · ${ago(c.createdAt)}</span>
        <b class="card-total">${money(comandaTotal(c))}</b>
      </div>
    </button>`;
}

export function listView(comandas, actions) {
  const sorted = [...comandas].sort(
    (a, b) => (a.status === 'pagada') - (b.status === 'pagada') || new Date(b.createdAt) - new Date(a.createdAt)
  );
  const root = el(`
    <div class="screen">
      <header class="topbar"><div class="grow"><h1>Gallo Pizzero</h1><small>Comandas</small></div></header>
      <main class="content">
        <button class="btn btn-primary btn-xl" data-new>+ Nueva comanda</button>
        ${
          sorted.length
            ? `<div class="stack">${sorted.map(card).join('')}</div>
               <button class="link-danger" data-clear>Borrar todas las comandas</button>`
            : `<p class="empty">Todavía no hay comandas.<br>Toca “Nueva comanda” para empezar.</p>`
        }
      </main>
    </div>`);
  root.querySelector('[data-new]').onclick = actions.onNew;
  root.querySelector('[data-clear]')?.addEventListener('click', actions.onClearAll);
  root.querySelectorAll('[data-open]').forEach((b) => (b.onclick = () => actions.onOpen(b.dataset.open)));
  return root;
}
