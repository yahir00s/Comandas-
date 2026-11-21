// Pantalla 1: lista de comandas.

import { label, unitCount, pendingCount } from '../comandas.js';
import { el, esc, timeLabel, ago } from './dom.js';

function progress(c) {
  if (!c.items.length) return { key: 'vacia', text: 'Vacía' };
  const pending = pendingCount(c);
  return pending ? { key: 'faltan', text: `Faltan ${pending}` } : { key: 'listo', text: 'Todo en mesa' };
}

function card(c) {
  const units = unitCount(c);
  const state = progress(c);
  return `
    <button class="card state-${state.key}" data-open="${c.id}">
      <div class="card-top">
        <b class="card-name">${esc(label(c))}</b>
        <span class="chip state-chip state-${state.key}">${state.text}</span>
      </div>
      ${c.note ? `<div class="card-note">${esc(c.note)}</div>` : ''}
      <div class="card-bottom muted">${units} ${units === 1 ? 'producto' : 'productos'} · ${timeLabel(c.createdAt)} · ${ago(c.createdAt)}</div>
    </button>`;
}

export function listView(comandas, actions) {
  const done = (c) => c.items.length > 0 && !pendingCount(c);
  const sorted = [...comandas].sort((a, b) => done(a) - done(b) || new Date(b.createdAt) - new Date(a.createdAt));
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
