import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from 'morgan';
import mongoose from 'mongoose';

import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Established connection with MongoDB.')).catch(console.error);

app.use('/', taskRoutes);




const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in Port ${PORT}`));