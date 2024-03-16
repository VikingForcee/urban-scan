import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDoc, doc, setDoc } from 'firebase/firestore';
import { db, auth } from './firebase.config';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      // Log in the user
      const { user } = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
  
      // Check if user exists in the "users" collection
      const userDataRef = doc(db, 'users', user.uid);
      const userDataSnap = await getDoc(userDataRef);
  
      if (userDataSnap.exists()) {
        // User exists in the database
        const userData = userDataSnap.data();
  
        // Redirect or perform other actions upon successful login
        const userDetails = {
          aadhar: userData.aadhar,
          email: userData.email,
          name: userData.name,
          phone: userData.phone,
          userType: userData.userType,
          uid: user.uid,
        };
  
        // Save user details to Firestore
        await setDoc(userDataRef, userDetails);
      } else {
        // User doesn't exist in the database
        setError('User not found');
        // Display your custom error message to the user
      }
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        setError('Invalid credential');
        // Display your custom error message to the user
      } else {
        setError(error.message);
        // Handle other login errors
      }
    }
  };
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-3 rounded relative" role="alert">
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Login
            </button>
          </div>
        </form>
        <p>
        Don't have an account? <Link to="/signup" className="signup-link">Create a new account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;