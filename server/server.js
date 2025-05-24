import express from 'express';
import connectDB from './config/dataBase.js';
import dotenv from 'dotenv';
import courseRoutes from './routes/courseRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

connectDB();

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/uploads', express.static('uploads'));  // serve uploaded images

app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})