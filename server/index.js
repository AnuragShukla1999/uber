import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connentToDb from './db/db.js';

import userRoute from './routes/user.route.js';
import docusignRoutes from './routes/docusignRoute.js';

const app = express();

connentToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/users', userRoute);

app.use("/api", docusignRoutes);


export default app;
