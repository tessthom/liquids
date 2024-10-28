// external modules
import express from 'express';
import dotenv from 'dotenv';

// local modules

// init env variabless
dotenv.config();

// create express app
const app = express();

// middleware
app.use((req, res, next) => { // custom to log all requests coming in
  console.log(req.path, req.method); 
  next(); 
});

// initial route handler 
app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the API' });
});

// listen for requests
app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});