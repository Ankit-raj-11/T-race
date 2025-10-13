// src/firebase.js

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Check if Firebase environment variables are available
const hasFirebaseConfig = process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
                          process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

let app = null;
let auth = null;
let db = null;

if (hasFirebaseConfig) {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    console.log("✅ Firebase initialized successfully");
  } catch (error) {
    console.warn("⚠️ Firebase initialization failed:", error.message);
  }
} else {
  console.log("🔧 Firebase disabled - no configuration found");
}

export { app, auth, db };