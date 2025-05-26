import express from 'express';
import dbConnection from './config/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './Routes/userRoutes.js';
import productRoutes from './Routes/productRoutes.js';
import path from 'path';


const app = express();

// Middleware setup
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Serve uploaded files statically BEFORE routes
app.use('./uploads', express.static(path.join(process.cwd(), 'uploads')));

// Connect to DB
dbConnection();

// Routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);

// Test route
app.get('/', (req, res) => {
  res.send("Server is up and running");
});

// Global error handler (optional: add err.status for custom errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Something went wrong!' });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
