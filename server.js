import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
const port = 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// TEST THE CONNECTION IMMEDIATELY
pool.connect((err, client, release) => {
  if (err) {
    return console.error('❌ DATABASE CONNECTION ERROR:', err.stack);
  }
  console.log('✅ SUCCESS: Backend is connected to the Database!');
  release();
});

app.get('/', (req, res) => {
  res.send('Server is running and checking DB connection...');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
