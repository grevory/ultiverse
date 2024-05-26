const admin = require('firebase-admin');
console.log(1111, process.env.FIREBASE_DATABASE_URL, process.env.FIREBASE_SERVICE_ACCOUNT_BASE64)
const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;

if (!serviceAccountBase64) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_BASE64 environment variable is not set");
  }
console.log(333, Buffer.from(serviceAccountBase64, 'base64').toString('utf8'))
const serviceAccount = JSON.parse(Buffer.from(serviceAccountBase64, 'base64').toString('utf8'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
        process.env.FIREBASE_DATABASE_URL ||
        'https://ultiverse-draft-default-rtdb.firebaseio.com',
})

const db = admin.firestore()
const auth = admin.auth()

module.exports = { db, auth }
