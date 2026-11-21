// Hojas inferiores: nueva comanda, precio manual y editar renglón.

import { el, esc, money, hideToast } from './dom.js';

const QUICK_NOTES = ['Sin cebolla', 'Sin picante', 'Para llevar'];

function openSheet(html) {
  hideToast();
  const overlay = el(`<div class="overlay"><div class="sheet">${html}</div></div>`);
  const close = () => overlay.remove();
  overlay.addEventListener('click', (e) => e.target === overlay && close());
  document.body.append(overlay);
  return { sheet: overlay.firstElementChild, close };
}

export function newComandaSheet(onCreate) {
  const { sheet, close } = openSheet(`
    <form>
      <h2>Nueva comanda</h2>
      <label>Mesa o nombre
        <input name="mesa" required maxlength="40" autocomplete="off" placeholder="Ej. 5 o Juan">
      </label>
      <label>Nota (opcional)
        <input name="nota" maxlength="120" autocomplete="off" placeholder="Ej. cumpleaños">
      </label>
      <button class="btn btn-primary btn-xl">Crear y agregar productos</button>
    </form>`);
  const form = sheet.firstElementChild;
  form.elements.mesa.focus();
  form.onsubmit = (e) => {
    e.preventDefault();
    const mesa = form.elements.mesa.value.trim();
    if (!mesa) return;
    close();
    onCreate(mesa, form.elements.nota.value.trim());
  };
}

export function priceSheet(item, onConfirm) {
  const { sheet, close } = openSheet(`
    <form>
      <h2>${esc(item.name)}</h2>
      <label>Precio (según existencia)
        <input name="precio" type="number" inputmode="decimal" min="1" step="any" required placeholder="$">
      </label>
      <button class="btn btn-primary btn-xl">Agregar</button>
    </form>`);
  const form = sheet.firstElementChild;
  form.elements.precio.focus();
  form.onsubmit = (e) => {
    e.preventDefault();
    const price = parseFloat(form.elements.precio.value);
    if (!(price > 0)) return;
    close();
    onConfirm(price);
  };
}

export function lineSheet(line, extras, onSave, onRemove) {
  let qty = line.qty;
  const picked = new Set(line.extras.map((e) => e.id));
  const { sheet, close } = openSheet(`
    <form>
      <h2>${esc(line.name)}${line.variant ? ` · ${esc(line.variant)}` : ''}</h2>
      <div class="stepper stepper-lg">
        <button type="button" data-d="-1" aria-label="Menos">−</button><b data-qty>${qty}</b><button type="button" data-d="1" aria-label="Más">+</button>
      </div>
      ${
        extras.length
          ? `<p class="label">Extras</p><div class="chips wrap">${extras
              .map(
                (x) => `<label class="toggle"><input type="checkbox" value="${x.id}" ${picked.has(x.id) ? 'checked' : ''}><span>${esc(x.name)} +${money(x.price)}</span></label>`
              )
              .join('')}</div>`
          : ''
      }
      <label>Nota
        <textarea name="nota" rows="2" placeholder="Ej. sin cebolla">${esc(line.note)}</textarea>
      </label>
      <div class="chips wrap">${QUICK_NOTES.map((q) => `<button type="button" class="chip-btn" data-quick="${q}">${q}</button>`).join('')}</div>
      <div class="sheet-actions">
        <button type="button" class="btn btn-danger" data-remove>Quitar</button>
        <button class="btn btn-primary">Guardar</button>
      </div>
    </form>`);
  const form = sheet.firstElementChild;
  const qtyLabel = form.querySelector('[data-qty]');
  form.querySelectorAll('[data-d]').forEach((b) => {
    b.onclick = () => {
      qty = Math.max(1, qty + Number(b.dataset.d));
      qtyLabel.textContent = qty;
    };
  });
  form.querySelectorAll('[data-quick]').forEach((b) => {
    b.onclick = () => {
      const field = form.elements.nota;
      field.value = field.value.trim() ? `${field.value.trim()}, ${b.dataset.quick.toLowerCase()}` : b.dataset.quick;
    };
  });
  form.querySelector('[data-remove]').onclick = () => {
    close();
    onRemove();
  };
  form.onsubmit = (e) => {
    e.preventDefault();
    const ids = new Set([...form.querySelectorAll('input[type=checkbox]:checked')].map((i) => i.value));
    close();
    onSave({ qty, note: form.elements.nota.value.trim(), extras: extras.filter((x) => ids.has(x.id)) });
  };
}
