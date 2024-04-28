import connectToMongo from './db.js';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import router from './routes/phonepeRoute.js';
import authRouter from './routes/auth.js';

// Enable CORS for all routes
connectToMongo();

const app = express();
const port = 5000;
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization', 'auth-token'], // Specify the allowed headers// Specify the allowed headers
};

app.use(cors(corsOptions));
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
