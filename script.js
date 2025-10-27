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

// --- 1. MOBILE UX FIX: Auto-Scroll on Keyboard Focus ---
function setupAutoScroll() {
    const inputs = document.querySelectorAll('.input-group input');

    inputs.forEach(input => {
        input.addEventListener('focus', (e) => {
            // Input field ko center mein scroll karta hai
            e.target.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
            
            // 200ms delay ke baad dubara scroll karne se better result aata hai
            setTimeout(() => {
                e.target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 200);

        });
    });
}

// Page load hone par scroll functionality on karein
setupAutoScroll();


// --- 2. FIREBASE LOGIN LOGIC ---
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');
    
    messageElement.classList.add('hidden');
    
    // Front-end validation
    if (!username || !password) {
        messageElement.textContent = 'ACCESS DENIED: All fields are required.';
        messageElement.style.color = '#ff3333';
        messageElement.classList.remove('hidden');
        return; 
    }
    
    messageElement.textContent = 'STATUS: Attempting secure tunnel establishment...';
    messageElement.style.color = '#00ff73';
    messageElement.classList.remove('hidden');

    // Firebase Authentication
    auth.signInWithEmailAndPassword(username, password)
        .then((userCredential) => {
            // Login successful
            messageElement.textContent = 'ACCESS GRANTED: Redirecting to Main Terminal...';
            messageElement.style.color = '#00ff73';
            
            setTimeout(() => {
                // *** User ko secure dashboard page par bhejta hai ***
                window.location.href = 'dashboard.html'; 
            }, 1500); 

        })
        .catch((error) => {
            // Login failed
            const errorCode = error.code;
            
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
