// Menu data for Gallo Pizzero
// Extracted from menu photos (see docs/menu-fotos/)

export const menuData = {
  categories: [
    {
      id: 'cocteleria',
      name: 'Coctelería',
      items: [
        { id: 'c1', name: 'Mohito Tradicional', price: null, variants: [{ name: 'Litro', price: 160 }] },
        { id: 'c2', name: 'Mohito de Fresa', price: null, variants: [{ name: 'Litro', price: 160 }] },
        { id: 'c3', name: 'Mohito Menta y Pepino', price: null, variants: [{ name: 'Litro', price: 160 }] },
        { id: 'c4', name: 'Perón Margarita', description: 'Black, royal black, royal menta, mango', price: null, variants: [{ name: 'Litro', price: 160 }] },
        { id: 'c5', name: 'Clásico Italiano', description: 'Sangre de toro o fresa o manzana y vainilla', price: 120 },
        { id: 'c6', name: 'Ginebra', price: 120 },
        { id: 'c7', name: 'Martini', description: 'Bebida de anejo black, mix de duraznos y jugo de lima', price: 110 },
        { id: 'c8', name: 'Malibú', description: 'Bebida de anejo limón y manzanilla verde', price: 110 },
        { id: 'c9', name: 'Contratipos', description: 'Gin artesanal con cilantro, anís y limón jalapeño servido con sal de gusano', price: 110 },
        { id: 'c10', name: 'Caipirinha', description: 'Bebida de anejo limón y 30ml más manzanilla verde', price: 110 },
        { id: 'c11', name: 'Papa Mixto', description: 'Bebida de frutos rojos, menta', price: 110 },
        { id: 'c12', name: 'Cóctel Griego', description: 'Bebida de anejo piña, cerveza', price: 120 },
        { id: 'c13', name: 'Panadería Reyes y Frutos Rojos', price: 120 },
        { id: 'c14', name: 'Daiquiri de Fresa y Frutos Rojos', price: 120 },
        { id: 'c15', name: 'Vampiro', description: 'Sangre de duro refrescos, corona y vegetal', price: 100 },
        { id: 'c16', name: 'Vampiro (precio según existencia)', description: 'Sangre de duro refrescos, corona y vegetal', priceVariable: true }
      ]
    },
    {
      id: 'cocteles-italianos',
      name: 'Cócteles Italianos',
      items: [
        { id: 'ci1', name: 'Limonada Italiana', price: 320 },
        { id: 'ci2', name: 'Helado Italiano', price: 320 },
        { id: 'ci3', name: 'Naranja', price: 320 },
        { id: 'ci4', name: 'Limón', price: 320 }
      ]
    },
    {
      id: 'destilados',
      name: 'Destilados',
      items: [
        { id: 'd1', name: 'Tuka de Licor', price: 65 },
        { id: 'd2', name: 'Todas y Mezcales', description: 'Precio según existencia', priceVariable: true }
      ]
    },
    {
      id: 'cocteles-sin-alcohol',
      name: 'Cócteles sin Alcohol',
      items: [
        { id: 'csa1', name: 'Cópala Spritz', description: 'Cita de vinos espumosa sin alcohol', price: 60, variants: [{ name: 'Copa', price: 60 }] },
        { id: 'csa2', name: 'Cita de Vinos Espumosa Manzana', price: 60 },
        { id: 'csa3', name: 'Martina', description: 'Naranja y lima', price: 70, variants: [{ name: 'Litro', price: 170 }] },
        { id: 'csa4', name: 'Números S/A', description: 'Refrescos de lima', price: 60, variants: [{ name: 'Litro', price: 140 }] }
      ]
    },
    {
      id: 'bebidas-sin-alcohol',
      name: 'Bebidas sin Alcohol',
      items: [
        { id: 'bsa1', name: 'Soda Italiana de Fresa', price: 40, variants: [{ name: 'Litro', price: 120 }] },
        { id: 'bsa2', name: 'Soda Italiana de Frutos Rojos', price: 40, variants: [{ name: 'Litro', price: 130 }] },
        { id: 'bsa3', name: 'Limonada', price: 40, variants: [{ name: 'Litro', price: 120 }] },
        { id: 'bsa4', name: 'Limonada Diamante', price: 45, variants: [{ name: 'Litro', price: 90 }] },
        { id: 'bsa5', name: 'Agua Fresca del Día', description: 'Refrescos y limonadas', price: 40, variants: [{ name: 'Litro', price: 100 }] },
        { id: 'bsa6', name: 'Refresco del Día', description: 'Refrescos y GEM Mineral', price: 25, variants: [{ name: 'Litro', price: 45 }] }
      ]
    },
    {
      id: 'cervezas',
      name: 'Cervezas',
      items: [
        { id: 'cerv1', name: 'Corona o Victoria', price: 45 },
        { id: 'cerv2', name: 'Victoria', price: 45 },
        { id: 'cerv3', name: 'Vaso Modelo', price: 100 },
        { id: 'cerv4', name: 'Michelada de Litro', price: 35 },
        { id: 'cerv5', name: 'Michelada Maleada', description: 'Michelada con tequila clamato', price: 120 },
        { id: 'cerv6', name: 'Michelada de Pepino', description: 'Pepino y piña, jugo de limón, chamoy de hielo primavera', price: 110 }
      ]
    },
    {
      id: 'vino',
      name: 'Vino',
      items: [
        { id: 'v1', name: 'Copa de la Casa Sauvignon', price: 50, variants: [{ name: 'Copa', price: 50 }, { name: 'Botella', price: 80 }] },
        { id: 'v2', name: 'Copa Sangría Blanca', price: 60, variants: [{ name: 'Copa', price: 60 }] },
        { id: 'v3', name: 'Copa de Vino Espumoso', price: 60, variants: [{ name: 'Copa', price: 60 }] },
        { id: 'v4', name: 'Botella Cabernet Sauvignon', description: 'Vino tinto refrescante y suave', price: 110 },
        { id: 'v5', name: 'Clericot', description: 'Vino tinto refrescos pierde de frutas rojos', price: 110 },
        { id: 'v6', name: 'Tinto de Verano', description: 'Vino tinto refrescos y frutos rojos', price: 110 }
      ]
    },
    {
      id: 'pastas',
      name: 'Pastas',
      items: [
        { id: 'p1', name: 'Marinara', description: 'Spaguetti a la marinara, en casa con jitomate, albahaca', price: 140 },
        { id: 'p2', name: 'Pesto', description: 'Spaguetti de pesto fresco hecho en casa con pesto de albahaca y piñones', price: 180 },
        { id: 'p3', name: 'Arrabbiata', description: 'Penne arrabbiata, picante a base de tomate, aceite de oliva y chile rojo', price: 140 },
        { id: 'p4', name: 'Pérez Rosa', description: 'Fetuccine en crema rosa con pesto, mascarpone, parmesano y jitomate cherry', price: 160 },
        { id: 'p5', name: 'Carbonara', description: 'Fetuccine o spaguetti al pesto fresco, panas, pimienta y tocino', price: 180 }
      ]
    },
    {
      id: 'panuzzos',
      name: 'Panuzzos',
      items: [
        { id: 'pn1', name: 'Albóndigas', description: 'Pan pizza albóndigas, salsa de la casa y queso', price: 200 },
        { id: 'pn2', name: 'Boloñesa', description: 'Pan pizza, carne molida, jitomate, cebolla y ajo, manteca, queso parmesano, orégano y arúgula', price: 200 },
        { id: 'pn3', name: 'Jamón', description: 'Pan hecho al momento, jamón de pavo o pollo a la plancha, salsa y tomate', price: 180 }
      ]
    },
    {
      id: 'postres',
      name: 'Postres',
      items: [
        { id: 'po1', name: 'Panacota', description: 'Postre italiano con mousse de chocolate bañada en salsa de frutos rojos', price: 80 },
        { id: 'po2', name: 'Crème Brûlée', description: 'Natilla francesa de vanilla, cubierta de una delgada capa bañada', price: 80 },
        { id: 'po3', name: 'Bonuelos de Viento', description: 'Bolas de masa de pizza fritas, con azúcar y canela', price: 90 }
      ]
    },
    {
      id: 'pizzas',
      name: 'Pizzas',
      items: [
        { id: 'pz1', name: 'Margherita', description: 'Salsa de tomate, albahaca y parmesano', price: 180 },
        { id: 'pz2', name: 'Marinara', description: 'Salsa de tomate, queso mozzarella y albahaca', price: 190 },
        { id: 'pz3', name: 'Pepperoni', description: 'Pepperoni y queso mozzarella', price: 190 },
        { id: 'pz4', name: 'Hawaiana', description: 'Jamón, piña, queso mozzarella', price: 190 },
        { id: 'pz5', name: 'Champiñones', description: 'Champiñones, mozzarella y cheddar', price: 190 },
        { id: 'pz6', name: 'Pera con Gorgonzola', description: 'Mozzarella, champiñones y cheddar', price: 220 },
        { id: 'pz7', name: 'Carbonara', description: 'Tocino, huevo, champiñones, salsa de mozzarella y tocino', price: 220 },
        { id: 'pz8', name: 'Tropical', description: 'Salsa de tomate, piña, camarón, chile morrón y tocino crispy', price: 200 },
        { id: 'pz9', name: 'Pollo Spicy', description: 'Salsa de tomate, pollo, cebolla morada con chile y salsa búfalo', price: 200 },
        { id: 'pz10', name: 'Pizza Italiana Spicy', description: 'Salsa de tomate, calabaza, pechuga morada de chile y salsa búfalo', price: 200 },
        { id: 'pz11', name: 'Pizza Gallo', description: 'Salsa de tomate, salchicha italiana, pimiento y cebollas', price: 220 },
        { id: 'pz12', name: 'Pizza al Pastor', description: 'Salsa de tomate, pastor, jamón, cilantro, cebolla morada y piña', price: 250 },
        { id: 'pz13', name: 'Siciliana', description: 'Salsa de tomate, carne molida, berenjena, pimiento, aceitunas y queso', price: 220 },
        { id: 'pz14', name: 'Salsiccia Italiana', description: 'Salsa de tomate, salchicha italiana, pimiento, queso parmesano y aceite de olivo', price: 250 },
        { id: 'pz15', name: 'San Pietro', description: 'Salsa de tomate, atún y cebolla morada', price: 250 },
        { id: 'pz16', name: 'Pizza Alla Astra', description: 'Salsa de tomate, setas Alla Astra, salsa de tomate, pimiento, calabaza morada', price: 250 },
        { id: 'pz17', name: 'Salsa Fierra', description: 'Salsa de tomate, queso, camarón, pimiento y arúgula', price: 280 },
        { id: 'pz18', name: 'San Marcos', description: 'Salsa de tomate, camarón, pulpo y tomate cherry', price: 280 },
        { id: 'pz19', name: 'Tres Carnes', description: 'Salsa de tomate, salchicha, carne molida, tocino y arúgula bebés', price: 250 }
      ]
    },
    {
      id: 'entradas',
      name: 'Entradas',
      items: [
        { id: 'e1', name: 'Nudos de Pan', description: 'Nudos de masa, sazonado con mantequilla al ajo', price: 100 },
        { id: 'e2', name: 'Palitos de Pan', description: 'Masa de pizza en forma de palitos, bañados en mantequilla de ajo', price: 110 },
        { id: 'e3', name: 'Bruschetta', description: 'Pan de la casa con tomate, albahaca, ajo y aceite de oliva', price: 110 },
        { id: 'e4', name: 'Ensalada Caprese', description: 'Tomate, queso mozzarella de búfala, hojas de albahaca de oliva', price: 140 },
        { id: 'e5', name: 'Panza', description: 'Tomate, queso mozzarella de búfala y albahaca, canapé con pasta', price: 150 },
        { id: 'e6', name: 'Pan Aromatizado', description: 'Rodajas de pan con ajo, Rkk sabores', price: 95 },
        { id: 'e7', name: 'Papas Crujiente', description: 'Papas en tiras con sal de ajo', price: 100 },
        { id: 'e8', name: 'Papas A Gajo', description: 'Papas a la guja de patata', price: 105 }
      ]
    },
    {
      id: 'especialidades',
      name: 'Especialidades Gallo',
      items: [
        { id: 'eg1', name: 'César', description: 'Lechuga romana, croutones, parmesano, aderezo César, aceite de ajo', price: 125, variants: [{ name: 'Normal', price: 125 }] },
        { id: 'eg2', name: 'Mix de Ensaladas', description: 'Mix de lechugas, jitomate, zanahoria, aderezo', price: 100, variants: [{ name: 'Normal', price: 100 }] },
        { id: 'eg3', name: 'Arúgula', description: 'Mix de lechugas, jitomate cherry, aceite de ajo y vinagre', price: 140 },
        { id: 'eg4', name: 'Strobe a Poutine', description: 'Papas fritas con queso de papas y pasta', price: 150 },
        { id: 'eg5', name: 'Papas Poutine', description: 'Mezcla de papas con puré', price: 160 },
        { id: 'eg6', name: 'Mac and West', description: 'Carne de res a la plancha, venado, queso, nachos, tomate', price: 175 },
        { id: 'eg7', name: 'Hamburgesa Clásica', description: 'Carne de res a la plancha, cebollas, jitomate, lechuga, pepinillos', price: 175 }
      ]
    },
    {
      id: 'ensaladas',
      name: 'Ensaladas',
      items: [
        { id: 'ens1', name: 'César', description: 'Lechuga romana, croutones, parmesano, aderezo Caesar', price: 125 },
        { id: 'ens2', name: 'Mix de Ensaladas', description: 'Mix de lechugas, jitomate, zanahoria, aderezo', price: 100 },
        { id: 'ens3', name: 'Arúgula', description: 'Arúgula, jitomate cherry, aceite de olivo y vinagre', price: 140 }
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
