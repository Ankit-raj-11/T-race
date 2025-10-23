import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Save or update user data in MongoDB when they login
        try {
          const idToken = await user.getIdToken();
          const response = await fetch('/api/users/create-or-update', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idToken })
          });

          if (response.ok) {
            const userData = await response.json();
            console.log('User data saved to MongoDB:', userData);
          }
        } catch (error) {
          console.error('Error saving user data to MongoDB:', error);
        }
      }
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    if (!auth) {
      throw new Error('Firebase auth is not initialized. Check your environment variables.');
    }
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  const updateUserScore = async (score, gameTime = 0) => {
    if (!user) {
      console.error('No user logged in');
      return;
    }

    try {
      const response = await fetch('/api/users/update-score', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ score, gameTime })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Score updated successfully:', result);
        return result;
      } else {
        console.error('Failed to update score');
      }
    } catch (error) {
      console.error('Error updating score:', error);
    }
  };

  const saveTypingStat = async (wpm, accuracy, timePlayed) => {
    if (!user) {
      console.error('No user logged in');
      return;
    }

    try {
      const resp = await fetch('/api/typing-stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wpm, accuracy, timePlayed })
      });
      if (resp.ok) {
        const result = await resp.json();
        return result;
      } else {
        console.error('Failed to save typing stat');
      }
    } catch (err) {
      console.error('Error saving typing stat:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signInWithGoogle, logout, updateUserScore, saveTypingStat }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
