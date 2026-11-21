# 🍕 Gallo Pizzero - Sistema de Comandas

Sistema simple de toma de comandas para el restaurante Gallo Pizzero. Funciona completamente en el navegador sin necesidad de backend, guardando toda la información localmente.

## 🚀 Características

- ✅ **Gestión de Comandas**: Crea, visualiza y elimina comandas por mesa/cliente
- 📝 **Agregar Items**: Busca productos del menú, selecciona cantidad, variantes, extras y notas personalizadas
- 🔍 **Búsqueda Inteligente**: Búsqueda sin acentos por nombre o descripción + filtro por categoría
- ⚡ **Items Frecuentes**: Lista de productos pedidos recientemente para acceso rápido
- ➕ **Re-agregar Rápido**: Botón +1 en items de la comanda para repetir
- 💾 **Persistencia Local**: Todo se guarda en localStorage del navegador
- 📊 **Estados**: Marca comandas como pendiente/entregada/pagada
- 🖨️ **Impresión**: Vista de impresión optimizada para cada comanda
- 📱 **Responsive**: Funciona en computadora, tablet y móvil

## 🛠️ Tecnología

- **Vite** - Build tool moderno y rápido
- **Vanilla JavaScript** con módulos ES6 - Sin frameworks, código limpio y modular
- **LocalStorage** - Persistencia de datos en el navegador
- **CSS moderno** - Diseño responsive y adaptable

## 📁 Estructura del Proyecto

```
/
├── src/
│   ├── data/
│   │   └── menu.js          # Datos del menú (fácil de editar)
│   ├── ui/
│   │   ├── header.js        # Componente del encabezado
│   │   ├── comandaList.js   # Lista de comandas
│   │   ├── comandaDetail.js # Detalle de comanda
│   │   ├── menuView.js      # Vista de selección de menú
│   │   ├── addItemModal.js  # Modal para agregar items
│   │   └── newComandaModal.js # Modal para nueva comanda
│   ├── store.js             # Gestión de localStorage
│   ├── comandas.js          # Lógica de comandas
│   ├── search.js            # Búsqueda y filtros
│   ├── main.js              # Aplicación principal
│   └── style.css            # Estilos
├── docs/
│   └── menu-fotos/          # Fotos del menú de referencia
├── index.html
├── vite.config.js
└── package.json
```

## 🏃 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa del build
npm run preview
```

## 🌐 Despliegue en GitHub Pages

El proyecto incluye un workflow de GitHub Actions que despliega automáticamente a GitHub Pages en cada push a `main`.

### Configuración Requerida

1. Ve a **Settings** → **Pages** en el repositorio
2. En **Source**, selecciona: **GitHub Actions**
3. El workflow se ejecutará automáticamente en el próximo push

La app estará disponible en:
```
https://yahir00s.github.io/Comandas-/
```

## 📋 Menú

El menú completo está definido en `src/data/menu.js` e incluye:

### Bebidas
- Coctelería (mojitos, margaritas, cócteles)
- Cócteles Italianos
- Destilados (tequila, mezcales)
- Cócteles sin Alcohol
- Bebidas sin Alcohol
- Cervezas
- Vino

### Comida
- Pastas (5 tipos)
- Panuzzos (3 tipos)
- Postres (3 tipos)
- Pizzas (19 tipos)
- Entradas (8 tipos)
- Especialidades Gallo
- Ensaladas (3 tipos)

### Extras
- Para Pizzas: Vegetal, Queso, Proteína
- Para Pastas/Ensaladas: Pollo, Camarones, Albóndigas

## 📝 Uso

1. **Crear Comanda**: Click en "Nueva Comanda", ingresa mesa/nombre
2. **Agregar Items**: Click en "Agregar Item", busca/selecciona productos
3. **Personalizar**: Selecciona cantidad, variante, extras y notas
4. **Gestionar**: Cambia estados (pendiente/entregada/pagada)
5. **Imprimir**: Click en 🖨️ para vista de impresión
6. **Eliminar**: Elimina comandas individuales o todas a la vez

## ⚙️ Personalización

### Actualizar el Menú

Edita `src/data/menu.js` para:
- Agregar/eliminar categorías
- Agregar/eliminar items
- Actualizar precios
- Modificar descripciones

### Cambiar Colores

Edita las variables CSS en `src/style.css`:
```css
:root {
  --primary-color: #d32f2f;
  --secondary-color: #ff9800;
  /* ... más colores */
}
```

## 🔒 Datos

- **Almacenamiento**: LocalStorage del navegador
- **Persistencia**: Los datos persisten entre sesiones
- **Privacidad**: No se envía información a ningún servidor
- **Backup**: Para respaldar, exporta desde localStorage o haz capturas

⚠️ **Importante**: Los datos solo existen en el navegador donde se crean. Si cambias de navegador o borras el caché, se pierden.

## 📄 Licencia

Este proyecto fue creado específicamente para Gallo Pizzero.

## 🤝 Contribuciones

Para mejoras o cambios:
1. Edita los archivos necesarios
2. Prueba localmente con `npm run dev`
3. Construye con `npm run build`
4. Haz commit y push para que se despliegue automáticamente

---

Desarrollado con ❤️ para Gallo Pizzero
