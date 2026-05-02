// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your config
const firebaseConfig = {
  apiKey: "AIzaSyAvwGTL62eBR-osXKhZqPftEhoRbZbFXKg",
  authDomain: "kizack-electricals.firebaseapp.com",
  projectId: "kizack-electricals",
  storageBucket: "kizack-electricals.firebasestorage.app",
  messagingSenderId: "925781378975",
  appId: "1:925781378975:web:8bcb2de6d82f6de3ff1faa",
  measurementId: "G-DENVL64N57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export database
export { db };