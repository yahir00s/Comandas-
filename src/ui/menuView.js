// Menu view component

import { searchItems, filterByCategory } from '../search.js';

export function renderMenuView(menuData, recentItemIds, onSelectItem, onClose) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  
  const modal = document.createElement('div');
  modal.className = 'modal menu-modal';
  
  modal.innerHTML = `
    <div class="modal-header">
      <h2>Seleccionar Item</h2>
      <button class="btn-close" id="close-menu">✕</button>
    </div>
    
    <div class="menu-controls">
      <input 
        type="text" 
        id="search-input" 
        class="search-input" 
        placeholder="Buscar productos..."
      />
      <select id="category-filter" class="category-filter">
        <option value="todos">Todas las categorías</option>
        <option value="frecuentes">Frecuentes</option>
        ${menuData.categories.map(cat => 
          `<option value="${cat.id}">${cat.name}</option>`
        ).join('')}
      </select>
    </div>
    
    <div class="menu-items" id="menu-items-container"></div>
  `;
  
  let currentCategory = 'todos';
  let currentSearch = '';
  
  function updateMenuDisplay() {
    const container = modal.querySelector('#menu-items-container');
    container.innerHTML = '';
    
    let items = [];
    
    if (currentCategory === 'frecuentes') {
      const allItems = filterByCategory(menuData, 'todos');
      items = recentItemIds
        .map(id => allItems.find(item => item.id === id))
        .filter(Boolean);
      
      if (items.length === 0) {
        container.innerHTML = `
          <div class="empty-state">
            <p>No hay items frecuentes aún.</p>
          </div>
        `;
        return;
      }
    } else {
      items = filterByCategory(menuData, currentCategory);
    }
    
    if (currentSearch) {
      items = searchItems(items, currentSearch);
    }
    
    if (items.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <p>No se encontraron productos.</p>
        </div>
      `;
      return;
    }
    
    items.forEach(item => {
      const itemEl = document.createElement('div');
      itemEl.className = 'menu-item';
      
      const priceDisplay = item.priceVariable 
        ? '<span class="price-variable">Precio según existencia</span>'
        : item.variants && item.variants.length > 0
          ? `<span class="price-variants">${item.variants.map(v => `${v.name}: $${v.price}`).join(' / ')}</span>`
          : `<span class="price">$${item.price}</span>`;
      
      itemEl.innerHTML = `
        <div class="menu-item-info">
          <h4>${item.name}</h4>
          ${item.description ? `<p class="item-description">${item.description}</p>` : ''}
          ${priceDisplay}
        </div>
        <button class="btn btn-primary btn-add">+</button>
      `;
      
      itemEl.querySelector('.btn-add').addEventListener('click', () => {
        onSelectItem(item);
      });
      
      container.appendChild(itemEl);
    });
  }
  
  modal.querySelector('#search-input').addEventListener('input', (e) => {
    currentSearch = e.target.value;
    updateMenuDisplay();
  });
  
  modal.querySelector('#category-filter').addEventListener('change', (e) => {
    currentCategory = e.target.value;
    updateMenuDisplay();
  });
  
  modal.querySelector('#close-menu').addEventListener('click', onClose);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) onClose();
  });
  
  updateMenuDisplay();
  
  overlay.appendChild(modal);
  return overlay;
}
