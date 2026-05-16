import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  
  // Create or update user profile
  const userDoc = doc(db, 'users', user.uid);
  const snap = await getDoc(userDoc);
  
  if (!snap.exists()) {
    await setDoc(userDoc, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      isPro: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  }
}

export async function logout() {
  await signOut(auth);
}

export async function upgradeToPro(uid: string) {
  const userDoc = doc(db, 'users', uid);
  await updateDoc(userDoc, {
    isPro: true,
    updatedAt: serverTimestamp()
  });
}
