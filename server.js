const express = require('express');
const https = require('https');
const path = require('path');

const app = express();
const API_KEY = 'IFkniv5KyC-AKKxNGZgimAkQM53n3qGvPtHoK_NI7ak';

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.static('.'));

app.get('/buscar', (req, res) => {
  const query = encodeURIComponent((req.query.q || '') + ' food');
  const options = {
    hostname: 'api.unsplash.com',
    path: `/search/photos?query=${query}&per_page=5&orientation=squarish&client_id=${API_KEY}`,
    headers: { 'Accept-Version': 'v1' }
  };
  https.get(options, (apiRes) => {
    let data = '';
    apiRes.on('data', chunk => data += chunk);
    apiRes.on('end', () => {
      res.setHeader('Content-Type', 'application/json');
      res.end(data);
    });
  }).on('error', e => res.status(500).json({ error: e.message }));
});

app.listen(3000, () => console.log('✅ Rodando na porta 3000'));
