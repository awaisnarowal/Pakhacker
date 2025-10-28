
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBsE6XjQZ7MdbvdPrAj6HR70g2Mi6Isx34",
  authDomain: "pakhackerpro.firebaseapp.com",
  databaseURL: "https://pakhackerpro-default-rtdb.firebaseio.com",
  projectId: "pakhackerpro",
  storageBucket: "pakhackerpro.appspot.com",
  messagingSenderId: "17345648769",
  appId: "1:17345648769:web:f70f1bb04fae5626c69580"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
