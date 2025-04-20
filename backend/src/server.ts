import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import winston from 'winston';

// Import routes
import productRoutes from './routes/product.routes';
import userRoutes from './routes/user.routes';
import orderRoutes from './routes/order.routes';
import uploadRoutes from './routes/upload.routes';

// Load environment variables
dotenv.config();

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(json());

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/3d-ecommerce';

mongoose.connect(MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error('MongoDB connection error:', error);
  });

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
}); 