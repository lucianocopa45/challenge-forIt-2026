import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { TaskSchema } from '../models/task.model.js';

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mssql",
    host: 'NOTE-MARTIN', 
    port: parseInt(process.env.DB_PORT || "1433"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    options: {
        instanceName: 'SQLEXPRESS',
        encrypt: false,
        trustServerCertificate: true
    },
    synchronize: true, 
    logging: true,     
    entities: [TaskSchema]
});

const connectDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Base de datos conectada y tablas sincronizadas con TypeORM');
    } catch (err) {
        console.error('Error de conexión:', err.message);
    }
};

export default connectDB;