// A. Firebase Configuration (Aapki final details)
const firebaseConfig = {
  apiKey: "AIzaSyBsE6XjQZ7MdbvdPrAj6HR70g2Mi6Isx34",
  authDomain: "pakhackerpro.firebaseapp.com",
  databaseURL: "https://pakhackerpro-default-rtdb.firebaseio.com",
  projectId: "pakhackerpro",
  storageBucket: "pakhackerpro.firebasestorage.app",
  messagingSenderId: "17345648769",
  appId: "1:17345648769:web:f70f1bb04fae5626c69580"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth(); 

// -------------------------------------------------------------------

// B. Login Event Listener aur Firebase Auth Logic
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');
    
    // Message ko pehle hide/clear karte hain
    messageElement.classList.add('hidden');
    
    // Front-end validation (Basic checks)
    if (!username || !password) {
        messageElement.textContent = 'ACCESS DENIED: All fields are required.';
        messageElement.style.color = '#ff3333';
        messageElement.classList.remove('hidden');
        return; 
    }
    
    messageElement.textContent = 'STATUS: Attempting secure tunnel establishment...';
    messageElement.style.color = '#00ff73';
    messageElement.classList.remove('hidden');

    // --- Firebase Authentication Login ---
    auth.signInWithEmailAndPassword(username, password)
        .then((userCredential) => {
            // Login successful!
            messageElement.textContent = 'ACCESS GRANTED: Redirecting to Main Terminal...';
            messageElement.style.color = '#00ff73';
            
            // Redirect to dashboard page
            setTimeout(() => {
                // *** Make sure you have a dashboard.html file! ***
                window.location.href = 'dashboard.html'; 
            }, 1500); 

        })
        .catch((error) => {
            // Login failed!
            const errorCode = error.code;
            
            // Custom error message based on common Firebase codes
            let displayMessage = "KEY REJECTED. Authentication Failed.";
            if (errorCode === 'auth/wrong-password') {
                displayMessage = "CRITICAL ERROR: Invalid Encrypted Key.";
            } else if (errorCode === 'auth/user-not-found') {
                 displayMessage = "CRITICAL ERROR: User ID Not Found in Database.";
            }

            messageElement.textContent = displayMessage;
            messageElement.style.color = '#ff3333';
            messageElement.classList.remove('hidden');
        });
});
