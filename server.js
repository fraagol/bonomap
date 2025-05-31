import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 5174;

app.use(cors());

app.get('/api/addresses', async (req, res) => {
  try {
    const response = await fetch('https://bonocompramalvarrosa.com/comercios-adheridos/?f=a');
    const html = await response.text();
    res.send(html);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch addresses' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
