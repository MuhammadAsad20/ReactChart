// firebase.js

import { initializeApp } from 'firebase/app';



const firebaseConfig = {
  apiKey: "AIzaSyCZ4tzxaKoIZUDDqHO6eo7yjnxYwl5gHlw",
  authDomain: "chart-9acbc.firebaseapp.com",
  projectId: "chart-9acbc",
  storageBucket: "chart-9acbc.appspot.com",
  messagingSenderId: "368882871932",
  appId: "1:368882871932:web:6905498c708385f65a63f9"
};

const app = initializeApp(firebaseConfig);

export default app;
