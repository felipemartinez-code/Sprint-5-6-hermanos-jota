// backend/seeder.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productData from './seedData.js';
import Product from './models/product.model.js'; // Ajusta la ruta si es necesario

dotenv.config();

const mongoURI = process.env.MONGO_URI;

// Conexión a la base de datos
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB conectado para la operación de SEED.');
    } catch (error) {
        console.error(`Error al conectar a MongoDB: ${error.message}`);
        process.exit(1);
    }
};

// Función para importar datos
const importData = async () => {
    await connectDB();
    try {
        // Opcional: Eliminar datos existentes antes de importar
        await Product.deleteMany(); 
        
        // Insertar los nuevos datos
        await Product.insertMany(productData);
        
        console.log('Datos importados con éxito.');
        mongoose.connection.close();
    } catch (error) {
        console.error(`Error al importar datos: ${error}`);
        process.exit(1);
    }
};

// Función para destruir todos los datos
const destroyData = async () => {
    await connectDB();
    try {
        await Product.deleteMany();
        console.log('Datos eliminados con éxito.');
        mongoose.connection.close();
    } catch (error) {
        console.error(`Error al eliminar datos: ${error}`);
        process.exit(1);
    }
};

// Controlar la ejecución desde la línea de comandos
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}