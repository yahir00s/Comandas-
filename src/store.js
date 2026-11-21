// localStorage management for comandas

const STORAGE_KEY = 'gallo-pizzero-comandas';
const RECENT_ITEMS_KEY = 'gallo-pizzero-recent';
const MAX_RECENT_ITEMS = 10;

export function loadComandas() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading comandas:', error);
    return [];
  }
}

export function saveComandas(comandas) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comandas));
  } catch (error) {
    console.error('Error saving comandas:', error);
  }
}

export function deleteAllComandas() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error deleting comandas:', error);
  }
}

export function loadRecentItems() {
  try {
    const data = localStorage.getItem(RECENT_ITEMS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading recent items:', error);
    return [];
  }
}

export function addRecentItem(itemId) {
  try {
    let recent = loadRecentItems();
    recent = recent.filter(id => id !== itemId);
    recent.unshift(itemId);
    recent = recent.slice(0, MAX_RECENT_ITEMS);
    localStorage.setItem(RECENT_ITEMS_KEY, JSON.stringify(recent));
  } catch (error) {
    console.error('Error adding recent item:', error);
  }
}
