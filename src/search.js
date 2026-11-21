// Search and filter functionality

function removeAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function searchItems(items, query) {
  if (!query) return items;
  
  const normalizedQuery = removeAccents(query.toLowerCase());
  
  return items.filter(item => {
    const normalizedName = removeAccents(item.name.toLowerCase());
    const normalizedDesc = item.description 
      ? removeAccents(item.description.toLowerCase()) 
      : '';
    
    return normalizedName.includes(normalizedQuery) || 
           normalizedDesc.includes(normalizedQuery);
  });
}

export function filterByCategory(menuData, categoryId) {
  if (!categoryId || categoryId === 'todos') {
    return menuData.categories.flatMap(cat => 
      cat.items.map(item => ({ ...item, category: cat.name, categoryId: cat.id }))
    );
  }
  
  const category = menuData.categories.find(cat => cat.id === categoryId);
  return category 
    ? category.items.map(item => ({ ...item, category: category.name, categoryId: category.id }))
    : [];
}

export function getExtrasForCategory(menuData, categoryId) {
  if (categoryId.includes('pizza')) {
    return menuData.extras.pizza || [];
  }
  if (categoryId.includes('pasta')) {
    return menuData.extras.pasta || [];
  }
  if (categoryId.includes('ensalada')) {
    return menuData.extras.ensalada || [];
  }
  return [];
}
