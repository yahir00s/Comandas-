// Comanda list component

export function renderComandaList(comandas, currentId, onSelect, onDelete, onStatusChange) {
  const container = document.createElement('div');
  container.className = 'comanda-list';
  
  if (comandas.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>No hay comandas. Crea una nueva para empezar.</p>
      </div>
    `;
    return container;
  }
  
  comandas.forEach(comanda => {
    const card = document.createElement('div');
    card.className = `comanda-card ${comanda.id === currentId ? 'active' : ''} status-${comanda.status}`;
    
    const date = new Date(comanda.createdAt);
    const timeStr = date.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
    
    card.innerHTML = `
      <div class="comanda-header">
        <h3>Mesa ${comanda.tableNumber}</h3>
        <span class="comanda-time">${timeStr}</span>
      </div>
      ${comanda.note ? `<p class="comanda-note">${comanda.note}</p>` : ''}
      <div class="comanda-info">
        <span class="item-count">${comanda.items.length} items</span>
        <span class="comanda-total">$${comanda.total.toFixed(2)}</span>
      </div>
      <div class="comanda-status">
        <select class="status-select" data-id="${comanda.id}">
          <option value="pendiente" ${comanda.status === 'pendiente' ? 'selected' : ''}>Pendiente</option>
          <option value="entregada" ${comanda.status === 'entregada' ? 'selected' : ''}>Entregada</option>
          <option value="pagada" ${comanda.status === 'pagada' ? 'selected' : ''}>Pagada</option>
        </select>
        <button class="btn btn-sm btn-danger delete-btn" data-id="${comanda.id}">Eliminar</button>
      </div>
    `;
    
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.delete-btn') && !e.target.closest('.status-select')) {
        onSelect(comanda.id);
      }
    });
    
    card.querySelector('.delete-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm(`¿Eliminar comanda de Mesa ${comanda.tableNumber}?`)) {
        onDelete(comanda.id);
      }
    });
    
    card.querySelector('.status-select').addEventListener('change', (e) => {
      e.stopPropagation();
      onStatusChange(comanda.id, e.target.value);
    });
    
    container.appendChild(card);
  });
  
  return container;
}
