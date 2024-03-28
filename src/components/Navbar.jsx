import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import app from '../config/firebase';

function Navbar() {
  const [user] = useAuthState(getAuth(app));
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const db = getFirestore(app);
          const userDocRef = doc(db, 'users', user.uid); 
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) { 
            const userData = userDocSnap.data();
            setUsername(userData.username);  
          }
          setIsLoggedIn(true); // Set isLoggedIn to true when user is logged in
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        }
      } else {
        setIsLoggedIn(false); // Set isLoggedIn to false when user is not logged in
      }
    };
    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await getAuth(app).signOut(); // Sign out the user
      setIsLoggedIn(false); // Set isLoggedIn to false after logout
    } catch (error) {
      console.error('Error logging out:', error.message);
      // Show error message to the user
      alert('Error logging out: ' + error.message);
    }
  };

  return (
    <header className="text-gray-600 bg-gray-800 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col justify-between md:flex-row items-center">
        <Link to="/" className="flex items-center">
          <img
            src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
            className="mr-3 h-12"
            alt="Logo"
          />
        </Link>
        <Link to="/login" className="flex items-center">
          <div className="flex items-center mb-3 mt-3">
            {user ? (
              <p className="font-bold text-2xl text-orange-600">{username || "username"}</p>
            ) : (
              <p className="text-white">Please sign in to continue.</p>
            )}
          </div>
        </Link>
        {/* Conditional rendering of login/logout button */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/signup"
            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
          >
            Signup
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
