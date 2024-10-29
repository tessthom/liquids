// External modules
import express from 'express';
import dotenv from 'dotenv';

// Local modules
import connectDB from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

// Init env variabless
dotenv.config();

// Create express app
const app = express();

// Middleware
app.use(express.json()); // Pass data on req.body to route handlers
app.use((req, res, next) => { // Custom middlware to log all requests coming in
  console.log(req.path, req.method); 
  next(); 
});

// Bind routes
// TODO: auth routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/posts/:postId/comments', commentRoutes);

// Init DB connection and only listen on success
const start = async () => {
  try {
    await connectDB();
    // Listen for requests
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

start();