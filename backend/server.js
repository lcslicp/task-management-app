import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
// import path from 'path';
import errorHandler from './middleware/errorHandler.js';

import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';
// import verifyJWT from './middleware/veriryJWT.js';


dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());


app.use('/', userRoutes);
// app.use('/', verifyJWT);
app.use('/', taskRoutes);

app.use(errorHandler);

mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Established connection with MongoDB.')).catch(console.error);





const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in Port ${PORT}`));