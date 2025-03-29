const admin = require('firebase-admin');
require('dotenv').config(); // Load .env for local development

try {
  let serviceAccount;
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    // For Vercel (reads from environment variable)
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  } else if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH) {
    // For local development (reads from file path specified in .env)
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH;
    // eslint-disable-next-line import/no-dynamic-require, global-require
    serviceAccount = require(serviceAccountPath);
  } else {
    throw new Error('Firebase service account configuration not found. Set either FIREBASE_SERVICE_ACCOUNT_JSON or FIREBASE_SERVICE_ACCOUNT_KEY_PATH environment variable.');
  }

  if (admin.apps.length === 0) { // Initialize only if not already done
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } else {
  }

} catch (error) {
  // Optionally re-throw or handle the error more gracefully for production
  throw error; // Re-throwing might be better to stop the app if Firebase is critical
}

const db = admin.firestore();

module.exports = { admin, db };
