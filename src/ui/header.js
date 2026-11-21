// Header component

export function renderHeader(onNewComanda, onDeleteAll) {
  const header = document.createElement('header');
  header.className = 'app-header';
  
  header.innerHTML = `
    <div class="header-content">
      <h1>🍕 Gallo Pizzero</h1>
      <div class="header-actions">
        <button class="btn btn-primary" id="new-comanda-btn">
          + Nueva Comanda
        </button>
        <button class="btn btn-danger" id="delete-all-btn">
          🗑️ Borrar Todo
        </button>
      </div>
    </div>
  `;
  
  header.querySelector('#new-comanda-btn').addEventListener('click', onNewComanda);
  header.querySelector('#delete-all-btn').addEventListener('click', onDeleteAll);
  
  return header;
}
