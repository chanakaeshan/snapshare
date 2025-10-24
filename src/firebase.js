export const firebaseConfig = {
    apiKey: "AIzaSyBZ3GUcrPnsfcLuw9ZHbjitBD4XtP8-OIE",
    authDomain: "ai-assistant-caa0a.firebaseapp.com",
    databaseURL: "https://ai-assistant-caa0a-default-rtdb.firebaseio.com",
    projectId: "ai-assistant-caa0a",
    storageBucket: "ai-assistant-caa0a.firebasestorage.app",
    messagingSenderId: "601252209873",
    appId: "1:601252209873:web:06aa176fb33510b4b911f0"
  };
  
  import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
  import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';
  import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js';
  
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getDatabase(app);
  