import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../backend/config/database.js';
import router from '../backend/routes/task.route.js';

const app = express();

dotenv.config();


app.use(cors({
    origin: 'http://localhost:5173' 
}));

app.use(express.json());

connectDB();
app.get('/', (req, res) => {
  res.send('API funcionando asd');
});
app.use('/api', router);
const PORT = 3010;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app