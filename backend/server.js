import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(import.meta.url);
import errorHandler from './middleware/errorHandler.js';

import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';
import verifyJWT from './middleware/veriryJWT.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(logger('dev'));
app.use(cors({
    credentials: true,
    origin: ['https://doowit.lesliepn.info/']
}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://doowit.lesliepn.info/');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('uploads'));
app.get('/', (req, res) => { res.send('Hello from Express!')});
app.use('/', userRoutes);
app.use('/', verifyJWT);
app.use('/', taskRoutes);

app.use(errorHandler);

mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Established connection with MongoDB.')).catch(console.error);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/dist' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
    })
}

app.listen(PORT, console.log(`Server running in Port ${PORT}`));
