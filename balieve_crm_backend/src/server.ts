import path from 'path';
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import passport from 'passport';
import weddingRoutes from './routes/weddingRoutes';
import agentRoutes from './routes/agentRoutes';
import compression from 'compression';
import session from 'express-session';
import { authorizeUser } from './utilities/authorizeUser';
import User from './models/userModel';

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
  res.sendFile(path.join(__dirname, '../../bali_eve_crm_frontend/dist/index.html'));
});

app.use(express.static(path.join(__dirname, '../../bali_eve_crm_frontend/dist')));

app.use('/api/v1/weddings', /* authorizeUser, */ weddingRoutes);
app.use('/api/v1/agents', agentRoutes);
// need to export these functions to their relevant routes
app.get('/api/v1/users', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
});
app.post('/api/v1/users', async (req: Request, res: Response) => {
  try {
    const { displayName, email, googleId, role } = req.body;

    const existingUser = await User.find({ email });

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = new User({ displayName, email, googleId, role });

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error Creating User' });
  }
});

app.get('/login', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../balieve_crm_vite/dist/login.html'));
});

const PORT = process.env.port || 8000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
