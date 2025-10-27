// Firebase Configuration (Aapki wahi config details yahan bhi copy paste karein)
const firebaseConfig = {
  apiKey: "AIzaSyBsE6XjQZ7MdbvdPrAj6HR70g2Mi6Isx34",
  authDomain: "pakhackerpro.firebaseapp.com",
  databaseURL: "https://pakhackerpro-default-rtdb.firebaseio.com",
  projectId: "pakhackerpro",
  storageBucket: "pakhackerpro.firebasestorage.app",
  messagingSenderId: "17345648769",
  appId: "1:17345648769:web:f70f1bb04fae5626c69580"
};

// Initialize Firebase and Auth
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();

// --- CRITICAL SECURITY CHECK ---
// onAuthStateChanged: Jab bhi user ka login status badalta hai, yeh function chalta hai.
auth.onAuthStateChanged(user => {
    if (!user) {
        // Agar 'user' object null hai, iska matlab hai ki koi bhi login nahi hai.
        console.log("CRITICAL: User not authenticated. Redirecting.");
        // Turant login page par bhej do
        window.location.href = 'index.html'; 
    } else {
        // Agar 'user' object mein data hai, to user logged in hai.
        console.log("Authentication SUCCESS. User ID:", user.uid);
        // Yahan aap dashboard content ko show kar sakte hain
        // (Agar aapne content ko CSS se hide kar rakha hai to)
    }
});
