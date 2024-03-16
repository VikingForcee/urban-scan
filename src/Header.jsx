import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { onAuthStateChanged} from 'firebase/auth';
import { db, auth } from './firebase.config';


const Header = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);

      // Fetch additional user details from Firestore
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const fetchData = async () => {
          try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setUserData(docSnap.data());
            }
          } catch (error) {
            console.error('Error fetching user data:', error.message);
          }
        };

        fetchData();
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="bg-blue-500 p-4 text-white">
      <div className="header">
        
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/home" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/scan" className="nav-link">Scan</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <div id="google_translate_element"></div>
            </li>
            <div className="user-details">
              {user && userData && (
                <div className="user-info relative flex flex-row -mr-0" onClick={() => handleDropdownToggle('')}>
                  <img src={profilePicture} alt="Profile" className="h-8 mt-1 mr-4 cursor-pointer" />
                  {userData.name && <span className="text-white font-semibold mt-2 cursor-pointer">{userData.name}</span>}

                  {isDropdownOpen && (
                    <div className="dropdown absolute top-10 right-0 bg-white border rounded p-2 z-20">
                      <div>
                        <strong>Name:</strong> {userData.name}
                      </div>
                      <div>
                        <strong>Email:</strong> {userData.email}
                      </div>
                      <div>
                        <strong>Phone:</strong> {userData.phone}
                      </div>
                      <div>
                        <strong>Aadhar:</strong> {userData.aadhar}
                      </div>
                      <div>
                        <strong>User Type:</strong> {userData.userType}
                      </div>

                      {user && userData && userData.userType === 'Employer' && (
                        <button onClick={() => handleDropdownToggle('createdPostings')} className="my-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                          Created Postings
                        </button>
                      )}

                      {user && userData && userData.userType === 'Labour' && (
                        <button onClick={() => handleDropdownToggle('appliedPostings')} className="my-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300">
                          Applied Postings
                        </button>
                      )}

                      <button onClick={handleLogout} className="my-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300">
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            
          </ul>
        </nav>
      </div>
      <h1 className="text-3xl font-bold">Urban Scan</h1>
      <p className="text-sm">Addressing urban issues, one click at a time</p>
    </header>
  );
}

export default Header;