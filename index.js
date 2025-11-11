const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const getVNTime = () => new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

app.get('/health', (req, res) => {
  res.json({ ok: true, time: getVNTime(), region: 'VN' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('LIVE | VN Time: ' + getVNTime());
});
