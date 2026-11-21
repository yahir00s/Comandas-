# Gallo Pizzero · Comandas

App para anotar lo que pide cada mesa. Está pensada para usarse en el celular. Todo se guarda en el navegador (localStorage): no hay servidor y no se envía nada.

App publicada: https://yahir00s.github.io/Comandas-/

## Cómo se usa

1. **Lista de comandas.** Toca **+ Nueva comanda**, escribe mesa o nombre (la nota es opcional) y se abre directo la pantalla para agregar productos.
2. **Agregar productos.** Arriba la búsqueda (sin acentos), abajo las categorías en bloques (Bebidas y Comida). Si ya pediste algo antes, aparecen chips de **Frecuentes** que agregan con un toque.
3. Dentro de una categoría, un toque en el botón del producto agrega uno. Si tiene Litro, hay un botón para **Vaso** y otro para **Litro**. La insignia indica cuántos llevas de ese producto.
4. **Ver comanda** (barra inferior) abre solo esa comanda. Cada renglón tiene **−** / **+** (otra vez), **Nota / extras** y el botón **Ya lo llevé a la mesa**. Lo pendiente queda arriba y lo ya entregado abajo, atenuado. Si agregas otra pieza de algo ya entregado, vuelve a quedar pendiente.
5. La lista muestra una tarjeta por comanda con cuántas piezas **faltan** por llevar, o **Todo en mesa**. Las completas quedan al final.
6. El botón atrás del celular regresa a la pantalla anterior.

La app no muestra precios ni totales. Eliminar una comanda o **Borrar todas las comandas** (al final de la lista) pide confirmación.

## Menú

Los productos están en `src/data/menu.js` (91 productos, ver `docs/menu-fotos/`). Los precios se conservan en ese archivo pero la app no los muestra. Para agregar o quitar un producto edita ese archivo.

- Presentación Litro: `variants: [{ name: 'Litro', price: 160 }]`.
- Extras de pizzas, pastas y ensaladas: sección `extras` del mismo archivo.

## Estructura

```
src/
  data/menu.js     menú y precios
  store.js         localStorage (comandas y frecuentes)
  comandas.js      reglas: agregar, cantidades, lo ya llevado a la mesa
  search.js        búsqueda sin acentos, presentaciones, extras
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
