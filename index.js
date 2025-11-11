const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const getVNTime = () =>
  new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

app.get('/health', (req, res) => {
  res.json({ ok: true, time: getVNTime(), region: 'VN' });
});

// Serve static frontend if there's a "public" folder (e.g. React build)
const publicDir = path.join(__dirname, 'public');
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));

  // For SPA routing: serve index.html for any unknown GET path
  const indexFile = path.join(publicDir, 'index.html');
  app.get('*', (req, res) => {
    if (fs.existsSync(indexFile)) {
      return res.sendFile(indexFile);
    }
    return res.status(404).send('Not found');
  });

} else {
  // No public folder — provide a friendly root page
  app.get('/', (req, res) => {
    res.send(`
      <h1>App is running</h1>
      <p>Health endpoint: <a href="/health">/health</a></p>
      <p>VN Time: ${getVNTime()}</p>
    `);
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`LIVE | VN Time: ${getVNTime()} | port=${PORT}`);
});
