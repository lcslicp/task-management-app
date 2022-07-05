import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';

import credentials from './middleware/credentials.js';
import verifyJWT from './middleware/veriryJWT.js';
import refresh from './routes/refresh.js';
import logoutRoute from './routes/logoutRoute.js';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';


dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(credentials);
app.use(cors(''));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());


mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Established connection with MongoDB.')).catch(console.error);


app.use('/', userRoutes);
app.use('/', refresh);

app.use(verifyJWT);
app.use('/', taskRoutes);
app.use('/', logoutRoute);




const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in Port ${PORT}`));