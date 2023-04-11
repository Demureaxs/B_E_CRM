import path from 'path';
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import passport from 'passport';
import weddingRoutes from './routes/weddingRoutes';
import compression from 'compression';
import session from 'express-session';
import { authorizeUser } from './utilities/authorizeUser';

dotenv.config({ path: path.join(__dirname, '../.env') });

import './models/userModel';
import './services/passport';

const app = express();

app.use(compression());

mongoose.connect(process.env.MONGO_URI as string, () => {
  console.log('Mongoose Connected');
});

app.use(
  session({
    secret: process.env.COOKIE_KEY as string,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

import authRoutes from './routes/authRoutes';
authRoutes(app);

app.use(morgan('short'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', authorizeUser, (req: Request, res: Response) => {
  console.log('Authorize user Middleware has been executed successfully');
  res.sendFile(path.join(__dirname, '../../balieve_crm_vite/dist/index.html'));
});

app.use(express.static(path.join(__dirname, '../../balieve_crm_vite/dist')));

app.use('/api/v1/weddings', /* authorizeUser, */ weddingRoutes);

app.get('/login', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../balieve_crm_vite/dist/login.html'));
});

const PORT = process.env.port || 8000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
