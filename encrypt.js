const crypto = require('crypto');

// 1. The Real Key you want to hide
const realDbUrl = "postgresql://kowsalya...your_real_password..."; 

// 2. A 'Master Password' to lock the encryption (Keep this secret!)
const secretPassphrase = "my-unique-security-key-123"; 

const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync(secretPassphrase, 'salt', 32);
const iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update(realDbUrl, 'utf8', 'hex');
encrypted += cipher.final('hex');

console.log("--- COPY THESE TO DOKPLOY ---");
console.log("ENCRYPTED_VALUE:", encrypted);
console.log("ENCRYPTION_IV:", iv.toString('hex'));
