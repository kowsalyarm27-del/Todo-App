const express = require('express');
const app = express();

// Secret Management: Dashboard-la irundhu DB_PASSWORD-ah edukkum
const secret = process.env.DB_PASSWORD || "Secret Not Found";

app.get('/', (req, res) => {
  res.send(`<h1>Backend is Running!</h1><p>Secret Status: ${secret === "Secret Not Found" ? "❌ Missing" : "✅ Loaded"}</p>`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Verified Secret from Dashboard: ${process.env.DB_PASSWORD}`); // Intha line-ah add pannunga
});
