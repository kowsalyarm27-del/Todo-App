const express = require('express');
const { Pool } = require('pg');
const crypto = require('crypto');
const app = express();
const port = 3000;
// 1. THE DECRYPTION FUNCTION
function getDecryptedUrl() {
    try {
        const algorithm = 'aes-256-cbc';
        const password = process.env.MASTER_KEY; // "MySecret123!" from Dokploy
        const key = crypto.scryptSync(password, 'salt', 32);
        const iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex');
        const encryptedText = process.env.DATABASE_URL; // The long string from Dokploy

        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (error) {
        console.error("DECRYPTION ERROR: Check if MASTER_KEY/IV are correct in Dokploy.");
        return null;
    }
}
// 2. GET THE REAL URL
const connectionString = getDecryptedUrl();

// 3. DATABASE CONNECTION
const pool = new Pool({
    connectionString: connectionString,
});

pool.connect((err) => {
    if (err) {
        console.error('DATABASE CONNECTION ERROR:', err.stack);
    } else {
        console.log('✅ Successfully connected to the database!');
    }
});

app.get('/', (req, res) => {
    res.send('Server is running with encrypted keys!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
