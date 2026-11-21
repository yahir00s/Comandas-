# Gallo Pizzero · Comandas

App para anotar lo que pide cada mesa. Está pensada para usarse en el celular. Todo se guarda en el navegador (localStorage): no hay servidor y no se envía nada.

App publicada: https://yahir00s.github.io/Comandas-/

## Cómo se usa

1. **Lista de comandas.** Toca **+ Nueva comanda**, escribe mesa o nombre (la nota es opcional) y se abre directo la pantalla para agregar productos.
2. **Agregar productos.** Arriba la búsqueda (sin acentos), abajo las categorías en bloques (Bebidas y Comida). Si ya pediste algo antes, aparecen chips de **Frecuentes** que agregan con un toque.
3. Dentro de una categoría cada producto muestra su precio como botón. Un toque agrega uno. Si tiene Litro, hay un botón por precio. La insignia indica cuántos llevas de ese producto.
4. **Ver comanda** (barra inferior) abre solo esa comanda: **−** / **+** (otra vez), **Nota / extras**, estado (Pendiente, Entregada, Pagada), total, imprimir y eliminar.
5. Al volver, la lista muestra una tarjeta por comanda con hora, tiempo transcurrido, total y estado. Las pagadas quedan al final.
6. El botón atrás del celular regresa a la pantalla anterior.

**Borrar todas las comandas** está al final de la lista y pide confirmación.

## Menú

Los productos y precios están en `src/data/menu.js` (91 productos, ver `docs/menu-fotos/`). Para cambiar un precio o agregar un producto edita ese archivo.

- Precio de vaso y de litro: `variants: [{ name: 'Litro', price: 160 }]`.
- Precio según existencia: `priceVariable: true` (pide el precio al agregar).
- Extras de pizzas, pastas y ensaladas: sección `extras` del mismo archivo.

## Estructura

```
src/
  data/menu.js     menú y precios
  store.js         localStorage (comandas y frecuentes)
  comandas.js      reglas: agregar, cantidades, estado, totales
  search.js        búsqueda sin acentos, opciones de precio, extras
  main.js          navegación entre pantallas
  ui/              listView, detailView, addView, sheets, dom
  style.css
```

## Desarrollo

```bash
npm install
npm run dev      # servidor local
npm run build    # genera dist/
```

## Publicación

Cada push a `main` ejecuta `.github/workflows/deploy.yml` y publica en GitHub Pages. En el repositorio, **Settings → Pages → Source** debe ser **GitHub Actions**.

Los datos viven solo en el navegador donde se capturan: no se comparten entre dispositivos y se pierden si se borra el almacenamiento del sitio.
