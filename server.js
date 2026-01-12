const express = require('express');
const app = express();
const port = 3000; 
// Secret Management: Environment variable
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD || "Secret Not Found";

app.get('/', (req, res) => {
  res.send(`<h1>Secret Status: ${dbPassword === "Secret Not Found" ? "❌" : "✅"}</h1><p>Value: ${dbPassword}</p>`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Connecting to database at ${dbHost}...`);
  console.log(`Secret from Dashboard: ${dbPassword}`); 
});
