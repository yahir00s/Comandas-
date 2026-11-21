import {
  initComandas, getComandas, getComanda, createComanda, addLine, changeQty,
  updateLine, removeLine, toggleServed, serveAll, deleteComanda, deleteAll, label,
} from './comandas.js';
import { bumpFrecuente } from './store.js';
import { extrasFor, itemById } from './search.js';
import { toast, hideToast } from './ui/dom.js';
import { listView } from './ui/listView.js';
import { detailView } from './ui/detailView.js';
import { addView } from './ui/addView.js';
import { newComandaSheet, lineSheet } from './ui/sheets.js';

const app = document.getElementById('app');
const state = { view: 'list', id: null, category: null, query: '' };
const snapshot = () => ({ view: state.view, id: state.id, category: state.category });
let shownKey = '';

// Cada pantalla es una entrada del historial: el botón "atrás" del celular funciona.
function navigate(next) {
  Object.assign(state, next, { query: '' });
  history.pushState(snapshot(), '');
  render();
}

function add(item, option) {
  const name = `${item.name}${option.variant ? ` · ${option.variant.name}` : ''}`;
  try {
    addLine(state.id, item, option);
    bumpFrecuente(`${item.id}|${option.key}`);
  } catch (error) {
    console.error(error);
    toast(`No se pudo agregar: ${name}`, false);
    return;
  }
  render();
  toast(`✓ Agregado: ${name}`);
  const button = app.querySelector(`[data-item="${item.id}"][data-opt="${option.key}"]`);
  button?.classList.add('added');
  setTimeout(() => button?.classList.remove('added'), 1200);
}

function editLine(c, lineId) {
  const line = c.items.find((l) => l.id === lineId);
  const extras = extrasFor(itemById(line.itemId)?.categoryId);
  lineSheet(
    line,
    extras,
    (patch) => { updateLine(c.id, lineId, patch); render(); },
    () => { removeLine(c.id, lineId); render(); }
  );
}

function render() {
  hideToast();
  const c = getComanda(state.id);
  if (state.view !== 'list' && !c) {
    Object.assign(state, { view: 'list', id: null, category: null });
    history.replaceState(snapshot(), '');
  }
  const key = `${state.view}|${state.id}|${state.category}`;
  const scroll = key === shownKey ? window.scrollY : 0;
  shownKey = key;

  let screen;
  if (state.view === 'detail') {
    screen = detailView(c, {
      onBack: () => history.back(),
      onAdd: () => navigate({ view: 'add', category: null }),
      onServe: (lineId) => { toggleServed(c.id, lineId); render(); },
      onServeAll: () => { serveAll(c.id); render(); },
      onQty: (lineId, delta) => { changeQty(c.id, lineId, delta); render(); },
      onEdit: (lineId) => editLine(c, lineId),
      onDelete: () => {
        if (confirm(`¿Eliminar ${label(c)}? No se puede deshacer.`)) {
          deleteComanda(c.id);
          history.back();
        }
      },
    });
  } else if (state.view === 'add') {
    screen = addView(c, state, {
      onBack: () => history.back(),
      onDone: () => history.go(state.category ? -2 : -1),
      onCategory: (category) => navigate({ view: 'add', category }),
      onQuery: (query) => { state.query = query; },
      onAdd: add,
    });
  } else {
    screen = listView(getComandas(), {
      onNew: () =>
        newComandaSheet((name, note) => {
          navigate({ view: 'detail', id: createComanda(name, note) });
          navigate({ view: 'add', category: null });
        }),
      onOpen: (id) => navigate({ view: 'detail', id }),
      onClearAll: () => {
        if (confirm(`¿Borrar las ${getComandas().length} comandas? No se puede deshacer.`)) {
          deleteAll();
          render();
        }
      },
    });
  }
  app.replaceChildren(screen);
  window.scrollTo(0, scroll);
}

window.addEventListener('popstate', (e) => {
  Object.assign(state, { view: 'list', id: null, category: null, query: '' }, e.state);
  render();
});

initComandas();
Object.assign(state, history.state);
history.replaceState(snapshot(), '');
render();
