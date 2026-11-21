# Fotos del Menú - Gallo Pizzero

Este directorio contiene las fotos del menú impreso del restaurante, utilizadas como referencia para extraer los productos y precios en `src/data/menu.js`.

## Secciones del Menú

El menú está organizado en las siguientes categorías:

### Bebidas
- **Coctelería**: Mojitos, margaritas, cócteles clásicos (muchos disponibles por litro)
- **Cócteles Italianos**: Limonadas y bebidas italianas especiales
- **Destilados**: Tequila, mezcales, licores
- **Cócteles sin Alcohol**: Opciones sin alcohol
- **Bebidas sin Alcohol**: Sodas italianas, limonadas, aguas frescas
- **Cervezas**: Corona, Victoria, micheladas
- **Vino**: Copas y botellas, sangría, clericot

### Comida
- **Pastas**: Marinara, pesto, arrabbiata, carbonara, pérez rosa
- **Panuzzos**: Pan pizza relleno (albóndigas, boloñesa, jamón)
- **Postres**: Panacota, crème brûlée, buñuelos de viento
- **Pizzas**: Variedad de pizzas artesanales (margherita, pepperoni, hawaiana, gorgonzola, etc.)
- **Entradas**: Nudos de pan, bruschetta, papas, ensalada caprese
- **Especialidades Gallo**: Items especiales de la casa
- **Ensaladas**: César, mix, arúgula

### Extras
- **Para Pizzas**: Vegetal ($15), Queso ($35), Proteína ($35)
- **Para Pastas/Ensaladas**: Pollo ($55), Camarones ($60), Albóndigas ($55)

## Notas sobre Precios

Algunos items tienen precios variables marcados como "precio según existencia":
- Vampiro (coctelería)
- Destilados (tequila, mezcales)

Estos requieren que el usuario ingrese el precio manualmente al agregarlos a una comanda.

## Actualizaciones

Si el menú cambia, actualiza:
1. Las fotos en este directorio (si es necesario)
2. El archivo `src/data/menu.js` con los nuevos items/precios
3. Este README con las notas relevantes
