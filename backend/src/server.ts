import express from 'express';
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.json('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
