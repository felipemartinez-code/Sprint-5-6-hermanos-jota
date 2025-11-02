// backend/seedData.js

// Lista de productos iniciales para insertar en MongoDB
const productData = [
    {
        nombre: 'Sillas Córdoba',
        descripcion: 'Inspiradas en el diseño moderno y construidas con la robustez de la madera maciza, las Sillas Córdoba son la pieza perfecta para cualquier espacio contemporáneo.',
        precio: 750,
        stock: 25,
        imagenUrl: '/assets/Fotos_hermanos_jota/Sillas Córdoba.png'
    },
    {
        nombre: 'Aparador Uspallata',
        descripcion: 'Inspirado en la majestuosidad de la cordillera de Uspallata, este aparador combina la solidez de la madera maciza con detalles de diseño minimalista.',
        precio: 1200,
        stock: 12,
        imagenUrl: '/assets/Fotos_hermanos_jota/Aparador Uspallata.png'
    },
    {
        nombre: 'Biblioteca Recoleta',
        descripcion: 'Con líneas clásicas que rinden homenaje a la arquitectura del barrio de Recoleta, esta biblioteca es un mueble atemporal. Es la combinación perfecta de funcionalidad y sofisticación.',
        precio: 950,
        stock: 5,
        imagenUrl: '/assets/Fotos_hermanos_jota/Biblioteca Recoleta.png'
    },
    {
        nombre: 'Butaca Mendoza',
        descripcion: 'La butaca Mendoza es la definición de confort y estilo. Diseñada con un asiento profundo y un respaldo curvo, ofrece una experiencia de descanso inigualable.',
        precio: 800,
        stock: 18,
        imagenUrl: '/assets/Fotos_hermanos_jota/Butaca Mendoza.png'
    },
    {
        nombre: 'Escritorio Costa',
        descripcion: 'Con un diseño que evoca la simplicidad y tranquilidad de la costa, este escritorio es la pieza ideal para crear un espacio de trabajo productivo.',
        precio: 700,
        stock: 20,
        imagenUrl: '/assets/Fotos_hermanos_jota/Escritorio Costa.png'
    },
    {
        nombre: 'Mesa Comedor Pampa',
        descripcion: 'Fuerte y espaciosa, la mesa comedor Pampa está construida para durar. Su diseño simple y robusto celebra la vasta extensión de la llanura pampeana.',
        precio: 1500,
        stock: 8,
        imagenUrl: '/assets/Fotos_hermanos_jota/Mesa Comedor Pampa.png'
    },
    {
        nombre: 'Mesa de Centro Araucaria',
        descripcion: 'Esculpida a mano con un diseño que imita las formas del árbol de araucaria, esta mesa de centro es una obra de arte funcional.',
        precio: 550,
        stock: 30,
        imagenUrl: '/assets/Fotos_hermanos_jota/Mesa de Centro Araucaria.png'
    },
    {
        nombre: 'Mesa de Noche Aconcagua',
        descripcion: 'Inspirada en la cumbre más alta de América, la mesa de noche Aconcagua se destaca por su solidez y elegancia. Su diseño compacto y sus líneas limpias la hacen perfecta para espacios pequeños.',
        precio: 350,
        stock: 45,
        imagenUrl: '/assets/Fotos_hermanos_jota/Mesa de Noche Aconcagua.png'
    },
    {
        nombre: 'Silla de Trabajo Belgrano',
        descripcion: 'La silla de trabajo Belgrano es la compañera ideal para tu escritorio. Su diseño ergonómico y su respaldo curvo te brindan el soporte que necesitas durante largas horas de trabajo.',
        precio: 450,
        stock: 15,
        imagenUrl: '/assets/Fotos_hermanos_jota/Silla de Trabajo Belgrano.png'
    },
    {
        nombre: 'Sillón Copacabana',
        descripcion: 'El sillón Copacabana es un llamado a la relajación y el confort. Su diseño amplio y sus cojines extra suaves te invitan a un merecido descanso.',
        precio: 900,
        stock: 10,
        // 🚨 NOTA: Se corrige el guion bajo en la ruta para consistencia
        imagenUrl: '/assets/Fotos_hermanos_jota/Sillón_Copacabana.png' 
    },
    {
        nombre: 'Sofá Patagonia',
        descripcion: 'Inspirado en la inmensidad de la Patagonia, este sofá es la pieza central de cualquier sala de estar. Su diseño modular y su tapizado de alta resistencia garantizan comodidad y versatilidad.',
        precio: 1800,
        stock: 6,
        imagenUrl: '/assets/Fotos_hermanos_jota/Sofá Patagonia.png'
    },
    {
        nombre: 'Cama Neuquén',
        descripcion: 'Cama plataforma con cabecero flotante tapizado en lino natural y estructura de madera maciza. Su diseño minimalista y sofisticado crea un ambiente de serenidad y elegancia.',
        precio: 1200,
        stock: 9,
        imagenUrl: '/assets/Fotos_hermanos_jota/cama-neuquen.png'
    }
];

export default productData;