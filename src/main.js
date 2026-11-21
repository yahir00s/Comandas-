// Main application

import { menuData } from './data/menu.js';
import { loadRecentItems, deleteAllComandas } from './store.js';
import {
  initComandas,
  getComandas,
  getCurrentComandaId,
  setCurrentComandaId,
  createComanda,
  getComanda,
  addItemToComanda,
  incrementItemQuantity,
  removeItemFromComanda,
  updateComandaStatus,
  deleteComanda
} from './comandas.js';
import { renderHeader } from './ui/header.js';
import { renderComandaList } from './ui/comandaList.js';
import { renderComandaDetail } from './ui/comandaDetail.js';
import { renderMenuView } from './ui/menuView.js';
import { renderAddItemModal } from './ui/addItemModal.js';
import { renderNewComandaModal } from './ui/newComandaModal.js';

class App {
  constructor() {
    this.container = document.getElementById('app');
    initComandas();
    this.render();
  }

  render() {
    this.container.innerHTML = '';
    
    // Header
    const header = renderHeader(
      () => this.showNewComandaModal(),
      () => this.handleDeleteAll()
    );
    this.container.appendChild(header);
    
    // Main content
    const main = document.createElement('main');
    main.className = 'app-main';
    
    // Comandas list
    const listSection = document.createElement('section');
    listSection.className = 'comandas-section';
    const comandaList = renderComandaList(
      getComandas(),
      getCurrentComandaId(),
      (id) => this.selectComanda(id),
      (id) => this.handleDeleteComanda(id),
      (id, status) => this.handleStatusChange(id, status)
    );
    listSection.appendChild(comandaList);
    
    // Detail view
    const detailSection = document.createElement('section');
    detailSection.className = 'detail-section';
    const comandaDetail = renderComandaDetail(
      getComanda(getCurrentComandaId()),
      () => this.showMenuView(),
      (itemId) => this.handleRemoveItem(itemId),
      (itemId) => this.handleIncrementItem(itemId),
      () => this.handlePrint()
    );
    detailSection.appendChild(comandaDetail);
    
    main.appendChild(listSection);
    main.appendChild(detailSection);
    this.container.appendChild(main);
  }

  showNewComandaModal() {
    const modal = renderNewComandaModal(
      (tableNumber, note) => {
        const id = createComanda(tableNumber, note);
        setCurrentComandaId(id);
        document.body.removeChild(modal);
        this.render();
      },
      () => document.body.removeChild(modal)
    );
    document.body.appendChild(modal);
  }

  showMenuView() {
    const recentItems = loadRecentItems();
    const modal = renderMenuView(
      menuData,
      recentItems,
      (item) => {
        document.body.removeChild(modal);
        this.showAddItemModal(item);
      },
      () => document.body.removeChild(modal)
    );
    document.body.appendChild(modal);
  }

  showAddItemModal(item) {
    const modal = renderAddItemModal(
      menuData,
      item,
      (itemWithVariant, quantity, note, extras, customPrice) => {
        const comandaId = getCurrentComandaId();
        if (!comandaId) {
          alert('Por favor selecciona o crea una comanda primero');
          return;
        }
        addItemToComanda(comandaId, itemWithVariant, quantity, note, extras, customPrice);
        document.body.removeChild(modal);
        this.render();
      },
      () => document.body.removeChild(modal)
    );
    document.body.appendChild(modal);
  }

  selectComanda(id) {
    setCurrentComandaId(id);
    this.render();
  }

  handleDeleteComanda(id) {
    deleteComanda(id);
    this.render();
  }

  handleDeleteAll() {
    if (confirm('¿Estás seguro de eliminar TODAS las comandas? Esta acción no se puede deshacer.')) {
      if (confirm('¿Realmente seguro? Se borrarán todas las comandas permanentemente.')) {
        deleteAllComandas();
        setCurrentComandaId(null);
        this.render();
      }
    }
  }

  handleRemoveItem(itemId) {
    const comandaId = getCurrentComandaId();
    if (comandaId) {
      removeItemFromComanda(comandaId, itemId);
      this.render();
    }
  }

  handleIncrementItem(itemId) {
    const comandaId = getCurrentComandaId();
    if (comandaId) {
      incrementItemQuantity(comandaId, itemId);
      this.render();
    }
  }

  handleStatusChange(id, status) {
    updateComandaStatus(id, status);
    this.render();
  }

  handlePrint() {
    const comanda = getComanda(getCurrentComandaId());
    if (!comanda) return;
    
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Comanda - Mesa ${comanda.tableNumber}</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            padding: 20px; 
            max-width: 600px; 
            margin: 0 auto;
          }
          h1 { border-bottom: 2px solid #333; padding-bottom: 10px; }
          .info { margin: 10px 0; }
          .items { margin: 20px 0; }
          .item { 
            padding: 10px 0; 
            border-bottom: 1px solid #ddd;
            display: flex;
            justify-content: space-between;
          }
          .item-details { flex: 1; }
          .item-note { 
            font-size: 0.9em; 
            color: #666; 
            font-style: italic; 
            margin-top: 5px;
          }
          .item-extras {
            font-size: 0.9em;
            color: #666;
            margin-top: 5px;
          }
          .total { 
            font-size: 1.5em; 
            font-weight: bold; 
            text-align: right; 
            margin-top: 20px;
            padding-top: 20px;
            border-top: 2px solid #333;
          }
        </style>
      </head>
      <body>
        <h1>🍕 Gallo Pizzero</h1>
        <div class="info">
          <strong>Mesa:</strong> ${comanda.tableNumber}<br/>
          <strong>Fecha:</strong> ${new Date(comanda.createdAt).toLocaleString('es-MX')}<br/>
          <strong>Estado:</strong> ${comanda.status}<br/>
          ${comanda.note ? `<strong>Nota:</strong> ${comanda.note}<br/>` : ''}
        </div>
        <div class="items">
          ${comanda.items.map(item => `
            <div class="item">
              <div class="item-details">
                <strong>${item.name}</strong> ${item.variant ? `(${item.variant.name})` : ''} x${item.quantity}
                ${item.note ? `<div class="item-note">${item.note}</div>` : ''}
                ${item.extras.length > 0 ? `<div class="item-extras">+ ${item.extras.map(e => e.name).join(', ')}</div>` : ''}
              </div>
              <div>$${item.total.toFixed(2)}</div>
            </div>
          `).join('')}
        </div>
        <div class="total">
          Total: $${comanda.total.toFixed(2)}
        </div>
        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = function() {
              window.close();
            };
          };
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
