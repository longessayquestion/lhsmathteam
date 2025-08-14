// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDKgZK8jTpXINd-wI2nlbQo9Gc8c_luIHU",
  authDomain: "mathteamapp-7c619.firebaseapp.com",
  projectId: "mathteamapp-7c619",
  storageBucket: "mathteamapp-7c619.appspot.com", // ✅ Make sure it's .com not .app
  messagingSenderId: "737517735573",
  appId: "1:737517735573:web:6bc03d7aba46a4bf3a959c",
  measurementId: "G-7K0MNQG6VZ"
};

// ✅ Initialize and export
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // optional
