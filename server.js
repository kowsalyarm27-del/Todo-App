const express = require('express');
const app = express();
const port = 3000; // Intha line kandippa irukkanum!

// Secret Management: Environment variable-ah inga fetch panrom
const dbPassword = process.env.DB_PASSWORD || "Secret Not Found";

app.get('/', (req, res) => {
  res.send(`<h1>Secret Status: ${dbPassword === "Secret Not Found" ? "❌" : "✅"}</h1><p>Value: ${dbPassword}</p>`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Secret from Dashboard: ${dbPassword}`); // Ippo idhu log-la varum!
});
