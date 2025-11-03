E-commerce Mueblería Hermanos Jota - Sprint 5 y 6

Este proyecto consiste en la transformación de una maqueta visual estática en una Aplicación Web persistente. El objetivo es mantener el frontend en React y el backend con Node.js y Express , pero ahora conectando la API a una base de datos MongoDB Atlas para implementar la funcionalidad CRUD (Crear, Leer, Actualizar, Borrar) completa para los productos de "Mueblería Jota".

La aplicación simula el catálogo de una mueblería, permitiendo a los usuarios visualizar, crear, editar y eliminar productos a través de interfaces y formularios interactivos.

Integrantes del Equipo:

Juan Ignacio Zamit
Felipe Martinez
El proyecto se construyó con un enfoque Full Stack, utilizando las siguientes tecnologías:

Frontend (Cliente): React Backend (Servidor): Node.js con Express Base de Datos: MongoDB Database

Para configurar la Base de Datos (Backend)

Antes de iniciar cualquier servidor, se debe configurar las variables de entorno para la conexión a MongoDB Atlas.

En la carpeta backend, se crea un archivo llamado .env

Dentro de .env se añade la cadena de conexion de MongoDB, la cual debe verse asi:

MONGO_URI="mongodb+srv://[TU_USUARIO]:[TU_CONTRASEÑA]@[CLUSTER_URL].mongodb.net/[NOMBRE_BD]" PORT=5000

Inciar backend: 1. Navegá hacia la carpeta backend en la terminal e instala las dependencias con: npm install 2. Ejecutá el servidor de node.js: node server.js

Iniciar Frontend: 1. Navegá hacia la carpeta Frontend en la terminal e instala las dependencias: npm install 2. Inicia la aplicación de React con: npm run dev

Aclaración Importante: la carpeta backend y frontend se deben iniciar en terminales diferentes, recomendamos iniciar una con la terminal de la computadora y la otra con la terminal de Visual Studio Code o algún IDE que posea terminal
