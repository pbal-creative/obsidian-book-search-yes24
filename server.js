const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/raw-html', async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).send('Missing query');

  try {
    const searchUrl = `https://www.yes24.com/Product/Search?domain=BOOK&query=${encodeURIComponent(q)}`;
    const response = await axios.get(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      }
    });

    res.send(response.data);
  } catch (err) {
    res.status(500).send('Failed to fetch');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
