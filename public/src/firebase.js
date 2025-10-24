export const firebaseConfig = {
  apiKey: "AIzaSyBiOJVaCP6XYI2Ik1GctFQZxhK6LZmBTc8",
  authDomain: "snapshare-19579.firebaseapp.com",
  databaseURL: "https://snapshare-19579-default-rtdb.firebaseio.com",
  projectId: "snapshare-19579",
  storageBucket: "snapshare-19579.firebasestorage.app",
  messagingSenderId: "683989199115",
  appId: "1:683989199115:web:cbe090f1d69c7905501a0e"
  };
  
  import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
  import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';
  import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js';
  
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getDatabase(app);
