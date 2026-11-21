// Menú de Gallo Pizzero (MXN).
// Fuente: transcripción verificada de las fotos del menú impreso.
// Las bebidas con precio de vaso y de litro usan `variants`.
// `priceVariable` pide el precio al agregar el producto.
// `group` agrupa las categorías en la pantalla de agregar (bebidas o comida).

export const menuData = {
  categories: [
    {
      id: 'cocteleria',
      name: 'Coctelería',
      group: 'bebidas',
      items: [
        { id: 'coc-mojito-mandarina', name: 'Mojito Mandarina', price: 90, variants: [{ name: 'Litro', price: 160 }] },
        { id: 'coc-mojito-clasico', name: 'Mojito Clásico', price: 90, variants: [{ name: 'Litro', price: 160 }] },
        { id: 'coc-mojito-frutos-rojos', name: 'Mojito de Frutos Rojos', price: 100, variants: [{ name: 'Litro', price: 160 }] },
        { id: 'coc-margarita-mezcalita', name: 'Margarita o Mezcalita', price: 100 },
        { id: 'coc-aperol-margarita', name: 'Aperol Margarita', price: 110 },
        { id: 'coc-galgo-italiano', name: 'Galgo Italiano', price: 120 },
        { id: 'coc-gin-tonic-frambuesa', name: 'Gin Tonic Frambuesa y Albahaca', price: 130 },
        { id: 'coc-gin-tonic', name: 'Gin & Tonic', price: 110 },
        { id: 'coc-fernando', name: 'Fernando', price: 110 },
        { id: 'coc-mai-thai', name: 'Mai Thai', price: 90 },
        { id: 'coc-carajillo', name: 'Carajillo', price: 120 },
        { id: 'coc-cantarito', name: 'Cantarito de Mezcal o Tequila', price: 110, variants: [{ name: 'Litro', price: 160 }] },
        { id: 'coc-pina-colada', name: 'Piña Colada', price: 120 },
        { id: 'coc-pina-colada-fresa', name: 'Piña Colada de Fresa', price: 120 },
        { id: 'coc-daiquiri', name: 'Daiquirí de Fresa o Frutos Rojos', price: 100 },
        { id: 'coc-vampiro', name: 'Vampiro', price: 100, variants: [{ name: 'Litro', price: 160 }] }
      ]
    },
    {
      id: 'cocteles-italianos',
      name: 'Cócteles Italianos',
      group: 'bebidas',
      items: [
        { id: 'ci-negroni', name: 'Negroni', price: 120 },
        { id: 'ci-milano', name: 'Milano', price: 120 },
        { id: 'ci-aperol-spritz', name: 'Aperol Spritz', price: 130 },
        { id: 'ci-hugo-spritz', name: 'Hugo Spritz', price: 170 },
        { id: 'ci-limoncello-spritz', name: 'Limoncello Spritz', price: 130 },
        { id: 'ci-campari-spritz', name: 'Campari Spritz', price: 150 },
        { id: 'ci-garibaldi', name: 'Garibaldi', price: 110 },
        { id: 'ci-bellini', name: 'Bellini', price: 110 }
      ]
    },
    {
      id: 'destilados',
      name: 'Destilados',
      group: 'bebidas',
      items: [
        { id: 'des-tuxca-casa', name: 'Tuxca de la casa', price: 65 },
        { id: 'des-tuxcas-mezcales', name: 'Tuxcas y Mezcales', price: null, priceVariable: true }
      ]
    },
    {
      id: 'cocteles-sin-alcohol',
      name: 'Cócteles sin alcohol',
      group: 'bebidas',
      items: [
        { id: 'csa-toronja-spritz', name: 'Toronja Spritz', price: 110 },
        { id: 'csa-copa-espumoso', name: 'Copa de Vino Espumoso S/A', price: 80 },
        {
          id: 'csa-mojitos',
          name: 'Mojitos S/A (mandarina, frutos rojos o clásico)',
          price: 60,
          variants: [{ name: 'Litro', price: 120 }]
        },
        { id: 'csa-vampiro', name: 'Vampiro S/A', price: null, variants: [{ name: 'Litro', price: 120 }] }
      ]
    },
    {
      id: 'bebidas-sin-alcohol',
      name: 'Bebidas sin alcohol',
      group: 'bebidas',
      items: [
        { id: 'bsa-soda-fresa', name: 'Soda Italiana de Fresa', price: 60, variants: [{ name: 'Litro', price: 120 }] },
        { id: 'bsa-soda-frutos', name: 'Soda Italiana de Frutos Rojos', price: 60, variants: [{ name: 'Litro', price: 120 }] },
        { id: 'bsa-limonada-italiana', name: 'Limonada Italiana', price: 70, variants: [{ name: 'Litro', price: 140 }] },
        { id: 'bsa-limonada-naranjada', name: 'Limonada o Naranjada', price: 45, variants: [{ name: 'Litro', price: 90 }] },
        { id: 'bsa-agua-fresca', name: 'Agua Fresca del Día', price: 45, variants: [{ name: 'Litro', price: 90 }] },
        { id: 'bsa-refrescos', name: 'Refrescos y Agua Mineral', price: 45 }
      ]
    },
    {
      id: 'cervezas',
      name: 'Cervezas',
      group: 'bebidas',
      items: [
        { id: 'cer-corona-victoria', name: 'Corona o Victoria', price: 45 },
        { id: 'cer-corona-familiar', name: 'Corona Familiar', price: 100 },
        { id: 'cer-vaso-michelado', name: 'Vaso Michelado', price: 35 },
        { id: 'cer-michelada-litro', name: 'Michelada de Litro', price: 100 },
        { id: 'cer-michelada-tamarindo', name: 'Michelada de Tamarindo', price: 120 },
        { id: 'cer-michelada-pepino', name: 'Michelada de Pepino', price: 110 }
      ]
    },
    {
      id: 'vino',
      name: 'Vino',
      group: 'bebidas',
      items: [
        { id: 'vin-copa-cabernet', name: 'Copa Cabernet Sauvignon', price: 80 },
        { id: 'vin-copa-blanc', name: 'Copa Sauvignon Blanc', price: 80 },
        { id: 'vin-copa-espumoso', name: 'Copa de Vino Espumoso', price: 80 },
        { id: 'vin-botella-cabernet', name: 'Botella Cabernet Sauvignon', price: 350 },
        { id: 'vin-clericot', name: 'Clericot', price: 110 },
        { id: 'vin-tinto-verano', name: 'Tinto de Verano', price: 110 }
      ]
    },
    {
      id: 'pastas',
      name: 'Pastas',
      group: 'comida',
      items: [
        { id: 'pas-marinara', name: 'Marinara', price: 160 },
        { id: 'pas-pesto', name: 'Pesto', price: 180 },
        { id: 'pas-arrabbiata', name: 'Arrabbiata', price: 160 },
        { id: 'pas-alfredo', name: 'Alfredo', price: 180 },
        { id: 'pas-carbonara', name: 'Carbonara', price: 180 }
      ]
    },
    {
      id: 'panuzzos',
      name: 'Panuzzos',
      group: 'comida',
      items: [
        { id: 'pan-albondigas', name: 'Albóndigas', price: 200 },
        { id: 'pan-pollo-parmesana', name: 'Pollo a la Parmesana', price: 200 },
        { id: 'pan-jamon', name: 'Jamón', price: 180 }
      ]
    },
    {
      id: 'postres',
      name: 'Postres',
      group: 'comida',
      items: [
        { id: 'pos-panacota', name: 'Panacota', price: 80 },
        { id: 'pos-creme-brulee', name: 'Crème Brûlée', price: 80 },
        { id: 'pos-bunuelos', name: 'Buñuelos de Viento', price: 90 }
      ]
    },
    {
      id: 'pizzas',
      name: 'Pizzas',
      group: 'comida',
      items: [
        { id: 'piz-margherita', name: 'Margherita', price: 180 },
        { id: 'piz-marinara', name: 'Marinara', price: 180 },
        { id: 'piz-peperoni', name: 'Peperoni', price: 180 },
        { id: 'piz-hawaiana', name: 'Hawaiana', price: 190 },
        { id: 'piz-champinones', name: 'Champiñones', price: 180 },
        { id: 'piz-pepechampi', name: 'Pepechampi', price: 190 },
        { id: 'piz-carnivora', name: 'Carnívora', price: 220 },
        { id: 'piz-hongos', name: 'Hongos', price: 220 },
        { id: 'piz-anchoas', name: 'Anchoas', price: 200 },
        { id: 'piz-italian-spicy', name: 'Italian Spicy', price: 200 },
        { id: 'piz-mexicana', name: 'Mexicana', price: 200 },
        { id: 'piz-camaron-ajo', name: 'Camarón Ajo Romero', price: 220 },
        { id: 'piz-arugula-serrano', name: 'Arugula Jamón Serrano', price: 250 },
        { id: 'piz-pastor', name: 'Pizza al Pastor', price: 280 },
        { id: 'piz-cuatro-quesos', name: 'Cuatro Quesos', price: 220 },
        { id: 'piz-panceta', name: 'Panceta', price: 250 },
        { id: 'piz-frutos-mar', name: 'Frutos del Mar', price: 250 }
      ]
    },
    {
      id: 'entradas',
      name: 'Entradas',
      group: 'comida',
      items: [
        { id: 'ent-bruselas', name: 'Bruselas', price: 100 },
        { id: 'ent-carpaccio-betabel', name: 'Carpaccio de Betabel', price: 110 },
        { id: 'ent-bruschettas', name: 'Bruschettas', price: 110 },
        { id: 'ent-pollo-parmesana', name: 'Pollo a la Parmesana', price: 150 },
        {
          id: 'ent-boneless',
          name: 'Boneless',
          description: 'Salsas: BBQ de la casa, Piña Habanero, BBQ Chiltepín',
          price: 150
        },
        { id: 'ent-papas-camote', name: 'Papas Camote', price: 95 },
        { id: 'ent-papas-gajo', name: 'Papas Gajo', price: 100 },
        { id: 'ent-camarones-ajillo', name: 'Camarones al Ajillo', price: 165 }
      ]
    },
    {
      id: 'especialidades',
      name: 'Especialidades Gallo',
      group: 'comida',
      items: [
        { id: 'esp-nudos-ajo', name: 'Nudos de Ajo', price: 100 },
        { id: 'esp-stromboli', name: 'Stromboli', price: 100 },
        { id: 'esp-papas-poutine', name: 'Papas Poutine', price: 160 },
        { id: 'esp-hot-dog', name: 'Hot Dog Bratwurst', price: 150 },
        { id: 'esp-hamburguesa', name: 'Hamburguesa Clásica', price: 175 }
      ]
    },
    {
      id: 'ensaladas',
      name: 'Ensaladas',
      group: 'comida',
      items: [
        { id: 'ens-cesar', name: 'César', price: 120 },
        { id: 'ens-mixta', name: 'Mixta', price: 120 }
      ]
    }
  ],
  extras: {
    pizza: [
      { id: 'ex-pz-veg', name: 'Vegetal', price: 15 },
      { id: 'ex-pz-queso', name: 'Queso', price: 35 },
      { id: 'ex-pz-prot', name: 'Proteína', price: 35 }
    ],
    pasta: [
      { id: 'ex-pa-pollo', name: 'Pollo', price: 55 },
      { id: 'ex-pa-camarones', name: 'Camarones', price: 60 },
      { id: 'ex-pa-albondigas', name: 'Albóndigas', price: 55 }
    ],
    ensalada: [
      { id: 'ex-en-pollo', name: 'Pollo', price: 55 },
      { id: 'ex-en-camarones', name: 'Camarones', price: 60 },
      { id: 'ex-en-albondigas', name: 'Albóndigas', price: 55 }
    ]
  }
};
