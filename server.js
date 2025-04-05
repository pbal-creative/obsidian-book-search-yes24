const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/', async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).send('Query parameter "q" is required.');
  }

  try {
    const response = await axios.get(`https://www.yes24.com/Product/Search?domain=BOOK&query=${encodeURIComponent(query)}`);
    res.send(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch HTML');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
