# 📋 Guía de Despliegue - Sistema de Comandas Gallo Pizzero

## ✅ Estado del Proyecto

**Estado**: Completado y listo para despliegue  
**PR**: https://github.com/yahir00s/Comandas-/pull/1  
**Branch**: `cursor/order-taking-app-cf30`  
**Build**: ✅ Exitoso (29.67 KB JS, 9.22 KB CSS)

## 🚀 Pasos para Activar la Aplicación

### 1. Configurar GitHub Pages

**IMPORTANTE**: Debes hacer esto antes de hacer merge del PR.

1. Ve a la configuración del repositorio:
   ```
   https://github.com/yahir00s/Comandas-/settings/pages
   ```

2. En la sección **"Build and deployment"**:
   - **Source**: Selecciona **"GitHub Actions"**
   - Guarda los cambios

### 2. Merge del Pull Request

Una vez configurado GitHub Pages:

1. Revisa el PR: https://github.com/yahir00s/Comandas-/pull/1
2. Haz merge a `main`
3. El workflow de GitHub Actions se ejecutará automáticamente
4. Espera ~1-2 minutos para que el despliegue termine

### 3. Acceder a la Aplicación

Una vez desplegado, la app estará disponible en:

```
https://yahir00s.github.io/Comandas-/
```

## 📱 Uso de la Aplicación

### Primera Vez
1. Abre la URL en el navegador del restaurante
2. Agrega a favoritos para acceso rápido
3. Usa en pantalla completa (F11) para mejor experiencia

### Flujo de Trabajo
1. **Nueva Comanda** → Ingresa mesa/nombre
2. **+ Agregar Item** → Busca o filtra productos
3. Selecciona cantidad, variantes, extras, notas
4. Los cambios se guardan automáticamente
5. Cambia estado: Pendiente → Entregada → Pagada
6. Imprime o elimina cuando termines

## 🔧 Personalización Futura

### Actualizar el Menú

Edita `src/data/menu.js`:

```javascript
{
  id: 'nuevo-item',
  name: 'Pizza Nueva',
  description: 'Descripción opcional',
  price: 250,
  variants: [
    { name: 'Chica', price: 200 },
    { name: 'Grande', price: 250 }
  ]
}
```

Luego:
```bash
npm install
npm run build
git add src/data/menu.js
git commit -m "actualizar menú"
git push
```

El despliegue es automático.

### Cambiar Colores

Edita variables CSS en `src/style.css`:

```css
:root {
  --primary-color: #d32f2f;      /* Color principal */
  --secondary-color: #ff9800;    /* Color secundario */
  --success-color: #4caf50;      /* Color éxito */
  /* ... más colores ... */
}
```

## 📊 Menú Extraído - Resumen

### ✅ Todas las Categorías Incluidas

**Bebidas**:
- Coctelería: 16
- Cócteles Italianos: 8
- Destilados: 2
- Cócteles sin alcohol: 4
- Bebidas sin alcohol: 6
- Cervezas: 6
- Vino: 6

**Comida**:
- Pastas: 5 (Marinara, Pesto, Arrabbiata, Alfredo, Carbonara)
- Panuzzos: 3 (Albóndigas, Pollo a la Parmesana, Jamón)
- Postres: 3
- Pizzas: 17
- Entradas: 8
- Especialidades Gallo: 5 (Nudos de Ajo, Stromboli, Papas Poutine, Hot Dog Bratwurst, Hamburguesa Clásica)
- Ensaladas: 2 (César, Mixta)

**Extras**:
- Pizza: Vegetal ($15), Queso ($35), Proteína ($35)
- Pasta y ensalada: Pollo ($55), Camarones ($60), Albóndigas ($55)

### Precios especiales

- Tuxcas y Mezcales: precio según existencia (se captura a mano)
- Vampiro: $100, o Litro $160
- Vampiro S/A: solo Litro $120

## 🎯 Características Implementadas

✅ **Core**:
- Crear/eliminar comandas
- Agregar items con cantidad, notas, extras
- Persistencia en localStorage
- Estados (pendiente/entregada/pagada)
- Cálculo automático de totales

✅ **Búsqueda**:
- Búsqueda sin acentos
- Filtro por categoría
- Lista de items frecuentes
- Botón +1 para re-agregar

✅ **UX/UI**:
- Responsive (móvil/tablet/escritorio)
- Botones grandes táctiles
- Vista de impresión
- Timestamps
- Indicadores visuales por estado

✅ **Técnico**:
- Vite + Vanilla JS (sin frameworks)
- Código modular y limpio
- Build pequeño (~11KB gzipped total)
- GitHub Actions para CI/CD

## 🔍 Verificación del Menú

Los precios y productos fueron extraídos de las 5 fotos del menú. Para verificar:

1. Compara con el menú físico actual
2. Revisa `src/data/menu.js`
3. Consulta `docs/menu-fotos/MENU_REFERENCE.md`

Si encuentras diferencias, edita `src/data/menu.js` y haz push.

## 📝 Notas Importantes

### Datos Locales
- **Todo se guarda en localStorage del navegador**
- No hay sincronización entre dispositivos
- Cambiar de navegador = datos nuevos
- Borrar caché = pérdida de datos

### Backup
- Usa la función de impresión para registros
- Exporta datos si es necesario (función futura)
- Toma capturas de pantalla de comandas importantes

### Soporte
- El código está documentado
- README.md tiene guía completa de uso
- Todos los módulos son independientes y fáciles de editar

## 🎉 Listo para Producción

El sistema está completo y probado:
- ✅ Build exitoso
- ✅ Código limpio y modular
- ✅ Menú completo extraído
- ✅ Todas las características implementadas
- ✅ Responsive y accesible
- ✅ Documentación completa
- ✅ Workflow de despliegue automático

---

**Fecha de completación**: Noviembre 21, 2024  
**Versión**: 1.0.0  
**Desarrollado para**: Gallo Pizzero
