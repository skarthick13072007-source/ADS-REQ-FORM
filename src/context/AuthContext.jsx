import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dbStatus, setDbStatus] = useState('checking'); // 'checking', 'online', 'offline'

  useEffect(() => {
    // Check Firebase Connection
    const checkConnection = async () => {
      try {
        // Try to fetch a doc. 
        // If it's a permission error, it means we ARE connected to Firebase!
        await getDoc(doc(db, '_connection_test_', 'test'));
        setDbStatus('online');
      } catch (error) {
        // 'permission-denied' means the server is reached but rules blocked us (which is good!)
        if (error.code === 'permission-denied' || error.message?.includes('permission')) {
          setDbStatus('online');
        } else {
          console.error('Firebase Connection Error:', error);
          setDbStatus('offline');
        }
      }
    };
    checkConnection();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          setCurrentUser(user);
          const userDoc = await getDoc(doc(db, 'admins', user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.warn('User logged in but not found in admins collection');
            setUserData(null);
          }
        } else {
          setCurrentUser(null);
          setUserData(null);
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    currentUser,
    userData,
    login,
    logout,
    dbStatus,
    isAdmin: !!userData,
    isSuperAdmin: userData?.role === 'super_admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
