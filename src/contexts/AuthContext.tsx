import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  isPro: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isPro: false,
  loading: true
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      
      if (user) {
        // Listen to user profile for Pro status
        const adminEmails = [
          'sfimportsdf@gmail.com', 
          'raquel.rafen@gmail.com', 
          'rsafen@gmail.com',
          'safffnb@gmail.com',
          'saffnb@gmail.com',
          'safnb@gmail.com'
        ];
        const normalizedEmail = user.email ? user.email.toLowerCase().trim() : '';
        const isSuperAdmin = adminEmails.includes(normalizedEmail);
        
        console.log("Current user email:", normalizedEmail, "isSuperAdmin:", isSuperAdmin);

        // Immediately set true if super admin, so they don't get blocked by slow DB or permission errors
        if (isSuperAdmin) {
          setIsPro(true);
        }

        const unsubscribeProfile = onSnapshot(doc(db, 'users', user.uid), (docSnapshot) => {
          if (docSnapshot.exists()) {
            setIsPro(isSuperAdmin || docSnapshot.data()?.isPro || false);
          } else {
            setIsPro(isSuperAdmin);
          }
          setLoading(false);
        }, (error) => {
          console.error("Firestore user profile fetch error:", error);
          setIsPro(isSuperAdmin);
          setLoading(false);
        });
        
        return () => unsubscribeProfile();
      } else {
        setIsPro(false);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isPro, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
