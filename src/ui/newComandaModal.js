// New comanda modal

export function renderNewComandaModal(onConfirm, onClose) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  
  const modal = document.createElement('div');
  modal.className = 'modal new-comanda-modal';
  
  modal.innerHTML = `
    <div class="modal-header">
      <h2>Nueva Comanda</h2>
      <button class="btn-close" id="close-new-comanda">✕</button>
    </div>
    
    <div class="modal-body">
      <div class="form-group">
        <label>Mesa / Nombre: *</label>
        <input 
          type="text" 
          id="table-number" 
          class="form-control" 
          placeholder="Ej: 5, Mesa 5, Juan..." 
          autofocus
        />
      </div>
      
      <div class="form-group">
        <label>Nota (opcional):</label>
        <textarea 
          id="comanda-note" 
          class="form-control" 
          rows="3" 
          placeholder="Notas adicionales..."
        ></textarea>
      </div>
    </div>
    
    <div class="modal-footer">
      <button class="btn btn-secondary" id="cancel-new-comanda">Cancelar</button>
      <button class="btn btn-primary" id="confirm-new-comanda">Crear</button>
    </div>
  `;
  
  const tableInput = modal.querySelector('#table-number');
  const noteInput = modal.querySelector('#comanda-note');
  
  function handleConfirm() {
    const tableNumber = tableInput.value.trim();
    if (!tableNumber) {
      alert('Por favor ingrese un número de mesa o nombre');
      tableInput.focus();
      return;
    }
    
    const note = noteInput.value.trim();
    onConfirm(tableNumber, note);
  }
  
  modal.querySelector('#confirm-new-comanda').addEventListener('click', handleConfirm);
  tableInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleConfirm();
  });
  
  modal.querySelector('#cancel-new-comanda').addEventListener('click', onClose);
  modal.querySelector('#close-new-comanda').addEventListener('click', onClose);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) onClose();
  });
  
  overlay.appendChild(modal);
  return overlay;
}
