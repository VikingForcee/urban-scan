// Signup.jsx
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from './firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    name: '',
    aadhar: '',
    phone: '',
    userType: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      if (userData.password.length < 6) {
        setError('Password should be at least 6 characters');
        return;
      }

      const aadharRegex = /^\d{12}$/;
      // Add validation for Aadhar number
      if (!aadharRegex.test(userData.aadhar.trim())) {
        setError('Aadhar number should be exactly 12 digits');
        return;
      }

      // Add validation for password complexity (at least one special character or number)
      if (!/(?=.*[\d!@#$%^&*()_+])/.test(userData.password)) {
        setError('Password should contain at least one special character or number');
        return;
      }

      // Create user account
      const { user } = await createUserWithEmailAndPassword(auth, userData.email, userData.password);

      // Add user data to the "users" collection
      await addDoc(collection(db, 'users'), {
        aadhar: userData.aadhar,
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        userType: userData.userType,
        uid: user.uid, // Store user UID for reference
      });

      const userDetails = {
        aadhar: userData.aadhar,
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        userType: userData.userType,
        uid: user.uid,
      };

      // Save user details to Firestore
      await setDoc(doc(db, 'users', user.uid), userDetails);

      // Reset form data and clear error
      setUserData({
        email: '',
        password: '',
        name: '',
        aadhar: '',
        phone: '',
        userType: '',
      });
      setError('');

      // Redirect or perform other actions upon successful signup
    } catch (error) {
      if (error.message === 'auth/email-already-in-use') {
        setError('Email already in use');
        // Display your custom error message to the user
      } else {
        setError(error.message);
        // Handle other signup errors
      }
    }
  };

  const Logout = () => {
    const handleLogout = async () => {
      try {
        await signOut(auth);
        // Successfully logged out, you can redirect or perform other actions here
      } catch (error) {
        console.error('Logout failed:', error.message);
        // Handle logout error
      }
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800">Sign Up</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-3 rounded relative" role="alert">
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleInputChange}
            />
          </div>
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
            <label htmlFor="aadhar" className="block text-sm font-medium text-gray-600">
              Aadhar
            </label>
            <input
              id="aadhar"
              name="aadhar"
              type="text"
              autoComplete="aadhar"
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder='+91'
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Account Type</label>
            <select
              name="userType"
              id="userType"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleInputChange}
            >
              <option value="">Select Account Type</option>
              <option value="Labour">Labour</option>
              <option value="Employer">Employer</option>
            </select>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
             <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-2 py-1"
                onClick={handleTogglePassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;