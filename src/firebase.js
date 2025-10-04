import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyDXTE8avOZYsz-mAZDqVdrO2YS0EwyTAZU",
  authDomain: "t-race-b619c.firebaseapp.com",
  projectId: "t-race-b619c",
  storageBucket: "t-race-b619c.firebasestorage.app",
  messagingSenderId: "234365029319",
  appId: "1:234365029319:web:928320cf1612be8feee7e2",
  measurementId: "G-CRLSK8H0EY",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
