import React, { useState, FormEvent } from 'react';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup,
} from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';
import { GoogleIcon } from './icons/GoogleIcon';
import { Logo } from './icons/Logo';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // FIX: Replaced the `instanceof` check with a structural type guard to robustly handle the error object.
  // This resolves the TypeScript error where `err.code` could not be accessed on type `unknown`.
  const handleAuthError = (err: unknown) => {
    setLoading(false);
    if (err && typeof err === 'object' && 'code' in err) {
      const code = (err as { code: string }).code;
      switch (code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setError('Error: Invalid credentials. Please try again.');
          break;
        case 'auth/email-already-in-use':
          setError('Error: Email already in use. Please log in.');
          break;
        case 'auth/weak-password':
          setError('Error: Password should be at least 6 characters.');
          break;
        case 'auth/invalid-email':
          setError('Error: Invalid email format.');
          break;
        default:
          setError('An unexpected error occurred. Please try again.');
      }
    } else {
      setError('An unexpected error occurred.');
    }
  };

  const handleEmailPasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError("Email and password fields are required.");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      handleAuthError(err);
    }
    // No need to setLoading(false) on success, as the component will unmount.
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      handleAuthError(err);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4 font-mono">
       <div className="w-full max-w-md p-8 space-y-6 bg-gray-800/50 rounded-lg shadow-2xl border border-green-500/30 backdrop-blur-sm">
        <div className="text-center">
          <Logo />
          <p className="text-gray-400 mt-2">Secure Access Portal</p>
        </div>

        <form onSubmit={handleEmailPasswordSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@phpro.sec"
              className="w-full px-4 py-3 bg-gray-900/70 border border-gray-600 rounded-md text-green-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
              required
            />
            <label htmlFor="email" className="absolute left-4 -top-2.5 text-xs text-gray-400 bg-gray-800/0 px-1 backdrop-blur-sm">Email Address</label>
          </div>

          <div className="relative">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="***************"
              className="w-full px-4 py-3 bg-gray-900/70 border border-gray-600 rounded-md text-green-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
              required
            />
            <label htmlFor="password" className="absolute left-4 -top-2.5 text-xs text-gray-400 bg-gray-800/0 px-1 backdrop-blur-sm">Password</label>
          </div>

          {error && <p className="text-red-500 text-sm text-center animate-pulse">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-green-500 transition-all duration-300 flex items-center justify-center"
          >
            {loading ? (
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : null}
            Login to System
          </button>
        </form>

        <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative bg-gray-800/0 px-2 text-sm text-gray-400 backdrop-blur-sm">
                Or continue with
            </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white flex items-center justify-center gap-2 transition duration-300"
        >
          <GoogleIcon className="w-5 h-5" />
          Continue with Google
        </button>

      </div>
      <footer className="text-center mt-8 text-gray-500 text-xs">
          <p>Owner: Awais Narowaliya</p>
          <p>Contact: 03070378723</p>
      </footer>
    </div>
  );
};

export default LoginPage;
