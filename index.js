const express = require('express');
const path = require('path');
const userRouter = require('./routes/users');

const app = express();

app.use(express.json());
app.use('/api/v1/user', userRouter);

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/error', (req, res, next) => {
  next(new Error('Test server error'));
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send('Server Error');
});

const port = process.env.PORT || process.env.port || 8081;

app.listen(port, () => {
  console.log(`Web Server is listening at port ${port}`);
});