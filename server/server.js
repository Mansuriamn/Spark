import express from 'express';
import connectDB from './config/dataBase.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.get('/', (req, res) => {
    res.send('API is running...');
});



app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})