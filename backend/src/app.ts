import 'dotenv/config';
 import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.json('Hello World!');
});

 export default app;

