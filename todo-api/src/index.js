const cors = require('cors');
const express = require('express');
const itemsRouter = require('./routes/items');

const app = express();
const port = process.env.PORT || 3000;

// Allow requests from any origin
app.use(cors());

// If a POST or PUT request has a "content-type: application/json" header,
// parse the request data as JSON and add it to req.body
app.use(express.json());

// Simulate high latency
// app.use((req, res, next) => setTimeout(next, 1000));

app.get('/', (req, res) => {
  res.json({message: 'Hello, World!'});
});

app.use('/items', itemsRouter);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

