import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  isPro: boolean;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isPro: false,
  isAdmin: false,
  loading: true
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      
      if (user) {
        // Listen to user profile for Pro status
        const adminEmails = [
          'sfimportsdf@gmail.com', 
          'raquelrafen@gmail.com', 
          'rsafen@gmail.com',
          'safffnb@gmail.com',
          'saffnb@gmail.com',
          'safnb@gmail.com'
        ];

        // Temp users that expire after 30 days from May 28, 2026 -> June 27, 2026
        const tempProUsers: Record<string, number> = {
          'peptideopro@gmail.com': new Date('2026-06-27T23:59:59Z').getTime(),
          'abraaoalvesdesa18@gmail.com': new Date('2026-06-27T23:59:59Z').getTime()
        };

        let normalizedEmail = user.email ? user.email.toLowerCase().trim() : '';
        if (normalizedEmail.endsWith('@gmail.com')) {
          const [username, domain] = normalizedEmail.split('@');
          normalizedEmail = `${username.replace(/\./g, '')}@${domain}`;
        }
        
        const isSuperAdmin = adminEmails.includes(normalizedEmail);
        setIsAdmin(isSuperAdmin);
        
        let isTempPro = false;
        if (tempProUsers[normalizedEmail]) {
          if (Date.now() < tempProUsers[normalizedEmail]) {
            isTempPro = true;
          }
        }
        
        console.log("Current user email:", normalizedEmail, "isSuperAdmin:", isSuperAdmin, "isTempPro:", isTempPro);

        let proFromDb = false;
        let proFromGrant = false;

        const evaluatePro = () => {
          setIsPro(isSuperAdmin || proFromDb || proFromGrant || isTempPro);
        }

        // Immediately set true if super admin or temp pro, so they don't get blocked by slow DB or permission errors
        if (isSuperAdmin || isTempPro) {
          setIsPro(true);
        }

        const unsubscribeProfile = onSnapshot(doc(db, 'users', user.uid), (docSnapshot) => {
          if (docSnapshot.exists()) {
            proFromDb = docSnapshot.data()?.isPro || false;
          } else {
            proFromDb = false;
          }
          evaluatePro();
          setLoading(false);
        }, (error) => {
          console.error("Firestore user profile fetch error:", error);
          evaluatePro();
          setLoading(false);
        });

        const unsubscribeGrant = onSnapshot(doc(db, 'pro_grants', normalizedEmail), (docSnapshot) => {
          if (docSnapshot.exists()) {
             const data = docSnapshot.data();
             if (data.expiresAt > Date.now()) {
                proFromGrant = true;
             } else {
                proFromGrant = false;
             }
          } else {
             proFromGrant = false;
          }
          evaluatePro();
        }, (error) => {
          console.error("Firestore pro grant fetch error:", error);
          proFromGrant = false;
          evaluatePro();
        });
        
        return () => {
          unsubscribeProfile();
          unsubscribeGrant();
        };
      } else {
        setIsPro(false);
        setIsAdmin(false);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isPro, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
