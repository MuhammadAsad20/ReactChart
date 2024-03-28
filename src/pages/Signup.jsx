import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
 // Import useHistory hook for redirection
import app from '../config/firebase'; // Firebase configuration file
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Import auth module
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Import Firestore module

const SignupPage = () => {
  const navigate = useNavigate (); // Initialize useHistory hook

  // State variables for form fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSignup = async () => {
    try {
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
      console.log('User signed up successfully!....', username);
  
      const db = getFirestore(app);
      const userRef = doc(db, "users", userCredential.user.uid);
      await setDoc(userRef, {
        username: username,
        email: email,
        password: password,
        id: userCredential.user.uid,
      });
  
      navigate('/login');
      alert('User signed up successfully!');
    } catch (error) {
      console.error('Error signing up:', error.message);
      alert('Error signing up: ' + error.message);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <button
              onClick={handleSignup}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign Up
            </button>
          </div>
          <p className="text-center text-gray-500 text-xs">
            Already have an account? <a href="/login" className="text-blue-500 hover:text-blue-700">Sign In</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
