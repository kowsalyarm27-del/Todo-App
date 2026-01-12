const express = require('express');
const app = express();

// Secret Management: Dashboard-la irundhu DB_PASSWORD-ah edukkum
const secret = process.env.DB_PASSWORD || "Secret Not Found";

app.get('/', (req, res) => {
  res.send(`<h1>Backend is Running!</h1><p>Secret Status: ${secret === "Secret Not Found" ? "❌ Missing" : "✅ Loaded"}</p>`);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
