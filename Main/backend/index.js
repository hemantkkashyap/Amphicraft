import connectToMongo from './db.js';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import router from './routes/phonepeRoute.js';
import authRouter from './routes/auth.js';
import dotenv from 'dotenv';
dotenv.config();

// Enable CORS for all routes
connectToMongo();

const app = express();
const port =process.env.PORT;

// Enable CORS for specific origins
app.use(cors({
  origin: ['http://localhost:3000','https://amphicraft.vercel.app'], 
  allowedHeaders: ['Content-Type', 'Authorization', 'auth-token']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use('/api/auth',authRouter);
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Handle errors
server.on('error', (error) => {
  console.error('Server error:', error);
});
