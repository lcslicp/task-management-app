import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler.js';

import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';
import verifyJWT from './middleware/veriryJWT.js';

dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

app.use(express.static('uploads'));
app.use('/', userRoutes);
app.use('/', verifyJWT);
app.use('/', taskRoutes);

app.use(errorHandler);

mongoose.set('strictQuery', true)

mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Established connection with MongoDB.')).catch(error => { 
    console.error('Error connecting to MongoDB', error);
    process.exit(1)
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, console.log(`Server running in Port ${PORT}`));
