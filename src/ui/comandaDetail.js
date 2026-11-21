// Comanda detail view component

export function renderComandaDetail(comanda, onAddItem, onRemoveItem, onIncrementItem, onPrint) {
  const container = document.createElement('div');
  container.className = 'comanda-detail';
  
  if (!comanda) {
    container.innerHTML = `
      <div class="empty-state">
        <p>Selecciona una comanda o crea una nueva.</p>
      </div>
    `;
    return container;
  }
  
  const date = new Date(comanda.createdAt);
  const dateStr = date.toLocaleDateString('es-MX', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  container.innerHTML = `
    <div class="detail-header">
      <div>
        <h2>Mesa ${comanda.tableNumber}</h2>
        <p class="detail-date">${dateStr}</p>
        ${comanda.note ? `<p class="detail-note">${comanda.note}</p>` : ''}
      </div>
      <button class="btn btn-secondary" id="print-btn">🖨️ Imprimir</button>
    </div>
    
    <div class="detail-items">
      ${comanda.items.length === 0 ? `
        <div class="empty-state">
          <p>No hay items. Agrega productos desde el menú.</p>
        </div>
      ` : ''}
      <div id="items-container"></div>
    </div>
    
    <div class="detail-footer">
      <button class="btn btn-primary btn-lg" id="add-item-btn">+ Agregar Item</button>
      <div class="detail-total">
        <span>Total:</span>
        <span class="total-amount">$${comanda.total.toFixed(2)}</span>
      </div>
    </div>
  `;
  
  const itemsContainer = container.querySelector('#items-container');
  comanda.items.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.className = 'comanda-item';
    
    const extrasText = item.extras.length > 0 
      ? `<div class="item-extras">+ ${item.extras.map(e => e.name).join(', ')}</div>`
      : '';
    
    const variantText = item.variant 
      ? `<span class="item-variant">(${item.variant.name})</span>`
      : '';
    
    itemEl.innerHTML = `
      <div class="item-main">
        <div class="item-info">
          <span class="item-name">${item.name} ${variantText}</span>
          <span class="item-quantity">x${item.quantity}</span>
        </div>
        ${item.note ? `<div class="item-note">${item.note}</div>` : ''}
        ${extrasText}
        <div class="item-price">$${item.total.toFixed(2)}</div>
      </div>
      <div class="item-actions">
        <button class="btn btn-sm btn-secondary increment-btn" data-id="${item.id}">+1</button>
        <button class="btn btn-sm btn-danger remove-btn" data-id="${item.id}">✕</button>
      </div>
    `;
    
    itemEl.querySelector('.increment-btn').addEventListener('click', () => {
      onIncrementItem(item.id);
    });
    
    itemEl.querySelector('.remove-btn').addEventListener('click', () => {
      onRemoveItem(item.id);
    });
    
    itemsContainer.appendChild(itemEl);
  });
  
  container.querySelector('#add-item-btn').addEventListener('click', onAddItem);
  container.querySelector('#print-btn').addEventListener('click', onPrint);
  
  return container;
}
