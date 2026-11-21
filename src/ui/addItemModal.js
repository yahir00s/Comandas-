// Add item modal with quantity, notes, extras, variants

import { getExtrasForCategory } from '../search.js';

export function renderAddItemModal(menuData, item, onConfirm, onClose) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  
  const modal = document.createElement('div');
  modal.className = 'modal add-item-modal';
  
  const availableExtras = getExtrasForCategory(menuData, item.categoryId);
  const hasVariants = item.variants && item.variants.length > 0;
  
  modal.innerHTML = `
    <div class="modal-header">
      <h2>${item.name}</h2>
      <button class="btn-close" id="close-add-item">✕</button>
    </div>
    
    <div class="modal-body">
      ${item.description ? `<p class="item-description">${item.description}</p>` : ''}
      
      ${hasVariants ? `
        <div class="form-group">
          <label>Presentación:</label>
          <select id="variant-select" class="form-control">
            ${item.variants.map((v, i) => 
              `<option value="${i}">${v.name} - $${v.price}</option>`
            ).join('')}
          </select>
        </div>
      ` : ''}
      
      ${item.priceVariable ? `
        <div class="form-group">
          <label>Precio (según existencia):</label>
          <input type="number" id="custom-price" class="form-control" min="0" step="0.01" placeholder="Ingrese precio" />
        </div>
      ` : ''}
      
      <div class="form-group">
        <label>Cantidad:</label>
        <div class="quantity-control">
          <button class="btn btn-secondary" id="qty-minus">−</button>
          <input type="number" id="quantity" class="form-control quantity-input" value="1" min="1" />
          <button class="btn btn-secondary" id="qty-plus">+</button>
        </div>
      </div>
      
      ${availableExtras.length > 0 ? `
        <div class="form-group">
          <label>Extras:</label>
          <div class="extras-list">
            ${availableExtras.map(extra => `
              <label class="extra-option">
                <input type="checkbox" name="extra" value="${extra.id}" data-name="${extra.name}" data-price="${extra.price}" />
                <span>${extra.name} (+$${extra.price})</span>
              </label>
            `).join('')}
          </div>
        </div>
      ` : ''}
      
      <div class="form-group">
        <label>Nota (opcional):</label>
        <textarea id="item-note" class="form-control" rows="3" placeholder="Ej: sin cebolla, término medio..."></textarea>
      </div>
    </div>
    
    <div class="modal-footer">
      <button class="btn btn-secondary" id="cancel-add-item">Cancelar</button>
      <button class="btn btn-primary" id="confirm-add-item">Agregar</button>
    </div>
  `;
  
  const qtyInput = modal.querySelector('#quantity');
  const qtyMinus = modal.querySelector('#qty-minus');
  const qtyPlus = modal.querySelector('#qty-plus');
  
  qtyMinus.addEventListener('click', () => {
    const current = parseInt(qtyInput.value) || 1;
    if (current > 1) qtyInput.value = current - 1;
  });
  
  qtyPlus.addEventListener('click', () => {
    const current = parseInt(qtyInput.value) || 1;
    qtyInput.value = current + 1;
  });
  
  modal.querySelector('#confirm-add-item').addEventListener('click', () => {
    const quantity = parseInt(qtyInput.value) || 1;
    const note = modal.querySelector('#item-note').value.trim();
    
    const selectedExtras = Array.from(modal.querySelectorAll('input[name="extra"]:checked'))
      .map(checkbox => ({
        id: checkbox.value,
        name: checkbox.dataset.name,
        price: parseFloat(checkbox.dataset.price)
      }));
    
    let selectedVariant = null;
    if (hasVariants) {
      const variantIndex = parseInt(modal.querySelector('#variant-select').value);
      selectedVariant = item.variants[variantIndex];
    }
    
    let customPrice = null;
    if (item.priceVariable) {
      const priceInput = modal.querySelector('#custom-price');
      customPrice = parseFloat(priceInput.value);
      if (isNaN(customPrice) || customPrice <= 0) {
        alert('Por favor ingrese un precio válido');
        return;
      }
    }
    
    const itemWithVariant = { 
      ...item, 
      selectedVariant,
      price: selectedVariant ? selectedVariant.price : item.price
    };
    
    onConfirm(itemWithVariant, quantity, note, selectedExtras, customPrice);
  });
  
  modal.querySelector('#cancel-add-item').addEventListener('click', onClose);
  modal.querySelector('#close-add-item').addEventListener('click', onClose);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) onClose();
  });
  
  overlay.appendChild(modal);
  return overlay;
}
