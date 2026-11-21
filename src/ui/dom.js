// Utilidades de interfaz.

export const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export function el(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

export const timeLabel = (iso) =>
  new Date(iso).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });

export function ago(iso) {
  const minutes = Math.max(0, Math.round((Date.now() - new Date(iso)) / 60000));
  if (minutes < 1) return 'ahora';
  if (minutes < 60) return `hace ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `hace ${hours} h ${minutes % 60} min`;
  return `hace ${Math.floor(hours / 24)} d`;
}

export const optionLabel = (option, item) =>
  option.variant ? `+ Agregar ${option.variant.name.toLowerCase()}` : item.variants?.length ? '+ Agregar vaso' : '+ Agregar';

let toastTimer;
export function hideToast() {
  clearTimeout(toastTimer);
  document.querySelector('.toast')?.classList.remove('show');
}

export function toast(message, ok = true) {
  const node = document.querySelector('.toast') || document.body.appendChild(el('<div class="toast" role="status"></div>'));
  node.textContent = message;
  node.classList.toggle('error', !ok);
  node.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.classList.remove('show'), 1600);
}
